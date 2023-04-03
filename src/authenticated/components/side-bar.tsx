import { Box, BoxProps, styled } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

export declare type MenuItem = {
  icon: ReactNode
  link: ReactNode
}

export interface SideBarProps {
  upperLink: MenuItem[]
  lowerLink: MenuItem[]
}

export const SideBar: FC<SideBarProps> = ({ upperLink, lowerLink }) => {
  const [expend, setExpend] = useState(false)

  return (
    <SideBarStyled expend={expend}>
      <Box>
        {upperLink.map((link, i) => (
          <RowStyled key={i}>
            {link.icon}
            {expend && link.link}
          </RowStyled>
        ))}
      </Box>

      <Box>
        {lowerLink.map((link, i) => (
          <RowStyled key={i}>
            {link.icon}
            {expend && link.link}
          </RowStyled>
        ))}
        <CollapseButton useCollapse={[expend, setExpend]} />
      </Box>
    </SideBarStyled>
  )
}

export interface CollapseButtonProps {
  useCollapse: [expend: boolean, setExpend: Dispatch<SetStateAction<boolean>>]
  boxProps?: BoxProps
}

export const CollapseButton: FC<CollapseButtonProps> = ({
  useCollapse,
  boxProps,
}) => {
  const [expend, setExpend] = useCollapse

  return (
    <RowStyled onClick={() => setExpend((prev) => !prev)} {...boxProps}>
      {!expend ? (
        <KeyboardDoubleArrowRightIcon />
      ) : (
        <KeyboardDoubleArrowLeftIcon />
      )}
    </RowStyled>
  )
}

export const RowStyled = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 7,
  alignItems: 'center',
}))

export const SideBarStyled = styled(Box, {
  shouldForwardProp: (props) => props !== 'expend',
})<{
  expend?: boolean
}>(({ theme, expend = false }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.grey[100],
  width: !expend ? 50 : 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(4, 2, 1, 2),
  boxShadow:
    '0px 11px 15px -7px rgba(96, 101, 117, 0.2), 0px 24px 38px 3px rgba(96, 101, 117, 0.14), 0px 9px 46px 8px rgba(96, 101, 117, 0.12)',
  borderRadius: '0px 5px 5px 0',
}))
