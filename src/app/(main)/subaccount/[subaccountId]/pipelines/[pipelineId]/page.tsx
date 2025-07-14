import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from '@/lib/queries';
import { LaneDetail } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react'
import PipelineInforbar from '../_components/pipelines-inforbar';
import PipelineSettings from '../_components/pipeline-settings';
import PipelineView from '../_components/pipeline-view';
import { convertDecimals } from '@/utils/convertDecimals';

type Props = {
    params: { subaccountId: string; pipelineId: string }
}


const PipelinePage = async ({ params }: Props) => {
    const resolvedParams =  params;
    const pipelineDetails = await getPipelineDetails(resolvedParams.pipelineId)

    if (!pipelineDetails) {
        return redirect(`/subaccount/${resolvedParams.subaccountId}/pipelines`)
    }

    const pipelines = await db.pipeline.findMany({
        where: { subAccountId: resolvedParams.subaccountId },
    })

    const lanes = (await getLanesWithTicketAndTags(
        resolvedParams.pipelineId
    )) as LaneDetail[]

    const safeLanes = convertDecimals(lanes);
    const safePipelineDetails = convertDecimals(pipelineDetails);

    return (
        <Tabs defaultValue='view'
            className='w-full'>
            <TabsList className='bg-transparent border-b-2 h-16 w-full 
        justify-between mb-4'>
                <PipelineInforbar
                    pipelineId={resolvedParams.pipelineId}
                    subAccountId={resolvedParams.subaccountId}
                    pipelines={pipelines} />
                <div>
                    <TabsTrigger
                        value='view'>
                        Pipeline View
                    </TabsTrigger>
                    <TabsTrigger
                        value='settings'>
                        Settings
                    </TabsTrigger>

                </div>
            </TabsList>
            <TabsContent value='view'>
                <PipelineView
                    lanes={safeLanes}
                    pipelineDetails={safePipelineDetails}
                    pipelineId={resolvedParams.pipelineId}
                    subaccountId={resolvedParams.subaccountId}
                    updateLanesOrder={updateLanesOrder}
                    updateTicketsOrder={updateTicketsOrder}
                />
            </TabsContent>
            <TabsContent value='settings'>
                <PipelineSettings
                    pipelineId={resolvedParams.pipelineId}
                    pipelines={pipelines}
                    subaccountId={resolvedParams.subaccountId}
                />
            </TabsContent>
        </Tabs>
    )
}

export default PipelinePage