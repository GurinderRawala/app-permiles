import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux';
import { AlertSliceState, triggerAlert } from '../../redux/reducers';
import { Alert, AlertTitle, Box, Typography, styled } from '@mui/material';

export const AlertProvider: FC = () => {
  const { showAlert, type, message } = useSelector(
    (state: Store) => state.alertReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!showAlert) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(
        triggerAlert({
          showAlert: false,
          type: null,
          message: '',
        })
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, showAlert]);

  return (
    <>
      {type && showAlert ? (
        <AlertWrapper>
          <Alert severity={type}>
            <AlertTitle>{type.toUpperCase()}</AlertTitle>
            <Typography fontSize={16}>{message}</Typography>
          </Alert>
        </AlertWrapper>
      ) : null}
    </>
  );
};

export const AlertWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: 5,
  bottom: 5,
  zIndex: 1500,
  width: 400,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const useAlert = () => {
  const dispatch = useDispatch();

  const addAlert = useCallback(
    ({ type, message }: Omit<AlertSliceState, 'showAlert'>) => {
      dispatch(
        triggerAlert({
          showAlert: true,
          type,
          message,
        })
      );
    },
    [dispatch, triggerAlert]
  );
  return { addAlert };
};
