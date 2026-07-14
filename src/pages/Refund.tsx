import React from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  CreditCard,
  BookOpen,
  AlertCircle,
  Mail,
  Globe,
  Building2,
  RotateCcw,
} from "lucide-react";

const RefundPolicy: React.FC = () => {
  const sections = [
    { icon: FileText, title: "Introduction", number: "1" },
    { icon: CheckCircle2, title: "Refund Eligibility", number: "2" },
    { icon: XCircle, title: "Non-Refundable Situations", number: "3" },
    { icon: BookOpen, title: "Course Access & Digital Content", number: "4" },
    { icon: RotateCcw, title: "Subscription Cancellation", number: "5" },
    { icon: Mail, title: "Refund Request Process", number: "6" },
    { icon: CreditCard, title: "Refund Processing", number: "7" },
    { icon: Globe, title: "Service Availability", number: "8" },
    { icon: AlertCircle, title: "No Guarantee of Educational Outcomes", number: "9" },
    { icon: FileText, title: "Changes to this Policy", number: "10" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">
              Refund Policy
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
                <h2 className="text-2xl font-bold mb-4">
                  1. Introduction
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    This Refund Policy explains the terms under which
                    refunds may be considered for online courses,
                    certifications, subscriptions, mentorship programs,
                    workshops, assessments, and educational services
                    provided through Tiiron AI Powered LMS.
                  </p>

                  <p>
                    By purchasing any service on the platform, you
                    acknowledge and agree to this Refund Policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  2. Refund Eligibility
                </h2>

                <p className="text-slate-700 leading-8 mb-4">
                  Refund requests may be considered only when submitted
                  within seven (7) calendar days of purchase and before
                  substantial use of course content.
                </p>

                <ul className="space-y-2 text-slate-700">
                  <li>• Course content has not been substantially consumed.</li>
                  <li>• No completion certificate has been issued.</li>
                  <li>• No mentoring sessions have been attended.</li>
                  <li>• Downloadable resources have not been extensively used.</li>
                  <li>• The request complies with this policy.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-500 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  3. Non-Refundable Situations
                </h2>

                <ul className="space-y-3 text-slate-700">
                  <li>• Change of mind after purchase.</li>
                  <li>• Partial or complete course completion.</li>
                  <li>• Downloaded learning materials.</li>
                  <li>• Completed quizzes or assessments.</li>
                  <li>• Issued certificates.</li>
                  <li>• Attendance in workshops or mentoring sessions.</li>
                  <li>• Violation of platform Terms & Conditions.</li>
                  <li>• Subscription periods already consumed.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  4. Course Access & Digital Content
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Educational content is delivered digitally and may
                    become accessible immediately after successful
                    payment.
                  </p>

                  <p>
                    Once course materials have been accessed,
                    downloaded, streamed, or substantially consumed,
                    refund eligibility may be reduced or denied.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <div className="flex items-start gap-4">
              <RotateCcw className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  5. Subscription Cancellation
                </h2>

                <p className="text-slate-700 leading-8">
                  Users may choose not to renew subscriptions at the end
                  of an active billing cycle. Cancellation prevents
                  future charges but does not automatically qualify for
                  refunds of already consumed subscription periods.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  6. Refund Request Process
                </h2>

                <p className="text-slate-700 leading-8 mb-4">
                  Refund requests must be submitted via email and should
                  include:
                </p>

                <ul className="space-y-2 text-slate-700">
                  <li>• Full Name</li>
                  <li>• Registered Email Address</li>
                  <li>• Course or Subscription Name</li>
                  <li>• Invoice or Transaction ID</li>
                  <li>• Date of Purchase</li>
                  <li>• Reason for Refund Request</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  7. Refund Processing
                </h2>

                <p className="text-slate-700 leading-8">
                  Approved refunds will be processed through the
                  original payment method. Processing times vary
                  depending on banking institutions and payment
                  providers and may take several business days.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  8. Service Availability
                </h2>

                <p className="text-slate-700 leading-8">
                  Temporary interruptions caused by maintenance,
                  upgrades, network issues, force majeure events, or
                  third-party service outages do not automatically
                  qualify for refunds.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  9. No Guarantee of Educational Outcomes
                </h2>

                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Tiiron AI Powered LMS provides educational content,
                    guidance, and AI-assisted learning tools.
                  </p>

                  <p>
                    We do not guarantee employment, internships,
                    promotions, salary increases, examination success,
                    certifications, admissions, or career advancement.
                  </p>

                  <p>
                    Refunds will not be granted solely because expected
                    educational or career outcomes were not achieved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />

              <div>
                <h2 className="text-2xl font-bold mb-4">
                  10. Changes to this Policy
                </h2>

                <p className="text-slate-700 leading-8">
                  Tiiron Technologies Pvt. Ltd. reserves the right to
                  modify this Refund Policy at any time. Updated
                  versions will be published on the platform with a
                  revised effective date.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="section-11">
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
                      className="text-black-600 text-sm font-medium "
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
                      href="https://www.tiiron.com"
                      className="text-black-600 text-sm font-medium "
                    >
                      https://www.tiiron.com
                    </a>
                  </div>

                  <div className="p-5 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Company</span>
                    </div>
                      <a 
                    href="https://tiirontechnologies.com/"
                    target="_blank"
                    className="text-sm font-medium hover:text-blue-600">
                      Tiiron Technologies Pvt. Ltd.
                    </a>
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

export default RefundPolicy;