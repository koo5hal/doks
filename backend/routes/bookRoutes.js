import express from "express";

const router = express.Router();
import {
  addBookItems,
  getBookById,
  updateBookToPaid,
  updateBookToDelivered,
  updatefollowupOne,
  updatefollowupTwo,
  updatefollowupThree,
  updatefollowupFour,
  getMyBooks,
  getBooks,
} from "../controllers/bookController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addBookItems).get(protect, admin, getBooks);
router.route("/mybooks").get(protect, getMyBooks);
router.route("/:id").get(protect, getBookById);
router.route("/:id/pay").put(protect, updateBookToPaid);
router.route("/:id/deliver").put(protect, admin, updateBookToDelivered);
router.route("/:id/follow1").put(protect, admin, updatefollowupOne);
router.route("/:id/follow2").put(protect, admin, updatefollowupTwo);
router.route("/:id/follow3").put(protect, admin, updatefollowupThree);
router.route("/:id/follow4").put(protect, admin, updatefollowupFour);
export default router;
