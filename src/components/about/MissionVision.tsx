
import { Lightbulb, Globe, CheckCircle, ArrowRight } from "lucide-react";

const colorMap = {
  sky: {
    bg: "bg-sky-100",
    border: "border-sky-200",
    text: "text-sky-600",
    hoverBg: "hover:bg-sky-50",
    hoverBorder: "hover:border-sky-300",
  },
  purple: {
    bg: "bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-600",
    hoverBg: "hover:bg-purple-50",
    hoverBorder: "hover:border-purple-300",
  },
  green: {
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    text: "text-emerald-600",
    hoverBg: "hover:bg-emerald-50",
    hoverBorder: "hover:border-emerald-300",
  },
  pink: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    text: "text-pink-600",
    hoverBg: "hover:bg-pink-50",
    hoverBorder: "hover:border-pink-300",
  },
};

const MissionVision = () => {
  const cards = [
    {
      icon: Lightbulb,
      title: "Mission",
      desc: "To revolutionize learning by making it faster, easier, and more engaging — empowering organizations to deliver personalized training without complexity.",
      bullets: [
        "AI-driven personalization for every learner",
        "Simple authoring and effortless deployment",
      ],
      link: { label: "Learn more", href: " " },
      color: "sky",
    },
    {
      icon: Globe,
      title: "Vision",
      desc: "To be the world’s most intuitive and powerful learning platform — where education meets automation and creativity, enabling learners and businesses to thrive globally.",
      bullets: [
        "Scalable learning for teams of any size",
        "Insights-driven outcomes and measurable growth",
      ],
      link: { label: "Explore our vision", href: " " },
      color: "purple",
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 border-y border-gray-100">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p className="text-sm font-semibold text-amber-500 uppercase tracking-wide">
            About Tiiron
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">
              Mission
            </span>{" "}
            &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500">
              Vision
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We build thoughtful tools and experiences to help learners and
            creators achieve more — faster and with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const colors = colorMap[card.color as keyof typeof colorMap];

            return (
              <div
                key={i}
                className={`p-8 rounded-2xl ${colors.hoverBg} ${colors.hoverBorder} bg-white border ${colors.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`${colors.bg} ${colors.border} p-3 rounded-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className={`${colors.text} w-6 h-6`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    <ul className="space-y-2">
                      {card.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-gray-700 text-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                      <a
                      href={card.link.href}
                      className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-sky-600 hover:underline"
                    >
                      {card.link.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;