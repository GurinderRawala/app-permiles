import React, { FC, useEffect } from 'react';
import { BROKER_ROUTES } from './route.definitions';
import { useTabChange } from '../hooks/tab-change';
import { TabPanel, TabView } from '../components/tab-utils';
import { BrokerGrid } from './components/broker-grid';
import { useAlert } from '../../shared';
import { useAddBroker, useBrokerForm } from './hooks';
import { AddBroker } from './components/forms/add-broker';

export const BrokerPage: FC = () => {
  useEffect(() => {
    document.title = `Per Miles | ${BROKER_ROUTES.TITLE}`;
  }, []);

  const tabList = ['Broker List', 'Invoice Broker', 'Add Broker'];
  const { value, handleChange } = useTabChange(tabList);
  const { addAlert } = useAlert();

  const {
    register,
    formErrors: errors,
    isLoading,
    onSubmit,
    handleSubmit,
  } = useBrokerForm<'add'>(
    useAddBroker,
    err => {
      if (err) {
        addAlert({
          message: 'Error adding broker',
          type: 'error',
        });

        return;
      }

      addAlert({
        message: 'Broker added successfully.',
        type: 'success',
      });
    },
    data => ({ input: data })
  );

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
        <AddBroker
          {...{
            register,
            onSubmit: handleSubmit(onSubmit),
            errors,
            isLoading,
          }}
        />
      </TabPanel>
    </TabView>
  );
};
