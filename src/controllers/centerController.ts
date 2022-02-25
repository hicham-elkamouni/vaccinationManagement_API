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
const deleteCenter = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
    const deletedDocument = await Center.findOneAndRemove({ _id: id })

        if (deletedDocument){
            res.status(200).json({
            status: true,
            message: "deleted successfully"
            })
        }else{
            res.status(200).json({
            status: true,
            message: "this id doesn't exist"
            })
        }

    } catch (err:any) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
    
}
// GET ALL CENTER
const getAllCenters = async (req: Request, res: Response) => {

    try {
        const docs = await Center.find();
        if (docs.length > 0) {
            return res.status(200).json({
                status : true,
                message : docs
            })
        }else{
            return res.status(200).json({
                status : true,
                message : "there's no center right now !"
            })
        }
    }catch(err:any){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
}

// GET ONE CENTER

// UPDATE CENTER 


export { addCenter , deleteCenter , getAllCenters}

function findOneAndDelete(arg0: { _id: string; }) {
    throw new Error('Function not implemented.');
}
