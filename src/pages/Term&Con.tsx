

import React from "react";
import {
  Shield,
  Lock,
  CreditCard,
  BookOpen,
  Award,
  AlertCircle,
  Mail,
  Globe,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const TermsAndConditions: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: "Introduction",
      number: "1",
    },
    {
      icon: BookOpen,
      title: "Definitions",
      number: "2",
    },
    {
      icon: Lock,
      title: "Account Registration",
      number: "3",
    },
    {
      icon: BookOpen,
      title: "Course Enrollment & Access",
      number: "4",
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      number: "5",
    },
    {
      icon: AlertCircle,
      title: "Refund Policy",
      number: "6",
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      number: "7",
    },
    {
      icon: Award,
      title: "Intellectual Property Rights",
      number: "8",
    },
    {
      icon: Award,
      title: "Certificates & Completion",
      number: "9",
    },
    {
      icon: CheckCircle2,
      title: "Academic Integrity",
      number: "10",
    },
    {
      icon: Globe,
      title: "Platform Availability",
      number: "11",
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      number: "12",
    },
    {
      icon: XCircle,
      title: "Suspension & Termination",
      number: "13",
    },
    {
      icon: Lock,
      title: "Privacy",
      number: "14",
    },
    {
      icon: FileText,
      title: "Changes to Terms",
      number: "15",
    },
    {
      icon: Shield,
      title: "Governing Law",
      number: "16",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <h1 className="text-4xl font-bold text-slate-900">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Last Updated: June 19, 2026
          </p>
        </div>

        {/* Navigation / Quick Links */}
        <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-700 font-semibold mb-4">
            Quick Navigation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: Introduction */}
          <section id="section-1" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  1. Introduction
                </h2>
                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Welcome to our Learning Management System (LMS). These Terms
                    & Conditions govern your access to and use of our platform,
                    including courses, assessments, certificates, learning
                    resources, and related services.
                  </p>
                  <p>
                    By creating an account, purchasing a course, or accessing
                    our platform, you agree to comply with these Terms &
                    Conditions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Definitions */}
          <section id="section-2" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  2. Definitions
                </h2>
                <ul className="space-y-3">
                  <li className="text-slate-700">
                    <span className="font-semibold text-slate-900">
                      Platform:
                    </span>{" "}
                    Our LMS website and related educational services.
                  </li>
                  <li className="text-slate-700">
                    <span className="font-semibold text-slate-900">User:</span>{" "}
                    Any learner, student, mentor, instructor, or visitor using
                    the platform.
                  </li>
                  <li className="text-slate-700">
                    <span className="font-semibold text-slate-900">
                      Course:
                    </span>{" "}
                    Any educational program, certification, training, or
                    learning content.
                  </li>
                  <li className="text-slate-700">
                    <span className="font-semibold text-slate-900">
                      Content:
                    </span>{" "}
                    Videos, assignments, quizzes, presentations, documents,
                    downloadable files, and educational materials.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Account Registration */}
          <section id="section-3" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  3. Account Registration
                </h2>
                <p className="text-slate-700 leading-8 mb-4">
                  Users must provide accurate and complete information during
                  registration. You are responsible for maintaining the security
                  of your account credentials.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Keep login credentials confidential.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not share accounts with others.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Notify us immediately if unauthorized access is suspected.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Course Enrollment & Access */}
          <section id="section-4" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  4. Course Enrollment & Access
                </h2>
                <p className="text-slate-700 leading-8 mb-4">
                  Upon successful enrollment and payment, users receive access
                  to course content according to the plan purchased.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Lifetime access where specified.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Subscription-based access where applicable.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Batch-based or limited-duration access.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Payments & Billing */}
          <section id="section-5" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  5. Payments & Billing
                </h2>
                <p className="text-slate-700 leading-8 mb-4">
                  All fees must be paid before access to paid content is
                  granted. Payments are processed through third-party payment
                  gateways.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Applicable taxes may apply.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Payment gateway fees may be charged separately.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    We are not responsible for third-party payment failures or
                    delays.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Refund Policy */}
          <section id="section-6" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  6. Refund Policy
                </h2>
                <p className="text-slate-700 leading-8">
                  Refunds are governed by our Refund Policy. Eligibility depends
                  on course access, content consumption, and the refund period
                  specified during enrollment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: User Responsibilities */}
          <section id="section-7" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  7. User Responsibilities
                </h2>
                <p className="text-slate-700 leading-8 mb-4">
                  Users agree to use the platform responsibly and lawfully.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not share paid content.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not upload harmful software.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not misuse platform resources.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not impersonate another user.
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Do not engage in harassment or abuse.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Intellectual Property Rights */}
          <section id="section-8" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  8. Intellectual Property Rights
                </h2>
                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    All platform content remains the intellectual property of
                    the platform owner. Users receive a limited license for
                    personal learning purposes only.
                  </p>
                  <p>
                    Users may not reproduce, distribute, sell, or publicly
                    share course content without written permission.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Certificates & Completion */}
          <section id="section-9" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  9. Certificates & Completion
                </h2>
                <p className="text-slate-700 leading-8">
                  Certificates may be awarded upon successful completion of
                  course requirements, including assessments, attendance, and
                  assignments.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Academic Integrity */}
          <section id="section-10" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  10. Academic Integrity
                </h2>
                <div className="space-y-4 text-slate-700 leading-8">
                  <p>
                    Cheating, plagiarism, impersonation, or any dishonest
                    academic activity is strictly prohibited.
                  </p>
                  <p>
                    Violations may result in suspension, certificate revocation,
                    or permanent account termination.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 11: Platform Availability */}
          <section id="section-11" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  11. Platform Availability
                </h2>
                <p className="text-slate-700 leading-8">
                  We strive to keep the platform available at all times, but do
                  not guarantee uninterrupted access. Maintenance, upgrades, or
                  technical issues may occasionally affect availability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12: Limitation of Liability */}
          <section id="section-12" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  12. Limitation of Liability
                </h2>
                <p className="text-slate-700 leading-8">
                  We are not liable for indirect losses, business
                  interruptions, data loss, employment outcomes, certification
                  decisions, or learning results arising from the use of the
                  platform.
                </p>
              </div>
            </div>
          </section>

          {/* Section 13: Suspension & Termination */}
          <section id="section-13" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  13. Suspension & Termination
                </h2>
                <p className="text-slate-700 leading-8">
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms & Conditions or misuse platform
                  resources.
                </p>
              </div>
            </div>
          </section>

          {/* Section 14: Privacy */}
          <section id="section-14" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  14. Privacy
                </h2>
                <p className="text-slate-700 leading-8">
                  Your use of the platform is also governed by our Privacy
                  Policy. By using our services, you consent to the collection
                  and processing of information necessary to provide educational
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* Section 15: Changes to Terms */}
          <section id="section-15" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  15. Changes to Terms
                </h2>
                <p className="text-slate-700 leading-8">
                  We may update these Terms & Conditions periodically. Continued
                  use of the platform after updates constitutes acceptance of
                  the revised terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 16: Governing Law */}
          <section id="section-16" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  16. Governing Law
                </h2>
                <p className="text-slate-700 leading-8">
                  These Terms shall be governed by the laws of India. Any
                  disputes shall be subject to the jurisdiction of courts
                  located in Lucknow, Uttar Pradesh, India.
                </p>
              </div>
            </div>
          </section>

          {/* Section 17: Contact Information */}
          <section id="section-17" className="scroll-mt-20">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  17. Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email */}
                  <div className="p-5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        Email
                      </span>
                    </div>
                    <a
                      href="mailto:contact@tiiron.com"
                      className="font-medium hover:text-blue-700 font-medium text-sm"
                    >
                      contact@tiiron.com
                    </a>
                  </div>

                  {/* Website */}
                  <div className="p-5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        Website
                      </span>
                    </div>
                    <a
                      href="https://www.tiiron.com"
                      className="font-medium  hover:text-blue-700 font-medium text-sm break-all"
                    >
                      https://www.tiiron.com
                    </a>
                  </div>

                  {/* Company */}
                  <div className="p-5 rounded-lg border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        Company
                      </span>
                    </div>
                    <a 
                    href="https://tiirontechnologies.com/"
                    target="_blank"
                    className="text-slate-900 font-medium text-sm hover:text-blue-600">
                      Tiiron Technologies Pvt. Ltd.
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            By using Inacademic, you acknowledge that you have read and
            understood these Terms & Conditions and agree to be bound by them.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;