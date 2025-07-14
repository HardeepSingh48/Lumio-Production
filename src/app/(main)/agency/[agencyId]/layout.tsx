import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import Unauthorized from '@/components/unauthorized'
import { getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
    params: { agencyId: string } // <-- Make params a Promise
}

const layout = async ({ children, params }: Props) => {
    const { agencyId } = await params; // <-- Await params here
    const user = await currentUser()
    const verifiedAgencyId = await verifyAndAcceptInvitation()

    if (!user) {
        return redirect('/')
    }
    if (!verifiedAgencyId) {
        return redirect('/agency')
    }

    if (user.privateMetadata.role !== 'AGENCY_OWNER' && user.privateMetadata.role !== 'AGENCY_ADMIN')
        return <Unauthorized />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    let allNoti: any = []

    const notifications = await getNotificationAndUser(verifiedAgencyId)
    if (notifications) {
        allNoti = notifications;
    }
    return (
        <div className='h-screen overflow-hidden'>
            <Sidebar
                id={agencyId}
                type='agency'
            />
            <div className="md:pl-[300px]">
                <InfoBar
                    notifications={allNoti}
                    role={allNoti.User?.role}
                />
                <div className="relative">
                    <BlurPage>{children}</BlurPage>
                </div>
            </div>
        </div>
    )
}

export default layout