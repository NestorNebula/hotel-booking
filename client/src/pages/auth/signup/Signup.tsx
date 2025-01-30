import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Input } from '@components/forms';
import { useInput } from '@hooks';
import fetchAPI from '@services/api';
import * as validate from '@services/validationChains';
import type { APIResponse } from '#types/fetch';

function Signup() {
  const {
    value: firstName,
    updateValue: updateFirstName,
    validation: firstNameValidation,
  } = useInput(validate.name('First Name'));
  const {
    value: lastName,
    updateValue: updateLastName,
    validation: lastNameValidation,
  } = useInput(validate.name('Last Name'));
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput(validate.email());
  const {
    value: password,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput(validate.password());
  const {
    value: confirm,
    updateValue: updateConfirm,
    validation: confirmValidation,
  } = useInput(validate.password('Confirm Password'));
  const validations = [
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    passwordValidation,
    confirmValidation,
  ];
  const passwordMatch = password === confirm;
  const isValid = validations.every((v) => v.isValid) && passwordMatch;

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitSignup = async () => {
    const fetch: APIResponse<{ success: true; id: number }> = await fetchAPI({
      path: 'auth/signup',
      body: { firstName, lastName, email, password },
      method: 'post',
    });
    if (fetch.error) {
      setError(
        fetch.result.errors
          ? fetch.result.errors[0].msg
          : fetch.result.error.msg || fetch.result.error.message
      );
    } else {
      localStorage.setItem('id', `${fetch.result.id}`);
      navigate('/');
    }
  };

  return (
    <Form submit={submitSignup} isValid={isValid} name="Sign Up">
      <div>Sign Up</div>
      <Input
        name="firstName"
        value={firstName}
        updateValue={updateFirstName}
        validation={firstNameValidation}
        label="First Name"
      />
      <Input
        name="lastName"
        value={lastName}
        updateValue={updateLastName}
        validation={lastNameValidation}
        label="Last Name"
      />
      <Input
        name="email"
        value={email}
        updateValue={updateEmail}
        validation={emailValidation}
        type="email"
      />
      <Input
        name="password"
        value={password}
        updateValue={updatePassword}
        validation={passwordValidation}
        type="password"
      />
      <Input
        name="confirm"
        value={confirm}
        updateValue={updateConfirm}
        validation={confirmValidation}
        label="Confirm Password"
        type="password"
      />
      {!passwordMatch && password && confirm ? (
        <div className="error">{`Passwords don't match.`}</div>
      ) : (
        <></>
      )}
      {error ? <div className="error">{error}</div> : <></>}
    </Form>
  );
}
export default Signup;
