import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

// @desc    Create new book
// @route   POST /api/books
// @access  Private
const addBookItems = asyncHandler(async (req, res) => {
  const {
    bookItems,
    patientInfo,
    paymentMethod,
    itemsPrice,
    bookDate,
    followUpOneDate,
    followUpTwoDate,
    followUpThreeDate,
    totalPrice,
  } = req.body;

  if (bookItems && bookItems.length === 0) {
    res.status(400);
    throw new Error("No book items");
    return;
  } else {
    const book = new Book({
      bookItems,
      user: req.user._id,
      patientInfo,
      paymentMethod,
      itemsPrice,
      bookDate,
      followUpOneDate,
      followUpTwoDate,
      followUpThreeDate,
      totalPrice,
    });

    const createdBook = await book.save();

    res.status(201).json(createdBook);
  }
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Private
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Update book to paid
// @route   GET /api/books/:id/pay
// @access  Private
const updateBookToPaid = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isPaid = true;
    book.paidAt = Date.now();
    book.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Update book to delivered
// @route   GET /api/books/:id/deliver
// @access  Private/Admin
const updateBookToDelivered = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isDelivered = true;

    book.deliveredAt = Date.now();

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Update book to delivered
// @route   GET /api/books/:id/deliver
// @access  Private/Admin
const updatefollowupOne = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isfollowUpOne = true;

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

const updatefollowupTwo = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isfollowUpTwo = true;

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});
const updatefollowupThree = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isfollowUpThree = true;

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});
const updatefollowupFour = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    book.isDelivered = false;
    book.isfollowUpOne = false;
    book.isfollowUpTwo = false;
    book.isfollowUpThree = false;

    const updatedBook = await book.save();

    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Get logged in user books
// @route   GET /api/books/mybooks
// @access  Private
const getMyBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user._id });
  res.json(books);
});

// @desc    Get all books
// @route   GET /api/books
// @access  Private/Admin
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).populate("user", "id name");
  res.json(books);
});

const updateBookProfile = asyncHandler(async (req, res) => {
  const book = await User.findById(req.body._id);

  if (book) {
    book.bookDate = req.body.name || book.bookDate;
    book.paymentMethod = req.body.paymentMethod || book.paymentMethod;

    const updatedBook = await book.save();

    res.json({
      _id: updatedBook._id,
      bookDate: updatedBook.bookDate,
      paymentMethod: updatedBook.paymentMethod,

      token: generateToken(updatedBook._id),
    });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

export {
  addBookItems,
  getBookById,
  updateBookToPaid,
  updateBookToDelivered,
  getMyBooks,
  getBooks,
  updateBookProfile,
  updatefollowupOne,
  updatefollowupTwo,
  updatefollowupThree,
  updatefollowupFour,
};
