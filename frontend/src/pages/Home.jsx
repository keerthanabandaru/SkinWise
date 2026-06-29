import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowRight, Search, BookOpen, FlaskConical, ShoppingBag,
  ChevronRight, Star, Shield, Zap, Heart, Users, CheckCircle
} from 'lucide-react'
import { skinConcerns } from '../data/skinConcerns'
import { ingredients } from '../data/ingredients'
import { products } from '../data/products'

/* ── tiny star rating ── */
const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={11}
        className={i < n ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
    ))}
  </div>
)

const testimonials = [
  { name: 'Priya S.', city: 'Mumbai', text: 'Finally understood my skin type after years of random products. The quiz is spot-on!', rating: 5 },
  { name: 'Arjun K.', city: 'Bangalore', text: 'The ingredient library is so detailed. Learned more here than from any YouTube video.', rating: 5 },
  { name: 'Neha R.', city: 'Delhi', text: 'Love that all the products are available in India. No more international shipping!', rating: 4 },
]

const blogPosts = [
  { id: 1, category: 'Routine', emoji: '🧴', title: 'The Right Order to Apply Skincare Products', date: 'Jun 20, 2025', readTime: '5 min' },
  { id: 2, category: 'Ingredients', emoji: '🧪', title: 'Niacinamide vs Vitamin C: Can You Use Both?', date: 'Jun 15, 2025', readTime: '4 min' },
  { id: 3, category: 'Products', emoji: '🛍️', title: 'Best Budget Skincare Products Available in India', date: 'Jun 10, 2025', readTime: '6 min' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search)}`)
  }

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                🇮🇳 Made for Indian skin &amp; budgets
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                Science-backed <br />
                <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  skincare for you
                </span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
                Take our free skin quiz, discover the right ingredients, build a personalised routine,
                and find products actually available in India — all in one place.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 max-w-lg">
                <div className="flex-1 flex items-center px-4 gap-2">
                  <Search size={18} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search ingredients, concerns, products…"
                    className="flex-1 py-4 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-400"
                  />
                </div>
                <button type="submit" className="btn btn-primary m-1.5 rounded-xl px-5 text-sm">
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link to="/quiz" className="btn btn-primary gap-2 px-6 py-3 text-sm">
                  Take Free Skin Quiz <ArrowRight size={16} />
                </Link>
                <Link to="/skin-library" className="btn btn-outline border-white/40 text-white hover:bg-white hover:text-slate-900 px-6 py-3 text-sm">
                  Explore Skin Library
                </Link>
              </div>
            </div>

            {/* Right — floating cards */}
            <div className="hidden lg:block relative h-[420px]">
              {/* main card */}
              <div className="absolute top-0 right-0 w-72 bg-white rounded-3xl shadow-2xl p-5 text-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">R</div>
                  <div>
                    <p className="font-semibold text-sm">Rahul's Routine</p>
                    <p className="text-xs text-slate-400">Combination Skin · Acne-prone</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-semibold text-orange-500 mb-1">☀️ Morning</p>
                  {['Gel Cleanser', 'Niacinamide 10%', 'Oil-free Moisturiser', 'SPF 50'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 text-xs bg-slate-50 rounded-lg px-2.5 py-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-[10px]">{i+1}</span>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="pill bg-blue-50 text-blue-600">Combination</span>
                  <span className="pill bg-green-50 text-green-600">Acne</span>
                </div>
              </div>
              {/* floating badge 1 */}
              <div className="absolute top-36 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="text-xs text-slate-400">Top Ingredient</p>
                  <p className="font-semibold">Niacinamide</p>
                </div>
              </div>
              {/* floating badge 2 */}
              <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Quiz Result</p>
                  <p className="text-sm font-semibold text-slate-700">Combination Skin ✓</p>
                </div>
              </div>
              {/* floating badge 3 */}
              <div className="absolute bottom-0 left-8 bg-amber-400 text-white rounded-2xl shadow-xl px-4 py-3 text-sm font-bold">
                ₹599 · Minimalist Serum ⭐ 4.5
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BAR
      ═══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: '🧬', num: '50+', label: 'Skin Concerns' },
            { icon: '🧪', num: '100+', label: 'Ingredients' },
            { icon: '🛍️', num: '500+', label: 'Products' },
            { icon: '👥', num: '10K+', label: 'Users Helped' },
          ].map(({ icon, num, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 py-2">
              <span className="text-2xl">{icon}</span>
              <div className="text-left">
                <div className="text-xl font-extrabold text-slate-900">{num}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Everything you need for great skin</h2>
          <p className="section-subtitle max-w-xl mx-auto">One platform for your entire skincare journey — from understanding your skin to finding the right products.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Zap,          title: 'Skin Quiz',         desc: '7 questions. Instant results. Get your skin type and a tailored routine in under 2 minutes.',           to: '/quiz',             gradient: 'from-blue-500 to-indigo-500' },
            { icon: BookOpen,     title: 'Skin Library',      desc: 'Deep-dive guides on acne, pigmentation, dryness, sensitivity and 50+ more skin concerns.',              to: '/skin-library',     gradient: 'from-emerald-500 to-teal-500' },
            { icon: FlaskConical, title: 'Ingredient Guide',  desc: 'What every ingredient does, how to layer them, what to mix and what to avoid.',                         to: '/ingredients',      gradient: 'from-violet-500 to-purple-500' },
            { icon: ShoppingBag, title: 'India Products',    desc: 'Curated skincare picks that are actually available and affordable in India — no overseas shipping.',     to: '/products',         gradient: 'from-amber-500 to-orange-500' },
          ].map(({ icon: Icon, title, desc, to, gradient }) => (
            <Link key={title} to={to}
              className="card card-hover group flex flex-col gap-4 cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
              <span className="mt-auto text-sm font-semibold text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">How SkinWise works</h2>
            <p className="section-subtitle">Three steps to better skin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📋', title: 'Take the quiz', desc: 'Answer 7 simple questions about your skin, concerns, and lifestyle.' },
              { step: '02', icon: '🔬', title: 'Get your analysis', desc: 'Receive your skin type, key concerns, and a science-backed routine instantly.' },
              { step: '03', icon: '🛒', title: 'Find your products', desc: 'Shop from curated Indian brands that actually work for your skin type.' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="text-6xl mb-4">{icon}</div>
                <div className="absolute top-2 right-8 text-6xl font-black text-slate-100 select-none">{step}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/quiz" className="btn btn-primary px-8 py-3.5 text-base gap-2">
              Start Free Quiz <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SKIN CONCERNS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Popular Skin Concerns</h2>
            <p className="section-subtitle">Click any concern for detailed guides, routines &amp; product picks</p>
          </div>
          <Link to="/skin-library" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-500 hover:underline">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skinConcerns.map((c) => (
            <Link key={c.slug} to={`/skin-library/${c.slug}`}
              className="card card-hover text-center py-6 cursor-pointer group">
              <div className="text-4xl mb-3">{c.emoji}</div>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{c.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{c.best_ingredients.length} ingredients</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INGREDIENTS
      ═══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Popular Ingredients</h2>
              <p className="section-subtitle">Know exactly what you're putting on your skin</p>
            </div>
            <Link to="/ingredients" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-500 hover:underline">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.slice(0, 3).map((ing) => (
              <Link key={ing.slug} to={`/ingredients/${ing.slug}`}
                className="card card-hover flex gap-4 items-start cursor-pointer">
                <div className="text-4xl w-14 text-center flex-shrink-0">{ing.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="font-bold text-slate-800">{ing.name}</h3>
                    <span className="pill bg-violet-50 text-violet-600">{ing.category}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{ing.aka}</p>
                  <div className="flex flex-wrap gap-1">
                    {ing.benefits.slice(0, 2).map((b) => (
                      <span key={b} className="pill bg-green-50 text-green-700">{b}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTS
      ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Top Products in India</h2>
            <p className="section-subtitle">Affordable, effective, and widely available</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-500 hover:underline">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="card card-hover group cursor-pointer">
              {/* Product image area */}
              <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 h-40 flex items-center justify-center">
                <span className="text-5xl">{
                  p.concerns.includes('Acne') ? '🧴' :
                  p.concerns.includes('Pigmentation') ? '✨' :
                  p.concerns.includes('Sun Protection') ? '☀️' :
                  p.concerns.includes('Dryness') ? '💧' : '🌿'
                }</span>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold text-slate-600">{p.brand}</div>
                {p.rating >= 4.5 && (
                  <div className="absolute top-2 right-2 bg-amber-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">⭐ Top Rated</div>
                )}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2">{p.name}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.concerns.slice(0, 2).map((c) => (
                  <span key={c} className="pill bg-blue-50 text-blue-600">{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-base">₹{p.price}</p>
                  <Stars n={Math.floor(p.rating)} />
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn btn-outline text-xs px-3 py-1.5">
                  Buy
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">What users are saying</h2>
            <p className="section-subtitle">Real results from real people across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, city, text, rating }) => (
              <div key={name} className="card">
                <Stars n={rating} />
                <p className="text-slate-600 text-sm leading-relaxed mt-3 mb-4">"{text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-400">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">Expert skincare advice and tips</p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-500 hover:underline">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}
              className="card card-hover group cursor-pointer flex flex-col">
              <div className="h-40 rounded-xl bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center text-5xl mb-4">
                {post.emoji}
              </div>
              <span className="pill bg-blue-50 text-blue-600 self-start mb-2">{post.category}</span>
              <h3 className="font-bold text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
              <div className="mt-auto flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES ROW
      ═══════════════════════════════════════════════ */}
      <section className="bg-white border-y border-slate-100 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: Shield, title: 'Science-Backed', desc: 'Every recommendation is based on dermatological research, not trends.' },
            { icon: Heart,  title: 'Made for India',  desc: 'Products available in India at Indian prices. No international shipping needed.' },
            { icon: Users,  title: 'For Everyone',    desc: 'Whether a beginner or an expert, SkinWise helps at every level of your journey.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Icon size={22} className="text-blue-500" />
              </div>
              <h3 className="font-bold text-slate-800">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-24 px-4 text-white text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🌿</div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Ready to transform<br />your skincare routine?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Take our free 2-minute quiz and get a personalised routine built just for your skin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quiz"
              className="btn bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 text-base gap-2 shadow-xl">
              Take the Quiz — It's Free <ArrowRight size={18} />
            </Link>
            <Link to="/register"
              className="btn border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3.5 text-base">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
