import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; message?: string }

/**
 * Top-level safety net. Without this, any uncaught render/init error (e.g.
 * a misconfigured Firebase .env) takes the entire app down to a blank
 * screen with nothing shown to the user — which the project spec
 * explicitly calls out as unacceptable ("never show a blank page").
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled app error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-base-black px-6 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-accent-cyan">SYSTEM ERROR</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-2 max-w-md text-sm text-foreground-muted">
            {this.state.message ?? "An unexpected error occurred."} Check your <code>.env</code> Firebase
            configuration and the browser console for details.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 border border-base-border px-6 py-3 font-mono text-xs tracking-[0.2em] hover:border-accent-cyan hover:text-accent-cyan"
          >
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
