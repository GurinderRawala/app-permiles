import {
  Box,
  Button,
  Input,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { CSSProperties, FC, FormEventHandler } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { AppDatePicker, AppDatePickerProps } from '../../../../shared';
import { format } from 'date-fns';

export interface AddEquipmentProps {
  register: UseFormRegister<FieldValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isError: boolean;
  errors: FieldErrors;
  formType: 'trailer' | 'truck';
}
export const AddEquipment: FC<AddEquipmentProps> = ({
  register,
  onSubmit,
  errors,
  isLoading,
  isError,
  formType,
}) => {
  const commonCssForInput: TextFieldProps = {
    sx: {
      width: '70%',
    },
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" pb={2}>
        {formType === 'trailer' ? 'Add Trailer' : 'Add Truck'}
      </Typography>
      <AddTrailerFormWrapper>
        <TextField
          {...commonCssForInput}
          {...register(formType === 'trailer' ? 'trailerNo' : 'truckNo', {
            required: true,
          })}
          label={formType === 'trailer' ? 'TrailerNo' : 'TruckNo'}
          placeholder={formType === 'trailer' ? 'TrailerNo' : 'TruckNo'}
          error={!!errors.trailerNo}
        />
        <TextField
          {...commonCssForInput}
          {...register('model', {
            required: true,
          })}
          label="Model"
          placeholder="Model"
        />
        <TextField
          {...commonCssForInput}
          {...register('make', {
            required: true,
          })}
          label="Make"
          placeholder="Make"
        />
        <TextField
          {...commonCssForInput}
          {...register('year', {
            required: true,
          })}
          label="Year"
          placeholder="Year"
        />
        <TextField
          {...commonCssForInput}
          {...register('vinNumber')}
          label="VIN#"
          placeholder="VIN#"
        />
        <TextField
          {...commonCssForInput}
          {...register('licencePlate', {
            required: true,
          })}
          label="License Plate"
          placeholder="License Plate"
        />

        <TextField
          {...commonCssForInput}
          {...register('licenceState', {
            required: true,
          })}
          label="License State"
          placeholder="License plate state"
        />
        <AppDatePicker
          pickerProps={{
            label: 'Safety Expire',
            sx: commonCssForInput.sx,
            onChange: value => {
              register('safetyExpire', {
                required: true,
                value: format(new Date(value as unknown as Date), 'yyyy-MM-dd'),
              });
            },
          }}
        />

        {formType === 'trailer' && (
          <TextField
            {...commonCssForInput}
            {...register('trailerAttributes')}
            label="Trailer Attributes"
            placeholder="Eg: Tri-axel, reefer"
          />
        )}

        <TextField
          {...commonCssForInput}
          {...register('notes')}
          label="Notes"
          placeholder="Notes"
          multiline
          rows={5}
        />

        <TextField
          {...commonCssForInput}
          {...register('files')}
          placeholder="Docs"
          type="file"
          inputProps={{
            multiple: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          color="secondary"
        >
          Submit
        </Button>
      </AddTrailerFormWrapper>
    </form>
  );
};
export const AddTrailerFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
