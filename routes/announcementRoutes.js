import express  from 'express';
const router = express.Router();
import {getAnnouncement,setAnnouncement,updateAnnouncement,deleteAnnouncement,upload, getAnnouncementById} from '../controllers/announcementController.js';

// Middleware
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getAnnouncement)
router.route('/:id').get(getAnnouncementById)
router.route('/').post(protect,admin,upload.single("image"),setAnnouncement)
router.route('/:id').put(protect,admin,upload.single("image"),updateAnnouncement)
router.route('/:id').delete(protect,admin,deleteAnnouncement)

export default router