import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ placeholder = 'Search...', onSearch, className = '' }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm bg-white"
      />
    </form>
  )
}
