import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import { Box, IconButton, IconButtonProps } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { Broker } from '../../../generated/graphql';
import { useBrokerForm, useDeleteBroker, useUpdateBroker } from '../hooks';
import { formPopUpOptionalProps, useAlert, usePopUpBox } from '../../../shared';
import { useQueryClient } from 'react-query';
import { noop } from 'lodash';
import { AddBroker } from './forms/add-broker';

export interface BrokerGridActions {
  row: Broker;
}

export const BrokerGridActions: FC<BrokerGridActions> = ({ row }) => (
  <Box display="flex" alignItems="center">
    <BrokerEditButton row={row} />
    <BrokerDeleteButton id={row.id} />
  </Box>
);

export interface BrokerDeleteButtonProps {
  id: string;
  iconButtonProps?: IconButtonProps;
}

export const BrokerDeleteButton: FC<BrokerDeleteButtonProps> = ({
  id,
  iconButtonProps = {},
}) => {
  const { mutate: deleteBroker } = useDeleteBroker();

  const { addPopUpBox } = usePopUpBox();
  const { addAlert } = useAlert();

  const client = useQueryClient();

  const onClick = useCallback(() => {
    addPopUpBox({
      message: 'Are you sure you want to delete this Broker?',
      callback: status => {
        if (status) {
          deleteBroker(
            { id },
            {
              onError: () => {
                addAlert({
                  message: 'Error deleting broker',
                  type: 'error',
                });
              },
              onSuccess: () => {
                addAlert({
                  message: 'Broker is deleted successfully.',
                  type: 'success',
                });

                client.invalidateQueries('brokers');
              },
            }
          );
        }
      },
    });
  }, [addAlert, addPopUpBox, client, deleteBroker, id]);

  return (
    <IconButton {...iconButtonProps} onClick={onClick}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export interface BrokerEditButtonProps extends BrokerGridActions {
  iconButtonProps?: IconButtonProps;
}

export const BrokerEditButton: FC<BrokerEditButtonProps> = ({
  iconButtonProps = {},
  row,
}) => {
  const { addAlert } = useAlert();
  const { addPopUpBox } = usePopUpBox();
  const client = useQueryClient();

  const {
    register,
    formErrors: errors,
    isLoading,
    onSubmit,
    handleSubmit,
  } = useBrokerForm<'update'>(
    useUpdateBroker,
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

      client.invalidateQueries('brokers');
    },
    data => ({ input: data, id: row.id }),
    row
  );

  const onClick = useCallback(() => {
    addPopUpBox(
      {
        message: (
          <AddBroker
            {...{
              register,
              errors,
              isLoading,
              onSubmit: handleSubmit(onSubmit),
            }}
          />
        ),
        callback: noop,
      },
      formPopUpOptionalProps
    );
  }, [addPopUpBox, errors, handleSubmit, isLoading, onSubmit, register]);

  return (
    <IconButton {...iconButtonProps} onClick={onClick}>
      <CreateIcon />
    </IconButton>
  );
};
