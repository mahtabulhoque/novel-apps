import jwt from "jsonwebtoken";

export function signJwtToken(payload, options) {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
