import { Box, IconButton, IconButtonProps, styled } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import React, { FC, useCallback } from 'react';
import {
  AddTrailerMutation,
  AddTruckMutation,
  Trailer,
  Truck,
} from '../../../generated/graphql';
import {
  useDeleteTrailer,
  useDeleteTruck,
  useEquipmentForm,
  useUpdateTrailer,
  useUpdateTruck,
} from '../hooks';
import { PopUpConfirmBoxProps, useAlert, usePopUpBox } from '../../../shared';
import { useQueryClient } from 'react-query';
import { AddEquipment } from './forms';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { UploadResponse } from '../../hooks/file-upload-hook';
import { omit } from 'lodash';

export declare type EquipmentGridActionsProps<Row extends Trailer | Truck> = {
  equipment: Row extends Trailer ? 'Trailer' : 'Truck';
  row: Row;
};

export const EquipmentGridActions = <Row extends Trailer | Truck>({
  row,
  equipment,
}: EquipmentGridActionsProps<Row>) => (
  <GridActionsWrapper>
    <EditEquipment<Row> {...{ row, equipment }} />
    <DeleteEquipment
      {...{
        id: row.id,
        equipment,
      }}
    />
  </GridActionsWrapper>
);

export interface DeleteEquipmentProps {
  id: string;
  equipment: 'Truck' | 'Trailer';
  iconButtonProps?: Omit<IconButtonProps, 'onClick'>;
}

export const DeleteEquipment: FC<DeleteEquipmentProps> = ({
  id,
  equipment,
  iconButtonProps,
}) => {
  const { mutate: deleteTrailer } = useDeleteTrailer();
  const { mutate: deleteTruck } = useDeleteTruck();
  const { addAlert } = useAlert();
  const { addPopUpBox } = usePopUpBox();

  const client = useQueryClient();

  const commonAlerter = useCallback(
    ({
      errorMessage,
      successMessage,
    }: {
      errorMessage: string;
      successMessage: string;
    }) => ({
      onSuccess: () => {
        addAlert({
          type: 'success',
          message: successMessage,
        });

        client.invalidateQueries(equipment.toLocaleLowerCase() + 's');
      },
      onError: () => {
        addAlert({
          type: 'error',
          message: errorMessage,
        });
      },
    }),
    [addAlert, client, equipment]
  );

  const onClick = () => {
    switch (equipment) {
      case 'Trailer':
        return addPopUpBox({
          message: 'Are you sure you want to delete this trailer?',
          callback: status => {
            if (status) {
              deleteTrailer(
                { id },
                commonAlerter({
                  errorMessage: 'Error deleting trailer',
                  successMessage: 'Trailer deleted successfully',
                })
              );
            }
          },
        });

      case 'Truck':
        return addPopUpBox({
          message: 'Are you sure you want to delete this truck?',
          callback: status => {
            if (status) {
              deleteTruck(
                { id },
                commonAlerter({
                  errorMessage: 'Error deleting truck',
                  successMessage: 'Truck deleted successfully',
                })
              );
            }
          },
        });

      default:
        return null;
    }
  };

  return (
    <IconButton {...iconButtonProps} onClick={onClick}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

const popUpOptionalProps: Omit<
  PopUpConfirmBoxProps,
  'message' | 'children' | 'callback' | 'open' | 'onClickDeleteBox'
> = {
  yesButtonProps: {
    showYesButton: false,
  },
  texts: {
    title: ``,
    yes: '',
    no: 'Close',
  },
  outerBoxProps: {
    maxWidth: 'lg',
    PaperProps: {
      sx: theme => ({
        paddingTop: theme.spacing(8),
        padding: theme.spacing(5),
        flex: 'flex',
      }),
    },
  },
};

const TRAILER_REPO = 'trailerRepo';
const TRUCK_REPO = 'truckRepo';

export const EditEquipment = <Row extends Trailer | Truck>({
  equipment,
  row,
  iconButtonProps,
}: EquipmentGridActionsProps<Row> & {
  iconButtonProps?: IconButtonProps;
}): JSX.Element => {
  const { addAlert } = useAlert();
  const { addPopUpBox } = usePopUpBox();

  const formCallback = (
    _: AddTrailerMutation | AddTruckMutation | UploadResponse[] | null,
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
  } = useEquipmentForm<'updateTrailer', 'trailerInput'>(
    useUpdateTrailer,
    TRAILER_REPO,
    'filepath',
    formCallback,
    data => ({ input: omit(data, 'files'), id: row.id }),
    row
  );

  const {
    register: registerTruck,
    handleSubmit: handleSubmitTruck,
    isLoading: isTruckLoading,
    onSubmit: onTruckSubmit,
    formErrors: truckFormErrors,
    control: addTruckControl,
  } = useEquipmentForm<'updateTruck', 'truckInput'>(
    useUpdateTruck,
    TRUCK_REPO,
    'filepath',
    formCallback,
    data => ({ input: omit(data, 'files'), id: row.id }),
    {
      ...row,
      // safetyExpire: new Date(row.safetyExpire)
    }
  );

  const onClick = () => {
    switch (equipment) {
      case 'Trailer':
        return addPopUpBox(
          {
            message: (
              <AddEquipment
                {...{
                  register:
                    registerTrailer as unknown as UseFormRegister<FieldValues>,
                  onSubmit: handleSubmitTrailer(onTrailerSubmit),
                  formType: 'trailer',
                  errors: trailerFormErrors,
                  isLoading: isTrailerLoading,
                  formControl: addTrailerControl,
                  texts: {
                    title: 'Edit Trailer',
                  },
                }}
              />
            ),
            callback: () => {},
          },
          popUpOptionalProps
        );
      case 'Truck':
        return addPopUpBox(
          {
            message: (
              <AddEquipment
                {...{
                  register:
                    registerTruck as unknown as UseFormRegister<FieldValues>,
                  onSubmit: handleSubmitTruck(onTruckSubmit),
                  formType: 'truck',
                  errors: truckFormErrors,
                  isLoading: isTruckLoading,
                  formControl: addTruckControl,
                  texts: {
                    title: 'Edit Truck',
                  },
                }}
              />
            ),
            callback: () => {},
          },
          popUpOptionalProps
        );

      default:
        return null;
    }
  };

  return (
    <IconButton {...iconButtonProps} onClick={onClick}>
      <CreateIcon />
    </IconButton>
  );
};

export const GridActionsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.2),
  alignItems: 'center',
}));
