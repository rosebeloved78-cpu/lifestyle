import { Heart, Globe, Shield, Church, CheckCircle2 } from 'lucide-react'

interface HomeProps {
  onGetStarted: () => void
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 font-bold text-sm mb-8 animate-bounce">
              <Heart className="w-4 h-4 fill-rose-600" />
              <span>Zimbabwe's #1 Faith-Based Connection</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
              Find Your <span className="text-rose-600">Godly</span> Partner.
            </h1>
            <p className="text-xl md:text-2xl text-black-600 mb-10 leading-relaxed font-medium">
              Lifestyle Connect is built for Zimbabwean Christians who value faith, 
              tradition, and meaningful relationships. Connect with someone who shares your faith.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-10 py-5 bg-rose-600 text-white rounded-2xl font-black text-xl hover:bg-rose-700 hover:shadow-2xl hover:shadow-rose-200 transition-all active:scale-95"
              >
                Start Your Journey Free
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-xl border-2 border-gray-100 hover:border-rose-200 transition-all">
                Learn More
              </button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 text-gray-400 font-bold text-sm uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Church className="w-5 h-5" />
                <span>Verified Churches</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="bg-white py-12 border-y border-rose-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="text-center">
            <p className="text-4xl font-black text-rose-600 leading-none mb-1">5k+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Believers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-rose-600 leading-none mb-1">🇿🇼</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Zimbabwe Only</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-rose-600 leading-none mb-1">200+</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Church Groups</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Built with <span className="text-rose-600">Zimbabwean</span> Values
            </h2>
            <p className="text-xl text-black-600 font-medium">Why thousands of Christians choose Lifestyle Connect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-8">
                <Church className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Same Church Matching</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Premium members can filter connections by their specific church. Build deeper connections 
                within your own faith community.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Diaspora Connect</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Specialized section for Zimbabwean men abroad seeking marriage-minded women back home. 
                Full vetting and video call support included.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Vetting & Safety</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Face-to-face interviews by our administration team. We personally verify profiles 
                to ensure a safe, godly environment for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diaspora Section Preview */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-600 rounded-[3rem] p-12 md:p-20 text-white relative shadow-2xl shadow-rose-300">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                  Diaspora <br/><span className="text-rose-200">Connect Section.</span>
                </h2>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-rose-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-xl">For Men Abroad</p>
                      <p className="text-rose-100">Professional plans ($20-$50) with video calling and vetted matching.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-rose-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-xl">For Women in Zimbabwe</p>
                      <p className="text-rose-100">Join 100% free. Optional vetting for higher visibility and trust.</p>
                    </div>
                  </div>
                </div>
                <button className="px-10 py-5 bg-white text-rose-600 rounded-2xl font-black text-xl hover:bg-rose-50 transition-colors">
                  Join Diaspora Connect
                </button>
              </div>
              <div className="relative">
                <div className="w-full aspect-square bg-rose-500 rounded-[2rem] rotate-3 flex items-center justify-center text-9xl">
                  🌍
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Simple Pricing</h2>
            <p className="text-xl text-gray-600 font-medium">No hidden fees. Just honest connections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">$0</span>
                <span className="text-gray-500 font-bold">/forever</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Browse Profiles
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Basic Matching
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Women Diaspora Opt-in
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black hover:border-rose-500 transition-all"
              >
                Join Free
              </button>
            </div>

            {/* Premium */}
            <div className="p-10 rounded-[2.5rem] bg-white shadow-2xl shadow-rose-200 border-2 border-rose-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Premium</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-rose-600">$9.99</span>
                <span className="text-gray-500 font-bold">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Same Church Filter
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Unlimited Likes
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  See Who Liked You
                </li>
              </ul>
              <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
                Get Premium
              </button>
            </div>

            {/* VIP */}
            <div className="p-10 rounded-[2.5rem] bg-gray-900 text-white">
              <h3 className="text-2xl font-black text-white mb-2">VIP</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">$29.99</span>
                <span className="text-gray-400 font-bold">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Verified Badge
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Priority Matches
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  Face-to-Face Support
                </li>
              </ul>
              <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-rose-100 transition-all">
                Join VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
            Your Spouse <br/>is waiting for <span className="text-rose-600 underline">you.</span>
          </h2>
          <button
            onClick={onGetStarted}
            className="px-12 py-6 bg-rose-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-rose-300 hover:bg-rose-700 hover:scale-105 transition-all"
          >
            Create Your Profile Today
          </button>
        </div>
      </section>
    </div>
  )
}
