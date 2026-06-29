import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { skinConcerns } from '../data/skinConcerns'
import { ArrowLeft, AlertTriangle, FlaskConical, Utensils, Stethoscope } from 'lucide-react'
import Badge from '../components/ui/Badge'

function ConcernDetail({ concern }) {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/skin-library" className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm mb-6">
        <ArrowLeft size={14} /> Back to Skin Library
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{concern.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{concern.name}</h1>
          <p className="text-slate-500 mt-1">{concern.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Symptoms */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" /> Symptoms
            </h2>
            <ul className="space-y-1">
              {concern.symptoms.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3">🔍 Causes</h2>
            <ul className="space-y-1">
              {concern.causes.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Foods to Avoid */}
          {concern.foods_to_avoid?.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Utensils size={16} className="text-orange-500" /> Foods to Avoid
              </h2>
              <div className="flex flex-wrap gap-2">
                {concern.foods_to_avoid.map((f) => <Badge key={f} color="yellow">{f}</Badge>)}
              </div>
            </div>
          )}

          {/* Best Ingredients */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FlaskConical size={16} className="text-purple-500" /> Best Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {concern.best_ingredients.map((i) => {
                const slug = i.toLowerCase()
                  .replace(/\s*\(.*?\)\s*/g, '')   // remove parentheses content
                  .replace(/[^a-z0-9\s-]/g, '')     // remove special chars
                  .trim()
                  .replace(/\s+/g, '-')             // spaces to hyphens
                return (
                  <Link key={i} to={`/ingredients/${slug}`}>
                    <Badge color="purple">{i}</Badge>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* FAQs */}
          {concern.faqs?.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-slate-800 mb-4">❓ FAQs</h2>
              <div className="space-y-3">
                {concern.faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 flex justify-between items-center"
                    >
                      {faq.q}
                      <span className="text-slate-400 ml-4">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-3 text-sm text-slate-600 bg-slate-50">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Routine */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-4">✨ Recommended Routine</h2>
            {concern.routine?.morning && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-orange-500 mb-2">☀️ Morning</h3>
                <ol className="space-y-1.5">
                  {concern.routine.morning.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="bg-orange-100 text-orange-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {concern.routine?.night && (
              <div>
                <h3 className="text-sm font-medium text-indigo-500 mb-2">🌙 Night</h3>
                <ol className="space-y-1.5">
                  {concern.routine.night.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="bg-indigo-100 text-indigo-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Doctor Visit */}
          {concern.doctor_visit && (
            <div className="card bg-red-50 border border-red-100">
              <div className="flex items-start gap-2">
                <Stethoscope size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-700 mb-1">When to See a Doctor</h3>
                  <p className="text-xs text-red-600">{concern.doctor_visit}</p>
                </div>
              </div>
            </div>
          )}

          <Link to="/quiz" className="btn-primary w-full text-center block">
            Take Skin Quiz
          </Link>
          <Link to="/products" className="btn-outline w-full text-center block">
            Find Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SkinLibrary() {
  const { slug } = useParams()
  const [search, setSearch] = useState('')

  if (slug) {
    const concern = skinConcerns.find((c) => c.slug === slug)
    if (!concern) return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Concern not found.</p>
        <Link to="/skin-library" className="text-blue-500 hover:underline mt-2 inline-block">Back to Skin Library</Link>
      </div>
    )
    return <ConcernDetail concern={concern} />
  }

  const filtered = skinConcerns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Skin Library</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Learn about skin concerns, their causes, symptoms, and how to treat them with the right ingredients and routines.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search concerns (e.g. acne, dryness)..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((concern) => (
          <Link
            key={concern.slug}
            to={`/skin-library/${concern.slug}`}
            className="card hover:shadow-md transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{concern.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">{concern.name}</h3>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{concern.description}</p>
                <div className="flex flex-wrap gap-1">
                  {concern.best_ingredients.slice(0, 3).map((i) => (
                    <Badge key={i} color="blue">{i}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-16">No concerns found matching "{search}"</p>
      )}
    </div>
  )
}
