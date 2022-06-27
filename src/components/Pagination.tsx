import Link from 'next/link';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

type Props = {
  currentPage: number;
  totalPages: number;
  urlPrefix: string;
};

const Pagination = (props: Props) => {
  const pages = [];

  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="sticky bottom-28 flex items-center justify-center space-x-5 text-xl">
      {props.currentPage > 1 ? (
        <div>
          <Link href={`${props.urlPrefix}/${props.currentPage - 1}`}>
            <a>
              <MdArrowBackIos />
            </a>
          </Link>
        </div>
      ) : (
        <span className="text-zinc-500">
          <MdArrowBackIos />
        </span>
      )}
      {pages.map((page) => (
        <div>
          {page === props.currentPage ? (
            <span className="text-zinc-500">{page}</span>
          ) : (
            <Link href={`${props.urlPrefix}/${page}`}>
              <a>{page}</a>
            </Link>
          )}
        </div>
      ))}
      {props.totalPages > props.currentPage ? (
        <div>
          <Link href={`${props.urlPrefix}/${props.currentPage + 1}`}>
            <a>
              <MdArrowForwardIos />
            </a>
          </Link>
        </div>
      ) : (
        <span className="text-zinc-500">
          <MdArrowForwardIos />
        </span>
      )}
    </div>
  );
};

export default Pagination;
