import React from 'react';
import { Users, Rocket, Brain, Star, Activity, Zap, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import DashboardCard from '../components/DashboardCard';
import GlitchText from '../components/GlitchText';

const features = [
  {
    icon: Shield,
    title: "Proven Track Record",
    description: "Since 2018, we've been at the forefront of Web3 marketing, driving over $50M in successful project launches.",
    color: "#00D1C4",
    image: "https://images.unsplash.com/photo-1614064642639-e398cf05badb?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Target,
    title: "Strategic Growth",
    description: "Data-driven strategies that deliver explosive growth and sustainable market presence through precision targeting.",
    color: "#A020F0",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Brain,
    title: "Innovation Leaders",
    description: "Pioneering new approaches in Web3 marketing through AI and advanced analytics for maximum impact.",
    color: "#00D1C4",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  }
];

const achievements = [
  {
    icon: Star,
    title: "50+ Successful Projects",
    description: "From DeFi protocols to NFT marketplaces, we've helped shape the success stories of Web3.",
    color: "#A020F0"
  },
  {
    icon: Users,
    title: "175K+ Active Users",
    description: "Building engaged communities that drive real adoption through strategic engagement.",
    color: "#00D1C4"
  },
  {
    icon: Activity,
    title: "400% Average Growth",
    description: "Delivering exponential growth through targeted marketing campaigns.",
    color: "#A020F0"
  },
  {
    icon: Zap,
    title: "24/7 Market Presence",
    description: "Maintaining constant visibility and engagement across all key platforms.",
    color: "#00D1C4"
  }
];

export default function About() {
  return (
    <div className="min-h-screen pt-32 p-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <DashboardCard className="p-8 mb-12">
            <div className="text-center mb-12">
              <motion.div 
                className="text-5xl sm:text-7xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlitchText 
                  text="Who We Are" 
                  fontSize="1em"
                  enableGlitch={true}
                />
              </motion.div>
              <p className="text-xl text-white/80 font-mono max-w-3xl mx-auto mb-8">
                Wevolv3 is a cutting-edge Web3 marketing agency, driving exponential growth and market dominance since 2018. We are a collective of blockchain strategists, guerrilla marketers, and growth engineers specialized in high-impact, algorithm-driven strategies that position Web3 brands ahead of the competition.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <DashboardCard
                  key={index}
                  title={feature.title}
                  neonColor={feature.color}
                  className="p-6"
                >
                  <div className="relative mb-6">
                    <img 
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${feature.color}20`,
                      }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                  </div>
                  <p className="text-white/80 font-mono">{feature.description}</p>
                </DashboardCard>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {achievements.map((achievement, index) => (
                <DashboardCard
                  key={index}
                  neonColor={achievement.color}
                  className="p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${achievement.color}20`,
                      }}
                    >
                      <achievement.icon className="w-6 h-6" style={{ color: achievement.color }} />
                    </div>
                    <h3 className="text-xl font-orbitron" style={{ color: achievement.color }}>
                      {achievement.title}
                    </h3>
                  </div>
                  <p className="text-white/80 font-mono">{achievement.description}</p>
                </DashboardCard>
              ))}
            </div>

            <DashboardCard className="p-8 text-center">
              <h2 className="text-2xl font-orbitron font-bold mb-6 bg-gradient-to-r from-[#00D1C4] to-[#A020F0] bg-clip-text text-transparent">
                Ready to Dominate the Web3 Space?
              </h2>
              <p className="text-lg text-white/80 font-mono mb-8">
                We don't follow trends—we create them. Let's turn your project into the next Web3 success story.
              </p>
              <Link to="/contact">
                <Button 
                  variant="primary"
                  className="text-lg font-mono inline-flex items-center gap-2"
                >
                  Let's Build Something Amazing
                  <Rocket className="w-5 h-5" />
                </Button>
              </Link>
            </DashboardCard>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}