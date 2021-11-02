import { Document, Model, model, Types, Schema } from "mongoose";
import { TimeStamps } from "../types/global";
import getTypeAndDefaultValue from "../utils/helpers/getTypeAndDefaultValue";

export interface IUser extends Document, TimeStamps {
  firstName: string;
  lastName: string;
  email: string;
  role: "owner" | "teacher" | "student";
  password: string;
  phoneNumber: string;
  profileImageUrl: string;
  passwordResetToken: string;
  passwordResetExpires: Date | null | string;
  passwordChangedAt: Date | null;
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
  createdBy: Types.ObjectId;
  verified: boolean;
  verifyToken?: string;
  verifyTokenExpires?: Date | string;
  gender: "male" | "female" | "other" | null | string;
  dateOfBirth: Date | null;
  totalReward: number;
  totalClaimedReward: number;
  totalClaimableReward: number;
  //   courseScores: Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "User's First name is required"]
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "User's Last name is required"]
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email address is required"]
    },
    role: {
      ...getTypeAndDefaultValue(String, "student"),
      enum: ["student", "teacher", "owner"]
    },
    password: {
      type: String,
      select: false
    },
    profileImageUrl: getTypeAndDefaultValue(
      String,
      "https://ui-avatars.com/api/?firstName=New+User"
    ),
    phoneNumber: {
      ...getTypeAndDefaultValue(String, null),
      unique: true,
      sparse: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User"
    },
    passwordResetToken: getTypeAndDefaultValue(String, null),
    passwordResetExpires: getTypeAndDefaultValue(Date, null),
    passwordChangedAt: getTypeAndDefaultValue(Date, null),
    banned: getTypeAndDefaultValue(Boolean, false),
    banReason: {
      ...getTypeAndDefaultValue(String, null),
      trim: true
    },
    banExpires: getTypeAndDefaultValue(Date, null),
    verified: getTypeAndDefaultValue(Boolean, false),
    verifyToken: getTypeAndDefaultValue(String, ""),
    verifyTokenExpires: getTypeAndDefaultValue(Date, ""),
    dateOfBirth: getTypeAndDefaultValue(Date, null),
    gender: {
      ...getTypeAndDefaultValue(String, null),
      enum: ["male", "female", "other", null]
    },
    totalReward: getTypeAndDefaultValue(Number, 0),
    totalClaimedReward: getTypeAndDefaultValue(Number, 0),
    totalClaimableReward: {
      type: Number
    }
  },
  { timestamps: true }
);

const User: Model<IUser> = model("User", UserSchema);

export default User;
