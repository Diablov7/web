import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Users, Rocket, Brain, Star, Activity, 
  Newspaper, Target, Zap, Trophy, Search, Code, 
  BarChart, Layers, Workflow, Lightbulb, Cpu,
  Crosshair, Radar, Infinity, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsBar from '../components/StatsBar';
import Button from '../components/Button';
import DashboardCard from '../components/DashboardCard';
import GlitchText from '../components/GlitchText';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { BrandGradientAnimation } from '../components/ui/brand-gradient-animation';

const achievements = [
  {
    icon: CheckCircle2,
    text: "Since 2020 – 5 years of experience in scaling crypto projects.",
    color: "#00FFE1"
  },
  {
    icon: CheckCircle2,
    text: "50+ successful projects – Boosting adoption, community engagement, and visibility.",
    color: "#00FFE1"
  },
  {
    icon: CheckCircle2,
    text: "175K+ holders impacted – Our campaigns drive real adoption and on-chain traction.",
    color: "#00FFE1"
  },
  {
    icon: CheckCircle2,
    text: "Pioneers in algorithmic marketing – Leveraging AI, automation, and market data to drive conversions.",
    color: "#00FFE1"
  },
  {
    icon: CheckCircle2,
    text: "Trusted by leading Web3 brands – Proven expertise in community growth, guerrilla marketing, and influencer activations.",
    color: "#00FFE1"
  }
];

const painPoints = [
  "Your code is flawless, but no one gets the value of your project.",
  "Hours spent explaining blockchain, DeFi, or NFTs to an audience that just doesn't click.",
  "Competitors with slick marketing steal the spotlight, even with weaker tech."
];

const workflowSteps = [
  {
    icon: Crosshair,
    title: "Deep Dive & Disruption",
    description: "We don't just analyze your project—we break it down to its core, identifying hidden opportunities and untapped angles. Our team deciphers trends, audience behaviors, and market gaps to craft an unbeatable strategy.",
    image: "https://images.unsplash.com/photo-1614064642639-e398cf05badb?auto=format&fit=crop&w=800&q=80",
    color: "#00FFE1"
  },
  {
    icon: Cpu,
    title: "Tactical Growth Engineering",
    description: "We architect high-impact, data-driven growth tactics designed for virality, adoption, and market domination. From guerrilla marketing to on-chain trend hacking, we align our approach with your project's strengths for exponential traction.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    color: "#7000FF"
  },
  {
    icon: Radar,
    title: "Execution & Market Infiltration",
    description: "We deploy disruptive campaigns with surgical precision. Leveraging AI-powered analytics, strategic influencer activations, and algorithmic dominance, we drive rapid adoption, build hype, and maximize engagement.",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
    color: "#00FFE1"
  },
  {
    icon: Infinity,
    title: "Adaptive Dominance",
    description: "Continuous iteration is key. We track on-chain data, social sentiment, and campaign analytics in real-time, constantly refining our strategy to ensure sustained market relevance, engagement growth, and viral traction.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    color: "#7000FF"
  }
];

export default function Home() {
  return (
    <>
      <BrandGradientAnimation />
      <div className="min-h-screen pt-20 sm:pt-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <DashboardCard className="p-4 sm:p-8 mb-8">
            <div className="text-center mb-8 sm:mb-12">
              <motion.div 
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlitchText 
                  text="Wevolv3" 
                  fontSize="1em"
                  enableGlitch={true}
                />
              </motion.div>
              <motion.div 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlitchText 
                  text="Build, Launch, Succeed"
                  fontSize="1em"
                />
              </motion.div>
              <motion.h2 
                className="text-lg sm:text-xl md:text-2xl font-mono mb-8 sm:mb-12 max-w-4xl mx-auto text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We know killer code isn't enough. Let your vision gain traction with marketing strategies that speak dev and conquer the world.
              </motion.h2>

              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-xl sm:text-2xl font-orbitron" style={{ color: '#00FFE1' }}>
                  $50M+ <span className="text-xs sm:text-sm text-white/60">Raised</span>
                </div>
                <div className="text-xl sm:text-2xl font-orbitron" style={{ color: '#00FFE1' }}>
                  400% <span className="text-xs sm:text-sm text-white/60">Last Campaign</span>
                </div>
                <div className="text-xl sm:text-2xl font-orbitron" style={{ color: '#00FFE1' }}>
                  48 <span className="text-xs sm:text-sm text-white/60">Services Available</span>
                </div>
              </motion.div>
            </div>

            <StatsBar />
          </DashboardCard>

          {/* Who We Are Section */}
          <DashboardCard className="p-4 sm:p-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-orbitron mb-6 sm:mb-8 text-center bg-gradient-to-r from-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
                Who We Are
              </h2>

              <div className="mb-8">
                <p className="text-lg sm:text-xl text-white/80 font-mono leading-relaxed mb-8">
                  Wevolv3: The Premier Web3 Marketing Agency Powering Explosive Growth Since 2020.
                  We're a dynamic team of blockchain strategists, guerrilla marketers, visionary designers, KOL experts, and growth engineers, delivering high-impact, data-driven strategies that propel Web3 startups to the forefront. Our algorithm-powered campaigns are engineered to dominate markets, amplify adoption, and position your brand as the next big thing in the decentralized revolution.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <achievement.icon 
                        className="w-6 h-6 mt-1 flex-shrink-0" 
                        style={{ color: achievement.color }} 
                      />
                      <p className="text-white/80 font-mono">
                        {achievement.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <DashboardCard className="p-4 sm:p-6 text-center" neonColor="#7000FF">
                <p className="text-lg sm:text-xl text-white/80 font-mono leading-relaxed">
                  We don't follow trends—we create them. Wevolv3 delivers next-level marketing solutions that turn crypto projects into industry leaders.
                </p>
              </DashboardCard>
            </motion.div>
          </DashboardCard>

          {/* Problem Section */}
          <DashboardCard className="p-4 sm:p-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-orbitron mb-6 sm:mb-8 text-center bg-gradient-to-r from-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
                Sound Familiar?
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {painPoints.map((point, index) => (
                  <DashboardCard
                    key={index}
                    neonColor="#00FFE1"
                    className="p-4 sm:p-6 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <p className="text-base sm:text-lg text-white/80 font-mono">{point}</p>
                  </DashboardCard>
                ))}
              </div>

              <DashboardCard className="p-4 sm:p-6 text-center" neonColor="#7000FF">
                <p className="text-lg sm:text-xl text-white/80 font-mono leading-relaxed">
                  We're devs at heart and marketers by strategy. We get the pain of seeing a Web3 project undervalued due to a missing narrative that engages and converts.
                </p>
              </DashboardCard>
            </motion.div>
          </DashboardCard>

          {/* How We Work Section */}
          <DashboardCard className="p-4 sm:p-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-orbitron mb-6 sm:mb-8 text-center bg-gradient-to-r from-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
                How We Work
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {workflowSteps.map((step, index) => (
                  <DashboardCard
                    key={index}
                    neonColor={step.color}
                    className="p-4 sm:p-6 overflow-hidden"
                  >
                    <div className="relative">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{
                          background: `linear-gradient(145deg, ${step.color}30, ${step.color}10)`,
                          boxShadow: `0 0 20px ${step.color}30`
                        }}
                      >
                        <step.icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <h3 className="text-xl font-orbitron" style={{ color: step.color }}>
                        {index + 1}. {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/80 font-mono leading-relaxed">
                      {step.description}
                    </p>
                  </DashboardCard>
                ))}
              </div>

              <DashboardCard className="p-6 text-center" neonColor="#00FFE1">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Workflow className="w-8 h-8" style={{ color: '#00FFE1' }} />
                  <h3 className="text-xl font-orbitron bg-gradient-to-r from-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
                    Perpetual Growth Engine
                  </h3>
                </div>
                <p className="text-lg text-white/80 font-mono leading-relaxed">
                  Growth never stops. We utilize machine learning, on-chain insights, and engagement loops to ensure your project continuously evolves, leveraging every market movement to stay ahead of the curve.
                </p>
              </DashboardCard>
            </motion.div>
          </DashboardCard>

          {/* Final CTA Section */}
          <DashboardCard className="p-4 sm:p-8 text-center" neonColor="#00FFE1">
            <h2 className="text-2xl sm:text-3xl font-orbitron mb-4 sm:mb-6 bg-gradient-to-r from-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto font-mono">
              Let us show you how your Web3 idea can dominate the market. Talk to our team today and get ahead.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <ShimmerButton 
                  className="text-base sm:text-lg font-mono flex items-center gap-2"
                  shimmerColor="rgba(0, 255, 225, 0.2)"
                  background="linear-gradient(145deg, rgba(0, 255, 225, 0.3), rgba(112, 0, 255, 0.1))"
                >
                  I Want to Grow My Project
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </ShimmerButton>
              </Link>
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </>
  );
}