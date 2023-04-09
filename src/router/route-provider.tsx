import React, { PropsWithChildren, type FC } from 'react';
import { RouterProvider as RP, createBrowserRouter } from 'react-router-dom';
import { LoadingOrError as Loading } from '../authenticated/components/loading';
import { equipmentRoutes } from '../authenticated';

export const RouteProvider: FC<PropsWithChildren> = () => {
  const router = createBrowserRouter([equipmentRoutes], {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  });

  return <RP router={router} fallbackElement={<Loading />} />;
};
