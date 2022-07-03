import Link from 'next/link';
import React from 'react';

type Props = {};

const SettingSidebar = (props: Props) => {
  return (
    <ul className="flex flex-row sm:flex-col space-y-0 justify-around sm:space-y-2">
      <li className="">
        <Link href="/setting">
          <a>Exandria</a>
        </Link>
      </li>
      <li>
        <Link href="/setting/calendar">
          <a>Calendar</a>
        </Link>
      </li>
      {/* <li>
            <Link href="/setting/theology">
              <a>Theology</a>
            </Link>
          </li> */}
      <li>
        <Link href="/setting/timeline">
          <a>Timeline</a>
        </Link>
      </li>
    </ul>
  );
};

export default SettingSidebar;
