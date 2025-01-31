import { useNavigate, useRouteError } from 'react-router';
import Button from '@components/button/Button';
import * as S from './ErrorElement.styles';

type Error = {
  error: object;
  status: number;
  statusText: string;
};

function ErrorElement() {
  const error = useRouteError();

  function isError(err: unknown): err is Error {
    return (err as Error).error !== undefined;
  }

  const errorIsError = isError(error);
  if (errorIsError) {
    console.error(error.error);
  }

  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };

  return (
    <S.Error>
      <title>Hotel Booking - Error</title>
      {errorIsError ? (
        <>
          <div>{error.status}</div>
          <div>{error.statusText}</div>
          <Button onClick={returnHome}>Home</Button>
        </>
      ) : (
        <div>Unexpected Error</div>
      )}
    </S.Error>
  );
}

export default ErrorElement;
