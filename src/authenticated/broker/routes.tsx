import { RouteObject } from 'react-router-dom';
import React from 'react';
import { BROKER_ROUTES } from './route.definitions';
import { BrokerPage } from './page';

export const brokerRoutes: RouteObject = {
  path: BROKER_ROUTES.ABSOLUTE_PATH,
  element: <BrokerPage />,
};
