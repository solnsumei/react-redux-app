import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as authorActions from '../../actions/authorActions';
import { sortAuthorsByName } from '../../utils/helpers';
import AuthorList from './AuthorList';


class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  deleteAuthor(author) {
    this.props.actions.deleteAuthor(author);
  }

  render() {
    const { authors } = this.props;

    return (
      <div>
        <h1>Authors</h1>

        <Link to="/author" className="btn btn-primary">
          Add Author
        </Link>

        {authors.length > 0 
          && <AuthorList authors={authors} onDeleteAuthor={this.deleteAuthor} />
        }
        
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  authors: sortAuthorsByName([...state.authors]) // So as not to mutate the redux state
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
