// src/components/ErrorBoundary.js
import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert" style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          margin: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <h2>Something went wrong.</h2>
          {this.state.error && (
            <p>{this.state.error.toString()}</p>
          )}
          {this.state.errorInfo?.componentStack && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Component Stack Trace</summary>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;