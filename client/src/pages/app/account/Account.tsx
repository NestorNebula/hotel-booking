import { useContext, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router';
import { Context } from '@context';
import Button from '@components/button/Button';
import AccountForm from './account-form/AccountForm';
import PasswordForm from './password-form/PasswordForm';
import ReservationList from '@components/reservation-list/ReservationList';
import { close } from '@assets/icons';
import * as S from './Account.styles';

function Account() {
  const { user } = useContext(Context);
  const { reservations } = useLoaderData();
  const [formActive, setFormActive] = useState<'account' | 'password' | null>(
    null
  );

  return !user.isGuest ? (
    <S.Account>
      <div>Your Account</div>
      {formActive && (
        <S.CloseButton
          aria-label="close form"
          onClick={() => setFormActive(null)}
        >
          <img src={close} alt="close" />
        </S.CloseButton>
      )}
      {!formActive ? (
        <S.Infos>
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{user.email}</div>
          <S.Buttons>
            <Button onClick={() => setFormActive('account')}>Edit</Button>
            <Button onClick={() => setFormActive('password')}>
              Change Password
            </Button>
          </S.Buttons>
        </S.Infos>
      ) : formActive === 'account' ? (
        <AccountForm user={user} />
      ) : (
        <PasswordForm user={user} />
      )}
      <S.Reservations>
        <div>Your Reservations</div>
        <ReservationList reservations={reservations} />
      </S.Reservations>
    </S.Account>
  ) : (
    <Navigate to="/" />
  );
}

export default Account;
