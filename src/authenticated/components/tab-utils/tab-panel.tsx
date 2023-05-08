import React, { FC, PropsWithChildren } from 'react';

export interface TabPanelProps {
  value: number;
  index: number;
}

export const TabPanel: FC<PropsWithChildren<TabPanelProps>> = ({
  children,
  value,
  index,
}) => <>{value === index ? children : null}</>;
