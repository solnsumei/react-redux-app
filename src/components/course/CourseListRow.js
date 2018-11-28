import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseListRow = ({ course, onDelete }) => (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><button onClick={() => onDelete(course)}>&times;</button></td>
    </tr>
);

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
