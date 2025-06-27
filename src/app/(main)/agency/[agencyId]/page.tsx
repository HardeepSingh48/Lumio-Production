import React from 'react'

const Page = async ({ params }: { params: { agencyId: string } }) => {
  // const { agencyId } = await params;
  // console.log('agencyId:', agencyId);

  return <div>{params.agencyId}</div>;
};

export default Page;