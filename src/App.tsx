import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from './theme';
import { store } from './redux';
import { PMQueryProvider } from './api';
import { RouteProvider } from './router';
import { NavigationProvider } from './authenticated/navigation';
import { AlertProvider, PopUpBoxProvider } from './shared';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <PMQueryProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AlertProvider />
            {/* These are authenticated routes */}
            <PopUpBoxProvider>
              <NavigationProvider>
                <RouteProvider />
              </NavigationProvider>
            </PopUpBoxProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </PMQueryProvider>
    </ReduxProvider>
  );
};
