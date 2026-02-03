import { useState } from 'react'
import { Save, X } from 'lucide-react'

interface ProfileSettingsProps {
  userProfile: any
  onClose: () => void
  onSave: (updatedProfile: any) => void
}

export default function ProfileSettings({ userProfile, onClose, onSave }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    aboutMe: userProfile?.aboutMe || userProfile?.bio || '',
    maritalStatus: userProfile?.maritalStatus || '',
    occupation: userProfile?.occupation || '',
    children: userProfile?.children || '0',
  })

  const handleSave = () => {
    const updatedProfile = {
      ...userProfile,
      ...formData,
      bio: formData.aboutMe // Keep bio in sync with aboutMe for consistency
    }
    onSave(updatedProfile)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* About Me */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">About Me / Long Bio</label>
            <textarea
              value={formData.aboutMe}
              onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 h-32 resize-none"
              placeholder="Tell us more about yourself, your faith journey, and what you're looking for..."
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Marital Status</label>
            <select
              value={formData.maritalStatus}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 bg-white"
            >
              <option value="">Select status</option>
              <option value="never-married">Never Been Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Occupation</label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="e.g., Teacher, Nurse, Business Owner"
            />
          </div>

          {/* Number of Children */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Number of Children</label>
            <input
              type="number"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition shadow-rose-200"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
