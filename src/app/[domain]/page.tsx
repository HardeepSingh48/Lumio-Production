import { getDomainContent } from '@/lib/queries'
import EditorProvider from '@/providers/editor/editor-provider'
import { notFound } from 'next/navigation'
import React from 'react'
import FunnelEditor from '../(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor'
import { db } from '@/lib/db'

const page = async ({params}: {params: Promise<{ domain: string}>}) => {
  const resolvedParams = await params

  //This was the original code
  // const domainData = await getDomainContent(resolvedParams.domain.slice(0,-1)) 

  const domainData = await getDomainContent(resolvedParams.domain)
  if(!domainData) return notFound()

  const pageData = domainData.FunnelPages.find((page) => !page.pathName)

  if(!pageData) return notFound()

await db.funnelPage.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  })

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  )
}

export default page
