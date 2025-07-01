import { db } from '@/lib/db'
import React from 'react'

type Props = {
    params: Promise<{ agencyId: string }>
}

const TeamPage = async ({params}: Props) => {

    const resolvedParams = await params
    const authUser = await db.user.findMany({
        where: {
            Agency: {
                id: resolvedParams.agencyId,
            },
        },
        include:{
            Agency: { include: { SubAccount: true}},
            Permissions: { include: {SubAccount:true}}
        }
    })
     
    if (!authUser) return null
    const agencyDetails = await db.agency.findUnique({
        where:{
            id: resolvedParams.agencyId,
        },
        include: {
            SubAccount: true,
        }
    })

    if(!agencyDetails) return

  return (
    <DataTable>

        
    </DataTable>
  )
}

export default TeamPage