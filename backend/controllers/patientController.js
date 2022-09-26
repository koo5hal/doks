import asyncHandler from 'express-async-handler';
import Patient from '../models/patient.js';

const addPatient = asyncHandler(async (req, res) => {
  const {
    name,
    pHealth,
    pHealth2,
    pHealth3,
    books,

    docAdvice,
    docAdvice2,
    docAdvice3,
    image,
    prescription,
    prescription2,
    prescription3,
    nextDate,
    nextDate1,
    nextDate2,
    nextDate3,
    nextFollowUp,
    nextFollowUp2,
    nextFollowUp3,
    status,
  } = req.body;

  const patientExist = await Patient.findOne({ name: name });

  const patient = await Patient.create({
    name,
    pHealth,
    pHealth2,
    pHealth3,
    books,

    docAdvice,
    docAdvice2,
    docAdvice3,
    image,
    prescription,
    prescription2,
    prescription3,
    nextDate,
    nextDate1,
    nextDate2,
    nextDate3,
    nextFollowUp,
    nextFollowUp2,
    nextFollowUp3,
    status,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      pHealth: patient.pHealth,
      pHealth2: patient.pHealth2,
      pHealth3: patient.pHealth3,
      image: patient.image,
      nextDate: patient.nextDate,
      nextDate1: patient.nextDate1,
      prescription: patient.prescription,
      nextFollowUp: patient.nextFollowUp,
      nextDate2: patient.nextDate2,
      prescription2: patient.prescription2,
      nextFollowUp2: patient.nextFollowUp2,
      nextDate3: patient.nextDate3,
      prescription3: patient.prescription3,
      nextFollowUp3: patient.nextFollowUp3,
      status: patient.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Patient data');
  }
});

const updatePatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.body._id);

  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.pHealth = req.body.pHealth || patient.pHealth;
    patient.pHealth2 = req.body.pHealth2 || patient.pHealth2;
    patient.pHealth3 = req.body.pHealth3 || patient.pHealth3;
    patient.docAdvice = req.body.docAdvice || patient.docAdvice;
    patient.docAdvice2 = req.body.docAdvice2 || patient.docAdvice2;
    patient.docAdvice3 = req.body.docAdvice3 || patient.docAdvice3;
    patient.image = req.body.image || patient.image;
    patient.prescription = req.body.prescription || patient.prescription;
    patient.prescription2 = req.body.prescription2 || patient.prescription2;
    patient.prescription3 = req.body.prescription3 || patient.prescription3;
    patient.nextDate = req.body.nextDate || patient.nextDate;
    patient.nextDate1 = req.body.nextDate1 || patient.nextDate1;
    patient.nextDate2 = req.body.nextDate2 || patient.nextDate2;
    patient.nextDate3 = req.body.nextDate3 || patient.nextDate3;
    patient.nextFollowUp = req.body.nextFollowUp || patient.nextFollowUp;
    patient.nextFollowUp2 = req.body.nextFollowUp2 || patient.nextFollowUp2;

    patient.nextFollowUp3 = req.body.nextFollowUp3 || patient.nextFollowUp3;
    patient.status = req.body.status || patient.status;
    const updatedPatient = await patient.save();

    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      pHealth: updatedPatient.pHealth,
      pHealth2: updatedPatient.pHealth2,
      pHealth3: updatedPatient.pHealth3,
      docAdvice: updatedPatient.docAdvice,
      docAdvice2: updatedPatient.docAdvice2,
      docAdvice3: updatedPatient.docAdvice3,
      image: updatedPatient.image,
      nextDate: updatedPatient.nextDate,
      nextDate2: updatedPatient.nextDate2,
      nextDate1: updatedPatient.nextDate1,
      nextDate3: updatedPatient.nextDate3,
      prescription: updatedPatient.prescription,
      prescription2: updatedPatient.prescription2,
      prescription3: updatedPatient.prescription3,
      nextFollowUp: updatedPatient.nextFollowUp,
      nextFollowUp2: updatedPatient.nextFollowUp2,
      nextFollowUp3: updatedPatient.nextFollowUp3,
      status: updatedPatient.status,
    });
  } else {
    res.status(404);
    throw new Error('Patient not found');
  }
});
const getAllPatients = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Patient.countDocuments({ ...keyword });
  const patients = await Patient.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (patients && patients.length != 0) {
    res.json({ patients, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error('No Patients Found');
  }
});

const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    await patient.remove();
    res.json({ message: 'Patient removed' });
  } else {
    res.status(404);
    throw new Error('Patient not found');
  }
});
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    'books  ',
    'bookDate totalPrice user email patientInfo isfollowUpThree  name isPaid paymentMethod'
  );
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error('Patients not found');
  }
});

const getPatientByRoomNo = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOne({
    date: Date().toString().substring(0, 15),
    prescription: { $in: [req.params.roomId] },
  });
  const patients = await Patient.find({ prescription: req.params.roomId });
  if (patients) {
    attendance
      ? res.json({ patients: patients, attendance: attendance })
      : res.json({ patients: patients });
  } else {
    res.status(404);
    throw new Error('Patients not found');
  }
});

export {
  addPatient,
  updatePatientProfile,
  getAllPatients,
  deletePatient,
  getPatientById,
  getPatientByRoomNo,
};
