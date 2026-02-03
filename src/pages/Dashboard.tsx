import { useState } from 'react'
import { Heart, X, Settings, Globe, Church, Users, MapPin, Zap } from 'lucide-react'
import ProfileSettings from './ProfileSettings'

interface DashboardProps {
  userProfile: any
  onProfileUpdate: (profile: any) => void
}

const mockProfiles = [
  {
    id: 1,
    name: 'Grace M.',
    age: 26,
    gender: 'female',
    churchName: 'Mount of Olives Worship Centre',
    churchAttendance: 'attend',
    serviceDepartment: 'Choir',
    serviceRole: 'serve',
    bio: 'Passionate about worship and community service. Love hiking and cooking.',
    occupation: 'Nurse',
    maritalStatus: 'never-married',
    children: '0',
    photo: '👩‍🦰',
  },
  {
    id: 2,
    name: 'Tinashe K.',
    age: 31,
    gender: 'male',
    churchName: 'Harvest Chapel International',
    churchAttendance: 'attend',
    serviceDepartment: 'Deaconry',
    serviceRole: 'serve',
    bio: 'Dedicated to faith and family. Looking for a godly woman to build a life with.',
    occupation: 'Architect',
    maritalStatus: 'never-married',
    children: '0',
    photo: '👨‍💼',
  },
  {
    id: 3,
    name: 'Faith B.',
    age: 24,
    gender: 'female',
    churchName: 'Living Water Church',
    churchAttendance: 'attend',
    serviceRole: 'member',
    bio: 'Healthcare professional caring for others. Faith is my foundation.',
    occupation: 'Teacher',
    maritalStatus: 'never-married',
    children: '0',
    photo: '👩',
  },
]

export default function Dashboard({ userProfile, onProfileUpdate }: DashboardProps) {
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [subscription, setSubscription] = useState('free')
  const [sameChurchOnly, setSameChurchOnly] = useState(false)

  const currentBrowsingProfile = mockProfiles[currentProfileIndex]

  const handleLike = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % mockProfiles.length)
  }

  const handlePass = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % mockProfiles.length)
  }

  const handleSaveProfile = (updatedProfile: any) => {
    onProfileUpdate(updatedProfile)
    setShowProfileSettings(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT PANEL - User Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-20 border border-rose-100">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-rose-200">
                {userProfile.name?.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
              <p className="text-gray-600">{userProfile.age} years old</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 mb-6">
              {userProfile.churchAttendance === 'attend' && (
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <div className="flex items-start gap-2">
                    <Church className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{userProfile.churchName}</p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {userProfile.serviceRole === 'serve' ? `Dept: ${userProfile.serviceDepartment}` : 'Member'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Extended Info */}
              <div className="space-y-2 text-sm">
                {userProfile.occupation && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold">{userProfile.occupation}</span>
                  </p>
                )}
                {userProfile.maritalStatus && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="capitalize">{userProfile.maritalStatus.replace('-', ' ')}</span>
                  </p>
                )}
                {userProfile.children !== undefined && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{userProfile.children} children</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowProfileSettings(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition shadow-rose-200"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* MIDDLE PANEL - Swiping */}
        <div className="lg:col-span-2">
          {/* Church Filter Toggle (Premium) */}
          <div className="mb-6 flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border border-rose-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Church className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Same Church Connection</p>
                <p className="text-xs text-gray-500">Only see members from {userProfile.churchName || 'your church'}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={sameChurchOnly}
                onChange={(e) => setSameChurchOnly(e.target.checked)}
                disabled={subscription === 'free'}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          {/* Profile Card */}
          {currentBrowsingProfile && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 transform transition-all hover:scale-[1.01]">
              <div className="relative aspect-[4/5] bg-gradient-to-b from-rose-200 to-pink-100 flex items-center justify-center">
                <div className="text-[120px] filter drop-shadow-lg">{currentBrowsingProfile.photo}</div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-4xl font-bold">{currentBrowsingProfile.name}, {currentBrowsingProfile.age}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-90">
                    <Church className="w-5 h-5" />
                    <span className="font-semibold">{currentBrowsingProfile.churchName}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-rose-500" />
                    <span>{currentBrowsingProfile.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Heart className="w-5 h-5 text-rose-500" />
                    <span className="capitalize">{currentBrowsingProfile.maritalStatus.replace('-', ' ')}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{currentBrowsingProfile.bio}"</p>

                {/* Swiping Buttons */}
                <div className="flex gap-6">
                  <button
                    onClick={handlePass}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 transition"
                  >
                    <X className="w-8 h-8" />
                    <span className="text-xl">Pass</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-[1.02] transition shadow-lg shadow-rose-200"
                  >
                    <Heart className="w-8 h-8 fill-white" />
                    <span className="text-xl">Like</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Subscription & More */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Pricing Plans</h3>
            <div className="space-y-3">
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${subscription === 'free' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'}`}
                onClick={() => setSubscription('free')}
              >
                <p className="font-bold text-gray-800">Free</p>
                <p className="text-xs text-gray-500">Basic browsing and church info</p>
              </div>
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${subscription === 'premium' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'}`}
                onClick={() => setSubscription('premium')}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-gray-800">Premium</p>
                  <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-rose-600 font-bold">$9.99/mo</p>
                <p className="text-[10px] text-gray-500 mt-1">✓ Same Church Filter, Unlimited Likes</p>
              </div>
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${subscription === 'vip' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'}`}
                onClick={() => setSubscription('vip')}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-gray-800">VIP</p>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
                <p className="text-rose-600 font-bold">$29.99/mo</p>
                <p className="text-[10px] text-gray-500 mt-1">✓ All Premium, Verified Badge, Priority</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl cursor-pointer hover:scale-[1.02] transition"
            onClick={() => window.location.hash = 'diaspora'}
          >
            <Globe className="w-10 h-10 mb-4 opacity-80" />
            <h4 className="text-xl font-bold mb-2">Diaspora Connect</h4>
            <p className="text-sm opacity-90">Are you a woman in Zimbabwe? Connect with men abroad. Men abroad? Find your bride home.</p>
            <button className="mt-4 px-4 py-2 bg-white text-rose-600 rounded-lg font-bold text-sm">Join Section</button>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <ProfileSettings
          userProfile={userProfile}
          onClose={() => setShowProfileSettings(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}
