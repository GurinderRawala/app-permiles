import {
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import React, { FC, FormEventHandler } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { Texts } from '../../../../shared/types';
import dayjs from 'dayjs';
// import dayjs from 'dayjs';

export interface AddEquipmentProps {
  register: UseFormRegister<FieldValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  errors: FieldErrors;
  formType: 'trailer' | 'truck';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<any, any>;
  texts?: Texts<'title'>;
}
export const AddEquipment: FC<AddEquipmentProps> = ({
  register,
  onSubmit,
  errors,
  isLoading,
  formType,
  formControl,
  texts,
}) => {
  const commonCssForInput: TextFieldProps = {
    sx: {
      width: '70%',
    },
  };

  return (
    <Stack component="form" onSubmit={onSubmit} py={2} gap={2}>
      <Typography variant="h4" pb={2}>
        {texts?.title || (formType === 'trailer' ? 'Add Trailer' : 'Add Truck')}
      </Typography>
      <TextField
        {...commonCssForInput}
        {...register(formType === 'trailer' ? 'trailerNo' : 'truckNo', {
          required: [formType, 'No is required'].join(''),
        })}
        label={formType === 'trailer' ? 'TrailerNo' : 'TruckNo'}
        placeholder={formType === 'trailer' ? 'TrailerNo' : 'TruckNo'}
        error={!!errors.trailerNo}
        helperText={<>{errors.trailerNo?.message}</>}
      />
      <TextField
        {...commonCssForInput}
        {...register('model', {
          required: `Equipment model is required`,
        })}
        label="Model"
        placeholder="Model"
        error={!!errors.model}
        helperText={<>{errors.model?.message}</>}
      />
      <TextField
        {...commonCssForInput}
        {...register('make', {
          required: `Equipment make is required`,
        })}
        label="Make"
        placeholder="Make"
        helperText={<>{errors.make?.message}</>}
        error={!!errors.make}
      />
      <TextField
        {...commonCssForInput}
        {...register('year', {
          required: 'Equipment year is required',
        })}
        label="Year"
        placeholder="Year"
        helperText={<>{errors.year?.message}</>}
        error={!!errors.year}
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
          required: 'Licence plate is required',
        })}
        label="License Plate"
        placeholder="License Plate"
        error={!!errors.licencePlate}
        helperText={<>{errors.licencePlate?.message}</>}
      />

      <TextField
        {...commonCssForInput}
        {...register('licenceState', {
          required:
            'Licence plate state jurisdictions is required. For example: ON, MB, SK, AB, BC',
        })}
        label="License State"
        placeholder="License plate state"
        helperText={<>{errors.licenceState?.message}</>}
        error={!!errors.licenceState}
      />

      <Controller
        control={formControl}
        name="safetyExpire"
        defaultValue={dayjs(formControl._defaultValues.safetyExpire)}
        rules={{
          required: 'Annual safety expiry date is required',
        }}
        render={({
          field: { ref, onBlur, name, onChange, ...field },
          fieldState,
        }) => {
          return (
            <DatePicker
              {...{
                ...field,
                sx: commonCssForInput.sx,
                inputRef: ref,
                label: 'Safety Expire',
                onChange: v => {
                  onChange(
                    format(new Date(v as unknown as Date), 'yyyy-MM-dd')
                  );
                },
                slotProps: {
                  textField: {
                    onBlur,
                    name,
                    error: !!fieldState?.error,
                    helperText: fieldState?.error?.message,
                  },
                },
              }}
            />
          );
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
    </Stack>
  );
};
