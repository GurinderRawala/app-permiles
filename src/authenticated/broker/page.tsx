import React, { FC, useEffect } from 'react';
import { BROKER_ROUTES } from './route.definitions';
import { useTabChange } from '../hooks/tab-change';
import { TabPanel, TabView } from '../components/tab-utils';
import { BrokerGrid } from './components/broker-grid';

export const BrokerPage: FC = () => {
  useEffect(() => {
    document.title = `Per Miles | ${BROKER_ROUTES.TITLE}`;
  }, []);

  const tabList = ['Broker List', 'Invoice Broker', 'Add Broker'];
  const { value, handleChange } = useTabChange(tabList);

  return (
    <TabView
      {...{
        tabList,
        tabsProps: {
          value,
          onChange: handleChange,
        },
      }}
    >
      <TabPanel value={value} index={0}>
        <BrokerGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </TabView>
  );
};
