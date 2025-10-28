import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Code2,
  Shield,
  Puzzle,
  ArrowRight,
  Check,
  Github,
  Star,
  Users,
  Lock,
  Palette,
  Gauge,
} from "lucide-react";
import logo from "../images/logo.png";

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const features = [
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliant with end-to-end encryption",
    },
    {
      icon: Palette,
      title: "Full Customization",
      description: "Brand your auth flows with custom themes and styling",
    },
    {
      icon: Gauge,
      title: "Lightning Fast",
      description: "99.99% uptime with global CDN and edge deployment",
    },
    {
      icon: Code2,
      title: "Developer First",
      description: "Clean APIs, comprehensive docs, and TypeScript support",
    },
  ];

  const stats = [
    { label: "Developers", value: "50K+", icon: Users },
    { label: "API Calls/month", value: "1B+", icon: Zap },
    { label: "Uptime", value: "99.99%", icon: Shield },
    { label: "GitHub Stars", value: "12K+", icon: Star },
  ];

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <motion.div
          style={{ opacity, scale, y }}
          className="container text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center"
            >
              {/* <Zap className="h-8 w-8 text-primary" />
               */}

              <img
                src={logo}
                alt="LOGO HERE"
                className="h-20 w-20 text-primary"
              />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-nirva-gradient">
                Authentication
              </span>
              <br />
              Made Simple
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stop building auth from scratch. Nirva provides secure,
              customizable authentication that integrates in minutes, not weeks.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Documentation
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-muted-foreground"
            >
              No credit card required • 5 minute setup • 100% customizable
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Authentication Shouldn't Be This Hard
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every developer faces the same frustration: spending weeks
              building auth instead of your core product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Security Complexity",
                description:
                  "JWT tokens, password hashing, session management, OAUTH flows...",
                pain: "Weeks of security research",
              },
              {
                title: "Endless Boilerplate",
                description:
                  "Login forms, validation, error handling, state management...",
                pain: "Hundreds of lines of code",
              },
              {
                title: "Maintenance Burden",
                description:
                  "Security updates, compliance, scaling, monitoring...",
                pain: "Ongoing technical debt",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-destructive/20">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-lg mb-3 text-destructive">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <p className="text-sm font-medium text-destructive/80">
                      {item.pain}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet{" "}
              <span className="bg-clip-text text-transparent bg-nirva-gradient">Nirva</span>:
              Your Authentication Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Production-ready authentication that plugs into your app in
              minutes, not weeks. Secure, scalable, and completely customizable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="text-xl font-semibold mb-4">
                Get started in 3 lines of code
              </h3>
              <pre className="text-sm text-slate-300 font-mono">
                {`import { NirvaProvider, LoginForm } from '@nirva/react'

export default function App() {
  return (
    <NirvaProvider apiKey="your-api-key">
      <LoginForm onSuccess={() => console.log('Logged in!')} />
    </NirvaProvider>
  )
}`}
              </pre>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Type-safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Customizable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Secure</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ship Faster?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've eliminated auth complexity
              with Nirva. Get started in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  Start Building Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/playground">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Try the Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
