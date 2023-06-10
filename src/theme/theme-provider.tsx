import React, { FC, PropsWithChildren } from 'react';
import {
  CssBaseline,
  Palette,
  ThemeProvider as TP,
  createTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Store } from '../redux';
import './font-family.css';

export const darkModePalette: Pick<Palette, 'background'> = {
  background: {
    default: '#3c3c3c',
    paper: '#121212',
  },
};

export const lightModePalette: Pick<Palette, 'background'> = {
  background: {
    default: '#fafafa',
    paper: '#f5f5f5',
  },
};

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
      ...(mode === 'dark' ? darkModePalette : lightModePalette),
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
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: 16,
          },
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
