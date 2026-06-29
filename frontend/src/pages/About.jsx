import { Link } from 'react-router-dom'
import { Sparkles, Heart, ShieldCheck, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-blue-500" size={32} />
          <span className="text-3xl font-bold text-slate-800">SkinWise AI</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          We're on a mission to make dermatologist-grade skincare knowledge accessible to every person in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Heart, title: 'Made for India', desc: 'Products recommendations that are actually available and affordable in India. No imported-only suggestions.', color: 'bg-red-50 text-red-500' },
          { icon: ShieldCheck, title: 'Science-Backed', desc: 'Every recommendation is based on dermatological research and evidence-based skincare, not trends.', color: 'bg-blue-50 text-blue-500' },
          { icon: Users, title: 'For Everyone', desc: 'Whether you\'re a skincare beginner or an expert, SkinWise helps you at every level of your journey.', color: 'bg-green-50 text-green-500' },
        ].map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="card text-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}>
              <Icon size={22} />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Story</h2>
        <div className="prose text-slate-600 space-y-3 text-sm leading-relaxed">
          <p>SkinWise AI was born out of frustration — the frustration of scrolling through skincare Reddit threads at midnight, trying to figure out if niacinamide and vitamin C can be used together (they can), or whether salicylic acid is right for your combination skin (it probably is).</p>
          <p>Most skincare resources are made for Western audiences with Western budgets. Ingredients cost ₹2000+ abroad but ₹500 in India. Products recommended on YouTube aren't even available here.</p>
          <p>We built SkinWise to fix that. A platform that speaks to Indian skin, Indian weather, and Indian wallets — with science-backed information that doesn't talk down to you.</p>
          <p>Version 1 is the foundation. We're building toward AI-powered skin analysis, a chatbot, and weather-aware routine adjustments. But great skincare starts with great information — and that's what we're building first.</p>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-100 text-center">
        <h3 className="font-semibold text-blue-800 mb-2">⚠️ Medical Disclaimer</h3>
        <p className="text-sm text-blue-700">
          SkinWise AI is an educational platform, not a medical service. The information provided is for general educational purposes only and does not constitute medical advice. Always consult a qualified dermatologist for diagnosis and treatment of skin conditions.
        </p>
      </div>

      <div className="text-center mt-10">
        <Link to="/quiz" className="btn-primary mr-3">Take the Skin Quiz</Link>
        <Link to="/skin-library" className="btn-outline">Explore Skin Library</Link>
      </div>
    </div>
  )
}
