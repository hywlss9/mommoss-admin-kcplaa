interface RowResponseDataArr<T> {
  count: number;
  rows: T[];
}

interface ResponseDataArr<T> {
  result: boolean;
  data: RowResponseDataArr<T>;
}

interface ResultResponse {
  result: boolean;
}
interface ReaponseArr<T> {
  result: boolean;
  data: T[];
}

interface Response<T> {
  result: boolean;
  data: T;
}

type FlagResponse = boolean;

export type {
  ReaponseArr,
  Response,
  ResponseDataArr,
  ResultResponse,
  RowResponseDataArr,
  FlagResponse,
};
