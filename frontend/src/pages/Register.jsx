import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Sparkles, ArrowRight, Loader, CheckCircle } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', age: '', gender: '', city: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8)  s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^a-zA-Z0-9]/.test(p)) s++
    return s
  })()
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'][strength]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/quiz') // take them to the quiz after registration
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative text-white text-center max-w-xs">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-3xl font-extrabold mb-3">Start your skin<br />journey today</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Create your free account and get a personalised skincare routine in under 2 minutes.
          </p>
          <div className="mt-8 space-y-3">
            {['Free forever — no credit card needed', 'Personalised routine after quiz', 'Save products and routines', 'India-specific recommendations'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SkinWise <span className="text-blue-500">AI</span></span>
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Create account</h1>
          <p className="text-slate-500 text-sm mb-8">
            Already have one?{' '}
            <Link to="/login" className="text-blue-500 font-semibold hover:underline">Sign in</Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3.5 mb-5 flex items-start gap-2">
              <span className="flex-shrink-0">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                required placeholder="Rahul Sharma" className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                required placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange} required
                  placeholder="Min. 8 characters" className="input pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPass ? 'Hide' : 'Show'}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${['','text-red-500','text-yellow-600','text-blue-500','text-green-600'][strength]}`}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age <span className="text-slate-400 font-normal">(optional)</span></label>
                <input type="number" name="age" value={form.age} onChange={handleChange}
                  min={10} max={100} placeholder="25" className="input" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender <span className="text-slate-400 font-normal">(optional)</span></label>
                <select name="gender" value={form.gender} onChange={handleChange} className="input bg-white">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">City <span className="text-slate-400 font-normal">(optional)</span></label>
              <input type="text" name="city" value={form.city} onChange={handleChange}
                placeholder="Mumbai" className="input" />
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full py-3.5 text-base gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading
                ? <><Loader size={16} className="animate-spin" /> Creating account…</>
                : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-6">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="underline">Terms</Link> and{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
