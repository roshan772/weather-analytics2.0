import { Cloud } from "lucide-react";

type Props = {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { icon: "w-7 h-7", iconInner: 14, text: "text-base" },
  md: { icon: "w-9 h-9", iconInner: 18, text: "text-xl" },
  lg: { icon: "w-14 h-14", iconInner: 28, text: "text-3xl" },
};

export default function Logo({ size = "md" }: Props) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon mark */}
      <div
        className={`${s.icon} relative rounded-xl bg-gradient-to-br from-[#4fc3f7] to-[#0277bd] flex items-center justify-center shadow-lg shadow-[#4fc3f7]/25 animate-glow-pulse`}
      >
        {/* Inner ring */}
        <div className="absolute inset-0 rounded-xl border border-white/20" />
        <Cloud
          size={s.iconInner}
          className="text-white drop-shadow"
          strokeWidth={2.5}
        />
      </div>

      {/* Wordmark */}
      <span className={`${s.text} font-black tracking-tight leading-none`}>
        <span className="text-white">Atmos</span>
        <span className="text-[#4fc3f7]">IQ</span>
      </span>
    </div>
  );
}
