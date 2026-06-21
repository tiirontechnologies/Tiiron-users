// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { Mail, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const MESSAGE_MAX = 1000;

// const ContactForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//     website: "", 
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [statusMsg, setStatusMsg] = useState("");

//   useEffect(() => {
//     if (submitted) {
//       const t = setTimeout(() => setStatusMsg(""), 4000);
//       return () => clearTimeout(t);
//     }
//   }, [submitted]);

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.name.trim()) e.name = "Please enter your name.";
//     if (!form.email.trim()) e.email = "Please enter your email.";
//     else if (!EMAIL_RE.test(form.email.trim()))
//       e.email = "Please enter a valid email.";
//     if (!form.message.trim()) e.message = "Please enter a message.";
//     else if (form.message.length > MESSAGE_MAX)
//       e.message = `Message must be ≤ ${MESSAGE_MAX} characters.`;
//     if (form.website && form.website.trim().length > 0)
//       e.website = "Bot detected.";
//     return e;
//   };

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErrors({});
//     const eObj = validate();
//     if (Object.keys(eObj).length) {
//       setErrors(eObj);
//       setStatusMsg("Please fix the errors and try again.");
//       return;
//     }

//     setLoading(true);
//     setStatusMsg("");
//     try {
//       // await new Promise((res) => setTimeout(res, 900));
//       // setSubmitted(true);
//       // setStatusMsg("Thank you! We'll get back to you soon.");
//       // setForm({ name: "", email: "", phone: "", message: "", website: "" });
//       // setErrors({});

//        const res = await fetch("https://formspree.io/f/xgodqdne", {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify({
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         message: form.message,
//       }),
//     });

//     if (!res.ok) throw new Error("Failed");

//     setSubmitted(true);
//     setStatusMsg("Thank you! We'll get back to you soon.");
//     setForm({ name: "", email: "", phone: "", message: "", website: "" });
//     setErrors({});
//     } catch {
//       setStatusMsg("Something went wrong — please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
//       {/* Background gradient glow */}
//       <div className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute left-1/2 top-[-15rem] h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/10 via-fuchsia-400/10 to-violet-400/10 blur-3xl" />
//       </div>

//       <div className="max-w-3xl mx-auto bg-white shadow-md border border-gray-100 rounded-2xl p-8 md:p-7">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
//             <span className="bg-gradient-to-r from-green-600 via-teal-500 to-cyan-500 text-transparent bg-clip-text">
//             Let's Talk
//             </span>
//           </h2>
//           <p className="mt-2 text-gray-600 max-w-md mx-auto">
//             Have questions about <span className="font-semibold">Tiiron</span>? 
//             Send us a message and we'll get back to you as soon as possible.
//           </p>
//         </div>

//         {/* ARIA live */}
//         <div aria-live="polite" className="sr-only">
//           {statusMsg}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//           {/* Honeypot */}
//           <input
//             type="text"
//             name="website"
//             value={form.website}
//             onChange={handleChange}
//             autoComplete="off"
//             tabIndex={-1}
//             style={{ display: "none" }}
//             aria-hidden="true"
//           />

//           {/* Grid inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={form.name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
//                   errors.name
//                     ? "border-red-400 focus:ring-red-200"
//                     : "border-gray-300 focus:ring-sky-300"
//                 }`}
//                 placeholder="Your name"
//                 aria-invalid={!!errors.name}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//               />
//               {errors.name && (
//                 <p
//                   id="name-error"
//                   className="text-xs text-red-600 mt-1 flex items-center gap-1"
//                 >
//                   <AlertCircle className="w-4 h-4" /> {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
//                     errors.email
//                       ? "border-red-400 focus:ring-red-200"
//                       : "border-gray-300 focus:ring-sky-300"
//                   }`}
//                   placeholder="you@company.com"
//                   aria-invalid={!!errors.email}
//                   aria-describedby={errors.email ? "email-error" : undefined}
//                 />
//               </div>
//               {errors.email && (
//                 <p
//                   id="email-error"
//                   className="text-xs text-red-600 mt-1 flex items-center gap-1"
//                 >
//                   <AlertCircle className="w-4 h-4" /> {errors.email}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Phone (optional)
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={form.phone}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
//                 placeholder="+91 8363959897"
//                 aria-describedby="phone-help"
//               />
//             </div>
//             <p id="phone-help" className="text-xs text-gray-400 mt-1">
//               We'll only call if necessary.
//             </p>
//           </div>

//           {/* Message */}
//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows={5}
//               value={form.message}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition ${
//                 errors.message
//                   ? "border-red-400 focus:ring-red-200"
//                   : "border-gray-300 focus:ring-sky-300"
//               }`}
//               placeholder="How can we help?"
//               aria-invalid={!!errors.message}
//               aria-describedby={
//                 errors.message ? "message-error message-help" : "message-help"
//               }
//               maxLength={MESSAGE_MAX}
//             />
//             <div className="flex items-center justify-between mt-2">
//               {errors.message ? (
//                 <p
//                   id="message-error"
//                   className="text-xs text-red-600 flex items-center gap-1"
//                 >
//                   <AlertCircle className="w-4 h-4" /> {errors.message}
//                 </p>
//               ) : (
//                 <p id="message-help" className="text-xs text-gray-400">
//                   Be as specific as you can — it helps us respond faster.
//                 </p>
//               )}
//               <p className="text-xs text-gray-400">
//                 {form.message.length}/{MESSAGE_MAX}
//               </p>
//             </div>
//           </div>

//           {/* Submit */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition transform bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 shadow-lg cursor-pointer ${
//                 loading
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-sky-600 hover:opacity-90 transition scale-[1.02]"
//               }`}
//               aria-busy={loading}
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <CheckCircle2 className="w-5 h-5 opacity-0" />
//               )}
//               <span>{loading ? "Sending..." : "Send Message"}</span>
//             </button>

//             {/* Status */}
//             <div className="mt-4">
//               {submitted && !loading && (
//                 <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-4 py-2 rounded-md">
//                   <CheckCircle2 className="w-4 h-4 text-green-600" />
//                   <span>
//                     Thanks — we received your message and will reply soon.
//                   </span>
//                 </div>
//               )}
//               {!submitted && statusMsg && (
//                 <div className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-md">
//                   <AlertCircle className="w-4 h-4 text-amber-700" />
//                   <span>{statusMsg}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;


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
    // lucknow: {
    //   title: "REGIONAL OFFICE (LUCKNOW)",
    //   address: "2nd Floor, Gomti Nagar, Lucknow, Uttar Pradesh - 226010, India",
    //   mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.4321908489!2d80.9992!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be29a75555555%3A0x63c33d8373982e5!2sGomti%20Nagar%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1716480000000!5m2!1sen!2sin"
    // },
    // pune: {
    //   title: "BRANCH OFFICE (PUNE)",
    //   address: "4th Floor, Hinjewadi Phase 1, Pune, Maharashtra - 411057, India",
    //   mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261317373809!2d73.7388!3d18.5913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc6e0000001%3A0x6c6c79a8360d00b9!2sHinjawadi%20Phase%201%2C%20Pune!5e0!3m2!1sen!2sin!4v1716480000000!5m2!1sen!2sin"
    // }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT SIDE: CONTACT FORM ================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-red-600 tracking-tight">
              {/* We're Always Ready */}
              Get in Touch
            </h1>
            <p className="text-indigo-900 mt-2 font-medium">
              {/* Get in touch with your Technology Partner. */}
              We'd love to hear from you.
            </p>
          </div>

          {/* <form className="space-y-4" onSubmit={(e) => e.preventDefault()}> */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                name="FullName "
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="email"
                placeholder="Email ID"
                required
                name="Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mobile Number"
                required
                name="Mobile"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                name="organization"
                required
                placeholder="School/Organization"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                name="City"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
              <input
                type="text"
                placeholder="Website"
                name="Website"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              name="Address"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              name="Message"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#002A8F] focus:ring-1 focus:ring-[#002A8F] text-slate-700 bg-slate-50/50 transition-all placeholder:text-slate-400 resize-none"
            />

            {/* Dummy reCAPTCHA & Submit Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-3 rounded-xl shadow-sm">
                <input
                  type="checkbox"
                  id="captcha"
                  className="h-5 w-5 rounded border-slate-300 text-[#002A8F] focus:ring-[#002A8F] cursor-pointer"
                />
                <label
                  htmlFor="captcha"
                  className="text-sm font-medium text-slate-600 cursor-pointer select-none"
                >
                  I'm not a robot
                </label>
                <div className="flex flex-col items-center pl-6 border-l border-slate-200">
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
                className="  border border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white  font-semibold px-10 py-3.5 rounded-xl shadow-md shadow-red-600/10 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {/* SUBMIT */}
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                  Something went wrong. Please try again.
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                  Your message has been submitted successfully!
                </div>
              )}
            </div>
          </form>

          {/* Social Media - Original Brand Colors */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-base font-bold text-indigo-900 mb-4">
              Connect with us on social media
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com/tiirontechnologies/"
                target="_blank"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Facebook className="text-[#1877F2]" size={18} fill="#1877F2" />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/tiirontechnologies"
                target="_blank"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Instagram className="text-[#E4405F]" size={18} />
                <span className="text-sm">Instagram</span>
              </a>
              {/* <a
                href="#"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Youtube className="text-[#FF0000]" size={18} fill="#FF0000" />
                <span className="text-sm">YouTube</span>
              </a> */}
              <a
                href="https://www.linkedin.com/company/tiiron/"
                target="_blank"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Linkedin className="text-[#0A66C2]" size={18} fill="#0A66C2" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://x.com/tiironlms"
                 target="_blank"
                className="flex items-center space-x-2 border border-slate-100 bg-white shadow-sm px-4 py-2 rounded-xl text-slate-700 font-medium hover:shadow-md transition-all"
              >
                <Twitter className="text-[#0A66C2]" size={18} fill="#0A66C2" />
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: QUICK INFO & MAP ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Cards: Mail & Sales Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
            {/* Email Row */}
            <div className="flex items-center space-x-4 bg-blue-50/50 p-3 rounded-xl border border-blue-50">
              <div className="p-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-md shadow-blue-900/20">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-bold  text-indigo-900">
                  contact@tiiron.com
                </p>
              </div>
            </div>

            {/* Sales Contacts */}
            <div className="flex items-start space-x-4 bg-blue-50/50 p-4 rounded-xl border border-blue-50">
              <div className="p-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-md shadow-blue-900/20 mt-1">
                <Phone size={20} />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
                <div>
                  {/* <h4 className="text-xs font-bold text-[#FF1E00] tracking-wider uppercase">Sales</h4> */}
                  <h4 className="text-xs font-bold text-[#FF1E00] tracking-wider uppercase">
                    Call Now
                  </h4>
                  <p className="text-sm font-bold text-indigo-900 mt-1">
                    +91 9161218740
                  </p>
                  {/* <p className="text-sm font-bold text-slate-800">+91 784 000 0168</p> */}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#FF1E00] tracking-wider uppercase">
                    Technical Support
                  </h4>
                  <p className="text-sm font-bold text-indigo   -900 mt-1">
                    admin@tiiron.com
                  </p>
                  {/* <p className="text-sm font-bold text-slate-800">+91 706 566 5600</p> */}
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    (Technical Support)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Map & Tabs Component */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[550px]">
            {/* Office Locations Tabs */}
            {/* <div className="flex border-b border-slate-100 pb-3 justify-center space-x-8">
              {(["noida"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-bold tracking-wide capitalize transition-all border-b-2 px-1 ${
                    activeTab === tab
                      ? "border-[#002A8F] text-[#002A8F]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div> */}

            {/* Address Content Area */}
            <div className="flex-1 flex flex-col justify-between pt-4">
              <div className="text-center px-2">
                <div className="inline-flex text-[#FF1E00] mb-1 justify-center w-full">
                  <MapPin size={18} fill="#FF1E00" className="text-white" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  {officeAddresses.noida.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-sm mx-auto">
                  {officeAddresses.noida.address}
                </p>
              </div>

              {/* Google Map Iframe Container */}
              {/* <div className="w-full h-[180px] rounded-xl overflow-hidden border border-slate-200 mt-4 shadow-inner relative">
              
                <iframe
                  src={officeAddresses.noida.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Noida office location"
                />
              </div> */}
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-200 mt-4 shadow-inner">
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

