import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Component, ErrorInfo, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error !== null) {
      return (
        <Alert
          color="red"
          title="Error querying page data"
          icon={<IconAlertTriangle size={14} />}
        >
          <strong>Error:</strong> {this.state.error.message}
        </Alert>
      );
    }

    return this.props.children;
  }
}

const ResettingErrorBoundary = (props: Props) => {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>{props.children}</ErrorBoundary>
  );
};

export default ResettingErrorBoundary;
