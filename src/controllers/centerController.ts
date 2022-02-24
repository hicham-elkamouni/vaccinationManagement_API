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

    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
    // try { 
    // }catch(err: any){

    // }
    // try{
    //     const doc = new Center(data)
    //     await doc.save(); 
    //     return res.status(201).json({
    //         status : true,
    //         message : doc
    //     })
    // }catch(err: any){
    //     return res.status(400).json({
    //         status : false,
    //         message: err.message
    //     })
    // }
}

// UPDATE CENTER 

// GET ONE CENTER
// GET ALL CENTER

export { addCenter , deleteCenter}

function findOneAndDelete(arg0: { _id: string; }) {
    throw new Error('Function not implemented.');
}
