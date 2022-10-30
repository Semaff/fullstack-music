import { User } from "src/models/user/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
