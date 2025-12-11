// Versão corrigida do FloatingContactBar
import { jsx as e, jsxs as jsx } from "react/jsx-runtime";
import React, { useState } from "react";

const MessageCircleIcon = () => e("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  children: e("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
});

const SendIcon = () => jsx("svg", {
  width: "24",
  height: "24", 
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  children: [
    e("path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }),
    e("path", { d: "m21.854 2.147-10.94 10.939" })
  ]
});

const FloatingContactBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/.netlify/functions/sendTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          telegram: "",
          message: formData.message
        })
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setIsOpen(false);
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch {
      alert("Error sending message. Please try again.");
    }
  };

  return e("div", {
    className: "fixed bottom-0 left-0 right-0 z-50",
    children: jsx("div", {
      className: "flex flex-col items-center justify-center",
      children: [
        // Formulário expansível
        isOpen && e("div", {
          className: "w-full max-w-md mx-auto mb-4 p-6 bg-black/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl",
          children: jsx("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
              e("h3", {
                className: "text-lg font-bold text-white text-center mb-4",
                children: "Contact Us"
              }),
              e("input", {
                type: "text",
                name: "name",
                placeholder: "Your Name",
                value: formData.name,
                onChange: handleInputChange,
                required: true,
                className: "w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              }),
              e("input", {
                type: "email", 
                name: "email",
                placeholder: "Your Email",
                value: formData.email,
                onChange: handleInputChange,
                required: true,
                className: "w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              }),
              e("textarea", {
                name: "message",
                placeholder: "Your Message",
                value: formData.message,
                onChange: handleInputChange,
                required: true,
                rows: 3,
                className: "w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
              }),
              jsx("div", {
                className: "flex gap-2",
                children: [
                  e("button", {
                    type: "submit",
                    className: "flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
                    children: [
                      e(SendIcon),
                      "Send"
                    ]
                  }),
                  e("button", {
                    type: "button",
                    onClick: () => setIsOpen(false),
                    className: "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors",
                    children: "Cancel"
                  })
                ]
              })
            ]
          })
        }),
        // Botão flutuante
        e("button", {
          onClick: () => setIsOpen(!isOpen),
          className: "bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 mb-6",
          children: e(MessageCircleIcon)
        })
      ]
    })
  });
};

export default FloatingContactBar;
