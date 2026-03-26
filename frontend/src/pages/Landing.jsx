import { Link } from 'react-router-dom';
import { ArrowRight, Star, Briefcase, TrendingUp, Shield, Users, Award } from 'lucide-react';

const stats = [
  { value: '12,000+', label: 'Women Employed' },
  { value: '850+', label: 'Job Listings' },
  { value: '₹2.4Cr+', label: 'Total Earnings' },
  { value: '96%', label: 'Satisfaction Rate' },
];

const features = [
  { icon: Star, title: 'Skill-Based Matching', desc: 'Find jobs that match exactly what you know and love doing.', color: 'bg-rose-100 text-rose-600' },
  { icon: Briefcase, title: 'Flexible Work Options', desc: 'Remote, freelance, or part-time — work on your terms.', color: 'bg-amber-100 text-amber-600' },
  { icon: TrendingUp, title: 'Financial Tracking', desc: 'Manage income, expenses, and savings from one dashboard.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Shield, title: 'Safe & Verified', desc: 'All employers are verified. Your safety is our priority.', color: 'bg-violet-100 text-violet-600' },
  { icon: Users, title: 'Community Support', desc: 'Connect with a network of women who grow together.', color: 'bg-blue-100 text-blue-600' },
  { icon: Award, title: 'Skill Certifications', desc: 'Earn certificates as you complete training and projects.', color: 'bg-pink-100 text-pink-600' },
];

const testimonials = [
  { name: 'Sunita Devi', role: 'Tailor & Home Entrepreneur', location: 'Jaipur', quote: 'WorkNest helped me earn ₹18,000/month from home while caring for my family. I never thought this was possible.', initial: 'S' },
  { name: 'Meera Patel', role: 'Freelance Graphic Designer', location: 'Ahmedabad', quote: 'I had the skills but no platform to show them. WorkNest connected me with clients within my first week!', initial: 'M' },
  { name: 'Lakshmi R.', role: 'Online Tutor', location: 'Chennai', quote: 'The financial dashboard helps me plan my savings every month. I feel truly independent now.', initial: 'L' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-body">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-rose-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">WN</span>
          </div>
          <span className="font-display font-bold text-gray-800 text-lg">WorkNest <span className="text-rose-500">Women</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-rose-600 transition-colors">Features</a>
          <a href="#stories" className="hover:text-rose-600 transition-colors">Stories</a>
          <a href="#skills" className="hover:text-rose-600 transition-colors">Skills</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors hidden sm:block">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 px-6 md:px-12 pt-16 pb-24">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            Empowering Women Across India
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
            Your Skills.<br />
            <span className="text-rose-600">Your Income.</span><br />
            Your Freedom.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
            WorkNest Women connects skilled women with flexible, verified jobs — and gives you the tools to track your earnings and grow financially independent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-8">
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-8">
              Already a member? Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.value} className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 text-center">
                <p className="font-display text-2xl font-bold text-rose-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A complete platform built specifically for women who want to work, earn, and grow on their own terms.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="card hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section id="skills" className="px-6 md:px-12 py-20 bg-rose-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">Jobs for every skill</h2>
          <p className="text-gray-500 mb-10">From digital to handcraft — find work that fits your talent.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['🧵 Tailoring', '💻 Data Entry', '🎨 Graphic Design', '✍️ Content Writing', '🍳 Catering', '📚 Teaching', '💄 Beauty', '📱 Digital Marketing', '🌐 Web Dev', '📊 Accounting', '📸 Photography', '🧘 Yoga & Fitness'].map(skill => (
              <span key={skill} className="bg-white border border-rose-200 text-rose-700 text-sm px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md hover:bg-rose-600 hover:text-white transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 mt-10 text-base py-3 px-8">
            Browse All Jobs <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="px-6 md:px-12 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real stories, real impact</h2>
            <p className="text-gray-500">Women who changed their lives with WorkNest.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card flex flex-col gap-4">
                <div className="flex text-amber-400 gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-rose-50">
                  <div className="w-9 h-9 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm">{t.initial}</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-r from-rose-600 to-rose-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to earn on your terms?</h2>
          <p className="text-rose-100 text-lg mb-8">"When women earn, families grow, and societies progress."</p>
          <Link to="/register" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold px-10 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all hover:shadow-xl">
            Join WorkNest Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 bg-gray-900 text-center text-gray-400 text-sm">
        <p>© 2024 WorkNest Women. Built with ❤️ for women's empowerment.</p>
      </footer>
    </div>
  );
}
