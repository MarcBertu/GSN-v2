import { Router } from "express";
import { getAll } from "../controllers/Client";

const router = Router();

router.get("/all", getAll);

export default router;
