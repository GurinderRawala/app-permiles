import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import CreateIcon from '@mui/icons-material/Create';
import { Box, IconButton, IconButtonProps } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { Broker } from '../../../generated/graphql';
import { useDeleteBroker } from '../hooks';
import { useAlert, usePopUpBox } from '../../../shared';
import { useQueryClient } from 'react-query';

export interface BrokerGridActions {
  row: Broker;
}

export const BrokerGridActions: FC<BrokerGridActions> = ({ row }) => (
  <Box display="flex" alignItems="center">
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
