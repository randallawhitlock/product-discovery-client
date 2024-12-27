import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
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
  let bgClass = 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
  if (title.toLowerCase().includes('blog')) {
    bgClass =
      'bg-purple-50 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
  } else if (title.toLowerCase().includes('user')) {
    bgClass =
      'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400';
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-300">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-md ${bgClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;