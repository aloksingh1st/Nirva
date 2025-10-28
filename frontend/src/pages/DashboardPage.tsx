import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

import axios from "axios";

import {
  BarChart3,
  Users,
  Key,
  Shield,
  Plus,
  Settings,
  Activity,
  Globe,
  CheckCircle,
  Copy,
  Webhook,
  TrendingUp,
  Axis3DIcon,
} from "lucide-react";
import CreateAppModal from "@/components/modals/CreateAppModal";
import { createApp, getApps } from "@/services/appService";

export const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production",
      secretKey: "nv_prod_****************************",
      createdAt: "2024-01-15",
      last_used: "2024-01-20",
    },
    {
      id: "2",
      name: "Development",
      secretKey: "nv_dev_*****************************",
      createdAt: "2024-01-10",
      last_used: "2024-01-19",
    },
  ]);

  const handleCreate = async (appData: any) => {
    await createApp(appData);
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,483",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "API Calls",
      value: "1.2M",
      change: "+8%",
      trend: "up",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Success Rate",
      value: "99.8%",
      change: "+0.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Active Sessions",
      value: "3,421",
      change: "-2%",
      trend: "down",
      icon: Globe,
      color: "text-orange-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New user registration",
      email: "john@example.com",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Failed login attempt",
      email: "user@test.com",
      time: "5 minutes ago",
      status: "error",
    },
    {
      id: 3,
      action: "Password reset",
      email: "sarah@company.co",
      time: "12 minutes ago",
      status: "success",
    },
    {
      id: 4,
      action: "OAuth login (GitHub)",
      email: "dev@startup.io",
      time: "18 minutes ago",
      status: "success",
    },
    {
      id: 5,
      action: "API key regenerated",
      email: "admin@myapp.com",
      time: "1 hour ago",
      status: "warning",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  function maskSecretKey(secret: string) {
    const visibleLength = 10; // show first 10 chars, adjust as needed
    if (!secret) return "";
    const visiblePart = secret.slice(0, visibleLength);
    const maskedPart = "*".repeat(Math.max(0, secret.length - visibleLength));
    return visiblePart + maskedPart;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateNewKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: "New Key",
      key: "nv_dev_" + Math.random().toString(36).substring(2, 32),
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys([...apiKeys, newKey]);
  };

  useEffect(() => {
    const getapps = async () => {
      const apps = await getApps();

      setApiKeys(apps.apps);
    };

    getapps();
  }, [isModalOpen]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Authentication Required
            </h2>
            <p className="text-muted-foreground">
              Please log in to access the dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.name}! Here's what's happening with your
                authentication.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New App
              </Button>

              <CreateAppModal
                isOpen={isModalOpen}
                onClose={() => closeModal()}
                onCreate={handleCreate}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p
                          className={`text-xs ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          } flex items-center mt-1`}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change} from last month
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800`}
                      >
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Keys */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <CardTitle>My Apps</CardTitle>
                  </div>
                  {/* <Button size="sm" onClick={generateNewKey}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Key
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{key.name}</h4>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono mt-1">
                          {maskSecretKey(key.secretKey)}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            Created:{" "}
                            {new Date(key.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Last used:{" "}
                            {new Date(key.last_used).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(key.secretKey)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "error"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Charts & Analytics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Authentication Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm">Showing login trends over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2" />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">
                        https://api.myapp.com/webhooks/auth
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Password Reset</p>
                      <p className="text-sm text-muted-foreground">
                        https://api.myapp.com/webhooks/reset
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-600">Disabled</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
