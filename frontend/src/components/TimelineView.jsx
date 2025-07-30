import React from 'react';
import { Calendar, Clock, TrendingUp, Heart, MapPin, Briefcase, Star } from 'lucide-react';

const TimelineView = ({ simulation }) => {
  const timelineSteps = [
    {
      year: '1 Year',
      title: 'First Steps',
      content: simulation.year1,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      year: '3 Years',
      title: 'Building Momentum',
      content: simulation.year3,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      year: '10 Years',
      title: 'Life Transformed',
      content: simulation.year10,
      icon: Star,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Timeline Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Journey Timeline</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Follow your alternate path through time and see how your life might unfold 
          with this different choice.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 hidden md:block"></div>

        <div className="space-y-12">
          {timelineSteps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-white border-4 border-current rounded-full z-10 hidden md:block" 
                     style={{ color: step.iconColor.split('-')[1] }}></div>

                {/* Content Card */}
                <div className="md:ml-16 card">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                        <IconComponent className={`h-8 w-8 ${step.iconColor}`} />
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                          {step.year}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          {step.title}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="prose prose-slate max-w-none">
                        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {step.content}
                        </div>
                      </div>

                      {/* Highlights */}
                      {index === 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Early Adaptation
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Heart className="h-3 w-3 mr-1" />
                            New Relationships
                          </span>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Briefcase className="h-3 w-3 mr-1" />
                            Career Growth
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Skill Development
                          </span>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Star className="h-3 w-3 mr-1" />
                            Life Mastery
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            <MapPin className="h-3 w-3 mr-1" />
                            Legacy Building
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Section */}
      <div className="card bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Timeline Summary
          </h3>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            This simulation shows how your alternate choice could create a ripple effect 
            across multiple dimensions of your life - from immediate adjustments in Year 1, 
            to building momentum in Year 3, to the profound transformation possible by Year 10.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineView; 