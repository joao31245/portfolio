import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// No need to initialize emailjs explicitly here if you're using `emailjs.send` and `emailjs.sendForm`

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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
    setStatusMessage('Enviando...');

    const userEmailParams = {
      from_name: formData.from_name,
      to_email: formData.from_email,
      message: formData.message,
    };

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN;
    const userTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_USER;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, adminTemplateId, e.target, publicKey)
      .then(() => {
        emailjs
          .send(serviceId, userTemplateId, userEmailParams, publicKey)
          .then(() => {
            setStatusMessage('Email enviado com sucesso!');
            setIsSent(true);
            setFormData({ from_name: '', from_email: '', message: '' });
          })
          .catch((error) => {
            setStatusMessage('Erro ao enviar o email para o usuário.');
            console.error(error);
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        setStatusMessage('Erro ao enviar o email para o administrador.');
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <section className="py-10 px-6 bg-background text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">Contact Me</h2>
        {isSent && (
          <div className="mb-4 text-green-500">Sua mensagem foi enviada com sucesso!</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Seu Nome"
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              placeholder="Seu E-mail"
              required
              className="w-full p-3 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Sua Mensagem"
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
            {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
        {statusMessage && <p className="mt-4 text-sm">{statusMessage}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
