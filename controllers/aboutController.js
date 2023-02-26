import asyncHandler from "express-async-handler" 
import multer from 'multer'
import About from '../models/aboutModel.js'


// Storage
const Storage = multer.diskStorage({
   destination:'uploads',
   filename:(req, file,cb)=>{
       cb(null,file.originalname)
   },
})

const upload = multer({
   storage:Storage,  
})

// @ desc Get about
// @route GET/api/about
// @acess Private

const getAbout = asyncHandler( async (req,res) =>{
   try{
      const about = await About.find()
      res.status(200)
      res.json(about)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get about by id
// @route GET/api/about/:id
// @acess Private

const getAboutById = async (req,res) =>{
   const {id} = req.params
   const about = await About.findById(id)
   if(!about){
      res.status(400)
      res.json('About not found')
  }else{
   res.status(200).json(about)
}
}

// @ desc Set about
// @route POST/api/about
// @acess Private

const setAbout = asyncHandler( async (req,res) =>{
   const {title,text} = req.body
   if(!title || !text){
      res.status(400)
      res.json(`Please provide title,text,and image`)
  }
  else{
      const newAbout = await About.create({
          title : req.body.title,
          text : req.body.text,
          image :req.file.path
      })
    res.status(200).json(newAbout)
  }
})


// @ desc Update about
// @route PUT/api/about/:id
// @acess Private

const updateAbout = asyncHandler(async (req,res) =>{ 

   const updatedAbout = await About.findById(req.params.id)
   if(!updatedAbout){
       res.status(400)
       res.json(`Couldn't find About`)
   }
   else{
    const updated= await updatedAbout.updateOne({
         title : req.body.title,
         text : req.body.text,
         image : req.file && req.file.path,
      })

      return res.status(200).json(updatedAbout)
   }
   })


// @ desc Delete about
// @route Delete/api/about/:id
// @acess Private

const deleteAbout = asyncHandler(async (req,res) =>{
   const deletedAbout = await About.findById(req.params.id)
   if(!deletedAbout){
       res.status(400)
       res.json(`Couldn't find About`)
   }
   else{
       await deletedAbout.remove();
       res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getAbout, setAbout, updateAbout, deleteAbout,getAboutById,upload }