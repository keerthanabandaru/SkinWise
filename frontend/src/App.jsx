import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CompareProvider } from './context/CompareContext'
import Layout from './components/layout/Layout'
import CompareBar from './components/ui/CompareBar'

import Home from './pages/Home'
import SkinQuiz from './pages/SkinQuiz'
import SkinLibrary from './pages/SkinLibrary'
import Ingredients from './pages/Ingredients'
import Products from './pages/Products'
import Compare from './pages/Compare'
import RoutineBuilder from './pages/RoutineBuilder'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import About from './pages/About'

function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CompareProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<SkinQuiz />} />
              <Route path="/skin-library" element={<SkinLibrary />} />
              <Route path="/skin-library/:slug" element={<SkinLibrary />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/ingredients/:slug" element={<Ingredients />} />
              <Route path="/products" element={<Products />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/routine-builder" element={<RoutineBuilder />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          {/* Floating compare bar — shows when products are added */}
          <CompareBar />
        </CompareProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
