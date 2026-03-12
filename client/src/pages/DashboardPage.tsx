import { useWeather } from "../features/weather/weatherHooks";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Trophy,
  Globe,
  Smile,
  Thermometer,
  Droplets,
  Wind,
  AlertCircle,
} from "lucide-react";
import LogoutButton from "../components/auth/LogoutButton";
import WeatherCard from "../components/weather/WeatherCard";
import WeatherSkeleton from "../components/weather/WeatherSkeleton";
import Logo from "../components/common/Logo";

export default function DashboardPage() {
  const { weather, loading, error } = useWeather();
  const { user } = useAuth0();
  const topCity = weather[0];

  return (
    <div className="relative min-h-screen bg-[#060b14] overflow-x-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-12%] w-[700px] h-[420px] rounded-full bg-[#0c2d52] opacity-20 blur-[130px] animate-drift" />
        <div className="absolute top-[35%] right-[-8%] w-[520px] h-[520px] rounded-full bg-[#082035] opacity-25 blur-[100px] animate-drift delay-500" />
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(#4fc3f7 1px,transparent 1px),linear-gradient(90deg,#4fc3f7 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/[0.05] backdrop-blur-sm animate-fade-in">
        <Logo size="sm" />

        <div className="flex items-center gap-4">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#4a6070]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </div>

          {/* User chip */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#0288d1] flex items-center justify-center text-[10px] font-black text-white">
                {(user.name || user.email || "U")[0].toUpperCase()}
              </div>
              <span className="text-sm text-[#8ba0b8] max-w-[130px] truncate">
                {user.name || user.email}
              </span>
            </div>
          )}
          <LogoutButton />
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-10 px-6 md:px-10 py-8 max-w-7xl mx-auto">
        {/* Page title */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-1">
            Weather <span className="text-[#4fc3f7]">Dashboard</span>
          </h1>
          <p className="text-[#4a6070] text-sm flex items-center gap-1.5">
            <Thermometer size={13} className="text-[#4fc3f7]/60" />
            Cities ranked by Comfort Index · refreshed every 5 min
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-up">
            <AlertCircle size={18} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {/* ── Top city banner ── */}
        {!loading && !error && topCity && (
          <div className="mb-8 relative overflow-hidden rounded-2xl border border-[#4fc3f7]/15 bg-gradient-to-br from-[#0d2d52]/80 to-[#091a30]/90 backdrop-blur-sm p-6 md:p-8 animate-fade-up delay-100">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#4fc3f7] opacity-[0.06] rounded-full blur-[70px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0288d1] opacity-[0.06] rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                {/* Trophy icon */}
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0 animate-float">
                  <Trophy size={22} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-1">
                    Most Comfortable City
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {topCity.city}
                  </h2>
                  <p className="text-[#7a96b0] capitalize text-sm mt-0.5">
                    {topCity.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-8">
                {/* Big score */}
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#4fc3f7] to-[#0288d1]">
                    {topCity.comfortScore}
                  </div>
                  <div className="text-[10px] text-[#3d5568] tracking-widest uppercase mt-1">
                    Comfort Score
                  </div>
                </div>

                <div className="hidden sm:block w-px h-16 bg-white/[0.08]" />

                {/* Mini stats */}
                <div className="hidden sm:flex flex-col gap-2 text-sm text-[#7a96b0]">
                  <div className="flex items-center gap-1.5">
                    <Thermometer size={13} className="text-[#4fc3f7]" />
                    {topCity.temperatureC}°C
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Droplets size={13} className="text-[#4fc3f7]" />
                    {topCity.humidity}%
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wind size={13} className="text-[#4fc3f7]" />
                    {topCity.windSpeed} m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Summary bar ── */}
        {!loading && !error && weather.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 animate-fade-up delay-200">
            {[
              { icon: Globe, label: "Cities", value: weather.length },
              {
                icon: Smile,
                label: "Avg Comfort",
                value: Math.round(
                  weather.reduce((s, w) => s + w.comfortScore, 0) /
                    weather.length,
                ),
              },
              {
                icon: Thermometer,
                label: "Avg Temp",
                value: `${(weather.reduce((s, w) => s + w.temperatureC, 0) / weather.length).toFixed(1)}°C`,
              },
              {
                icon: Droplets,
                label: "Avg Humidity",
                value: `${Math.round(weather.reduce((s, w) => s + w.humidity, 0) / weather.length)}%`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="group rounded-xl bg-white/[0.025] border border-white/[0.06] px-4 py-3 flex items-center gap-3 hover:bg-white/[0.05] hover:border-[#4fc3f7]/15 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-[#4fc3f7]/8 border border-[#4fc3f7]/10 flex items-center justify-center group-hover:bg-[#4fc3f7]/15 transition-colors duration-200 flex-shrink-0">
                  <Icon size={15} className="text-[#4fc3f7]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-none">
                    {value}
                  </div>
                  <div className="text-[#3d5568] text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <WeatherSkeleton key={i} />
              ))
            : weather.map((item, i) => (
                <div
                  key={item.cityId}
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.05 * i + 0.25}s` }}
                >
                  <WeatherCard item={item} />
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}
