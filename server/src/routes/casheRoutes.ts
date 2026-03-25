import { Router } from "express";
import { getCacheStatus } from "../controllers/cacheController";
//cash endpoint routing
const router = Router();

router.get("/", getCacheStatus);

export default router;
