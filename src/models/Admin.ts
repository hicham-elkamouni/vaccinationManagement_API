import { Schema, model } from "mongoose";
import { IAdmin } from "@interfaces/index";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'

const schema = new Schema<IAdmin>(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: false,
            unique: false,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        salt: {
            type: String
        }
    },
    { timestamps: true }
);

//Create virtual champs 'password'
schema.virtual('password')
    .set(function (this: { _password: string, salt: string, hashed_password: string, cryptPass: Function }, password: any) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.cryptPass(password)
    })
    .get(function (this: { _password: string }) {
        return this._password
    })
//Create method for crypt password
schema.methods = {

    authenticate: function (pass: string) {
        return this.cryptPass(pass) === this.hashed_password;
    },
    cryptPass: function (password: string) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ''
        }
    }
}

export const Admin = model<IAdmin>("Admin", schema);