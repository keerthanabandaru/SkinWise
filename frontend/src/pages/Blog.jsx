import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'The Right Order to Apply Skincare Products',
    category: 'Routine',
    date: 'Jun 20, 2025',
    readTime: '5 min',
    author: 'SkinWise Team',
    excerpt: 'Layering products correctly makes all the difference in how effective your routine is.',
    content: `The order you apply skincare products matters more than most people realise. Using products in the wrong sequence can reduce their effectiveness — or worse, cause irritation.

**The general rule:** Apply thinnest to thickest consistency.

**Morning Routine Order:**
1. **Cleanser** — Start with a clean slate
2. **Toner** (optional) — Balances pH
3. **Serum** — Active ingredients penetrate best on clean skin
4. **Eye Cream** — Pat gently around the eye area
5. **Moisturiser** — Seals in hydration
6. **SPF** — Always the final step in AM. Non-negotiable.

**Night Routine Order:**
1. **Makeup Remover / Micellar Water** — Pre-cleanse
2. **Cleanser** — Double cleanse if you wore makeup or SPF
3. **Exfoliant** (2–3x/week) — AHA or BHA
4. **Treatment Serum** — Retinol, Vitamin C, etc.
5. **Moisturiser** — Rich cream at night

**Key Tips:**
- Wait 2–3 minutes between active serums
- Don't mix retinol and AHAs in the same step
- SPF is not optional — it's the most anti-aging product available`,
  },
  {
    id: 2,
    title: 'Niacinamide vs Vitamin C: Can You Use Both?',
    category: 'Ingredients',
    date: 'Jun 15, 2025',
    readTime: '4 min',
    author: 'SkinWise Team',
    excerpt: 'Debunking the myth and explaining how to use these two powerhouses together.',
    content: `One of the most common questions we get: "Can I use Niacinamide and Vitamin C together?"

The short answer: **Yes, you can.**

The old concern was that mixing them would create niacin, which causes flushing. However, this reaction only happens under extreme heat conditions that don't occur on skin.

**How to use them together:**

Option 1: **Separate AM/PM**
- Morning: Vitamin C serum → Moisturiser → SPF
- Night: Niacinamide serum → Moisturiser

Option 2: **Alternate days**
- Day 1: Vitamin C focus
- Day 2: Niacinamide focus

Option 3: **Layer them** (most people do this fine)
- Apply Vitamin C first, let it absorb, then apply Niacinamide

**The Synergy:**
Both ingredients fight pigmentation from different angles — Vitamin C blocks melanin production while Niacinamide reduces its transfer to skin cells. Together, they're very effective for dark spots.`,
  },
  {
    id: 3,
    title: 'Best Budget Skincare Products Available in India',
    category: 'Products',
    date: 'Jun 10, 2025',
    readTime: '6 min',
    author: 'SkinWise Team',
    excerpt: "You don't need to spend a fortune for great skin. Our top picks under ₹500.",
    content: `Great skincare doesn't have to be expensive. India has an incredible range of effective, affordable options.

**Under ₹500:**

1. **Minimalist Niacinamide 10%** (₹599) — One of the best niacinamide serums available. Works for oiliness, pores, and pigmentation.

2. **Neutrogena Ultra Sheer SPF 50+** (₹399) — Lightweight, non-greasy sunscreen. The most important product in any routine.

3. **Simple Kind to Skin Moisturiser** (₹349) — Fragrance-free, gentle, great for all skin types.

4. **Mamaearth Vitamin C Face Wash** (₹249) — Brightening face wash with Vitamin C.

5. **Lakme Sun Expert SPF 50** (₹299) — Budget sunscreen that gets the job done.

**Building a full routine under ₹1500:**
- Face wash: Mamaearth Vitamin C (₹249)
- Serum: Minimalist Niacinamide (₹599)
- Moisturiser: Simple (₹349)
- SPF: Neutrogena (₹399)

**Total: ₹1,596** for a complete 4-step routine with actives.`,
  },
]

function BlogPost({ post }) {
  const paragraphs = post.content.split('\n\n')
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/blog" className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm mb-6">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <Badge color="blue">{post.category}</Badge>
      <h1 className="text-3xl font-bold text-slate-800 mt-3 mb-3">{post.title}</h1>
      <div className="flex items-center gap-4 text-slate-400 text-xs mb-8">
        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
        <span>By {post.author}</span>
      </div>
      <div className="prose-sm text-slate-700 space-y-4">
        {paragraphs.map((p, i) => {
          if (p.startsWith('**') && p.endsWith('**') && !p.includes('\n')) {
            return <h2 key={i} className="text-lg font-semibold text-slate-800 mt-6">{p.replace(/\*\*/g, '')}</h2>
          }
          const lines = p.split('\n').map((line, j) => {
            if (line.startsWith('**') || line.includes('**')) {
              const parts = line.split(/\*\*(.*?)\*\*/g)
              return <span key={j}>{parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}<br /></span>
            }
            return <span key={j}>{line}<br /></span>
          })
          return <p key={i} className="leading-relaxed">{lines}</p>
        })}
      </div>
    </div>
  )
}

export default function Blog() {
  const { id } = useParams()
  if (id) {
    const post = posts.find((p) => p.id === Number(id))
    if (!post) return <div className="text-center py-16 text-slate-500">Post not found. <Link to="/blog" className="text-blue-500">Back to Blog</Link></div>
    return <BlogPost post={post} />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Skincare Blog</h1>
        <p className="text-slate-500">Expert advice, ingredient deep-dives, and routine guides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="card hover:shadow-md transition-all group">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-40 mb-4 flex items-center justify-center text-4xl">
              {post.category === 'Routine' ? '🧴' : post.category === 'Ingredients' ? '🧪' : '🛍️'}
            </div>
            <Badge color="blue">{post.category}</Badge>
            <h3 className="font-semibold text-slate-800 mt-2 mb-2 group-hover:text-blue-600 transition-colors text-lg leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
