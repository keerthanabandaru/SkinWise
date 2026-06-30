import { createContext, useState } from 'react'

export const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  const addToCompare = (product) => {
    if (compareList.length >= 3) return
    if (compareList.find((p) => p.id === product.id)) return
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

// Re-export hook here so imports from this file keep working
export { useCompare } from '../hooks/useCompare'
