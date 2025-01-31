import { useState } from 'react';
import { useInput } from '@hooks';
import { Form, Input } from '@components/forms';
import fetchAPI from '@services/api';
import * as validate from '@services/validationChains';
import type { APIResponse } from '#types/fetch';

function AdminForm() {
  const {
    value: adminPassword,
    updateValue: updateAdminPassword,
    validation: adminPasswordValidation,
  } = useInput(validate.adminPassword());
  const isValid = adminPasswordValidation.isValid;

  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const { result, error }: APIResponse<{ success: boolean }> = await fetchAPI(
      { path: 'auth/admin', body: { password: adminPassword }, method: 'post' }
    );
    if (error || !result.success) {
      setError(
        error
          ? result.errors
            ? result.errors[0].msg
            : result.error.msg || result.error.message
          : 'Error during password processing.'
      );
    } else {
      window.location.reload();
    }
  };

  return (
    <Form submit={submit} isValid={isValid}>
      <Input
        name="adminPassword"
        value={adminPassword}
        updateValue={updateAdminPassword}
        validation={adminPasswordValidation}
        label="Admin Password"
        type="password"
      />
      {error ? <div className="error">{error}</div> : <></>}
    </Form>
  );
}

export default AdminForm;
