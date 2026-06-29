import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Sparkles, ArrowRight, Loader } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative text-white text-center max-w-xs">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-3xl font-extrabold mb-3">Good to see<br />you back!</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Sign in to access your saved routines, quiz results, and personalised skincare dashboard.
          </p>
          <div className="mt-8 space-y-3">
            {['Saved routines sync automatically', 'Quiz results remembered', 'Personalised product picks'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SkinWise <span className="text-blue-500">AI</span></span>
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Sign in</h1>
          <p className="text-slate-500 text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 font-semibold hover:underline">Create one free</Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3.5 mb-5 flex items-start gap-2">
              <span className="text-base flex-shrink-0">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} required
                placeholder="you@example.com"
                className="input"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs text-blue-500 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange} required
                  placeholder="Enter your password"
                  className="input pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full py-3.5 text-base gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><Loader size={16} className="animate-spin" /> Signing in…</> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
