import { MOVIES_URL } from './constants';
import { checkRes } from './utils';

export function getMovies() {
  return fetch(MOVIES_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRes(res));
}
