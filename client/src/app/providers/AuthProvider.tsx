import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
        audience,
        scope: "openid profile email read:weather",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
