import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as courseActions from '../../actions/courseActions';
import { sortCourseItemsByTitle } from '../../utils/helpers';
import CourseList from './CourseList';


class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse(course) {
    this.props.actions.deleteCourse(course);
  }

  render() {
    const {courses, itemCount} = this.props;

    return (
      <div>
        <h1>Courses 
        { courses.length > 0 && <span className="pull-right numberCount">Courses 
            <small className="badge space-right">{itemCount}</small>
          </span>
        }
        </h1>

        <Link to="/course" className="btn btn-primary">
          Add Course
        </Link>

        {courses.length > 0 
          && <CourseList courses={courses} onDeleteCourse={this.deleteCourse} />
        }
        
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  courses: sortCourseItemsByTitle([...state.courses]),
  itemCount: state.courses.length
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
