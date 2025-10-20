import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { portfolioData } from '../mock';

const Certifications = () => {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <Award size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight">{cert.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">{cert.issuer}</p>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;