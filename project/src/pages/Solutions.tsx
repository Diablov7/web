import React from 'react';
import { Users, Rocket, Brain, Palette, Star, Activity, Newspaper, List, ArrowRight, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';

const solutions = [
  {
    icon: Users,
    title: "COMMUNITY MANAGEMENT & SOCIAL",
    description: "Your community feels like a ghost town, doesn't it? Picture a loyal, active following that's always buzzing, growing steadily, and spreading your project's vision without you lifting a finger.",
    color: "#A020F0"
  },
  {
    icon: Rocket,
    title: "GUERRILLA MARKETING",
    description: "Feeling invisible while others grab all the attention? Imagine your project breaking through the noise, catching eyes with a buzz that gets people talking and keeps your token trending.",
    color: "#9370DB"
  },
  {
    icon: Brain,
    title: "GROWTH HACKING",
    description: "Frustrated by slow growth and high costs? See yourself gaining a steady stream of new users efficiently, with results that scale fast and a budget that finally works in your favor.",
    color: "#8A2BE2"
  },
  {
    icon: Palette,
    title: "DESIGN & MOTION",
    description: "Your visuals aren't turning heads, are they? Envision a polished, eye-catching identity that grabs attention and makes your project's value crystal clear to everyone who sees it.",
    color: "#A020F0"
  },
  {
    icon: Star,
    title: "INFLUENCE MARKETING (KOL MARKETING)",
    description: "Struggling to build trust in a skeptical market? With our global network of influencers across Twitter (X), TikTok, YouTube, Reddit, 4chan, and beyond, we'll have trusted voices worldwide vouching for your project. Our partners bring authentic engagement that converts followers into true believers of your vision.",
    color: "#9370DB"
  },
  {
    icon: Activity,
    title: "ON-CHAIN SERVICES",
    description: "Worried your on-chain metrics aren't impressing investors? Think of your project shining with strong numbers, catching the eye of serious capital ready to back your growth.",
    color: "#8A2BE2"
  },
  {
    icon: Newspaper,
    title: "PR (PRESS OFFICE) AND CROSS MARKETING",
    description: "Feeling like your brand lacks authority? See your project featured in the right places, earning respect and reaching new audiences who take you seriously as a market leader.",
    color: "#A020F0"
  },
  {
    icon: List,
    title: "LISTINGS",
    description: "Stuck with limited reach and no global traction? Imagine your project accessible on major platforms, opening doors to a flood of users and investors from around the world.",
    color: "#9370DB"
  }
];

export default function Solutions() {
  return (
    <div className="min-h-screen pt-32 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto"
      >
        <DashboardCard className="p-8 mb-8">
          <h1 className="text-5xl md:text-6xl font-orbitron text-center mb-6">
            <span className="bg-gradient-to-r from-[#A020F0] to-[#8A2BE2] bg-clip-text text-transparent">
              Our Solutions
            </span>
          </h1>
          <p className="text-center text-xl text-white/80 font-mono mb-4">
            Struggling to Stand Out in the Crypto Space? Let's Fix That.
          </p>
        </DashboardCard>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/contact">
                <DashboardCard
                  title={solution.title}
                  neonColor={solution.color}
                  className="p-6 h-full group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${solution.color}20` }}>
                        <solution.icon className="w-6 h-6" style={{ color: solution.color }} />
                      </div>
                    </div>
                    <p className="text-lg text-white/80 font-mono leading-relaxed flex-grow">
                      {solution.description}
                    </p>
                    
                    {/* Learn More link with cursor pointer - Fixed at bottom right */}
                    <div 
                      className="flex items-center justify-end gap-2 text-sm font-mono mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: solution.color }}
                    >
                      <MousePointer2 className="w-4 h-4 animate-pulse" />
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </DashboardCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <DashboardCard className="p-8 mt-8">
          <p className="text-lg text-white/80 font-mono leading-relaxed text-center">
            Together, these outcomes tackle your biggest challenges: a quiet community, lack of visibility, sluggish growth, weak branding, low trust, unimpressive metrics, limited authority, and restricted reach. For you, developer, this means turning frustration into momentum—building a project that doesn't just survive but thrives. Ready to make your mark in the crypto world?
          </p>
        </DashboardCard>
      </motion.div>
    </div>
  );
}