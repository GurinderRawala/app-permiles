import {
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import React, { FC, FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Texts } from '../../../../shared/types';
import { BrokerModifiedInput } from '../../../../generated/graphql';
import { EMAIL_PATTERN } from '../../../../shared/consts';

export interface AddBrokerProps {
  register: UseFormRegister<BrokerModifiedInput>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  errors: FieldErrors;
  texts?: Texts<'title'>;
}

const commonCssForInput: TextFieldProps = {
  sx: {
    width: '70%',
  },
};

export const AddBroker: FC<AddBrokerProps> = ({
  register,
  onSubmit,
  errors,
  isLoading,
  texts = {
    title: 'Add Broker',
  },
}) => {
  return (
    <Stack component="form" onSubmit={onSubmit} py={2} gap={2}>
      <Typography variant="h4" pb={2}>
        {texts?.title}
      </Typography>
      <TextField
        {...commonCssForInput}
        {...register('name', {
          required: 'Broker name is required',
        })}
        label="Broker Name"
        placeholder="Broker Name"
        error={!!errors.name}
        helperText={<>{errors.name?.message}</>}
      />
      <TextField
        {...commonCssForInput}
        {...register('email', {
          required: `Broker email is required.`,
          pattern: EMAIL_PATTERN,
        })}
        label="Email address"
        placeholder="Email address"
        error={!!errors.email}
        helperText={<>{errors.email?.message}</>}
      />
      <TextField
        {...commonCssForInput}
        {...register('phone', {
          required: `Broker phone number is required`,
        })}
        label="Phone number"
        placeholder="Phone number"
        helperText={<>{errors.phone?.message}</>}
        error={!!errors.phone}
      />
      <TextField
        {...commonCssForInput}
        {...register('streetaddress', {
          required: 'Street address is required',
        })}
        label="Street"
        placeholder="Street"
        helperText={<>{errors.street?.message}</>}
        error={!!errors.street}
      />
      <TextField
        {...commonCssForInput}
        {...register('city', {
          required: 'City is required',
        })}
        label="City"
        placeholder="City"
        helperText={<>{errors.city?.message}</>}
        error={!!errors.city}
      />
      <TextField
        {...commonCssForInput}
        {...register('province', {
          required: 'Province/State name is required',
        })}
        label="Province"
        placeholder="Province"
        error={!!errors.province}
        helperText={<>{errors.province?.message}</>}
      />

      <TextField
        {...commonCssForInput}
        {...register('postalcode', {
          required: 'Postal code is required',
        })}
        label="Postal code"
        placeholder="Postal code"
        helperText={<>{errors.postalcode?.message}</>}
        error={!!errors.postalcode}
      />

      <TextField
        {...commonCssForInput}
        {...register('country', {
          required: 'Country name is required',
        })}
        label="Country"
        placeholder="Country"
        helperText={<>{errors.country?.message}</>}
        error={!!errors.country}
      />

      <TextField
        {...commonCssForInput}
        {...register('contactname', {
          required: 'Person contact name is required',
        })}
        label="Contact name"
        placeholder="Contact name"
        helperText={<>{errors.country?.message}</>}
        error={!!errors.country}
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
