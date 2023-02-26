import express  from 'express';
const router = express.Router();
import { getAbout, setAbout, updateAbout, deleteAbout,getAboutById,upload} from '../controllers/aboutController.js';


// Middleware
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getAbout)
router.route('/:id').get(getAboutById)
router.route('/').post(protect,admin,upload.single("image"),setAbout)
router.route('/:id').put(protect,admin,upload.single("image"),updateAbout)
router.route('/:id').delete(protect,admin,deleteAbout)

export default router;
