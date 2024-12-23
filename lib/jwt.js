import jwt from "jsonwebtoken";

export function signJwtToken(payload, options) {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function verifyJwtToken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
