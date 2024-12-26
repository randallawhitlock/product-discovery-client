"use client";

import React from "react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
}) => {
  // Pick a color scheme based on the title, if you want a little variety:
  let bgClass = "bg-blue-50 text-blue-600";
  if (title.toLowerCase().includes("blog")) {
    bgClass = "bg-purple-50 text-purple-600";
  } else if (title.toLowerCase().includes("user")) {
    bgClass = "bg-green-50 text-green-600";
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-600">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
