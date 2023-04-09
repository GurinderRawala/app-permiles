import { RouteObject } from 'react-router-dom';
import React from 'react';
import { EQUIPMENTS_ROUTES } from './route.definitions';
import { EquipmentPage } from './page';

export const equipmentRoutes: RouteObject = {
  path: EQUIPMENTS_ROUTES.ABSOLUTE_PATH,
  element: <EquipmentPage />,
};
