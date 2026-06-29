import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import { SlidersHorizontal, X } from 'lucide-react'

const allBrands = [...new Set(products.map((p) => p.brand))]
const allConcerns = [...new Set(products.flatMap((p) => p.concerns))]
const allSkinTypes = [...new Set(products.map((p) => p.skin_type))]

export default function Products() {
  const [searchParams] = useSearchParams()

  // Derive search from URL param so typing in Home search bar works instantly
  const urlQuery = searchParams.get('q') || ''
  const [search, setSearch] = useState(urlQuery)
  const [brand, setBrand] = useState('All')
  const [skinType, setSkinType] = useState('All')
  const [concern, setConcern] = useState('All')
  const [maxPrice, setMaxPrice] = useState(2500)
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      const matchBrand = brand === 'All' || p.brand === brand
      const matchSkin = skinType === 'All' || p.skin_type === skinType || p.skin_type === 'All'
      const matchConcern = concern === 'All' || p.concerns.includes(concern)
      const matchPrice = p.price <= maxPrice
      return matchSearch && matchBrand && matchSkin && matchConcern && matchPrice
    })

    if (sortBy === 'rating') result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price)

    return result
  }, [search, brand, skinType, concern, maxPrice, sortBy])

  const clearFilters = () => {
    setSearch('')
    setBrand('All')
    setSkinType('All')
    setConcern('All')
    setMaxPrice(2500)
    setSortBy('rating')
  }

  const hasFilters = brand !== 'All' || skinType !== 'All' || concern !== 'All' || maxPrice < 2500 || search !== ''

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Curated skincare products available in India</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-56 flex-shrink-0`}>
          <div className="card sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Filters</h3>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                  <X size={12} /> Clear
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Product or brand..."
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All Brands</option>
                  {allBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Skin Type */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Skin Type</label>
                <select
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All Types</option>
                  {allSkinTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Concern */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Concern</label>
                <select
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="All">All Concerns</option>
                  {allConcerns.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Max Price: ₹{maxPrice}
                </label>
                <input
                  type="range"
                  min={100}
                  max={2500}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                  <span>₹100</span><span>₹2500</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-4">{filtered.length} products found</p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg mb-2">No products found</p>
              <button onClick={clearFilters} className="text-blue-500 text-sm hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
