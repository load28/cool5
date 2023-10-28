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
// export const list: Restaurant[] = [
//   {
//     id: '1',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [
//       { id: '국밥', name: '국밥' },
//       { id: 'good', name: 'good' },
//       { id: 'nice', name: 'nice' },
//     ],
//     score: 3,
//   },
//   {
//     id: '2',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '3',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '4',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '5',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '6',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '7',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '8',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '9',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '10',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '11',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '12',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '13',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
//   {
//     id: '14',
//     name: '유미카츠 잠실점 (새로 오픈)',
//     description: '적당히 먹을 만해요',
//     authorId: 'tjalsdud89',
//     tag: [{ id: '국밥', name: '국밥' }],
//     score: 3,
//   },
// ];
