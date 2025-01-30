import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Input } from '@components/forms';
import { useInput } from '@hooks';
import fetchAPI from '@services/api';
import * as validate from '@services/validationChains';
import type { APIResponse } from '#types/fetch';

function Login() {
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
  const validations = [emailValidation, passwordValidation];
  const isValid = validations.every((v) => v.isValid);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitLogin = async () => {
    const fetch: APIResponse<{ success: true; id: number }> = await fetchAPI({
      path: 'auth/login',
      body: { email, password },
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
    <Form submit={submitLogin} isValid={isValid} name="Log In">
      <div>Log In</div>
      <Input
        name="login-email"
        value={email}
        updateValue={updateEmail}
        validation={emailValidation}
        label="Email"
        type="email"
      />
      <Input
        name="login-password"
        value={password}
        updateValue={updatePassword}
        validation={passwordValidation}
        label="Password"
        type="password"
      />
      {error ? <div className="error">{error}</div> : <></>}
    </Form>
  );
}

export default Login;
