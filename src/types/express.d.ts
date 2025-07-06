import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User | any; // You can refine this later
    }
  }
}
