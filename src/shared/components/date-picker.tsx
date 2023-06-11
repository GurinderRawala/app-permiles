import React, { FC } from 'react';

import {
  DatePicker as DP,
  LocalizationProvider,
  DatePickerProps as DPProps,
  LocalizationProviderProps,
} from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export declare type AppDatePickerProps = {
  pickerProps?: DPProps<unknown>;
  localizationProvider?: LocalizationProviderProps<unknown, unknown>;
};

export const AppDatePicker: FC<AppDatePickerProps> = ({
  pickerProps,
  localizationProvider,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} {...localizationProvider}>
    <DP {...pickerProps} />
  </LocalizationProvider>
);
