import {Router} from "express";
import {
  completionDays,
  addCompletionDay,
  fetchDetails,
} from "../controllers/userControllers.js"

const router = Router();


router.route("/:id/completionDays").get(completionDays);
router.route("/:id/completionDays/add").post(addCompletionDay);
router.route("/:id/details").get(fetchDetails)


export default router;