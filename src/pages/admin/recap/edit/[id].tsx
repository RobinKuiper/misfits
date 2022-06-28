import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../../components/admin/Layout';
import RecapForm from '../../../../components/admin/RecapForm';
import { Recap } from '../../../../interfaces/Recap';
import prisma from '../../../../lib/prisma';

type Props = {
  recap: Recap;
};

const create = (props: Props) => {
  return (
    <Layout>
      <RecapForm recap={props.recap} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params?.id);

  const recap = await prisma.recap.findUnique({
    where: {
      id,
    },
  });

  return {
    props: {
      recap,
    },
  };
};

export default create;
