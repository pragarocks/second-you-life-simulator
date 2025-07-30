import React from 'react';
import { ArrowRight, User, MapPin, Briefcase, Heart, Target, TrendingUp, Calendar } from 'lucide-react';

const ComparisonView = ({ simulation, originalData }) => {
  // Generate current path projections based on user's current situation
  const generateCurrentPath = () => {
    return {
      year1: `You continue in your current role as ${originalData.profession} in ${originalData.location}. Work becomes more routine, and you've settled into a comfortable but predictable pattern. Your ${originalData.traits.toLowerCase().includes('anxious') ? 'anxiety about change keeps you' : 'natural tendency is to stay'} in familiar territory. You might get a small promotion or raise, but the fundamental structure of your life remains the same.`,
      year3: `Three years in, you've likely advanced somewhat in your current field, but the growth feels incremental. You've built deeper relationships in ${originalData.location}, though part of you still wonders about other possibilities. Your comfort zone has expanded slightly, but you sometimes feel a nagging sense of "what if." Financial stability has improved, but so has the feeling that you're on autopilot.`,
      year10: `A decade later, you've achieved a solid, respectable life following the conventional path. You're likely in a senior position, with good benefits and financial security. However, there's a bittersweet feeling when you think about roads not taken. You wonder if you played it too safe, though you appreciate the stability and relationships you've built. Your life is good, but you sometimes dream about what could have been different.`
    };
  };

  const currentPath = generateCurrentPath();

  const comparisonData = [
    {
      timeline: '1 Year Later',
      current: currentPath.year1,
      alternate: simulation.year1,
      icon: Calendar,
      color: 'blue'
    },
    {
      timeline: '3 Years Later',
      current: currentPath.year3,
      alternate: simulation.year3,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      timeline: '10 Years Later',
      current: currentPath.year10,
      alternate: simulation.year10,
      icon: Target,
      color: 'emerald'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200'
    }
  };

  return (
    <div className="space-y-8">
      {/* Comparison Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Path Comparison</h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          See how your life might differ between staying on your current path versus 
          taking the alternate route you're considering.
        </p>
      </div>

      {/* Current Profile Summary */}
      <div className="card bg-gradient-to-r from-slate-50 to-blue-50">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Your Current Profile
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-slate-500" />
            <span className="text-sm"><strong>Age:</strong> {originalData.age}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <span className="text-sm"><strong>Location:</strong> {originalData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-slate-500" />
            <span className="text-sm"><strong>Career:</strong> {originalData.profession}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-slate-500" />
            <span className="text-sm"><strong>Traits:</strong> {originalData.traits.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Decision Point */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg border border-slate-200">
          <span className="text-slate-600 font-medium">Current Path</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          </div>
          <ArrowRight className="h-5 w-5 text-primary-500" />
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
          <span className="text-primary-600 font-medium">Alternate Path</span>
        </div>
        <p className="text-sm text-slate-500 mt-2">Decision: "{originalData.alternatePath}"</p>
      </div>

      {/* Timeline Comparisons */}
      <div className="space-y-12">
        {comparisonData.map((comparison, index) => {
          const IconComponent = comparison.icon;
          const colors = colorClasses[comparison.color];
          
          return (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center space-x-2 ${colors.bg} px-4 py-2 rounded-full border ${colors.border}`}>
                  <IconComponent className={`h-5 w-5 ${colors.text}`} />
                  <span className={`font-semibold ${colors.text}`}>{comparison.timeline}</span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Current Path */}
                <div className="card border-l-4 border-slate-400">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-slate-400 rounded-full mr-3"></div>
                    <h4 className="font-semibold text-slate-700">Current Path</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {comparison.current}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      Staying the Course
                    </span>
                  </div>
                </div>

                {/* Alternate Path */}
                <div className={`card border-l-4 ${colors.border.replace('border-', 'border-l-')}`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full mr-3 ${colors.text.replace('text-', 'bg-')}`}></div>
                    <h4 className={`font-semibold ${colors.text}`}>Alternate Path</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {comparison.alternate}
                  </p>
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} text-xs rounded-full`}>
                      Taking the Leap
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Key Insights from This Comparison
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Current Path Strengths:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Predictable financial security</li>
              <li>• Lower risk and stress</li>
              <li>• Established relationships and networks</li>
              <li>• Proven track record in your field</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Alternate Path Potential:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Greater personal fulfillment</li>
              <li>• New skills and experiences</li>
              <li>• Expanded possibilities and growth</li>
              <li>• Alignment with deeper values</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView; 