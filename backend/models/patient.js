import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
  {
    books: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    name: {
      type: String,
      required: true,
    },
    pHealth: {
      type: String,
    },
    pHealth2: {
      type: String,
    },
    pHealth3: {
      type: String,
    },

    docAdvice: {
      type: String,
    },
    docAdvice2: {
      type: String,
    },
    docAdvice3: {
      type: String,
    },

    prescription: {
      type: String,
    },

    prescription2: {
      type: String,
    },
    prescription3: {
      type: String,
    },

    nextDate: {
      type: String,
    },
    nextDate1: {
      type: String,
    },
    nextDate2: {
      type: String,
    },
    nextDate3: {
      type: String,
    },
    nextFollowUp: {
      type: String,
    },
    nextFollowUp2: {
      type: String,
    },
    nextFollowUp3: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
