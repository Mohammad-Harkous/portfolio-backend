import express from 'express';
const router = express.Router();
import { 
getProjects,
 getPorjectById,
 createProject,
 updateProject,
 deleteProject,
 upload
} from '../controllers/projectController.js';

// Middleware
import {protect,admin} from '../middleware/authMiddleware.js'

router.get('/', getProjects);


router.get('/:id', getPorjectById);

router.post('/',protect,admin,upload.single("image"),createProject);

router.patch('/:id',protect,admin,upload.single("image"),updateProject);

router.delete('/:id', protect,admin,deleteProject);




export default router;