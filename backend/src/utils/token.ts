import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;
export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, secret, {
    expiresIn: "15m",
  } as jwt.SignOptions);
}

export function verifyToken(token: string): {
  sub: string;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, secret) as {
    sub: string;
    iat: number;
    exp: number;
  };
}
