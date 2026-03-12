import { auth } from "express-oauth2-jwt-bearer";
import { env } from "../config/env";

export const checkJwt = auth({
  audience: env.auth0Audience,
  issuerBaseURL: `https://${env.auth0Domain}/`,
});
