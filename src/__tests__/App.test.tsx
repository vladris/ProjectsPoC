import { render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from '../App';

describe('App', () => {
  it('renders welcome message', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    );

    expect(screen.getByText('Welcome to Projects PoC')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    );

    expect(screen.getByText('A React application with Fluent UI components')).toBeInTheDocument();
  });
});
