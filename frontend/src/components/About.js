import React from 'react';
import { MapPin, GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '../mock';

const About = () => {
  const { personal, education } = portfolioData;

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who I Am</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {personal.bio}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                  <a href={`mailto:${personal.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={24} className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{education.degree}</h4>
                <p className="text-gray-600 dark:text-gray-300">{education.institution}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={16} />
                  <span>{education.period}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                  <span className="text-sm text-gray-600 dark:text-gray-300">GWA: </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{education.gwa}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Mail = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default About;