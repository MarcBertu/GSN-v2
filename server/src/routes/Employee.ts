import {Router} from "express";
import {getAll} from "../controllers/Employee";

const router = Router();

router.get("/all", getAll);

export default router;