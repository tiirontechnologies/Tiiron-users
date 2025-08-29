import { motion } from "framer-motion";

const highlights = [
  {
    icon: "💡",
    title: "Most Popular",
    description:
      "Perfect balance of features and pricing for freelancers and small teams.",
    plan: "Pro",
    gradient: "from-pink-500 via-rose-400 to-pink-600",
    accent: "pink",
  },
  {
    icon: "⚡",
    title: "Fast Setup",
    description:
      "Launch instantly with zero hassle. Get productive in seconds.",
    plan: "Basic",
    gradient: "from-sky-500 via-cyan-400 to-sky-600",
    accent: "sky",
  },
  {
    icon: "🛡️",
    title: "Enterprise Ready",
    description:
      "Advanced scalability, dedicated support, and security compliance.",
    plan: "Enterprise",
    gradient: "from-purple-500 via-indigo-400 to-purple-700",
    accent: "purple",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  }),
};

const PricingHighlights = () => {
  return (
    <section className="relative px-6 py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-sky-400 to-purple-400">
            Our Plans?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          Whether you’re a solo creator, a growing startup, or a global
          enterprise, our plans are designed to scale with your journey.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg transition-transform duration-300 group"
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${h.gradient} text-4xl shadow-lg group-hover:rotate-3 transition-transform`}
              >
                {h.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {h.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {h.description}
              </p>

              {/* Plan tag */}
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full bg-${h.accent}-500/20 text-${h.accent}-300 font-semibold tracking-wide`}
              >
                {h.plan} Plan
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingHighlights;
