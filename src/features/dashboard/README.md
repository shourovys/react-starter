# Dashboard Feature

This feature module handles all dashboard-related functionality including data visualization, user analytics, and dashboard management.

## Structure

```
src/features/dashboard/
├── components/     # Dashboard-specific UI components
├── hooks/         # Dashboard-specific hooks
├── services/      # Dashboard API services
├── store/         # Dashboard state management
├── types/         # Dashboard-related TypeScript types
├── utils/         # Dashboard utility functions
├── __tests__/     # Feature integration tests
├── index.ts       # Public API exports
└── README.md      # This file
```

## Public API

```typescript
import { useDashboard, DashboardWidget, dashboardService } from '@/features/dashboard';

// Hook for accessing dashboard data
const { widgets, metrics, isLoading } = useDashboard();

// Component for dashboard widgets
<DashboardWidget type="chart" data={chartData} />

// Service for dashboard API calls
await dashboardService.getMetrics(timeRange);
```

## Components

- `DashboardWidget` - Reusable dashboard widget component
- `MetricsCard` - Metrics display card
- `ChartContainer` - Chart wrapper component
- `DashboardGrid` - Dashboard layout grid

## Hooks

- `useDashboard` - Main dashboard data hook
- `useMetrics` - Metrics data hook
- `useWidgets` - Dashboard widgets management hook

## Services

- `dashboardService` - Dashboard API client
- `metricsService` - Metrics data service
- `widgetService` - Widget configuration service

## Store

Uses Zustand for state management with the following slices:

- Dashboard state (widgets, layout, settings)
- Metrics state (data, filters, time ranges)
- UI state (loading, errors, refresh intervals)

## Types

```typescript
interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'text';
  title: string;
  data: any;
  position: { x: number; y: number; w: number; h: number };
}

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  conversionRate: number;
}
```

## Testing

Run feature tests:

```bash
npm test src/features/dashboard/__tests__/
```

## Usage Examples

### Basic Dashboard

```tsx
import { useDashboard, DashboardGrid } from '@/features/dashboard';

function DashboardPage() {
  const { widgets, isLoading } = useDashboard();

  if (isLoading) return <LoadingSpinner />;

  return (
    <DashboardGrid>
      {widgets.map(widget => (
        <DashboardWidget key={widget.id} {...widget} />
      ))}
    </DashboardGrid>
  );
}
```

### Metrics Display

```tsx
import { useMetrics, MetricsCard } from '@/features/dashboard';

function MetricsOverview() {
  const { metrics, timeRange, setTimeRange } = useMetrics();

  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricsCard
        title="Total Users"
        value={metrics.totalUsers}
        change={metrics.userGrowth}
      />
      <MetricsCard
        title="Revenue"
        value={metrics.revenue}
        change={metrics.revenueGrowth}
      />
    </div>
  );
}
```
