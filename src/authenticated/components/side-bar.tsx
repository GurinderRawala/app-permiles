import { Box, BoxProps, Link, styled } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export declare type MenuItem = {
  icon: ReactNode;
  href: string;
  to: ReactNode;
};

export interface SideBarProps {
  upperLink: MenuItem[];
  lowerLink?: MenuItem[];
}

export const SideBar: FC<SideBarProps> = ({ upperLink, lowerLink }) => {
  const [expend, setExpend] = useState(false);

  return (
    <SideBarWrapper>
      <SideBarStyled expend={expend}>
        <Box>
          {upperLink.map(({ icon, to, href }, i) => (
            <LinkStyled key={i} href={href}>
              {icon}
              {expend && to}
            </LinkStyled>
          ))}
        </Box>

        <Box>
          {lowerLink?.map(({ icon, to, href }, i) => (
            <LinkStyled key={i} href={href}>
              {icon}
              {expend && to}
            </LinkStyled>
          ))}
          <CollapseButton useCollapse={[expend, setExpend]} />
        </Box>
      </SideBarStyled>
    </SideBarWrapper>
  );
};

export interface CollapseButtonProps {
  useCollapse: [expend: boolean, setExpend: Dispatch<SetStateAction<boolean>>];
  boxProps?: BoxProps;
}

export const CollapseButton: FC<CollapseButtonProps> = ({
  useCollapse,
  boxProps,
}) => {
  const [expend, setExpend] = useCollapse;

  return (
    <Box
      {...{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => setExpend(prev => !prev)}
      {...boxProps}
    >
      {!expend ? (
        <KeyboardDoubleArrowRightIcon />
      ) : (
        <KeyboardDoubleArrowLeftIcon />
      )}
    </Box>
  );
};

export const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 7,
  alignItems: 'center',
  position: 'relative',
  paddingBottom: 10,
  color: theme.palette.grey[100],
  textDecoration: 'none',

  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.grey[700],
    borderRadius: theme.spacing(1),
  },
}));

export const SideBarStyled = styled(Box, {
  shouldForwardProp: props => props !== 'expend',
})<{
  expend?: boolean;
}>(({ theme, expend = false }) => ({
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.grey[100],
  width: !expend ? 50 : 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(4, 2, 1, 2),
  boxShadow:
    '0px 11px 15px -7px rgba(96, 101, 117, 0.2), 0px 24px 38px 3px rgba(96, 101, 117, 0.14), 0px 9px 46px 8px rgba(96, 101, 117, 0.12)',
  borderRadius: '0px 5px 5px 0',
}));

export const SideBarWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  height: '100vh',
}));
