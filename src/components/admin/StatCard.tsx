import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'info' | 'pending';
}

const variantStyles = {
  default: 'bg-admin-card border-border',
  success: 'bg-admin-success/10 border-admin-success/20',
  warning: 'bg-admin-warning/10 border-admin-warning/20',
  info: 'bg-admin-info/10 border-admin-info/20',
  pending: 'bg-admin-pending/10 border-admin-pending/20',
};

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-admin-success/20 text-admin-success',
  warning: 'bg-admin-warning/20 text-admin-warning',
  info: 'bg-admin-info/20 text-admin-info',
  pending: 'bg-admin-pending/20 text-admin-pending',
};

export const StatCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  return (
    <div className={cn(
      "rounded-xl border p-6 transition-all duration-200 hover:shadow-md",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              trend.isPositive ? "text-admin-success" : "text-destructive"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
