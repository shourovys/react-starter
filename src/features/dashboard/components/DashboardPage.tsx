import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Your application dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Metrics</h3>
              <p className="text-muted-foreground">
                View your key performance metrics
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Reports</h3>
              <p className="text-muted-foreground">Generate and view reports</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-muted-foreground">
                Configure your application
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
