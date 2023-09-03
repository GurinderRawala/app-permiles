import {
  Button,
  Paper,
  Typography,
  type TypographyProps,
  type ButtonProps,
  Dialog,
  type DialogProps,
  Box,
} from '@mui/material';
import React, {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
} from 'react';

import type { Texts } from '../../types';

import { PopUpConfirmBoxButtonWrapper, popUpConfirmBoxStyled } from './styled';

type TextsKeys = 'yes' | 'no' | 'title';

const defaultTexts: Texts<TextsKeys> = {
  yes: 'Delete',
  no: 'Cancel',
  title: 'Confirmation',
};

export type PopUpConfirmBoxProps = PropsWithChildren<{
  open: boolean;
  callback: (status: boolean) => void;
  onClickDeleteBox: () => void;
  texts?: Texts<TextsKeys>;
  titleProps?: {
    showTitle: boolean;
    props?: TypographyProps;
  };
  outerBoxProps?: Omit<DialogProps, 'open' | 'children'>;
  footerWrapperProps?: CSSProperties & {
    translate?: 'yes' | 'no';
  };
  yesButtonProps?: {
    showYesButton: boolean;
    props?: ButtonProps;
  };
  noButtonProps?: {
    showNoButton: boolean;
    props?: ButtonProps;
  };
  isClickAwayListener?: boolean;
}>;

export interface DisplayPopUpConfirmBoxProps {
  message: string | JSX.Element;
  callback: PopUpConfirmBoxProps['callback'];
}

export type AddPopUpBox = (
  content: DisplayPopUpConfirmBoxProps,
  optionalProps?: Omit<
    PopUpConfirmBoxProps,
    'children' | 'callback' | 'message' | 'onClickDeleteBox' | 'open'
  >
) => void;

export type PopUpBoxInitial = {
  addPopUpBox: AddPopUpBox;
};

const initialValue: PopUpBoxInitial = {
  addPopUpBox: () => {},
};

const PopUpBox = createContext<PopUpBoxInitial>(initialValue);

export const usePopUpBox = () => useContext(PopUpBox);

export const usePopUpBoxInitializer = () => {
  const [showPopUpBox, setShowPopUpBox] = useState<boolean>(false);
  const [popUpBoxProps, setPopUpBoxProps] =
    useState<DisplayPopUpConfirmBoxProps>({ message: '', callback: () => {} });

  const [popUpConfirmBoxOptionalProps, setPopUpConfirmBoxOptionalProps] =
    useState<
      Omit<
        PopUpConfirmBoxProps,
        'children' | 'callback' | 'message' | 'onClickDeleteBox' | 'open'
      >
    >();

  const addPopUpBox = useCallback<PopUpBoxInitial['addPopUpBox']>(
    (content, optionalProps) => {
      setShowPopUpBox(true);
      setPopUpBoxProps(content);
      setPopUpConfirmBoxOptionalProps(optionalProps);
    },
    [setShowPopUpBox]
  );

  const value: PopUpBoxInitial = useMemo(
    () => ({
      addPopUpBox,
    }),
    [addPopUpBox]
  );

  const onClick = () => {
    setShowPopUpBox(prev => !prev);
  };

  return {
    value,
    showPopUpBox,
    popUpBoxProps,
    onClick,
    addPopUpBox,
    popUpConfirmBoxOptionalProps,
  };
};

export const PopUpBoxProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    value,
    showPopUpBox,
    popUpBoxProps,
    onClick,
    popUpConfirmBoxOptionalProps,
  } = usePopUpBoxInitializer();
  const { message, callback } = popUpBoxProps;

  return (
    <PopUpBox.Provider value={value}>
      <PopUpConfirmBox
        callback={callback}
        onClickDeleteBox={onClick}
        open={showPopUpBox}
        {...popUpConfirmBoxOptionalProps}
      >
        {message}
      </PopUpConfirmBox>
      {children}
    </PopUpBox.Provider>
  );
};

export const PopUpConfirmBox: FC<PopUpConfirmBoxProps> = ({
  callback,
  onClickDeleteBox,
  children,
  texts = defaultTexts,
  titleProps = {
    showTitle: true,
    props: {},
  },
  outerBoxProps = {
    PaperProps: {
      sx: popUpConfirmBoxStyled,
    },
  },
  footerWrapperProps = {},
  yesButtonProps = {
    showYesButton: true,
    props: {},
  },
  noButtonProps = {
    showNoButton: true,
    props: {},
  },
  open,
}) => (
  <Dialog
    {...{
      open,
      onClose: onClickDeleteBox,
      PaperComponent: Paper,
      fullWidth: true,
      maxWidth: 'sm',
      ...outerBoxProps,
    }}
  >
    {titleProps.showTitle && (
      <Typography fontSize={20} fontWeight={500} {...titleProps.props}>
        {texts.title}
      </Typography>
    )}
    <Box>{children}</Box>
    <PopUpConfirmBoxButtonWrapper {...footerWrapperProps}>
      {yesButtonProps.showYesButton && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            callback(true);
            onClickDeleteBox();
          }}
          {...yesButtonProps.props}
        >
          {texts.yes}
        </Button>
      )}

      {noButtonProps.showNoButton && (
        <Button
          variant="outlined"
          color="success"
          onClick={onClickDeleteBox}
          {...noButtonProps.props}
        >
          {texts.no}
        </Button>
      )}
    </PopUpConfirmBoxButtonWrapper>
  </Dialog>
);
