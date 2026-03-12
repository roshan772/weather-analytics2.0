import { useAuth0 } from "@auth0/auth0-react";
import { LogIn, ArrowRight } from "lucide-react";

type Props = { variant?: "default" | "hero" };

export default function LoginButton({ variant = "default" }: Props) {
  const { loginWithRedirect } = useAuth0();

  if (variant === "hero") {
    return (
      <button
        onClick={() => loginWithRedirect()}
        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0288d1] to-[#4fc3f7] rounded-xl font-bold text-white text-base shadow-2xl shadow-[#0288d1]/30 hover:shadow-[#0288d1]/50 hover:scale-[1.03] active:scale-[0.99] transition-all duration-300"
      >
        <LogIn size={18} />
        Get Started
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </button>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#0288d1] to-[#4fc3f7] rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#0288d1]/20"
    >
      <LogIn size={14} />
      Log In
    </button>
  );
}
