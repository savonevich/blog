import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import {
  FormInput,
  FormAlert,
  FormHeading,
  FormButtons
} from './../../../Common/Components/Form';
import forms from './../../../../styles/forms.css';
import { validateEmail } from '../../../Common/Helpers/common';
import { signInUser } from './../../AuthActions';


class SignIn extends Component {

  onSubmitForm(props) {
    this.props.signIn(props);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form>
          <Field
            name="email"
            type="text"
            placeholder="Email"
            component={ FormInput } />
          <Field
            name="password"
            type="password"
            placeholder="Confirm Password"
            component={ FormInput } />
          <FormAlert errorMessage={ this.props.errorMessage } />
          <FormButtons
            labelSubmit="Submit"
            labelCancel="Cancel"
            actionSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }
            actionCancel={ this.props.onCloseAction } />
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  onCloseAction: PropTypes.func.isRequired
};

function validate(formProps) {
  const errors = {};

  if (formProps.password && formProps.password.length < 6) {
    errors.password = 'Password should contain at least 6 symbols';
  }

  if (formProps.email && !validateEmail(formProps.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

export default reduxForm({
  form: 'SignInForm',
  validate
})(SignIn)
