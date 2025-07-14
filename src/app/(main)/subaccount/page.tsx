import Unauthorized from '@/components/unauthorized';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { redirect } from 'next/navigation';

import React from 'react'

type Props = {
  searchParams: { state: string; code : string}
}

const SubAccountMainPage = async ({searchParams}: Props) => {
  const agencyId = await verifyAndAcceptInvitation()
  const resolvedSearchParams =  searchParams;

  // console.log("agencyId", agencyId)
  if(!agencyId){
    return <Unauthorized/>
  }

  const user = await getAuthUserDetails()
  // console.log("user", user)
  if(!user) return 

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access === true
  )

  if(resolvedSearchParams.state){
    const statePath = resolvedSearchParams.state.split('___')[0];
    const stateSubaccountId = resolvedSearchParams.state.split('___')[1];
    if(!stateSubaccountId) return <Unauthorized/>
    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${resolvedSearchParams.code}`
    )
  }

  if(getFirstSubaccountWithAccess){
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`)
  }


  return (
    <Unauthorized/>
  )
}

export default SubAccountMainPage