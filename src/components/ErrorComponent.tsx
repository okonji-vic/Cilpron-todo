import React from "react";
import { Link } from "react-router-dom";

interface FallbackComponentProps {
  error: Error;
  resetErrorBoundary: () => void;
}

// FallbackComponent to handle errors
function FallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackComponentProps) {
  return (
    <div role="alert">
      <h1>Something went wrong:</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
      {/* Log error for debugging */}
      {/* {console.log(error)} */}
    </div>
  );
}

// Component that simulates an error
function ErrorComponent() {
  const [hasError, setHasError] = React.useState(false);

  // Simulate a crash
  if (hasError) {
    throw new Error("An unexpected error occurred");
  }

  return (
    <>
      <h1>Click the button to crash the app</h1>
      <button
        onClick={() => setHasError(true)}
        style={{ marginRight: "0.5em" }}
      >
        Crash
      </button>
      <button onClick={() => (window.location.href = "/")}>
        Go back to Home
      </button>
    </>
  );
}

export { ErrorComponent, FallbackComponent };
