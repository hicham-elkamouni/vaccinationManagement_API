import { Schema, model } from "mongoose";
import { IUser } from "@interfaces/index";


const schema = new Schema<IUser>(
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
        cin: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        nbrPhone: {
            type: Number,
            required: true,
            trim: true,
        },
        shotTaken: {
            type: Number,
            required: true,
            default: 1,
        },
        diseaseOrTreatments: {
            type: String,
            trim: true,
        },
        sideEffects1stVaccine: {
            type: String,
            trim: true,
        },
        sideEffects2stVaccine: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", schema);