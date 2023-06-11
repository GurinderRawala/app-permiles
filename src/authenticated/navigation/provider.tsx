import React, { FC, PropsWithChildren } from 'react';
import { SideBar } from '../components/side-bar';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavigationLayoutStyled } from './styled';
import { Box } from '@mui/material';

export const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NavigationLayoutStyled>
      <SideBar
        upperLink={[
          {
            icon: <LocalShippingOutlinedIcon fontSize="small" />,
            href: '/equipment',
            to: <>Equipment</>,
          },
          {
            icon: <ReceiptOutlinedIcon fontSize="small" />,
            href: '/broker',
            to: <>Broker</>,
          },
        ]}
        lowerLink={[
          {
            icon: <SettingsOutlinedIcon fontSize="small" />,
            href: '/equipment',
            to: <>Settings</>,
          },
        ]}
      />
      <Box>{children}</Box>
    </NavigationLayoutStyled>
  );
};
