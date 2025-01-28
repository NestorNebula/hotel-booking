import { differenceInCalendarDays, format } from 'date-fns';
import type { Room } from '#types/db';
import * as S from './ReservationOverview.styles';

function ReservationOverview({
  room,
  dates,
  reserve,
  edit,
}: {
  room: Room;
  dates: { start: Date; end: Date };
  reserve: () => void;
  edit: () => void;
}) {
  const numberOfNights = differenceInCalendarDays(dates.end, dates.start);
  return (
    <S.ReservationOverview>
      <img src={`/images/${room.images[0]}.jpg`} alt="" />
      <S.Details>
        <div>{room.name}</div>
        <div>
          {format(dates.start, 'd MMMM y')} - ${format(dates.end, 'd MMMM y')} (
          {numberOfNights} nights)
        </div>
        <div>${room.pricePerDay * numberOfNights}</div>
      </S.Details>
      <S.Buttons>
        <button onClick={edit}>Edit</button>
        <button onClick={reserve}>Reserve</button>
      </S.Buttons>
    </S.ReservationOverview>
  );
}

export default ReservationOverview;
