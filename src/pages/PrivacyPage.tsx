import React from "react";
import {
  Shield,
  Lock,
  Globe,
  Mail,
  Building2,
  FileText,
  Database,
  Brain,
  CheckCircle2,
  AlertCircle,
  Server,
  Eye,
} from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const sections = [
    { icon: FileText, title: "Introduction", number: "1" },
    { icon: Database, title: "Information We Collect", number: "2" },
    { icon: Eye, title: "How We Use Information", number: "3" },
    { icon: Brain, title: "AI-Powered Features", number: "4" },
    { icon: Globe, title: "Cookies & Tracking Technologies", number: "5" },
    { icon: Shield, title: "Data Sharing & Disclosure", number: "6" },
    { icon: Lock, title: "Data Security", number: "7" },
    { icon: Server, title: "Data Retention", number: "8" },
    { icon: CheckCircle2, title: "Your Rights", number: "9" },
    { icon: Shield, title: "Children's Privacy", number: "10" },
    { icon: Globe, title: "Third-Party Services", number: "11" },
    { icon: FileText, title: "Changes to this Policy", number: "12" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <h1 className="text-4xl font-bold text-slate-900">
              Privacy Policy
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Last Updated: June 19, 2026
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-700 font-semibold mb-4">
            Quick Navigation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => (
              <a
                key={section.number}
                href={`#section-${section.number}`}
                className="text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors"
              >
                {section.number}. {section.title}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section id="section-1">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Welcome to Tiiron AI Powered LMS, operated by Tiiron
                    Technologies Pvt. Ltd.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, store,
                    process, and protect your personal information when you use
                    our learning platform, courses, certifications,
                    assessments, AI-powered tools, and related educational
                    services.
                  </p>
                  <p>
                    By using our platform, you agree to the practices described
                    in this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <div className="flex items-start gap-4">
              <Database className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Information We Collect
                </h2>

                <ul className="space-y-3 text-slate-700">
                  <li>• Full Name</li>
                  <li>• Email Address</li>
                  <li>• Phone Number</li>
                  <li>• Profile Information</li>
                  <li>• Educational Information</li>
                  <li>• Course Enrollment Records</li>
                  <li>• Quiz & Assessment Results</li>
                  <li>• Assignment Submissions</li>
                  <li>• Learning Progress Data</li>
                  <li>• Device & Browser Information</li>
                  <li>• IP Address</li>
                  <li>• Payment Transaction Records</li>
                  <li>• AI Interaction Data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. How We Use Information
                </h2>

                <ul className="space-y-3 text-slate-700">
                  <li>• Provide educational services</li>
                  <li>• Manage learner accounts</li>
                  <li>• Process enrollments and subscriptions</li>
                  <li>• Generate certificates</li>
                  <li>• Improve learning experiences</li>
                  <li>• Personalize content recommendations</li>
                  <li>• Provide AI-powered assistance</li>
                  <li>• Maintain platform security</li>
                  <li>• Detect fraud and abuse</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. AI-Powered Features
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Tiiron AI Powered LMS may use Artificial Intelligence to
                    provide personalized recommendations, learning analytics,
                    study assistance, performance insights, and educational
                    support.
                  </p>

                  <p>
                    AI-generated content is provided for educational purposes
                    only and may occasionally contain inaccuracies or
                    incomplete information.
                  </p>

                  <p>
                    Users should independently verify important academic,
                    legal, financial, or professional information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Cookies & Tracking Technologies
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    We use cookies and similar technologies to maintain user
                    sessions, remember preferences, improve platform
                    functionality, and analyze usage patterns.
                  </p>

                  <p>
                    Users may disable cookies through browser settings, though
                    certain platform features may not function properly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Data Sharing & Disclosure
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    We do not sell personal information to third parties.
                  </p>

                  <p>
                    Information may be shared with payment processors, cloud
                    hosting providers, analytics services, email delivery
                    providers, customer support tools, and legal authorities
                    where required by law.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  7. Data Security
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    We implement reasonable technical and organizational
                    measures to protect user data.
                  </p>

                  <p>
                    Security measures include encrypted communications,
                    authentication controls, secure servers, monitoring systems,
                    and periodic security reviews.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <div className="flex items-start gap-4">
              <Server className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  8. Data Retention
                </h2>

                <p className="text-slate-700 leading-8">
                  We retain information for as long as necessary to provide
                  educational services, maintain academic records, issue
                  certificates, comply with legal obligations, and resolve
                  disputes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  9. Your Rights
                </h2>

                <ul className="space-y-3 text-slate-700">
                  <li>• Access personal information</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request deletion of information</li>
                  <li>• Withdraw consent where applicable</li>
                  <li>• Request information regarding stored data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  10. Children's Privacy
                </h2>

                <p className="text-slate-700 leading-8">
                  Our platform is not intended for children without parental
                  involvement where required by applicable law. Parents or
                  guardians may be required to provide consent for minors.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  11. Third-Party Services
                </h2>

                <p className="text-slate-700 leading-8">
                  The platform may integrate third-party services including
                  payment gateways, cloud providers, analytics tools, AI
                  infrastructure providers, and communication services. We are
                  not responsible for their independent privacy practices.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section id="section-12">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  12. Changes to this Policy
                </h2>

                <p className="text-slate-700 leading-8">
                  We may update this Privacy Policy periodically. Continued use
                  of the platform after updates constitutes acceptance of the
                  revised policy.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="section-13">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Email</span>
                    </div>
                    <a
                      href="mailto:contact@tiiron.com"
                      className="text-blue-600 text-sm"
                    >
                      contact@tiiron.com
                    </a>
                  </div>

                  <div className="p-5 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Website</span>
                    </div>
                    <a
                      href="https://tiiron.com"
                      className="text-blue-600 text-sm"
                    >
                      https://tiiron.com
                    </a>
                  </div>

                  <div className="p-5 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Company</span>
                    </div>
                    <p className="text-sm font-medium">
                      Tiiron Technologies Pvt. Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;