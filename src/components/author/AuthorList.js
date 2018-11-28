import React from 'react';
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, onDeleteAuthor}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Author</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author =>
          <AuthorListRow key={author.id} author={author} onDelete={onDeleteAuthor} />
      )}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
