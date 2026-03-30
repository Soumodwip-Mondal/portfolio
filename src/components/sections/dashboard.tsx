'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  githubContributions,
  visitorAnalytics,
  // skillsGrowth,
  projectMetrics,
  techUsage,
  devActivities
} from '../../data/dashboard-data';
import { RefreshCw, TrendingUp, Users, Star, Download } from 'lucide-react';

// Custom colors for charts - Premium Digital Atelier Palette
const COLORS = ['#5dd7e6', '#3dbdc3', '#018b99', '#005f68', '#bec8ca', '#899295'];

const DashboardCard = ({
  title,
  children,
  className = ''
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card className={`glass-card p-6 h-full border-white/5 bg-white/[0.01] ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold tracking-tight text-white/90">{title}</h3>
        <RefreshCw className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-[#5dd7e6] transition-colors" />
      </div>
      {children}
    </Card>
  );
};

// GitHub Contributions Chart
const GitHubContributionsChart = ({ data }: { data?: any[] }) => {
  const contributionData = data || githubContributions;

  return (
    <DashboardCard title="GitHub Contributions (Last 30 Days)">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={contributionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5dd7e6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5dd7e6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}}
            />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)'}}
              itemStyle={{color: '#5dd7e6'}}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#5dd7e6"
              strokeWidth={2}
              fill="url(#colorPrimary)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Visitor Analytics Chart
const VisitorAnalyticsChart = () => {
  return (
    <DashboardCard title="Portfolio Visitors">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visitorAnalytics}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}}
            />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)'}}
              itemStyle={{color: '#5dd7e6'}}
            />
            <Legend wrapperStyle={{paddingTop: '10px', fontSize: '12px'}} />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#5dd7e6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#5dd7e6', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
            />
            <Line type="monotone" dataKey="newVisitors" stroke="#3dbdc3" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="returningVisitors" stroke="#899295" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Skills Growth Chart
// const SkillsGrowthChart = () => {
//   const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'Python', 'TypeScript', 'Data Analysis']);

//   const toggleSkill = (skill: string) => {
//     if (selectedSkills.includes(skill)) {
//       setSelectedSkills(selectedSkills.filter(s => s !== skill));
//     } else {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   return (
//     <DashboardCard title="Skills Growth Over Time">
//       <div className="mb-4 flex flex-wrap gap-2">
//         {['React', 'Python', 'TypeScript', 'Data Analysis'].map((skill) => (
//           <Button
//             key={skill}
//             variant={selectedSkills.includes(skill) ? "default" : "outline"}
//             size="sm"
//             onClick={() => toggleSkill(skill)}
//             className="text-xs"
//           >
//             {skill}
//           </Button>
//         ))}
//       </div>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={skillsGrowth}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="year" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {selectedSkills.includes('React') && (
//               <Line type="monotone" dataKey="React" stroke="#61dafb" />
//             )}
//             {selectedSkills.includes('Python') && (
//               <Line type="monotone" dataKey="Python" stroke="#3776ab" />
//             )}
//             {selectedSkills.includes('TypeScript') && (
//               <Line type="monotone" dataKey="TypeScript" stroke="#007acc" />
//             )}
//             {selectedSkills.includes('Data Analysis') && (
//               <Line type="monotone" dataKey="Data Analysis" stroke="#ff7300" />
//             )}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </DashboardCard>
//   );
// };

// Project Metrics Chart
const ProjectMetricsChart = () => {
  return (
    <DashboardCard title="Project Metrics">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectMetrics}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
            />
            <Legend />
            <Bar dataKey="stars" fill="#5dd7e6" radius={[4, 4, 0, 0]} name="GitHub Stars" />
            <Bar dataKey="downloads" fill="#3dbdc3" radius={[4, 4, 0, 0]} name="Downloads" />
            <Bar dataKey="issues" fill="#899295" radius={[4, 4, 0, 0]} name="Open Issues" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Technology Usage Chart
const TechnologyUsageChart = ({ data }: { data?: any[] }) => {
  const languageData = data || techUsage;

  return (
    <DashboardCard title="Programming Languages">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              dataKey="value"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth={2}
            >
              {languageData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Development Activities Chart
const DevelopmentActivitiesChart = () => {
  return (
    <DashboardCard title="Development Activities">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={devActivities}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="activity" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} />
            <PolarRadiusAxis axisLine={false} tick={false} />
            <Radar
              name="Hours Spent"
              dataKey="hours"
              stroke="#5dd7e6"
              fill="#5dd7e6"
              fillOpacity={0.5}
            />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Stats Cards
const StatsCards = ({ stats }: { stats: any }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {[
        { label: 'Total Repositories', value: stats?.totalRepos || 0, icon: TrendingUp },
        { label: 'Total Forks', value: stats?.totalForks || 0, icon: Users },
        { label: 'GitHub Stars', value: stats?.totalStars || 0, icon: Star },
        { label: 'Top Repositories', value: stats?.repositories?.length || 0, icon: Download }
      ].map((stat, i) => (
        <motion.div key={i} variants={item}>
          <Card className="glass-card p-6 flex items-center border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
            <div className="mr-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-[#5dd7e6]/30 transition-colors">
              <stat.icon className="w-6 h-6 text-[#5dd7e6] filter drop-shadow-[0_0_8px_rgba(93,215,230,0.3)]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</h3>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Top Repositories Chart
const TopRepositories = ({ repos }: { repos?: any[] }) => {
  const repositoryData = repos || projectMetrics;

  return (
    <DashboardCard title="Top Repositories by Stars">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={repositoryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
            <YAxis dataKey="name" type="category" width={150} axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} />
            <Tooltip 
              contentStyle={{backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
            />
            <Bar dataKey="stars" fill="#5dd7e6" radius={[0, 4, 4, 0]} name="Stars">
              {repositoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [githubStats, setGithubStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Import the GitHub stats service
      const { fetchGitHubStats } = await import('../../services/github-stats-service');
      const stats = await fetchGitHubStats();
      setGithubStats(stats);
    } catch (err) {
      console.error('Error loading GitHub data:', err);
      setError('Failed to load GitHub data. Using fallback data.');
      // Fallback to mock data on error
      setGithubStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Use real data if available, otherwise fallback to mock
  const displayData = githubStats || {
    totalRepos: 0,
    totalStars: 0,
    contributions: githubContributions,
    topLanguages: techUsage,
  };

  return (
    <section id="dashboard" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-[#5dd7e6] to-white/40 bg-clip-text text-transparent mb-6 tracking-tight animate-gradient-x">
            System Analytics
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
            Real-time telemetry and deep insights harvested from my active digital workspace.
          </p>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              {error}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <StatsCards stats={displayData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <GitHubContributionsChart data={displayData.contributions} />
              <VisitorAnalyticsChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ProjectMetricsChart />
              <TechnologyUsageChart data={displayData.topLanguages} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DevelopmentActivitiesChart />
              <TopRepositories repos={displayData.repositories} />
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {githubStats
                  ? "Live data fetched from GitHub API"
                  : "Some data uses mock values for demonstration. GitHub contributions and language stats are real!"}
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={loadGitHubData} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
                <Button asChild>
                  <a href="#projects">View Projects</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/Soumodwip-Mondal" target="_blank" rel="noopener noreferrer">
                    Visit GitHub
                  </a>
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
} 