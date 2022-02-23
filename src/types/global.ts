import { JwtPayload } from "jsonwebtoken";
export interface TimeStamps {
  createdAt: Date;
  updatedAt: Date;
}
export interface JWTData extends JwtPayload {
  id: string;
}
export type role = "owner" | "teacher" | "student";

export interface MulterFile {
  [fieldname: string]: Express.Multer.File[];
}

export interface UploadFile extends Express.Multer.File {
  location: string;
  key: string;
}
