import { Star, ExternalLink, Bookmark, BookmarkCheck, GitCompare } from 'lucide-react'
import { useState } from 'react'
import { useCompare } from '../../context/CompareContext'

const fallbackEmoji = (concerns = []) => {
  if (concerns.includes('Acne'))           return '🧴'
  if (concerns.includes('Pigmentation'))   return '✨'
  if (concerns.includes('Sun Protection')) return '☀️'
  if (concerns.includes('Dryness'))        return '💧'
  if (concerns.includes('Anti-Aging'))     return '⏳'
  return '🌿'
}

export default function ProductCard({ product }) {
  const [saved, setSaved]       = useState(false)
  const [imgError, setImgError] = useState(false)
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare()

  const { name, brand, price, rating, skin_type, link, concerns = [], image } = product
  const inCompare  = isInCompare(product.id)
  const compareFull = compareList.length >= 3 && !inCompare

  const handleCompare = (e) => {
    e.preventDefault()
    if (inCompare) removeFromCompare(product.id)
    else addToCompare(product)
  }

  return (
    <div className="card card-hover group flex flex-col">
      {/* Image */}
      <div className="relative mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 h-52 flex items-center justify-center flex-shrink-0 border border-slate-100">
        {image && !imgError ? (
          <img src={image} alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl transition-transform group-hover:scale-110 duration-300">
            {fallbackEmoji(concerns)}
          </span>
        )}

        {/* Brand pill */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-slate-100">
          {brand}
        </div>

        {/* Top-right actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {/* Bookmark */}
          <button onClick={(e) => { e.preventDefault(); setSaved(!saved) }}
            className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform border border-slate-100"
            aria-label={saved ? 'Unsave' : 'Save'}>
            {saved
              ? <BookmarkCheck size={15} className="text-blue-500" />
              : <Bookmark size={15} className="text-slate-400" />}
          </button>

          {/* Compare */}
          <button onClick={handleCompare}
            disabled={compareFull}
            title={compareFull ? 'Compare list full (max 3)' : inCompare ? 'Remove from compare' : 'Add to compare'}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all ${
              inCompare
                ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'
                : compareFull
                  ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'bg-white/95 border-slate-100 text-slate-400 hover:text-blue-500 hover:scale-110'
            }`}
            aria-label="Compare">
            <GitCompare size={13} />
          </button>
        </div>

        {/* Top-rated badge */}
        {rating >= 4.5 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            ⭐ TOP RATED
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{name}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {skin_type && skin_type !== 'All' && (
            <span className="pill bg-blue-50 text-blue-600">{skin_type}</span>
          )}
          {concerns.slice(0, 2).map((c) => (
            <span key={c} className="pill bg-green-50 text-green-700">{c}</span>
          ))}
        </div>

        {/* Price + rating + buy */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="font-extrabold text-slate-900 text-base">₹{price}</p>
            {rating && (
              <div className="flex items-center gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10}
                    className={i < Math.floor(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200 fill-slate-200'} />
                ))}
                <span className="text-xs text-slate-400 ml-1">{rating}</span>
              </div>
            )}
          </div>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline text-xs px-3 py-1.5 gap-1">
              Buy <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
