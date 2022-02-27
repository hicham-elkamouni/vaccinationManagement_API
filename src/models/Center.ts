import { Schema, model } from "mongoose";
import { ICenter } from "@interfaces/index";
import mongoose from "mongoose";


const schema = new Schema<ICenter>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        city : {
            type : String,
            required: true,
            trim : true,
        },
        area : {
            type : String,
            required: true,
            trim : true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
        },
    },
    { timestamps: true }
);

export const Center = model<ICenter>("Center", schema);