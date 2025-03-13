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
  skillsGrowth, 
  projectMetrics, 
  geoDistribution, 
  techUsage, 
  devActivities 
} from '../../data/dashboard-data';
import { RefreshCw, TrendingUp, Users, Star, Download } from 'lucide-react';

// Custom colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Dashboard Card Component
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
    <Card className={`p-4 h-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>
      {children}
    </Card>
  );
};

// GitHub Contributions Chart
const GitHubContributionsChart = () => {
  return (
    <DashboardCard title="GitHub Contributions">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={githubContributions}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="contributions" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.3} 
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="visitors" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
            <Line type="monotone" dataKey="newVisitors" stroke="#82ca9d" />
            <Line type="monotone" dataKey="returningVisitors" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Skills Growth Chart
const SkillsGrowthChart = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'Python', 'TypeScript', 'Data Analysis']);
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  return (
    <DashboardCard title="Skills Growth Over Time">
      <div className="mb-4 flex flex-wrap gap-2">
        {['React', 'Python', 'TypeScript', 'Data Analysis'].map((skill) => (
          <Button
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSkill(skill)}
            className="text-xs"
          >
            {skill}
          </Button>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={skillsGrowth}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedSkills.includes('React') && (
              <Line type="monotone" dataKey="React" stroke="#61dafb" />
            )}
            {selectedSkills.includes('Python') && (
              <Line type="monotone" dataKey="Python" stroke="#3776ab" />
            )}
            {selectedSkills.includes('TypeScript') && (
              <Line type="monotone" dataKey="TypeScript" stroke="#007acc" />
            )}
            {selectedSkills.includes('Data Analysis') && (
              <Line type="monotone" dataKey="Data Analysis" stroke="#ff7300" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stars" fill="#8884d8" name="GitHub Stars" />
            <Bar dataKey="downloads" fill="#82ca9d" name="Downloads" />
            <Bar dataKey="issues" fill="#ffc658" name="Open Issues" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Technology Usage Chart
const TechnologyUsageChart = () => {
  return (
    <DashboardCard title="Technology Usage">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={techUsage}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {techUsage.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
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
            <PolarGrid />
            <PolarAngleAxis dataKey="activity" />
            <PolarRadiusAxis />
            <Radar
              name="Hours Spent"
              dataKey="hours"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

// Stats Cards
const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 flex items-center">
        <div className="mr-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Commits</p>
          <h3 className="text-2xl font-bold">1,248</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="mr-4 bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
          <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Portfolio Visitors</p>
          <h3 className="text-2xl font-bold">5,320</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="mr-4 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
          <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">GitHub Stars</p>
          <h3 className="text-2xl font-bold">110</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="mr-4 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
          <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Downloads</p>
          <h3 className="text-2xl font-bold">790</h3>
        </div>
      </Card>
    </div>
  );
};

// Geographic Distribution
const GeographicDistribution = () => {
  return (
    <DashboardCard title="Visitor Geographic Distribution">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={geoDistribution}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="country" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="visitors" fill="#8884d8">
              {geoDistribution.map((_, index) => (
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
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="dashboard" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Data Visualization Dashboard
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real-time analytics and insights about my projects, skills, and portfolio performance.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <StatsCards />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <GitHubContributionsChart />
              <VisitorAnalyticsChart />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SkillsGrowthChart />
              <ProjectMetricsChart />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TechnologyUsageChart />
              <DevelopmentActivitiesChart />
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <GeographicDistribution />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This dashboard uses mock data for demonstration purposes. In a real implementation, it would connect to GitHub API, Google Analytics, and other data sources.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild>
                  <a href="#projects">View Projects</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
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