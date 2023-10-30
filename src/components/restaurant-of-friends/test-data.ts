import { Restaurant } from './list/list.tsx';
import {faker} from '@faker-js/faker';

const listLength = faker.number.int({min: 30, max: 50}); // 배열의 길이를 10으로 고정

export const list = Array.from({ length: listLength }, (_, index) => {
  // faker 라이브러리를 사용하여 랜덤한 데이터 생성
  const name = faker.person.fullName();
  const description = faker.lorem.sentence();
  const score = faker.number.int({ min: 1, max: 5 }) as Restaurant['score'];
  const tag = Array.from({length: 3}, () => {
    return {id: faker.lorem.word(), name: faker.lorem.word()}
  });
  const authorId = faker.string.uuid();

  // Restaurant 객체 생성
  const restaurant: Restaurant = {
    id: index.toString(),
    name,
    description,
    score,
    tag,
    authorId,
  };

  return restaurant;
});