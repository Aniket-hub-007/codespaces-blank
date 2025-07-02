import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import News from '../models/News.js';
import Comment from '../models/Comment.js';

export const addNews =  async (req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.news);
        const imageFile = req.file;

        // check all fields
        if(!title || !description || !category || !isPublished){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/news"
        })

        // optimize image through imaggekit url transfomation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {qualit: 'auto'},  // auto compression
                {format: 'webp'},  // convert to modern format
                {width: '1280'}   // width resizing
            ]
        });

        const image = optimizedImageUrl;

        await News.create({title, subTitle, description, category, image, isPublished})

        res.json({success:true, message : "News added successfully"})

    } catch (error) {
        res.json({success:false, message : error.message})

    }
}

export const getAllNews = async (req, res)=>{
    try {
        const news = await News.find({isPublished: true})
        res.json({success:true, news})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}

export const getNewsById = async(req, res) =>{
    try {
        const { newsId } = req.params;
        const news = await News.findById(newsId)
        if(!news){
            res.json({success:false, message :"News not found"});
        }
        res.json({success:true, news})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}

export const deleteNewsById = async(req, res) =>{
    try {
        const { id } = req.body;
        await News.findByIdAndDelete(id);

        //delete comment too
        await Comment.deleteMany({news: id});


        res.json({success:true, message:"News deleted successfully"})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}

export const togglePublish = async(req, res) =>{
    try {
        const { id } = req.body;
        const news = await News.findById(id);
        news.isPublished = !news.isPublished;
        await news.save();
        res.json({success:true, message:"News Status Updated"})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}

export const addComment = async (req, res) =>{
    try {
        const {news, name, content } = req.body;
        await Comment.create({news, name, content})
        res.json({success:true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success:false, message : error.message})        
    }
}

export const getNewsComment = async (req, res) =>{
    try {
        const {newsId } = req.body;
        const comments = await Comment.find({news: newsId, isApproved: true}).sort({createdAt: -1});
        res.json({success:true, message: comments})

    } catch (error) {
        res.json({success:false, message : error.message})                
    }
}