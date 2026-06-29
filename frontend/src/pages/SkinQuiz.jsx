import { useState } from 'react'
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw, CloudUpload, Loader, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { quizAPI, routineAPI } from '../services/api'

/* ─── Quiz data ──────────────────────────────────────────────── */
const questions = [
  {
    id: 'age', emoji: '🎂',
    question: 'What is your age group?',
    options: [
      { label: 'Under 18',  emoji: '🌱' },
      { label: '18–25',     emoji: '✨' },
      { label: '26–35',     emoji: '🌿' },
      { label: '36–45',     emoji: '🍃' },
      { label: '46+',       emoji: '🌳' },
    ],
  },
  {
    id: 'oily', emoji: '💧',
    question: 'How does your skin feel by midday?',
    options: [
      { label: 'Very oily all over',    emoji: '🛢️' },
      { label: 'Oily in T-zone only',   emoji: '💆' },
      { label: 'Normal, no shine',      emoji: '😊' },
      { label: 'Tight and dry',         emoji: '❄️' },
      { label: 'Combination — varies',  emoji: '🔄' },
    ],
  },
  {
    id: 'sensitivity', emoji: '🌸',
    question: 'How does your skin react to new products?',
    options: [
      { label: 'Rarely reacts',                    emoji: '💪' },
      { label: 'Sometimes gets red or irritated',  emoji: '😅' },
      { label: 'Often burns or stings',            emoji: '🔥' },
      { label: 'Gets dry or flaky',                emoji: '🌬️' },
      { label: 'Breaks out easily',                emoji: '😬' },
    ],
  },
  {
    id: 'acne', emoji: '🔴',
    question: 'How often do you get breakouts?',
    options: [
      { label: 'Never or very rarely',          emoji: '🌟' },
      { label: 'Occasionally (once a month)',   emoji: '📅' },
      { label: 'Frequently (weekly)',           emoji: '📆' },
      { label: 'Constantly / severe',           emoji: '⚠️' },
    ],
  },
  {
    id: 'concern', emoji: '🎯',
    question: 'What are your main skin concerns?',
    hint: 'Select all that apply',
    type: 'multi',
    options: [
      { label: 'Acne / Breakouts',         emoji: '🔴' },
      { label: 'Dark spots / Pigmentation',emoji: '🟤' },
      { label: 'Dryness',                  emoji: '❄️' },
      { label: 'Oiliness',                 emoji: '💧' },
      { label: 'Fine lines / Aging',       emoji: '⏳' },
      { label: 'Sensitivity / Redness',    emoji: '🌸' },
      { label: 'Dull skin',                emoji: '😶' },
      { label: 'Large pores',              emoji: '🔬' },
    ],
  },
  {
    id: 'budget', emoji: '💰',
    question: 'What is your monthly skincare budget?',
    options: [
      { label: 'Under ₹500',        emoji: '🪙' },
      { label: '₹500 – ₹1000',      emoji: '💵' },
      { label: '₹1000 – ₹2500',     emoji: '💳' },
      { label: '₹2500+',            emoji: '💎' },
    ],
  },
  {
    id: 'routine', emoji: '🧴',
    question: 'What is your current skincare routine like?',
    options: [
      { label: 'No routine',                           emoji: '🤷' },
      { label: 'Just face wash',                       emoji: '🚿' },
      { label: 'Cleanser + Moisturizer',               emoji: '✌️' },
      { label: 'Full routine (5+ steps)',              emoji: '📋' },
      { label: 'Using actives (AHA, Retinol etc.)',    emoji: '🔬' },
    ],
  },
]

/* ─── Logic ──────────────────────────────────────────────────── */
function determineSkinType(answers) {
  const oily = answers.oily || ''
  if (oily.includes('Very oily'))    return 'Oily'
  if (oily.includes('T-zone'))       return 'Combination'
  if (oily.includes('Tight and dry'))return 'Dry'
  if (oily.includes('Normal'))       return 'Normal'
  return 'Combination'
}

function buildRoutine(skinType, concerns = []) {
  const base = {
    Oily:        { morning: ['Foaming gel cleanser', 'Niacinamide 10% serum', 'Oil-free moisturizer', 'SPF 50 matte'],  night: ['Salicylic acid cleanser', 'BHA toner', 'Niacinamide serum', 'Light gel moisturizer'] },
    Dry:         { morning: ['Cream cleanser', 'Hyaluronic acid serum', 'Rich moisturizer', 'SPF 50'],                   night: ['Oil cleanser', 'Hyaluronic acid', 'Ceramide moisturizer', 'Face oil (optional)'] },
    Combination: { morning: ['Gentle foaming cleanser', 'Niacinamide serum', 'Lightweight moisturizer', 'SPF 50'],       night: ['Micellar water + cleanser', 'Niacinamide or AHA', 'Moisturizer'] },
    Normal:      { morning: ['Gentle cleanser', 'Antioxidant serum', 'Moisturizer', 'SPF 50'],                           night: ['Gentle cleanser', 'Treatment serum', 'Moisturizer'] },
  }
  const routine = { morning: [...(base[skinType] || base.Combination).morning], night: [...(base[skinType] || base.Combination).night] }
  if (concerns.includes('Acne / Breakouts'))       routine.night   = ['Salicylic acid cleanser', 'Niacinamide serum', 'Spot treatment (Benzoyl Peroxide)', 'Oil-free moisturizer']
  if (concerns.includes('Dark spots / Pigmentation')) routine.morning = [routine.morning[0], 'Vitamin C serum', ...routine.morning.slice(1)]
  if (concerns.includes('Fine lines / Aging'))     routine.night   = [routine.night[0], 'Retinol (2–3x/week)', 'Peptide serum', ...routine.night.slice(1)]
  return routine
}

const skinTypeInfo = {
  Oily:        { emoji: '💧', desc: 'Your skin produces excess sebum, especially in the T-zone. Focus on balancing without over-stripping.',        color: 'from-blue-500 to-cyan-500' },
  Dry:         { emoji: '❄️', desc: 'Your skin lacks moisture and may feel tight or flaky. Focus on hydration and barrier repair.',                   color: 'from-violet-500 to-purple-500' },
  Combination: { emoji: '🔄', desc: 'Your T-zone is oily but cheeks may be normal or dry. Use targeted products for each zone.',                    color: 'from-emerald-500 to-teal-500' },
  Normal:      { emoji: '✨', desc: 'Your skin is well-balanced. Focus on maintenance and prevention with a simple, consistent routine.',             color: 'from-amber-500 to-orange-500' },
}

/* ─── Component ──────────────────────────────────────────────── */
export default function SkinQuiz() {
  const { user } = useAuth()
  const [current, setCurrent]           = useState(0)
  const [answers, setAnswers]           = useState({})
  const [multiSelected, setMultiSelected] = useState([])
  const [result, setResult]             = useState(null)
  const [submitting, setSubmitting]     = useState(false)
  const [syncStatus, setSyncStatus]     = useState(null)

  const q      = questions[current]
  const isMulti = q.type === 'multi'
  const isLast  = current === questions.length - 1
  const pct     = Math.round(((current + 1) / questions.length) * 100)

  const handleSingle = (label) => {
    const newAnswers = { ...answers, [q.id]: label }
    setAnswers(newAnswers)
    if (!isLast) setCurrent(current + 1)
    else finishQuiz(newAnswers)
  }

  const handleMultiToggle = (label) =>
    setMultiSelected((prev) => prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label])

  const handleMultiNext = () => {
    const newAnswers = { ...answers, [q.id]: multiSelected }
    setAnswers(newAnswers)
    if (!isLast) { setCurrent(current + 1); setMultiSelected([]) }
    else finishQuiz(newAnswers)
  }

  const finishQuiz = async (finalAnswers) => {
    setSubmitting(true)
    const skinType = determineSkinType(finalAnswers)
    const concerns = Array.isArray(finalAnswers.concern) ? finalAnswers.concern : []
    const routine  = buildRoutine(skinType, concerns)
    setResult({ skinType, concerns, routine })
    setSubmitting(false)

    if (user) {
      setSyncStatus('saving')
      try {
        await quizAPI.submit(finalAnswers)
        await routineAPI.save({ name: `${skinType} Skin Routine`, morning: routine.morning, night: routine.night, weekly: [] })
        setSyncStatus('saved')
      } catch { setSyncStatus('error') }
    }
  }

  const reset = () => { setCurrent(0); setAnswers({}); setMultiSelected([]); setResult(null); setSyncStatus(null) }

  /* ── Loading ── */
  if (submitting) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
        <Loader size={28} className="text-blue-500 animate-spin" />
      </div>
      <p className="text-slate-600 font-medium">Analysing your skin…</p>
      <p className="text-slate-400 text-sm">Building your personalised routine</p>
    </div>
  )

  /* ── Results ── */
  if (result) {
    const info = skinTypeInfo[result.skinType] || skinTypeInfo.Combination
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Your Skin Analysis</h1>
          <p className="text-slate-500">Based on your answers, here's everything you need to know</p>
        </div>

        {/* Sync banner */}
        {syncStatus === 'saving' && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm px-4 py-3 rounded-xl mb-4">
            <Loader size={13} className="animate-spin flex-shrink-0" /> Saving to your account…
          </div>
        )}
        {syncStatus === 'saved' && (
          <div className="flex items-center justify-between bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">
            <span className="flex items-center gap-2"><CloudUpload size={13} /> Saved to your account!</span>
            <Link to="/dashboard" className="font-semibold underline">View Dashboard →</Link>
          </div>
        )}
        {syncStatus === 'error' && (
          <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm px-4 py-3 rounded-xl mb-4">
            ⚠️ Backend offline — results shown below but not saved to account yet.
          </div>
        )}
        {!user && (
          <div className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-xl mb-4 flex items-center justify-between gap-3">
            <p className="text-blue-700 text-sm">Create a free account to save these results.</p>
            <Link to="/register" className="btn btn-primary text-xs px-3 py-1.5 flex-shrink-0">Sign Up Free</Link>
          </div>
        )}

        {/* Skin type card */}
        <div className={`rounded-2xl bg-gradient-to-br ${info.color} text-white p-6 mb-5 shadow-lg`}>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{info.emoji}</span>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Your Skin Type</p>
              <h2 className="text-2xl font-extrabold mb-2">{result.skinType} Skin</h2>
              <p className="text-white/80 text-sm leading-relaxed">{info.desc}</p>
            </div>
          </div>
        </div>

        {/* Concerns */}
        {result.concerns.length > 0 && (
          <div className="card mb-5">
            <h3 className="font-bold text-slate-800 mb-3">🎯 Your Main Concerns</h3>
            <div className="flex flex-wrap gap-2">
              {result.concerns.map((c) => {
                const opt = questions.find(q => q.id === 'concern')?.options.find(o => o.label === c)
                return (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {opt?.emoji} {c}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Routine */}
        <div className="card mb-6">
          <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Zap size={16} className="text-blue-500" /> Your Personalised Routine
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-sm">☀️</div>
                <p className="font-semibold text-orange-600 text-sm">Morning</p>
              </div>
              <ol className="space-y-2.5">
                {result.routine.morning?.map((step, i) => (
                  <li key={i} className="flex items-center gap-2.5 bg-orange-50 rounded-xl px-3 py-2.5">
                    <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                    <span className="text-sm text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🌙</div>
                <p className="font-semibold text-indigo-600 text-sm">Night</p>
              </div>
              <ol className="space-y-2.5">
                {result.routine.night?.map((step, i) => (
                  <li key={i} className="flex items-center gap-2.5 bg-indigo-50 rounded-xl px-3 py-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                    <span className="text-sm text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/skin-library" className="btn btn-primary flex-1 gap-2">
            Explore Skin Library <ArrowRight size={15} />
          </Link>
          <Link to="/products" className="btn btn-secondary flex-1 gap-2">
            Find Products <ArrowRight size={15} />
          </Link>
          <button onClick={reset} className="btn btn-ghost gap-2">
            <RotateCcw size={15} /> Retake
          </button>
        </div>
      </div>
    )
  }

  /* ── Quiz Questions ── */
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Top progress bar */}
      <div className="h-1 bg-slate-200 fixed top-16 left-0 right-0 z-40">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="w-full max-w-xl mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Zap size={13} /> Question {current + 1} of {questions.length} · {pct}% complete
          </div>
          <div className="text-5xl mb-4">{q.emoji}</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">{q.question}</h2>
          {q.hint && <p className="text-slate-400 text-sm mt-1">{q.hint}</p>}
        </div>

        {/* Options */}
        <div className="w-full max-w-xl">
          {isMulti ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {q.options.map(({ label, emoji }) => {
                  const selected = multiSelected.includes(label)
                  return (
                    <button key={label} onClick={() => handleMultiToggle(label)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all text-sm font-medium ${
                        selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                        selected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                      }`}>
                        {selected && <CheckCircle size={14} className="text-white" />}
                      </span>
                      <span className="text-xl flex-shrink-0">{emoji}</span>
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-3">
                {current > 0 && (
                  <button onClick={() => setCurrent(current - 1)} className="btn btn-ghost gap-2">
                    <ArrowLeft size={15} /> Back
                  </button>
                )}
                <button onClick={handleMultiNext} disabled={multiSelected.length === 0}
                  className="btn btn-primary flex-1 gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLast ? 'Get My Results' : 'Next'} <ArrowRight size={15} />
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {q.options.map(({ label, emoji }) => (
                <button key={label} onClick={() => handleSingle(label)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all group ${
                    answers[q.id] === label
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}>
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <span className="font-medium text-sm">{label}</span>
                  <ArrowRight size={15} className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors" />
                </button>
              ))}
              {current > 0 && (
                <button onClick={() => setCurrent(current - 1)}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mt-1 pl-1">
                  <ArrowLeft size={14} /> Previous question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
