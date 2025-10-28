import { User } from "../generated/prisma/index";

declare global {
  namespace Express {
    interface Request {
      user?: User | any; // You can refine this later
    }
  }
}
