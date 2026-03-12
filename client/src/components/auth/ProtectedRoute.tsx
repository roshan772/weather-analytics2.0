import { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Cloud } from "lucide-react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060b14] flex flex-col items-center justify-center gap-6 animate-fade-in">
        {/* Logo mark */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[#4fc3f7]/15" />
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#4fc3f7]/60 animate-spin-slow" />
          {/* Counter-spin inner ring */}
          <div className="absolute inset-2 rounded-full border-b-2 border-[#0288d1]/40 animate-spin-reverse" />
          {/* Icon */}
          <Cloud
            size={22}
            className="text-[#4fc3f7] relative z-10"
            strokeWidth={2}
          />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <span className="text-white font-bold text-sm">AtmosIQ</span>
          <span className="text-[#3d5568] text-xs tracking-widest uppercase animate-pulse">
            Authenticating…
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return (
      <div className="min-h-screen bg-[#060b14] flex flex-col items-center justify-center gap-4 animate-fade-in">
        <div className="w-10 h-10 rounded-full border-t-2 border-[#4fc3f7] animate-spin-slow" />
        <p className="text-[#3d5568] text-sm">Redirecting to login…</p>
      </div>
    );
  }

  return <>{children}</>;
}
