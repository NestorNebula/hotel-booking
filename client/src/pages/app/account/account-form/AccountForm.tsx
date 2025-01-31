import { useState } from 'react';
import { useInput } from '@hooks';
import fetchAPI from '@services/api';
import * as validate from '@services/validationChains';
import { Form, Input } from '@components/forms';
import type { User } from '#types/db';
import type { APIResponse } from '#types/fetch';

function AccountForm({ user }: { user: User }) {
  const {
    value: firstName,
    updateValue: updateFirstName,
    validation: firstNameValidation,
  } = useInput(validate.name('First Name'), user.firstName);
  const {
    value: lastName,
    updateValue: updateLastName,
    validation: lastNameValidation,
  } = useInput(validate.name('Last Name'), user.lastName);
  const {
    value: email,
    updateValue: updateEmail,
    validation: emailValidation,
  } = useInput(validate.email(), user.email);
  const isValid = [
    firstNameValidation,
    lastNameValidation,
    emailValidation,
  ].every((v) => v.isValid);

  const [error, setError] = useState<string | null>(null);

  const updateUser = async () => {
    const { result, error: fetchError }: APIResponse<{ user: User }> =
      await fetchAPI({
        path: `users/${user.id}`,
        body: {
          firstName: firstName === user.firstName ? undefined : firstName,
          lastName: lastName === user.lastName ? undefined : lastName,
          email: email === user.email ? undefined : email,
        },
        method: 'put',
      });
    if (fetchError) {
      setError(
        result.errors
          ? result.errors[0].msg
          : result.error.msg || result.error.message
      );
    } else {
      window.location.reload();
    }
  };

  return (
    <Form submit={updateUser} isValid={isValid}>
      <div>Update Account</div>
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
      {error ? <div className="error">{error}</div> : <></>}
    </Form>
  );
}

export default AccountForm;
