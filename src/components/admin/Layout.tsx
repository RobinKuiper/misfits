import Link from 'next/link';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement[] | ReactElement;
};

const Layout = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-2/12 text-white">
        <ul>
          <li>
            <Link href="/admin/item/create">
              <a>Create Item</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/recap/create">
              <a>Create Recap</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/recap">
              <a>Recap List</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-10/12 text-white">{props.children}</div>
    </div>
  );
};

export default Layout;
