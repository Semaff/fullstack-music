import { JwtUser } from "src/modules/auth/interfaces/JwtUser";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

export {};
