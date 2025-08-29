import { Lightbulb, Globe, CheckCircle, ArrowRight } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold text-red-500 mb-2">
            About Tiiron
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Our Mission & Vision
          </h2>
          <p className="mt-4 text-gray-600">
            We build thoughtful tools and experiences to help learners and
            creators achieve more — faster and with confidence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <article
            aria-labelledby="mission-title"
            className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  id="mission-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  Mission
                </h3>
                <p className="text-gray-600 mt-2">
                  To revolutionize learning by making it faster, easier, and
                  more engaging — empowering organizations to deliver
                  personalized training without complexity.
                </p>

                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>AI-driven personalization for every learner</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Simple authoring and effortless deployment</span>
                  </li>
                </ul>

                <a
                  href="/mission"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-sky-600 hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Vision Card */}
          <article
            aria-labelledby="vision-title"
            className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  id="vision-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  Vision
                </h3>
                <p className="text-gray-600 mt-2">
                  To be the world’s most intuitive and powerful learning
                  platform — where education meets automation and creativity,
                  enabling learners and businesses to thrive globally.
                </p>

                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Scalable learning for teams of any size</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Insights-driven outcomes and measurable growth</span>
                  </li>
                </ul>

                <a
                  href="/vision"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-pink-600 hover:underline"
                >
                  Explore our vision
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
