import styled from 'styled-components';

const RoomButton = styled.button`
  position: relative;
  top: 0;
  transition: top 0.25s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background-color: ${(props) => props.theme.darkGrey};
  color: ${(props) => props.theme.white};
  padding: 2rem;
  border-radius: 25px;
  box-shadow: ${(props) => `2px 2px 5px 5px ${props.theme.grey}`};

  &:hover {
    top: 0.25rem;
  }

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 25px;
  }

  & > div:last-child {
    font-size: var(--fs-s);
  }
`;

export { RoomButton };
