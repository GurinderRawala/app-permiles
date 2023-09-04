import React, { FC, PropsWithChildren } from 'react';
import {
  CssBaseline,
  Palette,
  ThemeProvider as TP,
  createTheme,
  darkScrollbar,
} from '@mui/material';
import { grey } from '@mui/material/colors';
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
      ...(mode === 'dark' && darkModePalette),
      ...(mode === 'light' && lightModePalette),
      mode: mode || 'dark',
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
          html: {
            ...darkScrollbar(
              mode === 'light'
                ? {
                    track: grey[200],
                    thumb: grey[400],
                    active: grey[400],
                  }
                : undefined
            ),
            //scrollbarWidth for Firefox
            scrollbarWidth: 'thin',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            maxWidth: 350,
            minWidth: 100,
            height: 45,
          },
        },
      },
    },
  });

  return (
    <TP theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </TP>
  );
};
