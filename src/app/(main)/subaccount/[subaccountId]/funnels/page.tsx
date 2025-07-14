import { getFunnels } from '@/lib/queries'
import React from 'react'
import { Plus } from 'lucide-react'


import BlurPage from '@/components/global/blur-page'
import { columns } from './columns'
import FunnelsDataTable from './data-table'
import FunnelForm from '@/components/forms/funnel-form'

const Funnels = async ({ params }: { params: { subaccountId: string } }) => {
  const resolvedParams =  params
  const funnels = await getFunnels(resolvedParams.subaccountId)
  if (!funnels) return null

  return (
    <BlurPage>
      <FunnelsDataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create Funnel
          </>
        }
        modalChildren={
          <FunnelForm subAccountId={resolvedParams.subaccountId}></FunnelForm>
        }
        filterValue="name"
        columns={columns}
        data={funnels}
      />
    </BlurPage>
  )
}

export default Funnels
