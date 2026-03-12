import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7a96b0] border border-white/[0.08] rounded-lg hover:text-white hover:border-white/20 hover:bg-white/[0.05] active:scale-[0.98] transition-all duration-200"
    >
      <LogOut size={14} />
      Log Out
    </button>
  );
}
