import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useInput } from '@hooks';
import fetchAPI from '@services/api';
import * as validate from '@services/validationChains';
import { Form, Input } from '@components/forms';
import type { User } from '#types/db';
import type { APIResponse } from '#types/fetch';

function PasswordForm({ user }: { user: User }) {
  const {
    value: currentPassword,
    updateValue: updateCurrentPassword,
    validation: currentPasswordValidation,
  } = useInput(validate.password('Current Password'));
  const {
    value: newPassword,
    updateValue: updateNewPassword,
    validation: newPasswordValidation,
  } = useInput(validate.password('New Password'));
  const {
    value: confirm,
    updateValue: updateConfirm,
    validation: confirmValidation,
  } = useInput(validate.password('Confirm New Password'));
  const validations = [
    currentPasswordValidation,
    newPasswordValidation,
    confirmValidation,
  ];
  const newPasswordMatch = newPassword === confirm;
  const isValid = validations.every((v) => v.isValid) && newPasswordMatch;

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const updatePassword = async () => {
    const { result, error: fetchError }: APIResponse<{ success: true }> =
      await fetchAPI({
        path: `users/${user.id}?password`,
        body: { password: currentPassword, newPassword },
        method: 'put',
      });
    if (fetchError) {
      setError(
        result.errors
          ? result.errors[0].msg
          : result.error.msg || result.error.message
      );
    } else {
      navigate('/account', { replace: true });
    }
  };

  return (
    <Form submit={updatePassword} isValid={isValid}>
      <div>Change Password</div>
      <Input
        name="password"
        value={currentPassword}
        updateValue={updateCurrentPassword}
        validation={currentPasswordValidation}
        label="Current Password"
        type="password"
      />
      <Input
        name="newPassword"
        value={newPassword}
        updateValue={updateNewPassword}
        validation={newPasswordValidation}
        label="New Password"
        type="password"
      />
      <Input
        name="confirm"
        value={confirm}
        updateValue={updateConfirm}
        validation={confirmValidation}
        label="Confirm New Password"
        type="password"
      />
      {error ? <div>{error}</div> : <></>}
    </Form>
  );
}

export default PasswordForm;
