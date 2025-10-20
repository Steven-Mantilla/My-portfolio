import React from 'react';
import { Code2, Database, Wrench, MessageSquare } from 'lucide-react';
import { portfolioData } from '../mock';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      items: skills.languages,
      color: 'blue'
    },
    {
      title: 'Frameworks',
      icon: Code2,
      items: skills.frameworks,
      color: 'green'
    },
    {
      title: 'Tools & Platforms',
      icon: Wrench,
      items: skills.tools,
      color: 'purple'
    },
    {
      title: 'Databases',
      icon: Database,
      items: skills.databases,
      color: 'orange'
    },
    {
      title: 'Soft Skills',
      icon: MessageSquare,
      items: skills.softSkills,
      color: 'pink'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md border ${getColorClasses(category.color)}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;