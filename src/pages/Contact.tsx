import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF as Facebook,
  FaInstagram as Instagram,
  FaTwitter as Twitter,
  FaLinkedinIn as Linkedin,
} from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xgodqdne", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        e.currentTarget.reset();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const officeAddresses = {
    noida: {
      title: "HEAD OFFICE",
      address:
        "8th Floor, Levana Cyber Height, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh,India",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.130586610214!2d81.00819777543792!3d26.867591876674105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzAzLjMiTiA4McKwMDAnMzguOCJF!5e0!3m2!1sen!2sin!4v1781848659581!5m2!1sen!2sin",
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* ================= LEFT SIDE: CONTACT FORM ================= */}
        <div className="lg:col-span-7 w-full max-w-full overflow-hidden bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-tight break-words">
              Get in Touch
            </h1>
            <p className="text-indigo-900 mt-2 font-medium break-words">
              We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                name="FullName "
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="email"
                placeholder="Email ID"
                required
                name="Email"
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mobile Number"
                required
                name="Mobile"
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                name="organization"
                required
                placeholder="School/Organization"
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                name="City"
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                placeholder="Website"
                name="Website"
                className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              name="Address"
              required
              className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              name="Message"
              className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400 resize-none"
            />

            {/* Dummy reCAPTCHA & Submit Row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4 pt-4">
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-3 rounded-xl shadow-sm min-w-0 flex-wrap">
                <input
                  type="checkbox"
                  id="captcha"
                  className="h-5 w-5 shrink-0 rounded border-slate-300 text-[#002A8F] focus:ring-[#002A8F] cursor-pointer"
                />
                <label
                  htmlFor="captcha"
                  className="text-sm font-medium text-slate-600 cursor-pointer select-none"
                >
                  I'm not a robot
                </label>
                <div className="flex flex-col items-center pl-6 border-l border-slate-200 shrink-0">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/RecaptchaLogo.svg"
                    alt="recaptcha"
                    className="w-6 h-6"
                  />
                  <span className="text-[9px] text-slate-400 mt-0.5">
                    reCAPTCHA
                  </span>
                </div>
              </div>

              {/* Tiiron Theme Red Button */}
              <button
                type="submit"
                className="w-full sm:w-auto border border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white font-semibold px-10 py-3.5 rounded-xl shadow-md shadow-red-600/10 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
              {error && (
                <div className="w-full sm:w-auto bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm font-medium break-words">
                  Something went wrong. Please try again.
                </div>
              )}
              {success && (
                <div className="w-full sm:w-auto bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm font-medium break-words">
                  Your message has been submitted successfully!
                </div>
              )}
            </div>
          </form>

          {/* Social Media - Original Brand Colors */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100">
            <h3 className="text-base font-bold text-indigo-900 mb-4">
              Connect with us on social media
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/tiirontechnologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Facebook className="text-[#1877F2] shrink-0" size={18} fill="#1877F2" />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/tiirontechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Instagram className="text-[#E4405F] shrink-0" size={18} />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/tiiron/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Linkedin className="text-[#0A66C2] shrink-0" size={18} fill="#0A66C2" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://x.com/tiironlms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Twitter className="text-[#0A66C2] shrink-0" size={18} fill="#0A66C2" />
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: QUICK INFO & MAP ================= */}
        <div className="lg:col-span-5 w-full max-w-full space-y-6">
          {/* Top Cards: Mail & Sales Info */}
          <div className="w-full max-w-full overflow-hidden bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 space-y-5">
            {/* Email Row */}
            <div className="flex items-center gap-3 sm:gap-4 bg-blue-50/50 p-3 rounded-xl border border-blue-50 min-w-0">
              <div className="p-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-md shadow-blue-900/20 shrink-0">
                <Mail size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-indigo-900 break-words [overflow-wrap:anywhere]">
                  contact@tiiron.com
                </p>
              </div>
            </div>

            {/* Sales Contacts */}
            <div className="flex items-start gap-3 sm:gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-50 min-w-0">
              <div className="p-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-md shadow-blue-900/20 mt-1 shrink-0">
                <Phone size={20} />
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 w-full min-w-0">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#FF1E00] tracking-wider uppercase">
                    Call Now
                  </h4>
                  <p className="text-sm font-bold text-indigo-900 mt-1 break-words [overflow-wrap:anywhere]">
                    +91 9161218740
                  </p>
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#FF1E00] tracking-wider uppercase">
                    Technical Support
                  </h4>
                  <p className="text-sm font-bold text-indigo-900 mt-1 break-words [overflow-wrap:anywhere]">
                    admin@tiiron.com
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    (Technical Support)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Map & Tabs Component */}
          <div className="w-full max-w-full overflow-hidden bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col">
            {/* Address Content Area */}
            <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-4">
              <div className="text-center px-2 min-w-0">
                <div className="inline-flex text-[#FF1E00] mb-1 justify-center w-full">
                  <MapPin size={18} fill="#FF1E00" className="text-white" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  {officeAddresses.noida.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-sm mx-auto break-words">
                  {officeAddresses.noida.address}
                </p>
              </div>

              {/* Google Map Iframe Container */}
              <div className="w-full h-[240px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden border border-slate-200 mt-4 shadow-inner">
                <iframe
                  src={officeAddresses.noida.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;