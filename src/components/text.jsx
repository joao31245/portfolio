import React, { useState } from 'react';
import emailjs from 'emailjs-com';

emailjs.init("OHVe0i1qcT58e_osP");

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        'service_ifwe57b', // Seu Service ID do EmailJS
        'your_template_id', // Seu Template ID do EmailJS
        e.target,
        'your_user_id' // Seu User ID do EmailJS
      )
      .then(
        (response) => {
          console.log('Email sent successfully', response);
          setIsSent(true);
          setIsLoading(false);
        },
        (error) => {
          console.log('Error sending email', error);
          setIsSent(false);
          setIsLoading(false);
        }
      );
  };

  return (
    <section className="py-10 px-6 bg-background text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">Contact Me</h2>
        {isSent && (
          <div className="mb-4 text-green-500">Your message has been sent!</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
              rows="4"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded bg-primary text-white"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm; 