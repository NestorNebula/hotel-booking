import styled from 'styled-components';

const Room = styled.main`
  margin: 2.5rem;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.grey};
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > img {
    border-radius: 10px;
  }

  @media (min-width: 800px) {
    grid-template-columns: 0.75fr 1fr;
  }
`;
const Carousel = styled.div<{ $photoNumber: number }>`
  position: relative;
  overflow-x: hidden;

  & > div:first-child {
    display: flex;
    position: relative;
    left: ${(props) => `calc(${props.$photoNumber} * -100%)`};
    transition: left 0.75s ease-in;
  }
`;
const Points = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 45%;
  display: flex;
  gap: 0.5rem;
`;
const Point = styled.button<{ $isActive: boolean }>`
  --size: 1rem;
  height: var(--size);
  width: var(--size);
  border-radius: var(--size);
  background-color: ${(props) =>
    props.$isActive ? props.theme.pink : props.theme.white};
  transition: background-color 0.75s ease-in;

  @media (min-width: 800px) {
    --size: 1.5rem;
  }
`;
const Details = styled.div`
  font-size: var(--fs-m);
  place-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  & > div:first-child {
    font-size: var(--fs-l);
  }

  & > div:nth-of-type(2) {
    font-size: var(--fs-s);
  }
`;
const Description = styled.div`
  grid-column: 1 / 3;
  white-space: pre-wrap;
  font-size: var(--fs-m);
  padding-top: 2rem;
`;

export { Room, Carousel, Points, Point, Details, Description };
