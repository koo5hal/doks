import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentModel.js";

// @desc    Fetch all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Appointment.countDocuments({ ...keyword });
  const appointments = await Appointment.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ appointments, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single appointment
// @route   GET /api/appointments/:id
// @access  Public
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Delete a appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await appointment.remove();
    res.json({ message: "Appointment removed" });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Create a appointment
// @route   POST /api/appointments
// @access  Private/Admin
const createAppointment = asyncHandler(async (req, res) => {
  const appointment = new Appointment({
    name: "Sample name",
    qualification: "e.g MBBS",
    specialityOne: "Speciality",
    specialityTwo: "",
    specialityThree: "",
    price: 100,
    user: req.user._id,
    image: "/images/sample.jpg",
    clinic: "Enter Name and Address of your Clinic",
    region: "Sample region",
    numReviews: 0,
    description: "Sample description",
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

// @desc    Update a appointment
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
  const {
    name,
    qualification,
    specialityOne,
    specialityTwo,
    specialityThree,
    price,
    description,
    image,
    clinic,
    region,
  } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    appointment.name = name;
    appointment.qualification = qualification;
    appointment.specialityOne = specialityOne;
    appointment.specialityTwo = specialityTwo;
    appointment.specialityThree = specialityThree;
    appointment.price = price;
    appointment.description = description;
    appointment.image = image;
    appointment.clinic = clinic;
    appointment.region = region;

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Create new review
// @route   POST /api/appointments/:id/reviews
// @access  Private
const createAppointmentReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    const alreadyReviewed = appointment.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    appointment.reviews.push(review);

    appointment.numReviews = appointment.reviews.length;

    appointment.rating =
      appointment.reviews.reduce((acc, item) => item.rating + acc, 0) /
      appointment.reviews.length;

    await appointment.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Get top rated appointments
// @route   GET /api/appointments/top
// @access  Public
const getTopAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).sort({ rating: -1 }).limit(3);

  res.json(appointments);
});

export {
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  createAppointment,
  updateAppointment,
  createAppointmentReview,
  getTopAppointments,
};
