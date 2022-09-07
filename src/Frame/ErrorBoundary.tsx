import React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;