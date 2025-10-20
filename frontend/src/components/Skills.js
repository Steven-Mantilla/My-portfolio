import React from 'react';
import { 
  SiPython, SiJava, SiCplusplus, SiGo, SiJavascript, SiHtml5, SiCss3,
  SiReact, SiAngular, SiNodedotjs, SiDjango, SiLaravel,
  SiGit, SiGithub, SiFirebase, SiPostman, SiFigma, SiVercel,
  SiMysql, SiPostgresql
} from 'react-icons/si';
import { Database, MessageSquare } from 'lucide-react';
import { portfolioData } from '../mock';

const Skills = () => {
  const { skills } = portfolioData;

  // Icon mapping for technologies
  const techIcons = {
    // Languages
    'Python': SiPython,
    'Java': SiJava,
    'C++': SiCplusplus,
    'Go': SiGo,
    'JavaScript': SiJavascript,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    // Frameworks
    'React': SiReact,
    'Angular': SiAngular,
    'Node.js': SiNodedotjs,
    'Django': SiDjango,
    'Laravel': SiLaravel,
    // Tools
    'Git': SiGit,
    'Github Desktop': SiGithub,
    'Firebase': SiFirebase,
    'Postman': SiPostman,
    'Figma': SiFigma,
    'Vercel': SiVercel,
    // Databases
    'Firebase Realtime Database': SiFirebase,
    'MySQL': SiMysql,
    'PostgreSQL': SiPostgresql
  };

  const skillCategories = [
    {
      title: 'Languages',
      icon: SiJavascript,
      items: skills.languages,
      color: 'blue'
    },
    {
      title: 'Frameworks',
      icon: SiReact,
      items: skills.frameworks,
      color: 'green'
    },
    {
      title: 'Tools & Platforms',
      icon: SiGit,
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
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
      pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800'
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
              const CategoryIcon = category.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryIcon size={24} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, idx) => {
                      const TechIcon = techIcons[item];
                      return (
                        <span
                          key={idx}
                          className={`px-3 py-2 text-sm font-medium rounded-md border flex items-center gap-2 ${getColorClasses(category.color)}`}
                        >
                          {TechIcon && <TechIcon size={16} />}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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