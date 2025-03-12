import React, { useState } from 'react';
import { MessageSquare, Send, Mail, Globe, Shield, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../components/Button';
import DashboardCard from '../components/DashboardCard';
import GlitchText from '../components/GlitchText';

interface FormData {
  name: string;
  email: string;
  telegramHandle: string;
  projectName: string;
  projectLinks: string;
  projectDetails: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  telegramHandle: '',
  projectName: '',
  projectLinks: '',
  projectDetails: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = async () => {
    if (!uniqueCode) return;
    
    try {
      await navigator.clipboard.writeText(uniqueCode);
      setIsCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.replace(/["']/g, '');
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID?.replace(/["']/g, '');

      console.log('Debug - Environment variables:', {
        TELEGRAM_BOT_TOKEN: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.slice(0, 5)}...` : 'Missing',
        TELEGRAM_CHAT_ID: TELEGRAM_CHAT_ID ? `${TELEGRAM_CHAT_ID}` : 'Missing',
        rawToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
        rawChatId: import.meta.env.VITE_TELEGRAM_CHAT_ID
      });

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Telegram configuration is missing. Please check your environment variables.');
      }

      const code = nanoid(10);

      const escapeMarkdown = (text: string) => {
        return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
      };

      const message = [
        `🚀 *New Contact Form Submission*\\!`,
        '',
        `👤 *Name:* ${escapeMarkdown(formData.name)}`,
        `📧 *Best Email:* ${escapeMarkdown(formData.email)}`,
        `📱 *Telegram:* ${escapeMarkdown(formData.telegramHandle)}`,
        `📝 *Project:* ${escapeMarkdown(formData.projectName)}`,
        `🔗 *Important Links:* ${escapeMarkdown(formData.projectLinks)}`,
        `ℹ️ *Important Details:* ${escapeMarkdown(formData.projectDetails)}`,
        `🔑 *Unique Code:* \`${escapeMarkdown(code)}\``
      ].join('\n');

      const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      console.log('Debug - Request details:', {
        url: apiUrl.replace(TELEGRAM_BOT_TOKEN, '***'),
        chatId: TELEGRAM_CHAT_ID,
        messagePreview: message.slice(0, 100) + '...'
      });

      // Usando AbortController para timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'MarkdownV2'
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        const responseData = await response.json();
        console.log('Debug - Full Telegram API response:', responseData);

        if (!response.ok || !responseData.ok) {
          throw new Error(responseData.description || `HTTP error! status: ${response.status}`);
        }

        setUniqueCode(code);
        toast.success('Form submitted successfully!');
        setFormData(initialFormData);

      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        throw error;
      } finally {
        clearTimeout(timeout);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (uniqueCode) {
    return (
      <div className="min-h-screen pt-32 p-6">
        <Toaster position="top-right" />
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <DashboardCard className="p-8" neonColor="#00D1C4">
              <div className="text-center">
                <motion.div 
                  className="text-5xl sm:text-7xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GlitchText 
                    text="Thank You!" 
                    fontSize="1em"
                    enableGlitch={true}
                  />
                </motion.div>

                <div className="space-y-6">
                  <p className="text-xl text-white/80 font-mono mb-8">
                    Your submission has been received. Our team will contact you shortly through Telegram or email.
                  </p>

                  <DashboardCard className="p-6" neonColor="#A020F0">
                    <h3 className="text-xl font-orbitron mb-4 text-[#A020F0]">
                      Your Verification Code
                    </h3>
                    <p className="text-white/80 font-mono mb-6">
                      Please save this code. When our team contacts you, they will provide this code to verify their identity.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <code className="px-6 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-[#A020F0] font-mono text-xl">
                        {uniqueCode}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="p-3 rounded-lg hover:bg-white/5 transition-colors"
                        title="Copy code"
                      >
                        {isCopied ? (
                          <Check className="w-6 h-6 text-green-500" />
                        ) : (
                          <Copy className="w-6 h-6 text-[#A020F0]" />
                        )}
                      </button>
                    </div>
                  </DashboardCard>

                  <div className="mt-8">
                    <DashboardCard className="p-6" neonColor="#00D1C4">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Shield className="w-8 h-8 text-[#00D1C4]" />
                      </div>
                      <p className="text-white/80 font-mono">
                        For your security, only trust communications from team members who can verify this unique code.
                      </p>
                    </DashboardCard>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 p-6">
      <Toaster position="top-right" />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <DashboardCard className="p-8">
            <div className="text-center mb-12">
              <motion.div 
                className="text-5xl sm:text-7xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlitchText 
                  text="Get in Touch" 
                  fontSize="1em"
                  enableGlitch={true}
                />
              </motion.div>
              <p className="text-xl text-white/80 font-mono">
                Ready to evolve your Web3 presence? Let's talk strategy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <DashboardCard className="p-6" neonColor="#00D1C4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#00D1C420' }}>
                    <Mail className="w-8 h-8" style={{ color: '#00D1C4' }} />
                  </div>
                  <h3 className="text-lg font-orbitron mb-2">Email Support</h3>
                  <p className="text-white/80 font-mono">24/7 response for all inquiries</p>
                </div>
              </DashboardCard>

              <DashboardCard className="p-6" neonColor="#A020F0">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#A020F020' }}>
                    <Globe className="w-8 h-8" style={{ color: '#A020F0' }} />
                  </div>
                  <h3 className="text-lg font-orbitron mb-2">Global Reach</h3>
                  <p className="text-white/80 font-mono">Operating in all time zones</p>
                </div>
              </DashboardCard>

              <DashboardCard className="p-6" neonColor="#00D1C4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#00D1C420' }}>
                    <Shield className="w-8 h-8" style={{ color: '#00D1C4' }} />
                  </div>
                  <h3 className="text-lg font-orbitron mb-2">Secure Communication</h3>
                  <p className="text-white/80 font-mono">End-to-end encrypted channels</p>
                </div>
              </DashboardCard>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <DashboardCard className="p-6" neonColor="#A020F0">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono text-white/80 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-mono text-white/80 mb-2">Best Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telegramHandle" className="block text-sm font-mono text-white/80 mb-2">Telegram Handle</label>
                    <input
                      type="text"
                      id="telegramHandle"
                      name="telegramHandle"
                      value={formData.telegramHandle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="@yourtelegram"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectName" className="block text-sm font-mono text-white/80 mb-2">Project</label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="Your project name"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectLinks" className="block text-sm font-mono text-white/80 mb-2">Important Project Links</label>
                    <textarea
                      id="projectLinks"
                      name="projectLinks"
                      value={formData.projectLinks}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="Website, GitHub, documentation, social media, etc. (one per line)"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="projectDetails" className="block text-sm font-mono text-white/80 mb-2">Important Details</label>
                    <textarea
                      id="projectDetails"
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[#A020F0]/20 text-white focus:border-[#A020F0] focus:ring-1 focus:ring-[#A020F0] transition-colors font-mono"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    ></textarea>
                  </div>
                </div>
              </DashboardCard>

              <Button 
                variant="primary"
                type="submit"
                className="w-full text-lg font-mono inline-flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}