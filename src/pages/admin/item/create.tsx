import React from 'react';
import ItemForm from '../../../components/admin/ItemForm';
import Layout from '../../../components/admin/Layout';

type Props = {};

const create = (props: Props) => {
  return (
    <Layout>
      <ItemForm />
    </Layout>
  );
};

export default create;
