import { Link } from 'react-router-dom'
import { Sparkles, Mail } from 'lucide-react'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">SkinWise AI</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-slate-400">
              Science-backed skincare for every Indian skin type. Personalised routines, ingredient education, and India-first product recommendations.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <XIcon />, label: 'X / Twitter' },
                { icon: <YoutubeIcon />, label: 'YouTube' },
                { icon: <Mail size={16} />, label: 'Email', href: 'mailto:hello@skinwise.ai' },
              ].map(({ icon, label, href = '#' }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Skin Quiz', '/quiz'],
                ['Skin Library', '/skin-library'],
                ['Ingredient Library', '/ingredients'],
                ['Products', '/products'],
                ['Routine Builder', '/routine-builder'],
                ['Blog', '/blog'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['About Us', '/about'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
                ['Contact Us', '/contact'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Stay Updated</h4>
            <p className="text-sm mb-4">Get skincare tips and the latest articles directly in your inbox.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-slate-800 text-white text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-500"
              />
              <button className="btn btn-primary text-sm py-2.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© 2025 SkinWise AI. All rights reserved. Made with ❤️ in India 🇮🇳</p>
          <p className="text-center">Not a substitute for medical advice. Consult a dermatologist for skin conditions.</p>
        </div>
      </div>
    </footer>
  )
}
