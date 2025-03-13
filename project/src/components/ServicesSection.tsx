import React from 'react';
import { motion } from 'framer-motion';
import { Tabs } from './ui/tabs';
import DashboardCard from './DashboardCard';
import { Brain, Rocket, Target, Users, Zap } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: "Growth Strategy",
      value: "growth",
      content: (
        <DashboardCard className="w-full overflow-hidden relative h-full rounded-2xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cosmic-teal/10">
              <Rocket className="w-8 h-8 text-cosmic-teal" />
            </div>
            <h3 className="text-2xl font-orbitron text-cosmic-teal">Growth Strategy</h3>
          </div>
          <div className="space-y-4 font-mono text-white/80">
            <p>Comprehensive market analysis and strategic planning for explosive growth.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Market positioning & competitor analysis</li>
              <li>Growth metrics identification</li>
              <li>Target audience segmentation</li>
              <li>ROI-focused campaign planning</li>
            </ul>
          </div>
        </DashboardCard>
      ),
    },
    {
      title: "Community",
      value: "community",
      content: (
        <DashboardCard className="w-full overflow-hidden relative h-full rounded-2xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cosmic-teal/10">
              <Users className="w-8 h-8 text-cosmic-teal" />
            </div>
            <h3 className="text-2xl font-orbitron text-cosmic-teal">Community Building</h3>
          </div>
          <div className="space-y-4 font-mono text-white/80">
            <p>Build and nurture an engaged community that believes in your vision.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Community management strategy</li>
              <li>Engagement programs</li>
              <li>Ambassador programs</li>
              <li>Content calendar management</li>
            </ul>
          </div>
        </DashboardCard>
      ),
    },
    {
      title: "Marketing",
      value: "marketing",
      content: (
        <DashboardCard className="w-full overflow-hidden relative h-full rounded-2xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cosmic-teal/10">
              <Target className="w-8 h-8 text-cosmic-teal" />
            </div>
            <h3 className="text-2xl font-orbitron text-cosmic-teal">Marketing Campaigns</h3>
          </div>
          <div className="space-y-4 font-mono text-white/80">
            <p>Data-driven marketing campaigns that deliver measurable results.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Social media marketing</li>
              <li>Influencer partnerships</li>
              <li>Content marketing</li>
              <li>Email marketing automation</li>
            </ul>
          </div>
        </DashboardCard>
      ),
    },
    {
      title: "Analytics",
      value: "analytics",
      content: (
        <DashboardCard className="w-full overflow-hidden relative h-full rounded-2xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cosmic-teal/10">
              <Brain className="w-8 h-8 text-cosmic-teal" />
            </div>
            <h3 className="text-2xl font-orbitron text-cosmic-teal">Analytics & Insights</h3>
          </div>
          <div className="space-y-4 font-mono text-white/80">
            <p>Turn data into actionable insights for continuous improvement.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Performance tracking</li>
              <li>Conversion optimization</li>
              <li>A/B testing</li>
              <li>ROI analysis</li>
            </ul>
          </div>
        </DashboardCard>
      ),
    },
    {
      title: "Technical",
      value: "technical",
      content: (
        <DashboardCard className="w-full overflow-hidden relative h-full rounded-2xl p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-cosmic-teal/10">
              <Zap className="w-8 h-8 text-cosmic-teal" />
            </div>
            <h3 className="text-2xl font-orbitron text-cosmic-teal">Technical Marketing</h3>
          </div>
          <div className="space-y-4 font-mono text-white/80">
            <p>Bridge the gap between technical excellence and market understanding.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Technical content creation</li>
              <li>Developer relations</li>
              <li>Technical documentation</li>
              <li>API integration support</li>
            </ul>
          </div>
        </DashboardCard>
      ),
    },
  ];

  return (
    <div className="h-[30rem] md:h-[40rem] [perspective:1000px] relative flex flex-col w-full items-start justify-start">
      <Tabs tabs={services} />
    </div>
  );
} 