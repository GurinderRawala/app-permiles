import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from './theme';
import { store } from './redux';
import { PMQueryProvider } from './api';
import { RouteProvider } from './router';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PMQueryProvider>
        <ThemeProvider>
          <RouteProvider />
        </ThemeProvider>
      </PMQueryProvider>
    </ReduxProvider>
  );
};

export default App;
