import React, { FC } from 'react';
import { NavigationProvider } from '../navigation';
import { Box } from '@mui/material';
import { EQUIPMENTS_ROUTES } from './route.definitions';

export const EquipmentPage: FC = () => (
  <NavigationProvider pageTitle={EQUIPMENTS_ROUTES.TITLE}>
    This is Equipment page
  </NavigationProvider>
);
