import {
  Box,
  Button,
  Divider,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from '@mui/material';
import React, { CSSProperties, FC, FormEventHandler } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface AddEquipmentProps {
  register: UseFormRegister<FieldValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  formType: 'trailer' | 'truck';
}
export const AddEquipment: FC<AddEquipmentProps> = ({
  register,
  onSubmit,
  formType,
}) => (
  <form onSubmit={onSubmit}>
    <Typography variant="h4" textAlign="center" pb={2}>
      {formType === 'trailer' ? 'Add Trailer' : 'Add Truck'}
    </Typography>
    <AddTrailerFormWrapper>
      <TextField
        {...commonCssForInput}
        {...register(formType === 'trailer' ? 'trailerNo' : 'TruckNo', {
          required: 'TrailerNo is required',
        })}
        label="Trailer No"
        placeholder="Trailer No"
      />
      <TextField
        {...commonCssForInput}
        {...register('model', {
          required: 'Model is required',
        })}
        label="Model"
        placeholder="Model"
      />
      <TextField
        {...commonCssForInput}
        {...register('make', {
          required: 'Make is required',
        })}
        label="Make"
        placeholder="Make"
      />
      <TextField
        {...commonCssForInput}
        {...register('year', {
          required: 'Year is required',
        })}
        label="Year"
        placeholder="Year"
      />
      <TextField
        {...commonCssForInput}
        {...register('vinNumber', {
          required: true,
        })}
        label="VIN#"
        placeholder="VIN#"
      />
      <TextField
        {...commonCssForInput}
        {...register('licencePlate', {
          required: '',
        })}
        label="License Plate"
        placeholder="License Plate"
      />
      <TextField
        {...commonCssForInput}
        {...register('safetyExpire', {
          required: '',
        })}
        label="Safety Expire"
        placeholder="Safety Expire"
      />

      <TextField
        {...commonCssForInput}
        {...register('notes', {
          required: '',
        })}
        label="Notes"
        placeholder="Notes"
        multiline
        rows={5}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: 100,
        }}
        color="secondary"
      >
        Submit
      </Button>
    </AddTrailerFormWrapper>
  </form>
);

export const commonCssForInput: TextFieldProps = {
  sx: {
    width: '70%',
  },
};
export const AddTrailerFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
  alignItems: 'center',
  minHeight: '100vh',
}));
