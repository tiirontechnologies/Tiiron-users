import React, { useState, useEffect } from "react";
import { Mail, Phone, Check, Loader2, AlertCircle } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 1000;

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot (should stay empty)
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (submitted) {
      // auto-clear success message after a while
      const t = setTimeout(() => {
        setStatusMsg("");
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please enter a message.";
    else if (form.message.length > MESSAGE_MAX)
      e.message = `Message must be ≤ ${MESSAGE_MAX} characters.`;
    // honeypot should be empty
    if (form.website && form.website.trim().length > 0)
      e.website = "Bot detected.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      setStatusMsg("Please fix the errors and try again.");
      return;
    }

    // simulate submit
    setLoading(true);
    setStatusMsg("");
    try {
      // Replace this with real API call
      await new Promise((res) => setTimeout(res, 900));

      // successful submit
      setSubmitted(true);
      setStatusMsg("Thank you! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
      setErrors({});
    } catch (err) {
      setStatusMsg("Something went wrong — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || Object.keys(validate()).length > 0;

  return (
    <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Questions about <span className="font-semibold">Tiiron</span>? Send us
          a message and we'll respond quickly.
        </p>

        {/* ARIA live for screen readers */}
        <div aria-live="polite" className="sr-only">
          {statusMsg}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Honeypot - visually hidden */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex="-1"
            style={{ display: "none" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-sky-300"
                  }`}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p
                  id="name-error"
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-sky-300"
                  }`}
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone (optional) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone (optional)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="+1 (555) 123-4567"
                aria-describedby="phone-help"
              />
            </div>
            <p id="phone-help" className="text-xs text-gray-400 mt-1">
              We'll only call if needed.
            </p>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-sky-300"
              }`}
              placeholder="How can we help?"
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error message-help" : "message-help"
              }
              maxLength={MESSAGE_MAX}
            />
            <div className="flex items-center justify-between mt-2">
              {errors.message ? (
                <p
                  id="message-error"
                  className="text-xs text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.message}
                </p>
              ) : (
                <p id="message-help" className="text-xs text-gray-400">
                  Be as specific as you can — it helps us respond faster.
                </p>
              )}
              <p className="text-xs text-gray-400">
                {form.message.length}/{MESSAGE_MAX}
              </p>
            </div>
          </div>

          {/* Submit + status */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-white font-semibold transition transform ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.02]"
              }`}
              aria-busy={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4 opacity-0" />
              )}
              <span>{loading ? "Sending..." : "Send Message"}</span>
            </button>

            {/* status */}
            <div className="mt-4">
              {submitted && !loading && (
                <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-4 py-2 rounded-md">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>
                    Thanks — we received your message and will reply soon.
                  </span>
                </div>
              )}
              {!submitted && statusMsg && (
                <div className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-md">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
