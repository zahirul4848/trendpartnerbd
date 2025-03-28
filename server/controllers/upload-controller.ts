import { Request, Response } from "express";
import expressAsync from 'express-async-handler';
import {v2 as cloudinary} from 'cloudinary';

export const categoryUpload = expressAsync(async(req: Request, res: Response)=> {
  try {
    const file = req.file as any;
    cloudinary.uploader.upload(file.path, {folder: "Sailors"}, 
      (err, result)=> {
        if(err) {
          res.status(400);
          throw new Error(err.message);
        }
        const imageUrl = {public_id: result?.public_id, url: result?.secure_url};
        res.status(201).json(imageUrl);
      });
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
});


export const productUpload = expressAsync(async(req: Request, res: Response)=> {
  try {
    const reqFiles = [];
    const files = req.files as any[];
    for(let i= 0; i < files.length; i++) {
      const result = await cloudinary.uploader.upload(files[i].path, {folder: ""});
      reqFiles.push({public_id: result.public_id, url: result.secure_url});
    }
    res.status(201).json(reqFiles);
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
});
