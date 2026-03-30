from fastapi import APIRouter

router = APIRouter()

@router.post("/chat")
def new_chat():
    return {"message": "New chat with AI Mentor"}

@router.post("/chat/{id}")
def continue_chat(id: int):
    return {"message": f"Continuing chat {id}"}

@router.get("/chats")
def get_chat_history():
    return {"message": "List of past chats"}

@router.delete("/chat/{id}")
def delete_chat(id: int):
    return {"message": f"Chat {id} deleted"}
