import { request } from "express";
import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type:String,
            required: true,
        },
        auther: {
            type:String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },{
        timestamps:true,
    }
);


export const Book = mongoose.model('Kitten', bookSchema);