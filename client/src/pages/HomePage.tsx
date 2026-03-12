import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
  Wind,
  Droplets,
  Thermometer,
  Globe,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import LoginButton from "../components/auth/LoginButton";
import LogoutButton from "../components/auth/LogoutButton";
import Logo from "../components/common/Logo";

const features = [
  {
    icon: Thermometer,
    title: "Real-Time Data",
    desc: "Live weather fetched from OpenWeatherMap every 5 minutes.",
    delay: "delay-200",
  },
  {
    icon: BarChart3,
    title: "Comfort Index",
    desc: "Custom algorithm scoring each city from 0–100.",
    delay: "delay-300",
  },
  {
    icon: ShieldCheck,
    title: "Auth0 Secured",
    desc: "MFA-enabled, invite-only access with JWT tokens.",
    delay: "delay-400",
  },
  {
    icon: RefreshCw,
    title: "Smart Caching",
    desc: "Server-side cache reduces API calls and latency.",
    delay: "delay-500",
  },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#060b14]">
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-18%] left-[-8%] w-[650px] h-[650px] rounded-full bg-[#0d3060] opacity-25 blur-[130px] animate-drift" />
        <div className="absolute bottom-[-12%] right-[-6%] w-[550px] h-[550px] rounded-full bg-[#092040] opacity-35 blur-[110px] animate-drift delay-400" />
        <div className="absolute top-[45%] left-[48%] w-[320px] h-[320px] rounded-full bg-[#154a7a] opacity-15 blur-[90px] animate-drift delay-700" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#4fc3f7 1px,transparent 1px),linear-gradient(90deg,#4fc3f7 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Floating weather icons */}
        <Wind
          size={22}
          className="absolute top-[18%] left-[8%]  text-[#4fc3f7]/12 animate-float delay-100"
        />
        <Droplets
          size={18}
          className="absolute top-[32%] right-[10%] text-[#4fc3f7]/10 animate-float delay-300"
        />
        <Thermometer
          size={20}
          className="absolute bottom-[22%] left-[14%] text-[#4fc3f7]/10 animate-float delay-500"
        />
        <Globe
          size={26}
          className="absolute bottom-[30%] right-[7%]  text-[#4fc3f7]/10 animate-float delay-700"
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 animate-fade-in">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#4fc3f7] border border-[#4fc3f7]/25 rounded-lg hover:bg-[#4fc3f7]/10 transition-all duration-200"
              >
                Dashboard <ArrowRight size={14} />
              </button>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {/* Live badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4fc3f7]/20 bg-[#4fc3f7]/5 text-[#4fc3f7] text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fc3f7] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4fc3f7]" />
          </span>
          Live Weather Intelligence
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Know Your</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4fc3f7] via-[#29b6f6] to-[#0288d1]">
            Comfort Zone
          </span>
        </h1>

        <p className="animate-fade-up delay-200 max-w-lg text-[#7a96b0] text-lg leading-relaxed mb-10">
          Real-time weather analytics with a custom Comfort Index. Compare
          cities, see rankings, and find the perfect climate.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-300">
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-[#7a96b0] text-sm">
                Welcome back,{" "}
                <span className="text-[#4fc3f7] font-semibold">
                  {user?.name || user?.email}
                </span>
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0288d1] to-[#4fc3f7] rounded-xl font-bold text-white text-base shadow-2xl shadow-[#0288d1]/30 hover:shadow-[#0288d1]/50 hover:scale-[1.03] transition-all duration-300"
              >
                View Dashboard
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <LoginButton variant="hero" />
              <span className="flex items-center gap-1.5 text-[#3d5568] text-sm">
                <ShieldCheck size={14} className="text-[#4fc3f7]/50" />
                Secure login via Auth0
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-400 mt-16 flex items-center gap-10 sm:gap-16">
          {[
            { icon: Globe, value: "10+", label: "Cities" },
            { icon: RefreshCw, value: "5 min", label: "Cache TTL" },
            { icon: BarChart3, value: "0–100", label: "Score Range" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center group">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Icon
                  size={14}
                  className="text-[#4fc3f7]/60 group-hover:text-[#4fc3f7] transition-colors"
                />
                <span className="text-2xl sm:text-3xl font-black text-[#4fc3f7]">
                  {value}
                </span>
              </div>
              <div className="text-[10px] text-[#3d5568] tracking-widest uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Feature cards ── */}
      <section className="relative z-10 px-6 md:px-10 pb-16 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, title, desc, delay }) => (
            <div
              key={title}
              className={`animate-fade-up ${delay} group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#4fc3f7]/20 p-4 transition-all duration-300 cursor-default`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/15 flex items-center justify-center mb-3 group-hover:bg-[#4fc3f7]/15 transition-colors duration-200">
                <Icon size={17} className="text-[#4fc3f7]" />
              </div>
              <div className="text-white text-sm font-bold mb-1">{title}</div>
              <div className="text-[#4a6070] text-xs leading-relaxed">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#060b14] to-transparent pointer-events-none" />
    </div>
  );
}
