import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-4">
          Get In Touch
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 mb-4">
          Let's{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Connect
          </span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto">
          Have a question about CalmLogs? Want to collaborate on a project?
          Or just want to say hi? I'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-slate-50 mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-200 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2 placeholder:text-slate-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2 placeholder:text-slate-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-slate-200 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2 placeholder:text-slate-500"
                placeholder="Question about CalmLogs"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-slate-200 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-slate-100 outline-none ring-emerald-400/40 focus:border-emerald-300/60 focus:ring-2 placeholder:text-slate-500 resize-none"
                placeholder="Your message here..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-400/90 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
            <h2 className="text-xl font-semibold text-slate-50 mb-6">
              Quick Contact
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:hello@calmlogs.dev"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-950/50 hover:border-emerald-400/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-50 group-hover:text-emerald-300 transition-colors">
                    Email
                  </p>
                  <p className="text-xs text-slate-400">hello@calmlogs.dev</p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
            <h2 className="text-xl font-semibold text-slate-50 mb-6">
              Follow Me
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-slate-950/50 hover:border-emerald-400/30 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
                  <span className="text-sm text-slate-200 group-hover:text-emerald-300 transition-colors">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm text-slate-300">
                Usually responds within <span className="text-emerald-300 font-medium">24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
