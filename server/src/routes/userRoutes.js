import {Router} from "express";
import {
  completionDays,
  addCompletionDay,
  fetchDetails,
  getStreak,
} from "../controllers/userControllers.js"

const router = Router();


router.route("/:id/completionDays").get(completionDays);
router.route("/:id/completionDays/add").post(addCompletionDay);
router.route("/:id/details").get(fetchDetails)
router.route("/:id/streak").get(getStreak)


export default router;
