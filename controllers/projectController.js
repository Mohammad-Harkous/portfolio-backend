import multer from 'multer';
import Project from '../models/projectModel.js';
import mongoose from 'mongoose';



// for uploading images using multer
// storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


const upload = multer({
  storage:Storage,
  limit: {
    // 6 MB upload size of image
    fileSize: 1024 * 1024 * 6
  },
})


// get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1});

  res.status(200).json(projects);

}

// get an project by id
const getPorjectById = async (req, res) => {
  
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'could not find a project, invalid id'});
  }

  const project = await Project.findById(id);

  if(!project){
   return res.status(404).json({error: 'could not find a project'});
  }

  res.status(200).json(project);
  
 
}



// creating new project

const createProject = async (req, res) => {
  if(!req.body){
    res.status(400)
    throw new Error(`Please provide title and image`);
}
else{
    const newProject = await Project.create({
        title : req.body.title,
        description:req.body.description,
        image :req.file.destination + "/" + req.file.originalname,
    })

  res.status(200).json(newProject);
}
}


// update an project by _id
const updateProject = async (req, res) => {
  const { id } = req.params;
 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'could not find a project, invalid id'});
  }

  const project = await Project.findByIdAndUpdate({_id: id}, {
    title: req.body.title,
    description:req.body.description,
    image: req.file.destination + "/" + req.file.originalname
  })
  if(!project){
    return res.status(404).json({error: 'could not find a project'});
   }
   
   res.status(200).json(project);

}


// delete an project by id
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'could not find a project, invalid id'});
  }

  const project = await Project.findByIdAndDelete({_id: id});
  if(!project){
    return res.status(404).json({error: 'could not find a project'});
   }

   res.status(200).json({message: 'Project successfully deleted'});
}

export {
 getProjects,
 getPorjectById,
 createProject,
 updateProject,
 deleteProject,
 upload
}
