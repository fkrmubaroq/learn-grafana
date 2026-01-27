import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-4">
          About Me
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50 mb-4">
          Hi, I'm the creator of{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            CalmLogs
          </span>
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          A passionate developer focused on building tools that make observability
          simple and elegant.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-semibold text-emerald-300">CL</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-slate-50 mb-2">
              Full Stack Developer
            </h2>
            <p className="text-slate-400 mb-4">DevOps Enthusiast | Open Source Contributor</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              I specialize in building scalable applications with a focus on observability
              and monitoring. CalmLogs was born from my experience dealing with noisy,
              cluttered log interfaces. I believe that debugging should be a calm experience,
              not a stressful one.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-slate-50 mb-6 text-center">
          Technologies I Work With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Docker",
            "Grafana",
            "Prometheus",
            "Loki",
            "Tempo",
          ].map((tech) => (
            <div
              key={tech}
              className="rounded-xl border border-white/5 bg-slate-900/50 p-4 text-center hover:border-emerald-400/30 transition-colors"
            >
              <span className="text-sm text-slate-200">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
            <span className="text-emerald-300">01</span>
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-2">Simplicity</h3>
          <p className="text-xs text-slate-300">
            Less is more. I believe in creating tools that do one thing exceptionally well.
          </p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
            <span className="text-emerald-300">02</span>
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-2">Clarity</h3>
          <p className="text-xs text-slate-300">
            Good tools should be intuitive. No steep learning curves, just clear interfaces.
          </p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
            <span className="text-emerald-300">03</span>
          </div>
          <h3 className="text-sm font-medium text-slate-50 mb-2">Performance</h3>
          <p className="text-xs text-slate-300">
            Fast and efficient. Because every millisecond counts when you're debugging.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-slate-400 mb-4">Want to get in touch?</p>
        <Link
          to="/contact"
          className="inline-block rounded-full bg-emerald-400/90 px-6 py-2 text-sm font-medium text-slate-950 shadow-sm hover:bg-emerald-300 transition-colors"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
