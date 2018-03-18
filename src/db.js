const range = require('lodash/range');
const faker = require('faker');

module.exports = {
  todos: [
    {
      completed: true,
      id: 1,
      text: 'Json-mock',
    },
    {
      completed: true,
      id: 2,
      text: 'React',
    },
    {
      completed: false,
      id: 3,
      text: 'Redux',
    },
  ],
  posts: range(1, 20).map(id => ({
    id,
    title: faker.lorem.sentence(),
    body: faker.lorem.sentences(10),
    imageUrl: `https://picsum.photos/320/240?image=${120 + id}`,
  })),
};
