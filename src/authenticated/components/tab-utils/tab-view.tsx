import { Box, Tab, Tabs, TabsProps } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

export interface TabViewProps {
  tabList: string[];
  tabsProps: TabsProps;
}

export const TabView: FC<PropsWithChildren<TabViewProps>> = ({
  children,
  tabList,
  tabsProps,
}) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs {...tabsProps} aria-label="basic tabs example">
          {tabList.map((list, i) => (
            <Tab label={list} value={i} key={[list, i].join('-')} />
          ))}
        </Tabs>
      </Box>
      {children}
    </>
  );
};
