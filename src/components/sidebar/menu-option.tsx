'use client'

import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from '@prisma/client'
import React, { useMemo } from 'react'

type Props = {
  defaultOpen?: boolean
  subAccounts: SubAccount[]
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
  sidebarLogo: string
  details: any
  user: any
  id: string
}


const MenuOption = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {

  const openState = useMemo(() => (defaultOpen ? { open: true } : {}),
    [defaultOpen])
  return (
    <div>MenuOption</div>
  )
}

export default MenuOption