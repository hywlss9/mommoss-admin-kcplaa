import { useEffect, useState } from 'react';

import { DatePicker, Form } from 'antd';
import type { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';

import NumberTitle from '@components/NumberTitle';
import Radios from '@components/Radios';

import type * as T from './type';

const RESERVATION_RADIOS: { label: string; value: T.ReservationType }[] = [
  { label: '즉시', value: 'now' },
  { label: '예약', value: 'delay' },
];

function Reservation({ setPush }: T.ReservationProps) {
  const [reservationType, setReservationType] = useState<T.ReservationType>('now');

  const handleReservationType = ({ target: { value } }: RadioChangeEvent) =>
    setReservationType(value);

  const handleDelayDate = (_: any, date: string) => {
    const sendAt = dayjs(date).toISOString();
    setPush(prevState => ({ ...prevState, sendAt }));
  };

  useEffect(() => {
    if (reservationType === 'now') {
      setPush(prevState => ({ ...prevState, sendAt: undefined }));
    }
  }, [reservationType]);

  return (
    <>
      <NumberTitle number={3} title='발송옵션선택' />
      <Form.Item name='reservation' initialValue={reservationType}>
        <Radios
          name='reservation'
          options={RESERVATION_RADIOS}
          type='button'
          size='large'
          value={reservationType}
          onChange={handleReservationType}
        />
      </Form.Item>
      {reservationType === 'delay' && (
        <Form.Item>
          <DatePicker
            format='YYYY-MM-DD HH:mm'
            showTime={{ format: 'HH:mm' }}
            showNow={false}
            placeholder='날짜를 선택해주세요.'
            onChange={handleDelayDate}
          />
        </Form.Item>
      )}
    </>
  );
}

export default Reservation;
