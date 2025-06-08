import React, { useState } from "react";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
    <Helmet>
      <title>OrbitBazaar - Contact Us</title>
 
    </Helmet>
      <div className="min-h-screen bg-base-200 py-10 px-4 md:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-neutral">Contact Us</h1>
        <p className="text-gray-500 mt-2">We’d love to hear from you!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-10 rounded-xl shadow-lg">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p className="text-gray-600">
            Feel free to reach out to us with any questions, comments, or feedback.
          </p>

          <div className="flex items-start gap-4">
            <i className="fas fa-phone-alt text-black text-xl"></i>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+880 123 456 789</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-envelope text-black text-xl"></i>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">support@mystore.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <i className="fas fa-map-marker-alt text-black text-xl"></i>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-600">123 Main Street, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn bg-black text-white hover:bg-gray-800 w-full"
          >
            <i className="fas fa-paper-plane mr-2 text-white"></i>
            Send Message
          </button>
        </form>
      </div>
      </div>
    </>

  );
};

export default ContactUs;
