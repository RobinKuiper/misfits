import Link from 'next/link';
import React from 'react';

type Props = {};

const SettingSidebar = (props: Props) => {
  return (
    <ul>
      <li>
        <Link href="/setting">
          <a>Exandria</a>
        </Link>
        <ul className="ml-3">
          <li>
            <Link href="/setting/calendar">
              <a>Calendar</a>
            </Link>
          </li>
          <li>
            <Link href="/setting/theology">
              <a>Theology</a>
            </Link>
          </li>
          <li>
            <Link href="/setting/timeline">
              <a>Timeline</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default SettingSidebar;
