import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from './theme';
import { store } from './redux';
import { PMQueryProvider } from './api';
import { RouteProvider } from './router';
import { NavigationProvider } from './authenticated/navigation';
import { AlertProvider } from './shared';

export const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <PMQueryProvider>
        <ThemeProvider>
          <AlertProvider />
          {/* These are authenticated routes */}
          <NavigationProvider>
            <RouteProvider />
          </NavigationProvider>
        </ThemeProvider>
      </PMQueryProvider>
    </ReduxProvider>
  );
};
