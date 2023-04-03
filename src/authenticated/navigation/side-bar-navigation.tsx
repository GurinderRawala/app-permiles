import React, { FC } from 'react'
import { SideBar } from '../components/side-bar'

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

export const SideBarNavigation: FC = () => (
  <SideBar
    upperLink={[
      {
        icon: <LocalShippingOutlinedIcon />,
        link: <>Equipment</>,
      },
    ]}
    lowerLink={[
      {
        icon: <LocalShippingOutlinedIcon />,
        link: <>Equipment</>,
      },
    ]}
  />
)
