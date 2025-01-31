import { differenceInCalendarDays, format } from 'date-fns';
import Button from '@components/button/Button';
import type { Room } from '#types/db';
import * as S from './ReservationOverview.styles';

function ReservationOverview({
  room,
  dates,
  reserve,
  edit,
  remove,
}: {
  room: Room;
  dates: { start: Date; end: Date };
  reserve?: () => void;
  edit?: () => void;
  remove?: () => void;
}) {
  const numberOfNights = differenceInCalendarDays(dates.end, dates.start);
  return (
    <S.ReservationOverview>
      <img src={`/images/${room.images[0]}.jpg`} alt="" />
      <S.Details>
        <div>{room.name}</div>
        <div>
          {format(dates.start, 'd MMMM y')} - {format(dates.end, 'd MMMM y')} (
          {numberOfNights < 2
            ? `${numberOfNights} night`
            : `${numberOfNights} nights`}
          )
        </div>
        <div>${room.pricePerDay * numberOfNights}</div>
      </S.Details>
      <S.Buttons>
        {edit && <Button onClick={edit}>Edit</Button>}
        {reserve && <Button onClick={reserve}>Reserve</Button>}
        {remove && <Button onClick={remove}>Delete</Button>}
      </S.Buttons>
    </S.ReservationOverview>
  );
}

export default ReservationOverview;
