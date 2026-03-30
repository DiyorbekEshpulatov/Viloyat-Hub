from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .routers import users, grants, map_points

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address, default_limits=["100 per 15minute"])

# App initialization
app = FastAPI(title="ViloyatHub API")

# Add Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend origin e.g., "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Routers
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(grants.router, prefix="/api/v1/grants", tags=["grants"])
app.include_router(map_points.router, prefix="/api/v1/map", tags=["map"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ViloyatHub API"}
