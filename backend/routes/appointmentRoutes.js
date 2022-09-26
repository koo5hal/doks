import express from 'express';
const router = express.Router();
import {
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  createAppointment,
  updateAppointment,
  createAppointmentReview,
  getTopAppointments,
} from '../controllers/appointmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getAppointments).post(protect, admin, createAppointment);
router.route('/:id/reviews').post(protect, createAppointmentReview);
router.get('/top', getTopAppointments);
router
  .route('/:id')
  .get(getAppointmentById)
  .delete(protect, admin, deleteAppointment)
  .put(protect, admin, updateAppointment);

export default router;
