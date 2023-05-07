import React, { FC } from 'react';
import { NavigationProvider } from '../navigation';
import { EQUIPMENTS_ROUTES } from './route.definitions';
import { TrailerGrid } from './components/trailer-grid';

export const EquipmentPage: FC = () => {
  return (
    <NavigationProvider pageTitle={EQUIPMENTS_ROUTES.TITLE}>
      <TrailerGrid />
    </NavigationProvider>
  );
};
