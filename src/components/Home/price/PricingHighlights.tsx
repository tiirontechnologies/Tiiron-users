import { motion } from "framer-motion";

const highlights = [
  {
    icon: "💡",
    title: "Most Popular",
    description:
      "Perfect balance of features and pricing for freelancers and small teams.",
    plan: "Pro",
    gradient: "from-pink-200 via-rose-100 to-pink-200",
    hoverGradient: "from-pink-500 via-rose-400 to-pink-600",
    accent: "pink",
  },
  {
    icon: "⚡",
    title: "Fast Setup",
    description:
      "Launch instantly with zero hassle. Get productive in seconds.",
    plan: "Basic",
    gradient: "from-sky-200 via-cyan-100 to-sky-200",
    hoverGradient: "from-sky-500 via-cyan-400 to-sky-600",
    accent: "sky",
  },
  {
    icon: "🛡️",
    title: "Enterprise Ready",
    description:
      "Advanced scalability, dedicated support, and security compliance.",
    plan: "Enterprise",
    gradient: "from-purple-200 via-indigo-100 to-purple-200",
    hoverGradient: "from-purple-500 via-indigo-400 to-purple-700",
    accent: "purple",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  }),
};

const PricingHighlights = () => {
  return (
    <section className="relative px-6 py-24 bg-slate-950 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-sky-500 to-purple-600">
            Our Plans?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          Whether you’re a solo creator, a growing startup, or a global
          enterprise, our plans are designed to scale with your journey.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${h.gradient} shadow-lg border border-gray-200/60 backdrop-blur-sm transition-all duration-500 group cursor-pointer hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:${h.hoverGradient}`}
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${h.hoverGradient} text-4xl shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
              >
                {h.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
                {h.title}
              </h3>

              {/* Description */}
              <p className="text-gray-100 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-300">
                {h.description}
              </p>

              {/* Plan Tag */}
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full bg-${h.accent}-200 text-${h.accent}-800 font-semibold tracking-wide group-hover:bg-${h.accent}-600 group-hover:text-white transition-all duration-300`}
              >
                {h.plan} Plan
              </span>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition duration-500 bg-sky-100 mix-blend-overlay blur-xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingHighlights;
