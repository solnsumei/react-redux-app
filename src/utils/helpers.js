export const sortCourseItemsByTitle = (courses) => {
  return courses.sort(function (a, b) {
    return (a.title < b.title) ? -1 : ((a.title > b.title) ? 1 : 0);
  });
}

export const sortAuthorsByName = (authors) => {
  return authors.sort(function (a, b) {// ignore upper and lowercase
    return (a.firstName < b.firstName) ? -1 : ((a.firstName > b.firstName) ? 1 : 0);
  });
}

export const validateDuration = (duration) => {
  // Regex time format test
  const validTimeFormat = new RegExp(/^(?:[0-5]?[0-9]):([0-5][0-9])$/);
  return validTimeFormat.test(duration);
};

// Validate courses
export const validateCourse = (course) => {
  const errors = [];
  if (course.category.trim().length < 2) {
    Array.push(errors, 'Category cannot be less than 2 characters.');
  }

  if (!validateDuration(course.length)) {
    Array.push(errors, '\n Invalid course length.');
  }

  if (errors.length > 0) {
    return errors;
  }

  return;
}
