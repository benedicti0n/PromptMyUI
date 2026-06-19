import { AppHeader } from "./appHeader";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/50 bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>UI Cloner Prompt Maker — Experimental MVP</p>
          <p className="mt-1">
            Extracts visual design DNA. Does not clone code or create pixel-perfect replicas.
          </p>
        </div>
      </footer>
    </div>
  );
}
