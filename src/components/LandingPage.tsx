import React, { useState, useEffect } from 'react';
import { Shield, Lock, Search, Copy, Smartphone, Zap, CheckCircle, Star, ArrowRight, Users, Globe, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignIn, onSignUp }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Military-Grade Security",
      description: "AES-256 encryption ensures your API keys are protected with the same security standards used by governments and financial institutions.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Organization",
      description: "Categorize and search through your API keys instantly. Find what you need when you need it with powerful filtering options.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "One-Click Access",
      description: "Securely copy API keys to your clipboard with a single click. No more hunting through files or documentation.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Access Anywhere",
      description: "Responsive design means your keys are accessible from any device, whether you're at your desk or on the go.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built for speed with optimized performance. Access your keys instantly without waiting for slow loading times.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Zero Knowledge",
      description: "Your keys are encrypted before they reach our servers. Even we can't see your sensitive data.",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      content: "KeyBank has revolutionized how our team manages API keys. No more scattered keys in random files!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez", 
      role: "DevOps Engineer",
      company: "StartupXYZ",
      content: "The security features give me peace of mind. Finally, a solution I can trust with sensitive credentials.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Full Stack Developer", 
      company: "InnovateLab",
      content: "Clean interface, powerful features. KeyBank is now an essential part of my development workflow.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "10K+", label: "Developers" },
    { icon: <Lock className="w-5 h-5" />, value: "1M+", label: "API Keys Secured" },
    { icon: <Globe className="w-5 h-5" />, value: "50+", label: "Countries" },
    { icon: <Sparkles className="w-5 h-5" />, value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className=" z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`flex items-center gap-3 transform transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KeyBank</span>
            </div>
            
            <div className={`flex items-center gap-4 transform transition-all duration-700 delay-100 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
              <button
                onClick={onSignIn}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={onSignUp}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <span className="text-gray-900">Secure Your</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                API Keys
              </span>
              <br />
              <span className="text-2xl lg:text-3xl text-gray-600 font-normal">with confidence</span>
            </h1>
            
            <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Stop storing API keys in plain text files. KeyBank provides military-grade encryption, 
              smart organization, and instant access to all your credentials in one secure location.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transform transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button
                onClick={onSignUp}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:from-blue-700 hover:to-indigo-700"
              >
                <span className="flex items-center gap-2">
                  Start Free Today 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              <button
                onClick={onSignIn}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-lg transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
              >
                Sign In
              </button>
            </div>

            <div className={`flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 transform transition-all duration-1000 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by developers, for developers. KeyBank combines security, simplicity, and speed 
              in one elegant platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-600">
              See what developers are saying about KeyBank
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-semibold text-white text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of developers who trust KeyBank with their most sensitive credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onSignUp}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            <button
              onClick={onSignIn}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">KeyBank</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 KeyBank. All rights reserved.</p>
              <p className="text-sm mt-1">Secure API key management for developers</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;