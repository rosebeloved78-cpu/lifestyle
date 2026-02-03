import { useState } from 'react'
import { Menu, X, Heart, MapPin, Church } from 'lucide-react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import DiasporaConnect from './pages/DiasporaConnect'

type PageType = 'home' | 'signup' | 'dashboard' | 'diaspora'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  const handleSignUpComplete = (profile: any) => {
    setUserProfile(profile)
    setCurrentPage('dashboard')
  }

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(updatedProfile)
  }

  const navigateTo = (page: PageType) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-200 via-blue-200 to-blue-100 flex flex-col">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => navigateTo('home')}
            >
              <div className="p-2 bg-rose-500 rounded-xl group-hover:rotate-12 transition-transform">
                <Heart className="w-8 h-8 fill-white text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-rose-600 tracking-tighter leading-none">Lifestyle</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Connect</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => navigateTo('home')} 
                className={`px-4 py-2 rounded-xl font-bold transition ${currentPage === 'home' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'}`}
              >
                Home
              </button>
              
              {!userProfile && (
                <button 
                  onClick={() => navigateTo('signup')} 
                  className={`px-4 py-2 rounded-xl font-bold transition ${currentPage === 'signup' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'}`}
                >
                  Sign Up
                </button>
              )}

              {userProfile && (
                <>
                  <button 
                    onClick={() => navigateTo('dashboard')} 
                    className={`px-4 py-2 rounded-xl font-bold transition ${currentPage === 'dashboard' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigateTo('diaspora')} 
                    className={`px-4 py-2 rounded-xl font-bold transition ${currentPage === 'diaspora' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'}`}
                  >
                    Diaspora
                  </button>
                  <div className="ml-4 flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {userProfile.name?.charAt(0)}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-rose-50 rounded-lg transition" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 space-y-2 animate-in slide-in-from-top duration-300">
              <button 
                onClick={() => navigateTo('home')} 
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
              >
                Home
              </button>
              {!userProfile && (
                <button 
                  onClick={() => navigateTo('signup')} 
                  className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                >
                  Sign Up
                </button>
              )}
              {userProfile && (
                <>
                  <button 
                    onClick={() => navigateTo('dashboard')} 
                    className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigateTo('diaspora')} 
                    className="block w-full text-left px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition"
                  >
                    Diaspora
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 pb-20">
        {currentPage === 'home' && <Home onGetStarted={() => navigateTo('signup')} />}
        {currentPage === 'signup' && <SignUp onSignUpComplete={handleSignUpComplete} />}
        {currentPage === 'dashboard' && userProfile && (
          <Dashboard 
            userProfile={userProfile} 
            onProfileUpdate={handleProfileUpdate} 
          />
        )}
        {currentPage === 'diaspora' && <DiasporaConnect />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <span className="text-2xl font-black tracking-tighter">Lifestyle Connect</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering Zimbabwean Christians to find lifelong partners through shared faith, 
                values, and community. Zimbabwe's #1 faith-based connection platform.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-rose-400">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                <li><button onClick={() => navigateTo('home')} className="hover:text-white transition">Home</button></li>
                {!userProfile && <li><button onClick={() => navigateTo('signup')} className="hover:text-white transition">Join Community</button></li>}
                {userProfile && <li><button onClick={() => navigateTo('dashboard')} className="hover:text-white transition">Dashboard</button></li>}
                <li><button onClick={() => navigateTo('diaspora')} className="hover:text-white transition">Diaspora Connect</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-rose-400">Community</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-2 italic">
                  <Church className="w-4 h-4" />
                  Same Church Network
                </li>
                <li>Success Stories</li>
                <li>Faith Guidance</li>
                <li>Safety Standards</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-rose-400">Connect</h4>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  Harare, Zimbabwe
                </p>
                <p className="text-sm">support@lifestyleconnect.zw</p>
                <div className="pt-4 flex gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-rose-500 transition cursor-pointer">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-medium">
              &copy; 2024 Lifestyle Connect. Zimbabwe Only. Built with faith.
            </p>
            <div className="flex gap-8 text-sm text-gray-500">
              <span className="hover:text-rose-400 cursor-pointer transition">Terms</span>
              <span className="hover:text-rose-400 cursor-pointer transition">Privacy</span>
              <span className="hover:text-rose-400 cursor-pointer transition">Safety</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
