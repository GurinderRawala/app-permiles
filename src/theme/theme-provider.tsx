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
        main: '#041c34',
      },
      secondary: {
        main: '#b1355c',
      },
    },
    typography: {
      fontFamily: '"Titillium Web", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face: '"Titillium Web", sans-serif'
        `,
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
