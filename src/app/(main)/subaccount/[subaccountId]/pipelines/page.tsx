import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {subaccountId:string}
}

const Pipelines = async ({params}: Props) => {
    const resolvedParams = params
    const pipelineExists = await db.pipeline.findFirst({
        where: {subAccountId: resolvedParams.subaccountId},
    })

    if(pipelineExists){
        return redirect(
            `/subaccount/${resolvedParams.subaccountId}/pipelines/${pipelineExists.id}`
        )
    }

    try {
        const response = await db.pipeline.create({
            data: {name:'First PipeLine' , subAccountId: resolvedParams.subaccountId },
        })

        return redirect(
            `/subaccount/${resolvedParams.subaccountId}/pipelines/${response.id}`
        )

    } catch (error) {
        console.log(error)
    }

  return (
    <div>Pipelines</div>
  )
}

export default Pipelines