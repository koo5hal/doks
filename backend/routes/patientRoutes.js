import express from 'express';
import {
  addPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatientProfile,
} from '../controllers/patientController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/all').get(protect, getAllPatients);
router.route('/addPatient').post(protect, admin, addPatient);
router
  .route('/:id')
  .get(protect, getPatientById)
  .delete(protect, admin, deletePatient)
  .put(protect, updatePatientProfile);

export default router;
