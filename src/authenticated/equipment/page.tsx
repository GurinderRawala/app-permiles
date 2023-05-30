import React, { FC, useEffect } from 'react';
import { EQUIPMENTS_ROUTES } from './route.definitions';
import { TrailerGrid } from './components/trailer-grid';
import { TabPanel, TabView } from '../components/tab-utils';
import { TruckGrid } from './components/truck-grid';
import { useTabChange } from '../hooks/tab-change';
import { useLoginOnce } from './hooks';

export const EquipmentPage: FC = () => {
  //useLoginOnce();
  useEffect(() => {
    document.title = `Per Miles | ${EQUIPMENTS_ROUTES.TITLE}`;
  }, []);

  const tabList = ['trailers', 'trucks', 'add trailers', 'add trucks'];

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
        <TrailerGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TruckGrid />
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
