import { db } from '@/lib/db'
import EditorProvider from '@/providers/editor/editor-provider'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelEditorNavigation from './_components/funnel-editor-navigation'
import FunnelEditorSidebar from './_components/funnel-editor-sidebar'
import FunnelEditor from './_components/funnel-editor'

type Props = {
    params: {
        subaccountId:string
        funnelId: string
        funnelPageId : string
    }
}

const Page = async ({params}: Props) => {
    const resolvedParams = await params

    const funnelPageDetails = await db.funnelPage.findFirst({
        where: {id: resolvedParams.funnelPageId}

    })
    if(!funnelPageDetails){
        return redirect(
            `/subaccount/${resolvedParams.subaccountId}/funnels/${resolvedParams.funnelId}`
        )
    }


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-[20] bg-background overflow-hidden'>

        <EditorProvider
            subaccountId={resolvedParams.subaccountId}
            funnelId={resolvedParams.funnelId}
            pageDetails={funnelPageDetails}
        >
            <FunnelEditorNavigation
                funnelId={resolvedParams.funnelId}
                funnelPageDetails={funnelPageDetails}
                subaccountId={resolvedParams.subaccountId}
            />
            <div className="h-full flex justify-center">
                <FunnelEditor funnelPageId={resolvedParams.subaccountId} />
            </div>
            
            <FunnelEditorSidebar
                subaccountId={resolvedParams.subaccountId}
            />

        </EditorProvider>
    </div>
  )
}

export default Page