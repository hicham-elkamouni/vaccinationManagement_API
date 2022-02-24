import { Center } from '@models/Center'
import { Request , Response } from "express";
import { ICenter } from '@interfaces/index'

// ADD CENTER
const addCenter = async (req: Request, res: Response) => {

    const data = req.body as ICenter
    console.table(data);

    try{
        const doc = new Center(data)
        await doc.save(); 
        return res.status(201).json({
            status : true,
            message : doc
        })
    }catch(err: any){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
}

// REMOVE CENTER

// UPDATE CENTER 
// GET ONE CENTER
// GET ALL CENTER

export { addCenter }