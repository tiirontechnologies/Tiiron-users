import ProblemSolution from "@components/Home/product/ProblemSolution";
import { motion } from "framer-motion";

const features = [
  {
    title: "Seamless Learning",
    desc: "Easy to use interface with zero learning curve. Just learning, no hassle.",
    icon: "📚",
  },
  {
    title: "Automation",
    desc: "Automate repetitive tasks and focus on creating impactful learning experiences.",
    icon: "⚡",
  },
  {
    title: "Customization",
    desc: "Personalize learning journeys with your branding, integrations, and unique needs.",
    icon: "🎨",
  },
  {
    title: "AI-Powered",
    desc: "Build courses in minutes with Tiiron Agent. No AI knowledge required.",
    icon: "🤖",
  },
];

const Features = () => {
  return (
    <>
      <ProblemSolution />
      <section className="py-20 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Key Features of <span className="text-indigo-600">Tiiron</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how Tiiron simplifies and supercharges your learning
              journey with smart, flexible, and modern tools.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>

                {/* Accent underline */}
                <div className="absolute left-8 bottom-6 w-12 h-1 bg-indigo-500 rounded-full group-hover:w-20 transition-all"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
