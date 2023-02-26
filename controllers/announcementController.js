import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Announcement from '../models/announcementModel.js'


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

// @ desc Get announcements
// @route GET/api/announcements
// @acess Private

const getAnnouncement = asyncHandler( async (req,res) =>{
   try{
      const announcements = await Announcement.find()
      res.status(200)
      res.json(announcements)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get announcement by id
// @route GET/api/announcements/:id
// @acess Private

const getAnnouncementById = async (req,res) =>{
   const {id} = req.params
   const announcement = await Announcement.findById(id)
   if(!announcement){
      res.status(400)
      throw new Error('Announcement not found')
  }else{
   res.status(200).json(announcement)
}
}

// @ desc Set announcements
// @route POST/api/announcements
// @acess Private

const setAnnouncement = asyncHandler( async (req,res) =>{
   const { title} = req.body
   if(!title){
      res.status(400)
      res.json(`Please provide title and image`)
  }
  else{
      const newAnnouncement = await Announcement.create({
          title : req.body.title,
          image :req.file.path
      })
    res.status(200).json(newAnnouncement)
  }
})


// @ desc Update announcement
// @route PUT/api/announcements/:id
// @acess Private

const updateAnnouncement = asyncHandler(async (req,res) =>{ 

   const updatedAnnouncement = await Announcement.findById(req.params.id)
   if(!updatedAnnouncement){
       res.status(400)
       res.json(`Couldn't find Announcement`)
   }
   else{
       updatedAnnouncement.title = req.body.title,
       updatedAnnouncement.image = req.file.path
       updatedAnnouncement.save()
       res.status(200).json(updatedAnnouncement)
   }
   })


// @ desc Delete announcements
// @route Delete/api/announcements/:id
// @acess Private

const deleteAnnouncement = asyncHandler(async (req,res) =>{
   const deletedAnnouncement = await Announcement.findById(req.params.id)
   if(!deletedAnnouncement){
       res.status(400)
       res.json(`Couldn't find Announcement`)
   }
   else{
       await deletedAnnouncement.remove();
       res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getAnnouncement, setAnnouncement, updateAnnouncement, deleteAnnouncement,getAnnouncementById,upload }