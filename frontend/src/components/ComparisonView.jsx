import React from 'react';
import { Zap, Heart, TrendingUp, MapPin, Calendar, Brain } from 'lucide-react';

const ComparisonView = ({ alternatePath, currentPath, originalData }) => {
  // Helper function to extract key insights from AI-generated content
  const extractInsights = (pathData, pathType) => {
    const insights = [];
    
    // Extract themes from the content
    if (pathData.year1?.toLowerCase().includes('growth') || pathData.year1?.toLowerCase().includes('learn')) {
      insights.push(`${pathType === 'alternate' ? 'Accelerated' : 'Steady'} learning curve`);
    }
    if (pathData.year3?.toLowerCase().includes('relationship') || pathData.year3?.toLowerCase().includes('connect')) {
      insights.push(`${pathType === 'alternate' ? 'New' : 'Deeper'} relationships`);
    }
    if (pathData.year10?.toLowerCase().includes('financ') || pathData.year10?.toLowerCase().includes('security')) {
      insights.push(`${pathType === 'alternate' ? 'Variable' : 'Stable'} financial outlook`);
    }
    if (pathData.year10?.toLowerCase().includes('wisdom') || pathData.year10?.toLowerCase().includes('experience')) {
      insights.push(`Rich life experience`);
    }

    // Default insights if none detected
    if (insights.length === 0) {
      insights.push(
        pathType === 'alternate' ? 'New adventures await' : 'Consistent progress',
        pathType === 'alternate' ? 'Expanded comfort zone' : 'Deepened expertise',
        pathType === 'alternate' ? 'Unknown outcomes' : 'Predictable trajectory'
      );
    }

    return insights.slice(0, 3); // Limit to 3 insights
  };

  const alternateInsights = extractInsights(alternatePath, 'alternate');
  const currentInsights = extractInsights(currentPath, 'current');

  const PathCard = ({ title, pathData, insights, bgColor, iconColor, icon: Icon }) => (
    <div className={`card ${bgColor} h-full`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>

      {/* Year-by-year breakdown */}
      <div className="space-y-6">
        {/* Year 1 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <h4 className="font-semibold text-slate-700">Year 1</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {pathData.year1}
          </p>
        </div>

        {/* Year 3 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            <h4 className="font-semibold text-slate-700">Year 3</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {pathData.year3}
          </p>
        </div>

        {/* Year 10 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-slate-500" />
            <h4 className="font-semibold text-slate-700">Year 10</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {pathData.year10}
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Characteristics</h4>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span className="text-xs text-slate-600">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Two Paths Diverged
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Compare your alternate path with staying on your current trajectory. 
          Both simulations are AI-generated based on your unique profile.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Path */}
        <PathCard
          title="Current Path"
          pathData={currentPath}
          insights={currentInsights}
          bgColor="bg-blue-50 border-blue-200"
          iconColor="text-blue-500"
          icon={Heart}
        />

        {/* Alternate Path */}
        <PathCard
          title="Alternate Path"
          pathData={alternatePath}
          insights={alternateInsights}
          bgColor="bg-green-50 border-green-200"
          iconColor="text-green-500"
          icon={Zap}
        />
      </div>

      {/* Decision Insights */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-purple-500" />
          <h3 className="text-xl font-bold text-slate-800">Reflection</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">If you stay (Current Path):</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              {currentPath.futureMessage || "You'll build on existing foundations with steady, predictable growth and deepening of current relationships and expertise."}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">If you change (Alternate Path):</h4>
            <p className="text-sm text-green-700 leading-relaxed">
              {alternatePath.futureMessage || "You'll embark on a journey of discovery with new challenges, relationships, and opportunities for growth."}
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-purple-200">
          <p className="text-lg text-slate-600 text-center italic leading-relaxed">
            "Every path has its own beauty and challenges. The question isn't which is better, 
            but which aligns more closely with who you want to become."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView; 