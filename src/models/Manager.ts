import { Schema, model } from "mongoose";
import { IManager } from "@interfaces/index";


const schema = new Schema<IManager>(
    {
        lName: {
            type: String,
            required: true,
            trim: true,
        },
        fName: {
            type: String,
            required: true,
            trim: true,
        },
        area : {
            type : String,
            required : true,
            trim : true,
        }
    },
    { timestamps: true }
);

export const User = model<IManager>("User", schema);