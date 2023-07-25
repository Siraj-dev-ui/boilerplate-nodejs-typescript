const jwt = require('jsonwebtoken');

export function GenerateJWT(role_id: number) {
  return jwt.sign({ role_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
