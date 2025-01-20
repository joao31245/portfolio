import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// Inicializa o EmailJS com sua Public Key
emailjs.init("JrGkX-cH-Qbjw8z-N");

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('Enviando...');

    // Prepara os dados manualmente para enviar o e-mail para o usuário
    const userEmailParams = {
      from_name: formData.from_name,
      to_email: formData.from_email, // Campo usado no template do usuário
      message: formData.message,
    };

    // Envia o e-mail para o administrador
    emailjs
      .sendForm(
        'service_ifwe57b', // Seu Service ID do EmailJS
        'template_djnmenm', // Template ID para o administrador
        e.target, // O formulário HTML completo
        'JrGkX-cH-Qbjw8z-N' // Chave pública
      )
      .then(() => {
        // Após o envio bem-sucedido para o administrador, envia o e-mail para o usuário
        emailjs
          .send(
            'service_ifwe57b', // Seu Service ID do EmailJS
            'template_2knh2vb', // Template ID para o usuário
            userEmailParams, // Dados do e-mail do usuário
            'JrGkX-cH-Qbjw8z-N' // Chave pública
          )
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
        {statusMessage && (
          <p className="mt-4 text-sm">{statusMessage}</p>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
