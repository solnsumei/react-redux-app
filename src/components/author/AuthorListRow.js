import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorListRow = ({ author, onDelete }) => (
    <tr>
      <td>
        <Link to={`/author/${author.id}`}>
          {`${author.firstName} ${author.lastName}`}
        </Link>
      </td>
      <td>
        <button onClick={() => onDelete(author)}>&times;</button>
      </td>
    </tr>
);

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
