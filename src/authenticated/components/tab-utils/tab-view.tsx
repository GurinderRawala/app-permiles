import { Box, Tab, Tabs, TabsProps, styled } from '@mui/material';
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
      <TabsWrapper>
        <Tabs {...tabsProps} aria-label="basic tabs example">
          {tabList.map((list, i) => (
            <Tab label={list} value={i} key={[list, i].join('-')} />
          ))}
        </Tabs>
      </TabsWrapper>
      <Box p={3}>{children}</Box>
    </>
  );
};

export const TabsWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: theme.palette.background.paper,
  height: 75,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));
