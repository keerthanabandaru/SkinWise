import { useCompare } from '../context/CompareContext'
import { Link } from 'react-router-dom'
import { Trash2, Star, ExternalLink, ArrowLeft, GitCompare } from 'lucide-react'

const Stars = ({ n = 0 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12}
        className={i < Math.floor(n) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
    ))}
  </div>
)

const rows = [
  { label: 'Brand',     key: 'brand' },
  { label: 'Price',     key: 'price',    format: (v) => `₹${v}` },
  { label: 'Skin Type', key: 'skin_type' },
  { label: 'Rating',    key: 'rating',   format: (v) => <Stars n={v} /> },
  { label: 'Concerns',  key: 'concerns', format: (v) => (
    <div className="flex flex-wrap gap-1">
      {v.map((c) => (
        <span key={c} className="pill bg-blue-50 text-blue-600">{c}</span>
      ))}
    </div>
  )},
]

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  if (compareList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">⚖️</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">No products to compare</h1>
        <p className="text-slate-500 mb-8">
          Go to the Products page and click the compare button on up to 3 products.
        </p>
        <Link to="/products" className="btn btn-primary px-8 py-3 gap-2">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <Link to="/products" className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm mb-2">
            <ArrowLeft size={14} /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <GitCompare size={28} className="text-blue-500" /> Compare Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">Comparing {compareList.length} product{compareList.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={clearCompare} className="btn btn-ghost text-sm text-red-500 gap-1.5">
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      {/* Product Images Header */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="w-40 text-left pb-4 text-sm font-semibold text-slate-500 uppercase tracking-wide">Feature</th>
              {compareList.map((p) => (
                <th key={p.id} className="pb-4 px-4">
                  <div className="card relative text-center">
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-50 hover:bg-red-100 text-red-400 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Remove from compare"
                    >
                      <Trash2 size={12} />
                    </button>

                    {/* Product image */}
                    <div className="w-full h-36 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center mb-3 overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.name}
                          className="h-full w-full object-contain p-2"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <span className="text-5xl">🌿</span>
                      )}
                    </div>

                    <p className="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.brand}</p>
                  </div>
                </th>
              ))}
              {/* Empty placeholder slots */}
              {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <th key={`empty-${i}`} className="pb-4 px-4">
                  <div className="card border-2 border-dashed border-slate-200 text-center h-[220px] flex flex-col items-center justify-center">
                    <span className="text-3xl mb-2">➕</span>
                    <p className="text-sm text-slate-400">Add a product</p>
                    <Link to="/products" className="text-blue-500 text-xs mt-1 hover:underline">Browse →</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Comparison rows */}
          <tbody>
            {rows.map(({ label, key, format }, rowIdx) => (
              <tr key={key} className={rowIdx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                <td className="py-4 pr-4 text-sm font-semibold text-slate-600 rounded-l-xl pl-4">{label}</td>
                {compareList.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-sm text-slate-700 text-center">
                    {format ? format(p[key]) : (p[key] || '—')}
                  </td>
                ))}
                {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-${i}`} className="py-4 px-4 text-slate-300 text-center text-lg">—</td>
                ))}
              </tr>
            ))}

            {/* Buy row */}
            <tr className="bg-white">
              <td className="py-5 pr-4 text-sm font-semibold text-slate-600 pl-4 rounded-l-xl">Buy</td>
              {compareList.map((p) => (
                <td key={p.id} className="py-5 px-4 text-center">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="btn btn-primary text-xs px-4 py-2 gap-1">
                      Buy Now <ExternalLink size={11} />
                    </a>
                  ) : <span className="text-slate-300">—</span>}
                </td>
              ))}
              {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <td key={`empty-${i}`} className="py-5 px-4" />
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tip */}
      <div className="mt-8 card bg-blue-50 border border-blue-100">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> You can compare up to 3 products at once.
          Click the ⚖️ icon on any product card in the <Link to="/products" className="underline font-medium">Products page</Link> to add it here.
        </p>
      </div>
    </div>
  )
}
