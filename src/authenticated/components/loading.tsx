import { styled, Box, CircularProgress } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import logo from '../../assets/logo-small.png';

export interface LoadingOrErrorProps {
  message?: ReactNode;
  isError?: boolean;
  isLoading?: boolean;
}

export const LoadingOrError: FC<LoadingOrErrorProps> = ({
  message = 'Something went wrong',
  isError = false,
  isLoading = true,
}) => (
  <LoadingWrapper>
    <SmallLogoImgStyled src={logo} />
    {isLoading && !isError ? <CircularProgress /> : message}
  </LoadingWrapper>
);

export const LoadingWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: 500,
}));

export const SmallLogoImgStyled = styled('img')(({ theme }) => ({
  borderRadius: theme.spacing(1),
  maxWidth: '100%',
  height: 200,
}));
