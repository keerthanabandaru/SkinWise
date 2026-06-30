import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import Logo from '../ui/Logo'

const navLinks = [
  { to: '/quiz',            label: 'Skin Quiz' },
  { to: '/skin-library',   label: 'Skin Library' },
  { to: '/ingredients',    label: 'Ingredients' },
  { to: '/products',       label: 'Products' },
  { to: '/routine-builder',label: 'Routine Builder' },
  { to: '/blog',           label: 'Blog' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const [open, setOpen]           = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const profileRef = useRef(null)

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change (deferred to avoid sync setState in effect)
  useEffect(() => {
    const id = setTimeout(() => setOpen(false), 0)
    return () => clearTimeout(id)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Logo size={34} />
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Skin<span className="text-blue-500">Wise</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* ── Auth ── */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span>{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <LayoutDashboard size={15} className="text-blue-500" /> Dashboard
                    </Link>
                    <Link to="/profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <User size={15} className="text-slate-400" /> My Profile
                    </Link>
                    <hr className="my-1.5 border-slate-100" />
                    <button onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost text-sm px-4 py-2">Log in</Link>
                <Link to="/register" className="btn btn-primary text-sm px-4 py-2">Get Started Free</Link>
              </div>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-slate-100 mt-2">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                  <LayoutDashboard size={15} className="text-blue-500" /> Dashboard
                </Link>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                  <User size={15} /> Profile
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost flex-1 text-sm">Log in</Link>
                <Link to="/register" className="btn btn-primary flex-1 text-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
