import { useAuth } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import {
  Sun, Moon, BookOpen, ShoppingBag,
  ClipboardList, ArrowRight, Plus, TrendingUp, Zap
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [savedRoutines, setSavedRoutines] = useState([])

  useEffect(() => {
    const load = () => {
      const r = JSON.parse(localStorage.getItem('skinwise_routines') || '[]')
      setSavedRoutines(r)
    }
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />

  const firstName = user.name?.split(' ')[0] || 'there'
  const skinType  = user.skin_type || null
  const hour      = new Date().getHours()
  const greeting  = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-8 mb-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-300 text-sm mb-1">{greeting} 👋</p>
            <h1 className="text-3xl font-extrabold mb-2">{firstName}</h1>
            <p className="text-slate-300 text-sm">
              {skinType
                ? `Your skin type: `
                : `Take the quiz to discover your skin type`}
              {skinType && <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs font-semibold ml-1">{skinType} Skin</span>}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {!skinType && (
              <Link to="/quiz" className="btn bg-white text-blue-700 hover:bg-blue-50 text-sm gap-1.5 px-4 py-2.5">
                <Zap size={14} /> Take Skin Quiz
              </Link>
            )}
            <Link to="/routine-builder" className="btn border border-white/30 text-white hover:bg-white/10 text-sm gap-1.5 px-4 py-2.5">
              <Plus size={14} /> New Routine
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Skin Type',       value: skinType || '—',            icon: '🧬', color: 'from-blue-500 to-indigo-500' },
          { label: 'Saved Routines',  value: savedRoutines.length,        icon: '📋', color: 'from-emerald-500 to-teal-500' },
          { label: 'Quiz Status',     value: skinType ? 'Completed' : 'Not taken', icon: '✅', color: 'from-violet-500 to-purple-500' },
          { label: 'Member Since',    value: user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Today', icon: '📅', color: 'from-amber-500 to-orange-500' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg flex-shrink-0`}>
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400 truncate">{label}</p>
              <p className="font-bold text-slate-800 text-sm truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: Routines ── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-800 text-lg">Saved Routines</h2>
              <Link to="/routine-builder"
                className="btn btn-ghost text-xs gap-1 px-3 py-1.5">
                <Plus size={13} /> New
              </Link>
            </div>

            {savedRoutines.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 text-center py-12">
                <div className="text-4xl mb-3">📋</div>
                <p className="font-semibold text-slate-700 mb-1">No routines yet</p>
                <p className="text-slate-400 text-sm mb-4">Build your first morning or night routine</p>
                <Link to="/routine-builder" className="btn btn-primary text-sm px-5 py-2 gap-1.5">
                  <Plus size={14} /> Build a Routine
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedRoutines.slice(0, 3).map((routine, i) => (
                  <div key={i} className="border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-700">{routine.name}</h3>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                        {new Date(routine.savedAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-orange-500 font-semibold mb-2 flex items-center gap-1">
                          <Sun size={11} /> Morning · {routine.morning?.length} steps
                        </p>
                        <ul className="space-y-1">
                          {routine.morning?.slice(0, 3).map((s, j) => (
                            <li key={j} className="text-xs text-slate-500 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">{j+1}</span>
                              {s}
                            </li>
                          ))}
                          {routine.morning?.length > 3 && (
                            <li className="text-xs text-slate-400 pl-5">+{routine.morning.length - 3} more steps</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-indigo-500 font-semibold mb-2 flex items-center gap-1">
                          <Moon size={11} /> Night · {routine.night?.length} steps
                        </p>
                        <ul className="space-y-1">
                          {routine.night?.slice(0, 3).map((s, j) => (
                            <li key={j} className="text-xs text-slate-500 flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">{j+1}</span>
                              {s}
                            </li>
                          ))}
                          {routine.night?.length > 3 && (
                            <li className="text-xs text-slate-400 pl-5">+{routine.night.length - 3} more steps</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                {savedRoutines.length > 3 && (
                  <p className="text-center text-sm text-slate-400">+{savedRoutines.length - 3} more routines saved</p>
                )}
              </div>
            )}
          </div>

          {/* Quiz prompt if not taken */}
          {!skinType && (
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">🔬</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 mb-1">Discover your skin type</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    Answer 7 quick questions and get your personalised routine and product picks.
                  </p>
                  <Link to="/quiz" className="btn btn-primary text-sm px-5 py-2 gap-1.5">
                    <Zap size={14} /> Take the Skin Quiz
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-5">
          {/* Profile card */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
              {user.city && (
                <div className="flex justify-between">
                  <span className="text-slate-400">City</span>
                  <span className="font-medium text-slate-700">{user.city}</span>
                </div>
              )}
              {user.age && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Age</span>
                  <span className="font-medium text-slate-700">{user.age}</span>
                </div>
              )}
              {user.gender && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Gender</span>
                  <span className="font-medium text-slate-700 capitalize">{user.gender}</span>
                </div>
              )}
            </div>
            <Link to="/profile" className="btn btn-ghost w-full text-sm mt-4">Edit Profile</Link>
          </div>

          {/* Quick links */}
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-3">Quick Access</h3>
            <div className="space-y-1">
              {[
                { to: '/quiz',            icon: Zap,          label: 'Skin Quiz',        color: 'text-blue-500' },
                { to: '/skin-library',   icon: BookOpen,     label: 'Skin Library',     color: 'text-emerald-500' },
                { to: '/products',       icon: ShoppingBag,  label: 'Products',         color: 'text-amber-500' },
                { to: '/routine-builder',icon: ClipboardList,label: 'Routine Builder',  color: 'text-violet-500' },
                { to: '/ingredients',   icon: TrendingUp,   label: 'Ingredients',      color: 'text-pink-500' },
              ].map(({ to, icon: Icon, label, color }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <Icon size={15} className={color} />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">{label}</span>
                  <ArrowRight size={12} className="text-slate-300 ml-auto group-hover:text-slate-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
