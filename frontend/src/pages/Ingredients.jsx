import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ingredients } from '../data/ingredients'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'
import Badge from '../components/ui/Badge'

function IngredientDetail({ ingredient }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/ingredients" className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm mb-6">
        <ArrowLeft size={14} /> Back to Ingredients
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{ingredient.emoji}</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-slate-800">{ingredient.name}</h1>
            <Badge color="purple">{ingredient.category}</Badge>
          </div>
          <p className="text-slate-500 text-sm">{ingredient.aka}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* What it is */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-2">What is {ingredient.name}?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{ingredient.what_it_is}</p>
          </div>

          {/* Benefits */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" /> Benefits
            </h2>
            <ul className="space-y-1.5">
              {ingredient.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Works well with */}
          {ingredient.works_well_with.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-500" /> Works Well With
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredient.works_well_with.map((i) => (
                  <Link key={i} to={`/ingredients/${i.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/\//g, '-')}`}>
                    <Badge color="blue">{i}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Avoid mixing */}
          {ingredient.avoid_mixing.length > 0 && (
            <div className="card border border-red-100 bg-red-50">
              <h2 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <XCircle size={16} className="text-red-500" /> Avoid Mixing With
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredient.avoid_mixing.map((i) => <Badge key={i} color="red">{i}</Badge>)}
              </div>
            </div>
          )}

          {/* Side effects */}
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-2">⚠️ Side Effects & Notes</h2>
            <p className="text-sm text-slate-600">{ingredient.side_effects}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">Quick Facts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Concentration</span>
                <span className="text-slate-700 font-medium text-right">{ingredient.concentration}</span>
              </div>
              <hr className="border-slate-100" />
              <div>
                <p className="text-slate-500 mb-1 flex items-center gap-1"><Clock size={12} /> When to Use</p>
                <p className="text-slate-700">{ingredient.when_to_use}</p>
              </div>
              <hr className="border-slate-100" />
              <div>
                <p className="text-slate-500 mb-1">Suitable For</p>
                <div className="flex flex-wrap gap-1">
                  {ingredient.suitable_for.map((s) => <Badge key={s} color="green">{s}</Badge>)}
                </div>
              </div>
            </div>
          </div>

          {ingredient.products?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-slate-800 mb-3">🛍️ Products Containing It</h3>
              <ul className="space-y-2">
                {ingredient.products.map((p) => (
                  <li key={p} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/quiz" className="btn-primary w-full text-center block">Take Skin Quiz</Link>
        </div>
      </div>
    </div>
  )
}

export default function Ingredients() {
  const { slug } = useParams()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  if (slug) {
    const ingredient = ingredients.find((i) => i.slug === slug)
    if (!ingredient) return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Ingredient not found.</p>
        <Link to="/ingredients" className="text-blue-500 hover:underline mt-2 inline-block">Back to Ingredients</Link>
      </div>
    )
    return <IngredientDetail ingredient={ingredient} />
  }

  const categories = ['All', ...new Set(ingredients.map((i) => i.category))]
  const filtered = ingredients.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.aka.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filter === 'All' || i.category === filter
    return matchSearch && matchCategory
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Ingredient Library</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Understand exactly what every ingredient does, how to layer them, and which combinations to avoid.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ingredients..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                filter === c ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ingredient) => (
          <Link
            key={ingredient.slug}
            to={`/ingredients/${ingredient.slug}`}
            className="card hover:shadow-md transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{ingredient.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{ingredient.name}</h3>
                  <Badge color="purple">{ingredient.category}</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{ingredient.aka}</p>
                <div className="flex flex-wrap gap-1">
                  {ingredient.benefits.slice(0, 2).map((b) => (
                    <Badge key={b} color="green">{b}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
