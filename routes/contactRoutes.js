import express from "express";
import {
  deleteContact,
  getContact,
  setContact,
  updateContact,
} from "../controllers/contactControllers.js";
const router = express.Router();

// Middleware
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getContact)
router.route('/').post(protect,admin,setContact)
router.route('/:id').put(protect,admin,updateContact)
router.route('/:id').delete(protect,admin,deleteContact)

export default router;
