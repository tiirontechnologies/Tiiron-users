import { motion } from "framer-motion";
import PricingHighlights from "@components/Home/price/PricingHighlights";

const plans = [
  {
    name: "Basic",
    price: "₹9",
    period: "/month",
    features: ["✔ Essential features", "✔ Email support", "✔ 5 projects"],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹29",
    period: "/month",
    features: [
      "✔ All Basic features",
      "✔ Priority support",
      "✔ Unlimited projects",
    ],
    button: "Choose Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "✔ Tailored solutions",
      "✔ Dedicated support",
      "✔ SLA guarantees",
    ],
    button: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <>
      <PricingHighlights />
      <main className="px-6 py-16 text-center bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Our Pricing Plans
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Choose the plan that fits your needs. Upgrade or cancel anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`rounded-2xl p-8 shadow-sm hover:shadow-xl transition transform hover:-translate-y-2 ${
                plan.highlight
                  ? "border-2 border-blue-600 bg-white shadow-md"
                  : "border bg-white"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6 text-gray-900">
                {plan.price}
                <span className="text-base font-medium text-gray-600">
                  {plan.period}
                </span>
              </p>
              <ul className="text-gray-700 mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Pricing;
