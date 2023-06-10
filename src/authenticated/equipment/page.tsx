import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EQUIPMENTS_ROUTES } from './route.definitions';
import { TrailerGrid } from './components/trailer-grid';
import { TabPanel, TabView } from '../components/tab-utils';
import { TruckGrid } from './components/truck-grid';
import { useTabChange } from '../hooks/tab-change';
import { useLoginOnce } from './hooks';
import { AddEquipment } from './components/forms';
import { Trailer } from '../../generated/graphql';

export const EquipmentPage: FC = () => {
  //useLoginOnce();
  useEffect(() => {
    document.title = `Per Miles | ${EQUIPMENTS_ROUTES.TITLE}`;
  }, []);

  const tabList = ['trailers', 'trucks', 'add trailers', 'add trucks'];

  const { value, handleChange } = useTabChange(tabList);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Partial<Trailer>>({
    mode: 'onSubmit',
  });

  const onSubmitTrailerForm = (data: Partial<Trailer>) => {
    console.log({ data });
  };

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
        <AddEquipment
          {...{
            register,
            onSubmit: handleSubmit(onSubmitTrailerForm),
            formType: 'trailer',
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddEquipment
          {...{
            register,
            onSubmit: handleSubmit(onSubmitTrailerForm),
            formType: 'truck',
          }}
        />
      </TabPanel>
    </TabView>
  );
};
