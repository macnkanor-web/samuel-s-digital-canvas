import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/3 w-[28rem] h-[28rem] rounded-full bg-destructive/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="relative text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-3">
            Something broke
          </h1>
          <p className="text-muted-foreground mb-2">
            An unexpected error occurred while rendering this page.
          </p>
          {this.state.error?.message && (
            <p className="font-mono text-xs text-muted-foreground/80 mb-8 px-3 py-2 rounded bg-muted inline-block max-w-full overflow-hidden text-ellipsis">
              {this.state.error.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Button variant="default" size="lg" onClick={this.handleReload}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload page
            </Button>
            <Button variant="outline" size="lg" onClick={this.handleHome}>
              <Home className="w-4 h-4 mr-2" />
              Back to home
            </Button>
          </div>
        </div>
      </main>
    );
  }
}
