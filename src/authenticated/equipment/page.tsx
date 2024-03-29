import React, { FC, useEffect } from 'react';
import { EQUIPMENTS_ROUTES } from './route.definitions';
import { TrailerGrid } from './components/trailer-grid';
import { TabPanel, TabView } from '../components/tab-utils';
import { TruckGrid } from './components/truck-grid';
import { useTabChange } from '../hooks/tab-change';
import { useAddTrailer, useAddTruck, useEquipmentForm } from './hooks';
import { AddEquipment } from './components/forms';
import { useAlert } from '../../shared';
import { AddTrailerMutation, AddTruckMutation } from '../../generated/graphql';
import { UploadResponse } from '../hooks/file-upload-hook';
import { omit } from 'lodash';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const TRAILER_REPO = 'trailerRepo';
const TRUCK_REPO = 'truckRepo';

const TAB_LIST = ['trailers', 'trucks', 'add trailers', 'add trucks'];

export const EquipmentPage: FC = () => {
  useEffect(() => {
    document.title = `Per Miles | ${EQUIPMENTS_ROUTES.TITLE}`;
  }, []);

  const { value, handleChange } = useTabChange(TAB_LIST);
  const { addAlert } = useAlert();

  const formCallback = (
    _: AddTrailerMutation | AddTruckMutation | UploadResponse | null,
    err?: unknown
  ) => {
    if (err) {
      console.error({ err }, 'Error submitting');
      addAlert({
        type: 'error',
        message: 'Error while submitting.',
      });
      return;
    }

    addAlert({
      type: 'success',
      message: 'Equipment added successfully',
    });
  };

  const {
    register: registerTrailer,
    handleSubmit: handleSubmitTrailer,
    isLoading: isTrailerLoading,
    onSubmit: onTrailerSubmit,
    formErrors: trailerFormErrors,
    control: addTrailerControl,
  } = useEquipmentForm<'addTrailer', 'trailerInput'>(
    useAddTrailer,
    TRAILER_REPO,
    'filepath',
    formCallback,
    data => ({ input: omit(data, 'files') })
  );

  const {
    register: registerTruck,
    handleSubmit: handleSubmitTruck,
    isLoading: isTruckLoading,
    onSubmit: onTruckSubmit,
    formErrors: truckFormErrors,
    control: addTruckControl,
  } = useEquipmentForm<'addTruck', 'truckInput'>(
    useAddTruck,
    TRUCK_REPO,
    'filepath',
    formCallback,
    data => ({ input: omit(data, 'files') })
  );

  return (
    <TabView
      {...{
        tabList: TAB_LIST,
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
            register:
              registerTrailer as unknown as UseFormRegister<FieldValues>,
            onSubmit: handleSubmitTrailer(onTrailerSubmit),
            formType: 'trailer',
            errors: trailerFormErrors,
            isLoading: isTrailerLoading,
            formControl: addTrailerControl,
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddEquipment
          {...{
            register: registerTruck as unknown as UseFormRegister<FieldValues>,
            onSubmit: handleSubmitTruck(onTruckSubmit),
            formType: 'truck',
            errors: truckFormErrors,
            isLoading: isTruckLoading,
            formControl: addTruckControl,
          }}
        />
      </TabPanel>
    </TabView>
  );
};
