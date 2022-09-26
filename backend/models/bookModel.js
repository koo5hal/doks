import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bookItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        appointment: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Appointment',
        },
      },
    ],
    patientInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      age: { type: Number, required: true },
      healthProblem: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    bookDate: {
      type: String,
      required: true,
    },
    followUpOneDate: {
      type: String,
    },
    followUpTwoDate: {
      type: String,
    },
    followUpThreeDate: {
      type: String,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isfollowUpOne: {
      type: Boolean,
      required: true,
      default: false,
    },
    isfollowUpTwo: {
      type: Boolean,
      required: true,
      default: false,
    },
    isfollowUpThree: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
