import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Tasks Management</h1>
        <Button>Get started</Button>
      </div>
    </main>
  );
}
