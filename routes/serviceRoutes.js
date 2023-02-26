import express  from 'express';
const router = express.Router();
import {getServices,setService,updateService,deleteService,getServicesById} from '../controllers/serviceController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getServices)
router.route('/:id').get(getServicesById)
router.route('/').post(protect,admin,setService)
router.route('/:id').put(protect,admin,updateService)
router.route('/:id').delete(protect,admin,deleteService)

export default router