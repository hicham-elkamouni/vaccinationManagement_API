import { Schema, model } from "mongoose";
import { IUser } from "@interfaces/mongoose.types";


const schema = new Schema<IUser>(
    {
        name: {
        type: String,
        required: true,
        }
    },
    { timestamps: true }
);

export const User = model<IUser>("User", schema);