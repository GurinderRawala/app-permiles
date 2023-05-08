import React, { FC, PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider as TP, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Store } from '../redux';
import './font-family.css';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { mode } = useSelector((state: Store) => state.themeReducer);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#b1355c',
      },
      secondary: {
        main: '#041c34',
      },
    },
    typography: {
      fontFamily: '"Titillium Web", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          fontFamily: '"Titillium Web", sans-serif',
        },
      },
    },
  });

  return (
    <TP theme={theme}>
      <CssBaseline />
      {children}
    </TP>
  );
};
