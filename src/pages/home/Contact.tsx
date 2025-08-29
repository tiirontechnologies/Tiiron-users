import ContactForm from "@components/Home/contact/ContactForm";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <main className="px-6 py-12">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Have questions? We’d love to hear from you. Fill out the form below and
        our team will get back to you.
      </motion.p>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ContactForm />
      </motion.div>
    </main>
  );
};

export default Contact;
