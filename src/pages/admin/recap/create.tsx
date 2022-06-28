import React from 'react';
import Layout from '../../../components/admin/Layout';
import RecapForm from '../../../components/admin/RecapForm';

type Props = {};

const create = (props: Props) => {
  return (
    <Layout>
      <RecapForm />
    </Layout>
  );
};

export default create;
