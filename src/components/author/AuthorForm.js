import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <h1>Manage Author</h1>
      <TextInput
        name="firstName"
        label="First name"
        value={author.firstName}
        onChange={onChange}
        error={errors.firstName} />

      <TextInput
        name="lastName"
        label="Last name"
        value={author.lastName}
        onChange={onChange}
        error={errors.lastName} />

        <input
          type="submit"
          disabled={loading}
          value={loading ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave} />
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default AuthorForm;
