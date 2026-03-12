import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  Cloud,
  CloudSnow,
  CloudLightning,
  Eye,
} from "lucide-react";

type WeatherItem = {
  cityId: number;
  city: string;
  temperatureC: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  comfortScore: number;
  rank: number;
};

/* ── helpers ── */
function scoreStyle(score: number) {
  if (score >= 75)
    return {
      text: "text-emerald-400",
      bar: "bg-emerald-400",
      label: "Excellent",
      shadow: "0 0 12px rgba(52,211,153,0.4)",
    };
  if (score >= 50)
    return {
      text: "text-[#4fc3f7]",
      bar: "bg-[#4fc3f7]",
      label: "Good",
      shadow: "0 0 12px rgba(79,195,247,0.4)",
    };
  if (score >= 25)
    return {
      text: "text-amber-400",
      bar: "bg-amber-400",
      label: "Fair",
      shadow: "0 0 12px rgba(251,191,36,0.4)",
    };
  return {
    text: "text-red-400",
    bar: "bg-red-400",
    label: "Poor",
    shadow: "0 0 12px rgba(248,113,113,0.4)",
  };
}

function rankBadge(rank: number) {
  if (rank === 1)
    return {
      label: "🥇 1st",
      cls: "bg-yellow-400/10 border-yellow-400/25 text-yellow-300",
    };
  if (rank === 2)
    return {
      label: "🥈 2nd",
      cls: "bg-slate-400/10  border-slate-400/25  text-slate-300",
    };
  if (rank === 3)
    return {
      label: "🥉 3rd",
      cls: "bg-orange-400/10 border-orange-400/25 text-orange-300",
    };
  return {
    label: `#${rank}`,
    cls: "bg-white/[0.04] border-white/[0.09]  text-[#6a85a0]",
  };
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition?.toLowerCase() ?? "";
  const cls = "w-9 h-9 drop-shadow";
  if (c.includes("clear") || c.includes("sun"))
    return <Sun className={`${cls} text-yellow-300`} strokeWidth={1.8} />;
  if (c.includes("snow"))
    return <CloudSnow className={`${cls} text-blue-200`} strokeWidth={1.8} />;
  if (c.includes("thunder") || c.includes("storm"))
    return (
      <CloudLightning className={`${cls} text-purple-300`} strokeWidth={1.8} />
    );
  if (c.includes("rain") || c.includes("drizzle"))
    return <CloudRain className={`${cls} text-[#4fc3f7]`} strokeWidth={1.8} />;
  if (c.includes("cloud"))
    return <Cloud className={`${cls} text-slate-300`} strokeWidth={1.8} />;
  return <Eye className={`${cls} text-[#4fc3f7]`} strokeWidth={1.8} />;
}

export default function WeatherCard({ item }: { item: WeatherItem }) {
  const s = scoreStyle(item.comfortScore);
  const r = rankBadge(item.rank);

  return (
    <div className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.065] hover:border-white/[0.13] hover:bg-white/[0.045] transition-all duration-300 overflow-hidden p-5 cursor-default">
      {/* Top shimmer line on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4fc3f7]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Corner glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fc3f7] opacity-0 group-hover:opacity-[0.04] rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 transition-opacity duration-400 pointer-events-none" />

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="animate-float"
            style={{ animationDelay: `${item.rank * 0.15}s` }}
          >
            <WeatherIcon condition={item.condition} />
          </div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight">
              {item.city}
            </h3>
            <p className="text-[#4a6070] text-xs capitalize mt-0.5">
              {item.description}
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold tracking-wide ${r.cls}`}
        >
          {r.label}
        </span>
      </div>

      {/* ── Comfort score bar ── */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#3d5568] tracking-widest uppercase font-medium">
            Comfort Index
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-black ${s.text}`}>
              {item.comfortScore}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${s.text} bg-white/[0.05]`}
            >
              {s.label}
            </span>
          </div>
        </div>
        {/* Track */}
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
          <div
            className={`h-full rounded-full ${s.bar} animate-fill-bar`}
            style={{
              width: `${item.comfortScore}%`,
              boxShadow: s.shadow,
            }}
          />
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { Icon: Thermometer, label: "Temp", value: `${item.temperatureC}°C` },
          { Icon: Droplets, label: "Humidity", value: `${item.humidity}%` },
          { Icon: Wind, label: "Wind", value: `${item.windSpeed} m/s` },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="group/stat rounded-xl bg-white/[0.025] border border-white/[0.055] hover:border-[#4fc3f7]/15 p-2.5 text-center transition-all duration-200"
          >
            <Icon
              size={14}
              className="text-[#4fc3f7]/60 group-hover/stat:text-[#4fc3f7] transition-colors mx-auto mb-1"
              strokeWidth={2}
            />
            <div className="text-white text-xs font-bold leading-none">
              {value}
            </div>
            <div className="text-[#3a5060] text-[10px] mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
