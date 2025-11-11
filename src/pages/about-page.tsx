import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About This Project</CardTitle>
          <CardDescription>
            A comprehensive React + TypeScript starter boilerplate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">This project includes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>React 19 with TypeScript</li>
              <li>Tailwind CSS with shadcn/ui components</li>
              <li>
                Comprehensive testing setup (Unit, E2E, Accessibility,
                Performance)
              </li>
              <li>Contract testing with Pact</li>
              <li>Git hooks and pre-commit validation</li>
              <li>CI/CD pipeline ready</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
