import { createContext, useContext, useState } from 'react'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  const addToCompare = (product) => {
    if (compareList.length >= 3) return // max 3
    if (compareList.find((p) => p.id === product.id)) return // already added
    setCompareList((prev) => [...prev, product])
  }

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id))
  }

  const clearCompare = () => setCompareList([])

  const isInCompare = (id) => compareList.some((p) => p.id === id)

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be inside CompareProvider')
  return ctx
}
