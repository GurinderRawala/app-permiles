import React, { FC, PropsWithChildren, useEffect } from 'react';
import { SideBar } from '../components/side-bar';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { NavigationLayoutStyled } from './styled';

export interface NavigationProviderProps {
  pageTitle: string;
}

export const NavigationProvider: FC<
  PropsWithChildren<NavigationProviderProps>
> = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = `Per Miles | ${pageTitle}`;
  }, []);

  return (
    <NavigationLayoutStyled>
      <SideBar
        upperLink={[
          {
            icon: <LocalShippingOutlinedIcon />,
            href: '/equipment',
            to: <>Equipment</>,
          },
        ]}
        lowerLink={[
          {
            icon: <LocalShippingOutlinedIcon />,
            href: '/equipment',
            to: <>Equipment</>,
          },
        ]}
      />
      {children}
    </NavigationLayoutStyled>
  );
};
