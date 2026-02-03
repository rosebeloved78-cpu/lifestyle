import { useState } from 'react'
import { ChevronRight, ChevronLeft, Church, User, ShieldCheck, Users } from 'lucide-react'

interface SignUpProps {
  onSignUpComplete: (profile: any) => void
}

export default function SignUp({ onSignUpComplete }: SignUpProps) {
  const [step, setStep] = useState(1)
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
        // Step 6 is Diaspora Opt-in for females or Bio for males
        if (formData.gender === 'male' && !formData.bio.trim()) {
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
      nextStep = 6 // Go straight to Bio/Opt-in
    }

    // Skip service role details if attending church but not serving
    if (step === 4 && formData.serviceRole === 'member') {
      nextStep = 6 // Go straight to Bio/Opt-in
    }

    // Determine if we show Diaspora Opt-in (Step 6) or just Bio (Step 7)
    // Step 6 is Opt-in for females only
    if (step === 5 && formData.gender === 'male') {
      nextStep = 7 // Men go straight to bio (we use 7 as bio step)
    }

    setStep(nextStep)
  }

  const handleBack = () => {
    let prevStep = step - 1

    if (step === 6) {
      if (formData.churchAttendance === 'home') prevStep = 2
      else if (formData.serviceRole === 'member') prevStep = 4
      else prevStep = 5
    }

    if (step === 7 && formData.gender === 'male') {
       if (formData.churchAttendance === 'home') prevStep = 2
       else if (formData.serviceRole === 'member') prevStep = 4
       else prevStep = 5
    }

    setStep(prevStep)
  }

  const handleSubmit = () => {
    if (!validateStep()) return

    const profile = {
      ...formData,
      subscription: 'free',
      joinDate: new Date().toLocaleDateString(),
    }

    onSignUpComplete(profile)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-8 h-8 text-rose-500" />
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Create Account</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 ml-1">Secure Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1.5 ml-1">Your Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1.5 ml-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <Church className="w-8 h-8 text-rose-500" />
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">Faith Life</h2>
            </div>
            <p className="text-gray-600 font-medium">Do you attend church regularly or pray from home?</p>
            <div className="space-y-3">
              <button
                onClick={() => setFormData({ ...formData, churchAttendance: 'attend' })}
                className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all group ${formData.churchAttendance === 'attend' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200 bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${formData.churchAttendance === 'attend' ? 'border-rose-500 bg-rose-500' : 'border-gray-300'}`}>
                  {formData.churchAttendance === 'attend' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-bold ${formData.churchAttendance === 'attend' ? 'text-rose-600' : 'text-gray-600'}`}>I attend church regularly</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, churchAttendance: 'home' })}
                className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all group ${formData.churchAttendance === 'home' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200 bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${formData.churchAttendance === 'home' ? 'border-rose-500 bg-rose-500' : 'border-gray-300'}`}>
                  {formData.churchAttendance === 'home' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-bold ${formData.churchAttendance === 'home' ? 'text-rose-600' : 'text-gray-600'}`}>I pray from home</span>
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Your Church</h2>
            <div>
              <label className="block text-gray-700 font-bold mb-3 ml-1">Church Name</label>
              <input
                type="text"
                value={formData.churchName}
                onChange={(e) => setFormData({ ...formData, churchName: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium"
                placeholder="e.g. ZAOGA, Celebration Center, AFM"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Involvement</h2>
            <p className="text-gray-600 font-medium">Do you serve in a department or are you a member?</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, serviceRole: 'serve' })}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${formData.serviceRole === 'serve' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-100 hover:border-rose-100 bg-white text-gray-600'}`}
              >
                <User className="w-8 h-8 mx-auto mb-2" />
                <span className="font-bold block">I Serve</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, serviceRole: 'member' })}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${formData.serviceRole === 'member' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-100 hover:border-rose-100 bg-white text-gray-600'}`}
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <span className="font-bold block">Just a Member</span>
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">Department</h2>
            <div>
              <label className="block text-gray-700 font-bold mb-3 ml-1">Which department do you serve in?</label>
              <input
                type="text"
                value={formData.serviceDepartment}
                onChange={(e) => setFormData({ ...formData, serviceDepartment: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium"
                placeholder="e.g. Usher, Choir, Deaconry, Pastor"
              />
            </div>
          </div>
        )

      case 6:
        // Diaspora Opt-in for females
        if (formData.gender === 'female') {
          return (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-8 h-8 text-rose-500" />
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">Diaspora Connect</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Would you like to be visible to Zimbabwean men in the diaspora looking for marriage? 
                It's completely <span className="text-rose-600 font-bold underline">FREE</span> for you.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setFormData({ ...formData, diasporaOptIn: true })}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all ${formData.diasporaOptIn ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-100 hover:border-rose-100 bg-white text-gray-600'}`}
                >
                  ✅ Yes, show my profile in Diaspora
                </button>
                <button
                  onClick={() => setFormData({ ...formData, diasporaOptIn: false })}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all ${!formData.diasporaOptIn ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-100 hover:border-rose-100 bg-white text-gray-600'}`}
                >
                  ❌ No, keep it for local matches only
                </button>
              </div>
            </div>
          )
        }
        // If male or no diaspora step needed, show bio
        return renderBioStep()

      case 7:
        return renderBioStep()
      
      default: return null
    }
  }

  const renderBioStep = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black text-gray-800 tracking-tight">Finish Up</h2>
      <div>
        <label className="block text-gray-700 font-bold mb-3 ml-1">Personal Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 h-40 resize-none font-medium leading-relaxed"
          placeholder="Tell us about yourself, your interests, and what you're looking for in a partner..."
        />
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-rose-50">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Setup Progress</span>
            <span className="text-xs font-black text-rose-500">{(step / 7 * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
            {errors.map((error, i) => (
              <p key={i} className="text-red-700 text-sm font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Form Content */}
        <div className="mb-12 min-h-[300px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-8 py-4 border-2 border-gray-100 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}
          
          {(step < 7) && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-rose-100 transition-all ml-auto group"
            >
              Continue
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {step === 7 && (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 hover:shadow-xl hover:shadow-green-100 transition-all ml-auto"
            >
              Complete Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
