import { Center } from '@models/Center'
import { Request, Response } from "express";
import { ICenter } from '@interfaces/index'

// ADD CENTER
const addCenter = async (req: Request, res: Response) => {

    const data = req.body as ICenter

    try {
        const doc = new Center(data)
        await doc.save();
        return res.status(201).json({
            status: true,
            message: doc
        })
    } catch (err: any) {
        return res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

// REMOVE CENTER
const deleteCenter = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const deletedDocument = await Center.findOneAndRemove({ _id: id })

        if (deletedDocument) {
            res.status(200).json({
                status: true,
                message: "deleted successfully"
            })
        } else {
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
// GET ALL CENTERS
const getAllCenters = async (req: Request, res: Response) => {

    const queryStrings = req.query
    try {
        const docs = await Center.find(queryStrings);
        console.log(docs);
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
const getCenter = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const doc = await Center.find({_id : id});
        if(doc.length > 0) {
            return res.status(200).json({
                status : true,
                message : doc
            })
        }else{ 
            return res.status(200).json({
                status : true,
                message : "this center doesn't exist"
            })
        }
    }catch(err:any){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }
}

// UPDATE CENTER 
const updateCenter = async (req: Request, res: Response) => {

    const { id } = req.params
    const body = req.body

    console.log(body);
    console.log({id});

    try {
        await Center.findOneAndUpdate({_id : id},body);
        return res.status(200).json({
            status : true,
            message : "updated successfully !!!"
        })
        
    }catch(err:any){
        return res.status(400).json({
            status : false,
            message: err.message
        })
    }

}

export { getAllCenters ,getCenter , addCenter , deleteCenter , updateCenter }

function findOneAndDelete(arg0: { _id: string; }) {
    throw new Error('Function not implemented.');
}
