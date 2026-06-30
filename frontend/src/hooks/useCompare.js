import { useContext } from 'react'
import { CompareContext } from '../context/CompareContext'

export const useCompare = () => {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be inside CompareProvider')
  return ctx
}
