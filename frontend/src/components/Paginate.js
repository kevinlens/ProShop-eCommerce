import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {/* creates a new array based on the 'pages' value like '6' [0,1,2,3,4,5] */}
        {[...Array(pages).keys()].map((pageNumber) => (
          <LinkContainer
            key={pageNumber + 1}
            to={
              !isAdmin
                ? //is not admin here
                  keyword
                  ? `/search/${keyword}/page/${pageNumber + 1}`
                  : `/page/${pageNumber + 1}`
                : //is not admin here
                  //is admin here
                  `/admin/productlist/${pageNumber + 1}`
            }
          >
            {/* If the pageNumber in this array equals the user's inputted page number then display */}
            <Pagination.Item active={pageNumber + 1 === page}>
              {pageNumber + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
