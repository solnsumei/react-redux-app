import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      redirectToCoursesPage: false,
      redirectTo404: false,
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course === undefined) {
      return this.setState({ redirectTo404: true });
    }

    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
    .then(() => {
      toastr.success('Course saved');
      this.setState({
        redirectToCoursesPage: true,
        saving: false,
    });
  })
  .catch(error => {
    toastr.error(error);
    this.setState({
      saving: false
    });
  });
  }

  render() {

   const { redirectToCoursesPage, redirectTo404 } = this.state;

    if (redirectTo404) {
      return <Redirect to={{
        pathname: '/404'
      }} />;
    }

   if (redirectToCoursesPage) {
     return <Redirect to={{
         pathname: '/courses'
       }}/>;
    }

    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        loading={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  //
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id == id);
  // since filter returns an array, you have to grab the first
  if (course) return  course[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
  // from the path '/course/:id'
  const courseId = ownProps.match.params.id;

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
