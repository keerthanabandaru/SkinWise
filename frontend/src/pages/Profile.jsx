import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import { Save, CheckCircle, Loader, Camera, ArrowRight, Shield } from 'lucide-react'
import { authAPI } from '../services/api'

export default function Profile() {
  const { user, loading } = useAuth()
  const [form, setForm]     = useState(null)
  const [saveState, setSave] = useState('idle') // idle | saving | saved | error
  const [errorMsg, setError] = useState('')

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />

  const current = form || {
    name: user.name || '', email: user.email || '',
    city: user.city || '', age: user.age || '', gender: user.gender || '',
  }

  const set = (e) => setForm({ ...current, [e.target.name]: e.target.value })

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSave('saving')
    try {
      await authAPI.updateMe({
        name:   current.name   || undefined,
        age:    current.age    ? Number(current.age) : undefined,
        gender: current.gender || undefined,
        city:   current.city   || undefined,
      })
      setSave('saved')
      setTimeout(() => setSave('idle'), 2500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save. Check if the backend is running.')
      setSave('error')
      setTimeout(() => setSave('idle'), 3000)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Profile header */}
      <div className="card mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-slate-200 shadow flex items-center justify-center text-slate-500 hover:text-blue-500 transition-colors"
            aria-label="Change avatar" title="Change avatar (coming soon)">
            <Camera size={13} />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-slate-900 truncate">{user.name}</h1>
          <p className="text-slate-500 text-sm">{user.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skin_type && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                🧬 {user.skin_type} Skin
              </span>
            )}
            {user.city && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                📍 {user.city}
              </span>
            )}
            {user.created_at && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                📅 Joined {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
        {!user.skin_type && (
          <Link to="/quiz" className="btn btn-primary text-sm gap-1.5 flex-shrink-0">
            Take Skin Quiz <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="card space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg">Edit Profile</h2>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Shield size={12} /> Your data is private
          </span>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3.5 flex items-start gap-2">
            <span className="flex-shrink-0">⚠️</span> {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input name="name" value={current.name} onChange={set}
              className="input" placeholder="Your full name" required />
          </div>

          {/* Email (read-only) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email <span className="text-slate-400 font-normal">(cannot be changed)</span>
            </label>
            <input type="email" value={current.email} readOnly
              className="input bg-slate-50 text-slate-400 cursor-not-allowed" />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
            <input type="number" name="age" value={current.age} onChange={set}
              min={10} max={100} placeholder="25" className="input" />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
            <select name="gender" value={current.gender} onChange={set} className="input bg-white">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>

          {/* City */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
            <input type="text" name="city" value={current.city} onChange={set}
              placeholder="Mumbai, Delhi, Bangalore…" className="input" />
          </div>
        </div>

        <button type="submit" disabled={saveState === 'saving'}
          className={`btn w-full py-3.5 text-base gap-2 transition-all ${
            saveState === 'saved'  ? 'bg-green-500 text-white hover:bg-green-500' :
            saveState === 'error'  ? 'bg-red-500 text-white hover:bg-red-500' :
            saveState === 'saving' ? 'btn-primary opacity-70 cursor-not-allowed' :
            'btn-primary'
          }`}>
          {saveState === 'saving' ? <><Loader size={16} className="animate-spin" /> Saving…</> :
           saveState === 'saved'  ? <><CheckCircle size={16} /> Changes Saved!</> :
           saveState === 'error'  ? '❌ Save Failed — Try Again' :
           <><Save size={16} /> Save Changes</>}
        </button>
      </form>

      {/* Danger zone */}
      <div className="card mt-5 border border-red-100">
        <h3 className="font-bold text-slate-800 mb-1">Account Actions</h3>
        <p className="text-sm text-slate-500 mb-4">These actions affect your account permanently.</p>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-ghost text-sm text-red-500 hover:bg-red-50 hover:text-red-600 border border-red-200">
            Delete Account
          </button>
          <Link to="/quiz" className="btn btn-ghost text-sm">
            Retake Skin Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
