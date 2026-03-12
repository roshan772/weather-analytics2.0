import { Router } from "express";
import { getCacheStatus } from "../controllers/cacheController";

const router = Router();

router.get("/", getCacheStatus);

export default router;
