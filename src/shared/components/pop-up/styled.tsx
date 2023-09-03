import { Box, type Theme } from '@mui/material';
import { styled } from '@mui/system';

export const popUpConfirmBoxStyled = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  minHeight: 200,
  padding: theme.spacing(2),
});

export const PopUpConfirmBoxButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
  width: '100%',
});
