import { useState, useEffect, CSSProperties } from "react";
import {
  GraduationCap,
  Users,
  Play,
  Zap,
  Target,
  BookOpen,
  Brain,
  BarChart3,
  Globe,
  Star,
  Award,
  Clock,
} from "lucide-react";

const OrbitalVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const innerOrbitItems = [
    { icon: Users, label: "Personalized", color: "sky", delay: "0s" },
    { icon: Play, label: "Interactive", color: "fuchsia", delay: "-10s" },
    { icon: Zap, label: "Analytics", color: "violet", delay: "-20s" },
  ];

  const outerOrbitItems = [
    { icon: Target, label: "Tests", color: "orange", delay: "0s" },
    { icon: BookOpen, label: "Courses", color: "emerald", delay: "-8s" },
    { icon: Brain, label: "AI", color: "rose", delay: "-16s" },
    { icon: BarChart3, label: "Reports", color: "cyan", delay: "-24s" },
    { icon: Globe, label: "Global", color: "indigo", delay: "-32s" },
  ];

  const stats = [
    { icon: Star, value: "10k+", label: "Active Students", color: "sky" },
    { icon: Award, value: "500+", label: "Live Courses", color: "fuchsia" },
    { icon: Clock, value: "98%", label: "Success Rate", color: "violet" },
  ];

  const floatingDots = [
    {
      size: "h-2 w-2",
      position: "top-1/4 left-1/4",
      gradient: "from-sky-400 to-fuchsia-500",
      animation: "animate-ping",
    },
    {
      size: "h-1 w-1",
      position: "bottom-1/3 right-1/4",
      gradient: "from-fuchsia-500 to-violet-500",
      animation: "animate-pulse",
    },
    {
      size: "h-1.5 w-1.5",
      position: "top-2/3 left-1/6",
      gradient: "from-violet-500 to-rose-500",
      animation: "animate-bounce",
    },
  ];

  return (
    <div
      className={`lg:flex-1 w-full max-w-2xl transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Main Container */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm shadow-2xl shadow-fuchsia-500/10 hover:shadow-fuchsia-500/20 transition-all duration-500">
        {/* Central Orbital System */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-fuchsia-500/5 to-violet-600/5 rounded-full blur-3xl animate-pulse"></div>

          {/* Center Logo */}
          <div className="relative z-10 flex flex-col items-center group">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-500 via-fuchsia-500 to-violet-600 shadow-2xl shadow-fuchsia-500/30 mb-4 group-hover:scale-110 transition-all duration-500 group-hover:shadow-fuchsia-500/50">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white via-white to-gray-300 bg-clip-text text-center text-6xl md:text-7xl font-black leading-none text-transparent group-hover:scale-105 transition-all duration-500">
              Tii
              <span className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-violet-600 bg-clip-text">
                ron
              </span>
            </h1>
            <p className="text-white/70 text-base mt-3 text-center font-medium">
              Learning Management System
            </p>
          </div>

          {/* Inner Orbit Circle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 size-full"
          >
            <circle
              className="stroke-white/20 stroke-[2]"
              cx="50%"
              cy="50%"
              r="130"
              fill="none"
              strokeDasharray="8,8"
              style={{
                animation: "dash 20s linear infinite",
              }}
            />
          </svg>

          {/* Inner Orbit Items */}
          {innerOrbitItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`absolute flex transform-gpu items-center justify-center rounded-3xl border border-white/30 bg-gradient-to-br from-${item.color}-500/20 to-transparent backdrop-blur-md size-[95px] shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-500 group`}
                style={{
                  animation: `orbit 30s linear infinite`,
                  transformOrigin: "50% 50%",
                  animationDelay: item.delay,
                } as any}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    className={`h-7 w-7 text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="text-[10px] text-white/90 font-bold tracking-wide">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Outer Orbit Circle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 size-full"
          >
            <circle
              className="stroke-white/15 stroke-[1.5]"
              cx="50%"
              cy="50%"
              r="210"
              fill="none"
              strokeDasharray="5,5"
              style={{
                animation: "dash 30s linear infinite reverse",
              }}
            />
          </svg>

          {/* Outer Orbit Items */}
          {outerOrbitItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`absolute flex transform-gpu items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-${item.color}-500/15 to-transparent backdrop-blur-sm size-[75px] hover:scale-125 hover:shadow-xl transition-all duration-500 group`}
                style={{
                  animation: `orbit-reverse 40s linear infinite`,
                  transformOrigin: "50% 50%",
                  animationDelay: item.delay,
                } as any}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon
                    className={`h-5 w-5 text-${item.color}-400 group-hover:scale-125 transition-transform duration-300`}
                  />
                  <span className="text-[9px] text-white/80 font-semibold">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Floating Dots */}
          {floatingDots.map((dot, index) => (
            <div
              key={index}
              className={`absolute ${dot.position} ${dot.size} rounded-full bg-gradient-to-r ${dot.gradient} ${dot.animation} opacity-60`}
            />
          ))}

          {/* Connecting Lines Animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 size-full opacity-20"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="35%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="3s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>

      </div>

      <style>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          0% {
            transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(var(--radius)) rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -80;
          }
        }
      `}</style>
    </div>
  );
};

export default OrbitalVisualization;
