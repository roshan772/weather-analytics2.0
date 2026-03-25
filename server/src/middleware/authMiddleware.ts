import { auth } from "express-oauth2-jwt-bearer";
import { env } from "../config/env";
//validate JWT tokens 
export const checkJwt = auth({
  audience: env.auth0Audience,
  issuerBaseURL: `https://${env.auth0Domain}/`,
});
