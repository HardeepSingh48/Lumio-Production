import React from 'react'

type Props = {
  params: Promise<{ agencyId: string }>
}

const Page = async ({ params }: Props) => {
  const { agencyId } = await params; // Await params here

  console.log('agencyId:', agencyId);

  return <div>{agencyId}</div>;
};

export default Page;