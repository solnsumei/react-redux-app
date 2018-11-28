import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      redirectToAuthorsPage: false,
      redirectTo404: false,
      saving: false,
      isEditing: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.author === undefined) {
      return this.setState({ redirectTo404: true });
    }

    if (this.props.author.id != nextProps.author.id) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({ author: Object.assign({}, nextProps.author) });
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({
      author: author,
      isEditing: true
    });
  }

  saveAuthor(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveAuthor(this.state.author)
    .then(() => {
      toastr.success('Author saved');
      this.setState({
        redirectToAuthorsPage: true,
        saving: false,
        isEditing: false
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

   const { redirectToAuthorsPage, redirectTo404, isEditing } = this.state;

    if (redirectTo404) {
      return <Redirect to={{
        pathname: '/404'
      }} />;
    }

   if (redirectToAuthorsPage) {
     return <Redirect to={{
         pathname: '/authors'
       }}/>;
    }

    return (
      <div>
        <Prompt
          when={isEditing}
          message='You have unsaved changes, are you sure you want to leave?'
        />
        <AuthorForm
          onChange={this.updateAuthorState}
          onSave={this.saveAuthor}
          author={this.state.author}
          errors={this.state.errors}
          loading={this.state.saving}
        />
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  actions: PropTypes.object.isRequired
};

const getAuthorById = (authors, id) => {
  const author = authors.filter(author => author.id == id);
  // since filter returns an array, you have to grab the first
  if (author) return  author[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
  // from the path '/course/:id'
  const authorId = ownProps.match.params.id;

  let author = {
    id: '',
    watchHref: '',
    firstName: '',
    lastName: ''
  };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
