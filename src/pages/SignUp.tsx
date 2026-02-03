import { useState } from 'react'
import { ChevronRight, ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase'

interface SignUpProps {
  onSignUpComplete: (profile: any) => void
}

export default function SignUp({ onSignUpComplete }: SignUpProps) {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    churchAttendance: '',
    churchName: '',
    serviceRole: '',
    serviceDepartment: '',
    bio: '',
    diasporaOptIn: false,
  })

  const [errors, setErrors] = useState<string[]>([])

  const validateStep = () => {
    const newErrors: string[] = []

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.push('Name is required')
        if (!formData.email.trim()) newErrors.push('Email is required')
        else if (!formData.email.includes('@')) newErrors.push('Valid email required')
        if (!formData.password) newErrors.push('Password is required')
        else if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters')
        if (!formData.age) newErrors.push('Age is required')
        if (!formData.gender) newErrors.push('Gender is required')
        break
      case 2:
        if (!formData.churchAttendance) newErrors.push('Please select church attendance')
        break
      case 3:
        if (formData.churchAttendance === 'attend' && !formData.churchName.trim()) {
          newErrors.push('Church name is required')
        }
        break
      case 4:
        if (formData.churchAttendance === 'attend' && !formData.serviceRole) {
          newErrors.push('Please select your service role')
        }
        break
      case 5:
        if (formData.churchAttendance === 'attend' && formData.serviceRole === 'serve' && !formData.serviceDepartment.trim()) {
          newErrors.push('Please specify your service department')
        }
        break
      case 6:
        if (formData.gender === 'female' && formData.churchAttendance === 'attend') {
          // Diaspora opt-in step for females - validated in next step
        } else if (!formData.bio.trim()) {
          newErrors.push('Bio is required')
        }
        break
      case 7:
        if (!formData.bio.trim()) newErrors.push('Bio is required')
        break
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleNext = () => {
    if (!validateStep()) return

    let nextStep = step + 1

    // Skip church name if not attending church
    if (step === 2 && formData.churchAttendance === 'home') {
      nextStep = 4
    }

    // Skip service role details if attending church but not serving
    if (step === 4 && formData.serviceRole === 'member') {
      nextStep = 6
    }

    // For females attending church: Step 6 is diaspora opt-in, Step 7 is bio
    if (step === 6 && formData.gender === 'female' && formData.churchAttendance === 'attend') {
      nextStep = 7
    }

    setStep(nextStep)
  }

  const handleBack = () => {
    let prevStep = step - 1

    // Navigate backwards properly
    if (step === 4 && formData.churchAttendance === 'home') {
      prevStep = 2
    }

    if (step === 6 && formData.churchAttendance !== 'attend') {
      prevStep = 2
    }

    if (step === 7 && formData.gender === 'female' && formData.churchAttendance === 'attend') {
      prevStep = 6
    }

    setStep(prevStep)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsLoading(true)

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // Send email verification
      await sendEmailVerification(userCredential.user)

      const profile = {
        ...formData,
        uid: userCredential.user.uid,
        emailVerified: false,
        subscription: 'free',
        joinDate: new Date().toLocaleDateString(),
      }

      onSignUpComplete(profile)
    } catch (error: any) {
      console.error('Firebase Auth Error:', error)
      setErrors([error.message || 'Failed to create account. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Church Attendance</h2>
            <p className="text-gray-600 mb-4">Do you attend church or pray from home?</p>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                <input
                  type="radio"
                  name="churchAttendance"
                  value="attend"
                  checked={formData.churchAttendance === 'attend'}
                  onChange={(e) => setFormData({ ...formData, churchAttendance: e.target.value })}
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-gray-700 font-semibold">I attend church regularly</span>
              </label>
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                <input
                  type="radio"
                  name="churchAttendance"
                  value="home"
                  checked={formData.churchAttendance === 'home'}
                  onChange={(e) => setFormData({ ...formData, churchAttendance: e.target.value })}
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-gray-700 font-semibold">I pray from home</span>
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Church</h2>
            <label className="block text-gray-700 font-semibold mb-2">Church Name</label>
            <input
              type="text"
              value={formData.churchName}
              onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="e.g., Mount of Olives Worship Centre"
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Church Involvement</h2>
            <p className="text-gray-600 mb-4">Do you serve in church or are you a member?</p>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                <input
                  type="radio"
                  name="serviceRole"
                  value="serve"
                  checked={formData.serviceRole === 'serve'}
                  onChange={(e) => setFormData({ ...formData, serviceRole: e.target.value })}
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-gray-700 font-semibold">I serve in a department</span>
              </label>
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                <input
                  type="radio"
                  name="serviceRole"
                  value="member"
                  checked={formData.serviceRole === 'member'}
                  onChange={(e) => setFormData({ ...formData, serviceRole: e.target.value })}
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-gray-700 font-semibold">I am a member</span>
              </label>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Service Department</h2>
            <label className="block text-gray-700 font-semibold mb-2">Which department do you serve in?</label>
            <input
              type="text"
              value={formData.serviceDepartment}
              onChange={(e) => setFormData({ ...formData, serviceDepartment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="e.g., Usher, Deaconry, Choir, Pastor, Praise & Worship"
            />
          </div>
        )

      case 6:
        if (formData.gender === 'female' && formData.churchAttendance === 'attend') {
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Diaspora Connect Option</h2>
              <p className="text-gray-600 mb-6">
                Would you like to be visible to Zimbabwean men in the diaspora who are looking for connections? 
                You can manage this visibility anytime in your settings.
              </p>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                  <input
                    type="radio"
                    name="diasporaOptIn"
                    checked={formData.diasporaOptIn === true}
                    onChange={() => setFormData({ ...formData, diasporaOptIn: true })}
                    className="w-4 h-4 text-rose-500"
                  />
                  <span className="ml-3 text-gray-700 font-semibold">Yes, add me to Diaspora Connect</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50">
                  <input
                    type="radio"
                    name="diasporaOptIn"
                    checked={formData.diasporaOptIn === false}
                    onChange={() => setFormData({ ...formData, diasporaOptIn: false })}
                    className="w-4 h-4 text-rose-500"
                  />
                  <span className="ml-3 text-gray-700 font-semibold">No, keep me off Diaspora Connect</span>
                </label>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Profile</h2>
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 h-32"
              placeholder="Tell us about yourself, your interests, and what you're looking for..."
            />
          </div>
        )

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Profile</h2>
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 h-32"
              placeholder="Tell us about yourself, your interests, and what you're looking for..."
            />
          </div>
        )
    }
  }

  const getProgress = () => {
    let totalSteps = 6
    if (formData.churchAttendance === 'home') totalSteps = 5
    if (formData.churchAttendance === 'attend' && formData.serviceRole === 'member') totalSteps = 5
    if (formData.gender === 'female' && formData.churchAttendance === 'attend') totalSteps = 7
    if (step === 7 || (step === 6 && !(formData.gender === 'female' && formData.churchAttendance === 'attend'))) return 100
    return (step / totalSteps) * 100
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Step {step}</span>
            <span className="text-sm font-semibold text-gray-600">{Math.round(getProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            {errors.map((error, i) => (
              <p key={i} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        {/* Form Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}
          {step < 7 && !(step === 6 && formData.gender !== 'female') && !(step === 6 && formData.churchAttendance !== 'attend') && (
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 ml-auto"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          {(step === 7 || (step === 6 && (formData.gender !== 'female' || formData.churchAttendance !== 'attend'))) && (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 hover:shadow-xl hover:shadow-green-100 transition-all ml-auto disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
