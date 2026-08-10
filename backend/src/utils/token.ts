import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const jwtSecret: string = secret;

export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, jwtSecret, {
    expiresIn: "15m",
  } as jwt.SignOptions);
}

export function verifyToken(token: string): {
  sub: string;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, jwtSecret) as {
    sub: string;
    iat: number;
    exp: number;
  };
}
