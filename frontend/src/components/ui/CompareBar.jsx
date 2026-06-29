import { useCompare } from '../../context/CompareContext'
import { Link } from 'react-router-dom'
import { GitCompare, X, Trash2 } from 'lucide-react'

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  if (compareList.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 pointer-events-none">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 pointer-events-auto max-w-2xl w-full border border-slate-700">
        {/* Icon + count */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <GitCompare size={18} className="text-blue-400" />
          <span className="text-sm font-semibold">
            {compareList.length} / 3 selected
          </span>
        </div>

        {/* Product thumbnails */}
        <div className="flex gap-2 flex-1 overflow-hidden">
          {compareList.map((p) => (
            <div key={p.id} className="relative group">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 overflow-hidden flex items-center justify-center flex-shrink-0">
                {p.image ? (
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : <span className="text-xl">🌿</span>}
              </div>
              <button
                onClick={() => removeFromCompare(p.id)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove">
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
          {/* Empty slots */}
          {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div key={`slot-${i}`}
              className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center flex-shrink-0 text-slate-500 text-lg">
              +
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={clearCompare}
            className="btn btn-ghost text-slate-400 hover:text-red-400 text-xs px-2 py-1.5 gap-1">
            <Trash2 size={13} /> Clear
          </button>
          <Link to="/compare"
            className="btn btn-primary text-sm px-4 py-2 gap-1.5">
            <GitCompare size={14} /> Compare
          </Link>
        </div>
      </div>
    </div>
  )
}
