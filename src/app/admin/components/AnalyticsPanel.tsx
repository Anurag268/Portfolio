"use client";

import { useEffect, useState } from "react";
import { getAnalyticsDashboard } from "@/app/actions/analytics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Loader2, TrendingUp, Download, Eye, MousePointerClick } from "lucide-react";

export default function AnalyticsPanel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getAnalyticsDashboard();
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!data) return <div>Failed to load analytics.</div>;

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-sm font-medium mb-1">Total Page Views</p>
            <h3 className="text-3xl font-bold text-white">{data.totalViews}</h3>
          </div>
          <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Eye size={24} />
          </div>
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-sm font-medium mb-1">Resume Downloads</p>
            <h3 className="text-3xl font-bold text-white">{data.resumeDownloads}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
            <Download size={24} />
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-sm font-medium mb-1">Projects Clicked</p>
            <h3 className="text-3xl font-bold text-white">
              {data.topProjects.reduce((acc: number, p: any) => acc + p.clicks, 0)}
            </h3>
          </div>
          <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
            <MousePointerClick size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <TrendingUp size={18} className="mr-2 text-primary" /> 
            Traffic (Last 30 Days)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Top Projects Clicked</h3>
          <div className="h-72">
            {data.topProjects.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topProjects} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="clicks" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                Not enough data yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
