import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../mock';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Work Experience</h2>
          
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">▹</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;