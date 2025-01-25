import * as S from './Button.styles';

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) {
  return <S.Button onClick={onClick}>{children}</S.Button>;
}

export default Button;
