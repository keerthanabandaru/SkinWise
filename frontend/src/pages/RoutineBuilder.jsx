import { useState } from 'react'
import { Plus, Trash2, Sun, Save, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { routineAPI } from '../services/api'

const suggestions = {
  morning: ['Foaming Cleanser', 'Micellar Water', 'Toner', 'Vitamin C Serum', 'Niacinamide Serum', 'Hyaluronic Acid', 'Eye Cream', 'Moisturizer', 'SPF 50'],
  night:   ['Makeup Remover', 'Oil Cleanser', 'Foam Cleanser', 'Exfoliant (2–3x/week)', 'Toner', 'Retinol', 'Treatment Serum', 'Eye Cream', 'Moisturizer', 'Face Oil'],
}

const tips = [
  { icon: '📏', text: 'Apply thinnest to thickest — serums before moisturizer.' },
  { icon: '☀️', text: 'SPF is the last step every morning. Never skip it.' },
  { icon: '⚗️', text: "Don't mix Retinol + AHAs/BHAs in the same step." },
  { icon: '⏱️', text: 'Wait 2–3 mins between active serums to avoid pilling.' },
  { icon: '🆕', text: 'Introduce one new active at a time to spot reactions.' },
]

function StepList({ type, steps, onAdd, onRemove, onUpdate }) {
  const [input, setInput] = useState('')
  const isM = type === 'morning'

  const add = () => {
    const v = input.trim()
    if (v) { onAdd(type, v); setInput('') }
  }

  const quickSuggestions = suggestions[type].filter(s => !steps.includes(s)).slice(0, 5)

  return (
    <div className="card flex-1 flex flex-col gap-4">
      {/* Header */}
      <div className={`flex items-center gap-3 pb-3 border-b ${isM ? 'border-orange-100' : 'border-indigo-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isM ? 'bg-orange-50' : 'bg-indigo-50'}`}>
          {isM ? '☀️' : '🌙'}
        </div>
        <div>
          <h3 className={`font-bold text-base ${isM ? 'text-orange-600' : 'text-indigo-600'}`}>
            {isM ? 'Morning Routine' : 'Night Routine'}
          </h3>
          <p className="text-xs text-slate-400">{steps.length} step{steps.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2 min-h-[120px]">
        {steps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 rounded-2xl border-2 border-dashed border-slate-200">
            <span className="text-3xl mb-2">{isM ? '☀️' : '🌙'}</span>
            <p className="text-slate-400 text-sm">Add your first step below</p>
          </div>
        ) : steps.map((step, i) => (
          <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${isM ? 'bg-orange-50' : 'bg-indigo-50'}`}>
            <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${
              isM ? 'bg-orange-200 text-orange-700' : 'bg-indigo-200 text-indigo-700'
            }`}>{i + 1}</span>
            <input
              value={step}
              onChange={(e) => onUpdate(type, i, e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none font-medium"
            />
            <button onClick={() => onRemove(type, i)}
              className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
              aria-label="Remove step">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add input */}
      <div className="flex gap-2">
        <input
          type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Type a step and press Enter…"
          className="input text-sm flex-1"
          list={`sugg-${type}`}
        />
        <datalist id={`sugg-${type}`}>
          {suggestions[type].map(s => <option key={s} value={s} />)}
        </datalist>
        <button onClick={add} className={`btn text-sm px-3 py-2 gap-1 ${isM ? 'btn-secondary' : 'btn-primary'}`}>
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Quick add chips */}
      {quickSuggestions.length > 0 && (
        <div>
          <p className="text-xs text-slate-400 mb-1.5">Quick add:</p>
          <div className="flex flex-wrap gap-1.5">
            {quickSuggestions.map(s => (
              <button key={s} onClick={() => onAdd(type, s)}
                className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RoutineBuilder() {
  const { user } = useAuth()
  const [name, setName]     = useState('My Skincare Routine')
  const [morning, setM]     = useState(['Foaming Cleanser', 'Niacinamide Serum', 'Moisturizer', 'SPF 50'])
  const [night, setN]       = useState(['Oil Cleanser', 'Foam Cleanser', 'Treatment Serum', 'Moisturizer'])
  const [saveState, setSave] = useState('idle') // idle | saving | saved | error

  const add    = (t, s) => t === 'morning' ? setM(p => [...p, s]) : setN(p => [...p, s])
  const remove = (t, i) => t === 'morning' ? setM(p => p.filter((_, j) => j !== i)) : setN(p => p.filter((_, j) => j !== i))
  const update = (t, i, v) => t === 'morning' ? setM(p => p.map((s, j) => j === i ? v : s)) : setN(p => p.map((s, j) => j === i ? v : s))

  const handleSave = async () => {
    if (saveState === 'saving') return
    setSave('saving')

    const routine = { name, morning, night, savedAt: new Date().toISOString() }

    // Always save locally
    const existing = JSON.parse(localStorage.getItem('skinwise_routines') || '[]')
    localStorage.setItem('skinwise_routines', JSON.stringify([routine, ...existing]))

    // Also save to backend if logged in
    if (user) {
      try {
        await routineAPI.save({ name, morning, night, weekly: [] })
      } catch { /* backend offline — local save already done */ }
    }

    setSave('saved')
    setTimeout(() => setSave('idle'), 2500)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
          🧴 Routine Builder
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Build Your Routine</h1>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Add, edit, and organise your morning and night skincare steps. Get a personalised routine from the quiz or build one from scratch.
        </p>
      </div>

      {/* Routine name + save */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Routine Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full text-lg font-bold text-slate-900 bg-transparent border-b-2 border-slate-200 focus:outline-none focus:border-blue-500 py-1 transition-colors"
              placeholder="My Skincare Routine"
            />
          </div>
          <button onClick={handleSave} disabled={saveState === 'saving'}
            className={`btn gap-2 text-sm px-5 py-2.5 flex-shrink-0 transition-all ${
              saveState === 'saved'  ? 'bg-green-500 text-white hover:bg-green-500' :
              saveState === 'saving' ? 'btn-ghost opacity-70 cursor-not-allowed' :
              'btn-primary'
            }`}>
            {saveState === 'saving' ? <><Save size={14} className="animate-pulse" /> Saving…</> :
             saveState === 'saved'  ? <><CheckCircle size={14} /> Saved!</> :
             <><Save size={14} /> Save Routine</>}
          </button>
        </div>
        {!user && (
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            💡 <Link to="/login" className="text-blue-500 hover:underline font-medium">Sign in</Link> to sync your routine across devices.
          </p>
        )}
      </div>

      {/* Morning + Night side by side */}
      <div className="flex flex-col lg:flex-row gap-5 mb-8">
        <StepList type="morning" steps={morning} onAdd={add} onRemove={remove} onUpdate={update} />
        <StepList type="night"   steps={night}   onAdd={add} onRemove={remove} onUpdate={update} />
      </div>

      {/* Tips */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" /> Routine Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tips.map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-2.5 bg-white rounded-xl px-3.5 py-2.5">
              <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
              <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA if no account */}
      {!user && (
        <div className="mt-6 card border border-blue-100 bg-blue-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-800 mb-0.5">Want to take your routine further?</p>
            <p className="text-sm text-slate-500">Take the skin quiz to get an AI-powered routine built for your exact skin type.</p>
          </div>
          <Link to="/quiz" className="btn btn-primary text-sm gap-1.5 flex-shrink-0">
            <Sun size={14} /> Take Skin Quiz <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  )
}
