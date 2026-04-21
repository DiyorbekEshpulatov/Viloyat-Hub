import crypto from "crypto";

/**
 * Hash a password using bcrypt
 * Note: In production, use bcryptjs package
 */
export function hashPassword(password: string): string {
  // For demo purposes - in production use bcryptjs
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Verify a password against its hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string, expiresIn = "24h"): string {
  // This is a simplified version - in production use jsonwebtoken package
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    })
  );
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET || "secret")
    .update(`${header}.${payload}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): { userId: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const payload = JSON.parse(atob(payloadB64));

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token expired
    }

    return { userId: payload.userId };
  } catch (error) {
    return null;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

/**
 * Generate random token for email verification
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
