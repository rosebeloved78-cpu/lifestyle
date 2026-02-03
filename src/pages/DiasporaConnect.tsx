import { useState } from 'react'
import { MapPin, Heart, Video, DollarSign, Check } from 'lucide-react'

const womenProfiles = [
  {
    id: 1,
    name: 'Nomsa',
    age: 27,
    location: 'Harare',
    churchName: 'Mount of Olives',
    churchAttendance: 'attend',
    bio: 'Teacher with passion for education and community work.',
    vetted: false,
    photo: '👩‍🏫',
  },
  {
    id: 2,
    name: 'Thandeka',
    age: 25,
    location: 'Bulawayo',
    churchName: 'Living Water Church',
    churchAttendance: 'attend',
    bio: 'Healthcare professional caring for others.',
    vetted: true,
    photo: '👩‍⚕️',
  },
  {
    id: 3,
    name: 'Sibongile',
    age: 29,
    location: 'Harare',
    churchName: 'Harvest Chapel',
    churchAttendance: 'attend',
    bio: 'Entrepreneur and philanthropist.',
    vetted: false,
    photo: '👩‍💼',
  },
]

export default function DiasporaConnect() {
  const [userType, setUserType] = useState<'man' | 'woman' | null>(null)
  const [subscription, setSubscription] = useState<'basic' | 'vetted' | null>(null)

  if (!userType) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Diaspora Connect</h1>
          <p className="text-xl text-gray-600">Connect Zimbabweans across borders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Men */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-4">For Zimbabwean Men</h2>
              <p className="text-lg">Looking for connections back home?</p>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Our Plans:</h3>
                <div className="space-y-4">
                  <div className="border border-blue-200 rounded-lg p-4">
                    <p className="font-bold text-gray-800 mb-2">Basic Plan - $20/month</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Browse profiles</li>
                      <li>✓ Video calls</li>
                      <li>✓ Messaging</li>
                    </ul>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4">
                    <p className="font-bold text-gray-800 mb-2">Vetted Plan - $50/month</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ All Basic features</li>
                      <li>✓ Vetted women only</li>
                      <li>✓ Face-to-face verified</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setUserType('man')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition"
              >
                I'm a Man
              </button>
            </div>
          </div>

          {/* For Women */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-8">
              <h2 className="text-3xl font-bold mb-4">For Zimbabwean Women</h2>
              <p className="text-lg">Meet men looking for genuine connections</p>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Benefits:</h3>
                <div className="space-y-4">
                  <div className="border border-rose-200 rounded-lg p-4">
                    <p className="font-bold text-gray-800 mb-2">FREE Membership</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Create profile</li>
                      <li>✓ Receive messages</li>
                      <li>✓ Video calls</li>
                    </ul>
                  </div>
                  <div className="border border-rose-200 rounded-lg p-4">
                    <p className="font-bold text-gray-800 mb-2">Optional Vetting</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Harare: $100</li>
                      <li>✓ Outside Harare: $200</li>
                      <li>✓ Face-to-face verification</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setUserType('woman')}
                className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition"
              >
                I'm a Woman
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (userType === 'man') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => {
            setUserType(null)
            setSubscription(null)
          }}
          className="mb-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back
        </button>

        {!subscription ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Choose Your Plan</h1>
            <p className="text-center text-gray-600 mb-12">All men verified. Women are in Zimbabwe.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-2 border-gray-200">
                <div className="bg-blue-50 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Plan</h2>
                  <p className="text-4xl font-bold text-blue-600 mb-4">$20<span className="text-lg text-gray-600">/month</span></p>
                  <p className="text-gray-600">Browse all available women</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Browse all women's profiles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Video calls with women</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Messaging and chat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Connection verification</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setSubscription('basic')}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Choose Basic
                  </button>
                </div>
              </div>

              {/* Vetted Plan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-2 border-blue-500">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-yellow-400 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">RECOMMENDED</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Vetted Plan</h2>
                  <p className="text-4xl font-bold mb-4">$50<span className="text-lg text-blue-100">/month</span></p>
                  <p className="text-blue-100">Connect with verified women</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">All Basic features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Vetted women only</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Face-to-face interviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Background verification</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setSubscription('vetted')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition"
                  >
                    Choose Vetted
                  </button>
                </div>
              </div>
            </div>

            {/* Vetting Info */}
            <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How Our Vetting Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    In Harare
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Face-to-face interviews conducted by our administration team at central location.
                  </p>
                  <p className="text-lg font-bold text-blue-600">$100 per woman</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Outside Harare
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Includes travel and accommodation costs for interviews in other provinces.
                  </p>
                  <p className="text-lg font-bold text-blue-600">$200 per woman</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSubscription(null)}
              className="mb-8 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Change Plan
            </button>

            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                {subscription === 'basic' ? 'Browse Women' : 'Vetted Women'}
              </h1>
              <p className="text-center text-gray-600 mb-12">
                {subscription === 'basic' 
                  ? 'Connect with women from Zimbabwe' 
                  : 'Women verified through face-to-face interviews'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {womenProfiles.map(woman => (
                  <div key={woman.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                    <div className="text-center py-12 bg-gradient-to-b from-rose-100 to-pink-100">
                      <div className="text-6xl mb-4">{woman.photo}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{woman.name}, {woman.age}</h3>
                      <p className="text-gray-600 flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" />
                        {woman.location}
                      </p>

                      {woman.vetted && (
                        <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-700">Verified</span>
                        </div>
                      )}

                      {subscription === 'vetted' && !woman.vetted && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-xs font-semibold text-blue-700">
                            Request vetting for ${woman.location === 'Harare' ? '100' : '200'}
                          </p>
                        </div>
                      )}

                      <p className="text-gray-600 text-sm mb-6">{woman.bio}</p>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                          <Video className="w-4 h-4" />
                          Call
                        </button>
                        {subscription === 'vetted' && !woman.vetted && (
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                            <Check className="w-4 h-4" />
                            Vet
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // For Women
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button
        onClick={() => setUserType(null)}
        className="mb-8 text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Diaspora Connect for Women</h1>
        <p className="text-gray-600 mb-12">Join FREE and meet Zimbabwean men in the diaspora</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Join Diaspora Connect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-rose-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Meet Verified Men</h3>
                <p className="text-gray-600 text-sm">All men are verified Zimbabweans in the diaspora</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Video className="w-6 h-6 text-rose-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Video Calls</h3>
                <p className="text-gray-600 text-sm">Connect face-to-face before meeting</p>
              </div>
            </div>
            <div className="flex gap-4">
              <DollarSign className="w-6 h-6 text-rose-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Always Free</h3>
                <p className="text-gray-600 text-sm">Your membership is completely free</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Check className="w-6 h-6 text-rose-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Optional Vetting</h3>
                <p className="text-gray-600 text-sm">Get verified to increase trust with men</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Free Membership */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg border-2 border-rose-500 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">FREE Membership</h3>
            <p className="text-4xl font-bold text-rose-600 mb-6">$0</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Create your profile</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Browse man profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Receive and send messages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Video calls</span>
              </li>
            </ul>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg transition">
              Create Free Profile
            </button>
          </div>

          {/* Vetting */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-blue-500 transition">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Get Verified</h3>
            <p className="text-gray-600 mb-6">Increase your credibility with potential matches</p>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-bold text-gray-800 mb-1">Harare</p>
                <p className="text-sm text-gray-600 mb-2">Face-to-face interview at our office</p>
                <p className="text-2xl font-bold text-blue-600">$100</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-bold text-gray-800 mb-1">Outside Harare</p>
                <p className="text-sm text-gray-600 mb-2">We come to you (includes travel)</p>
                <p className="text-2xl font-bold text-blue-600">$200</p>
              </div>
            </div>
            <button className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
              Request Vetting
            </button>
          </div>
        </div>

        {/* Vetting Process */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Vetting Process</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold text-gray-800">Request Vetting</h4>
                <p className="text-sm text-gray-600">Submit your request through the app</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold text-gray-800">Schedule Interview</h4>
                <p className="text-sm text-gray-600">Our team will contact you to arrange a time</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold text-gray-800">Face-to-Face Interview</h4>
                <p className="text-sm text-gray-600">Meet with our administrators for verification</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold flex-shrink-0">✓</div>
              <div>
                <h4 className="font-bold text-gray-800">Get Verified Badge</h4>
                <p className="text-sm text-gray-600">Display your verified status to increase matches</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
