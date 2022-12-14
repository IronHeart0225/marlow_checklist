import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';
import { CATEGORY_NAMES, DOCUMENT_STATUS } from '../config/config';

const mock = new MockAdapter(axios, { delayResponse: 0 });

const createRandomDocument = () => {
  const categoryIds = Array.from(CATEGORY_NAMES, ({ id }) => id);
  const categoryId = faker.helpers.arrayElement(categoryIds);

  return {
    id: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(DOCUMENT_STATUS),
    documentInfo: {
      description: faker.random.words(2),
      documentNumber: `${faker.random.numeric(4)}/${faker.random.numeric(4)}`,
      issueDate: faker.date.recent(30),
      unlimited: faker.datatype.boolean(),
      categoryName: CATEGORY_NAMES[categoryId].title,
      categoryId,
      documentId: 0,
      expiryDate: faker.date.soon(30),
      nation: faker.address.countryCode('alpha-3'),
      counter: 0,
      followUp: faker.datatype.boolean(),
      optional: faker.datatype.boolean(),
    },
  };
}

mock.onGet('/api/document_list').reply((config) => {
  let items = [];
  Array.from({ length: 40 }).forEach(() => {
    items.push(createRandomDocument());
  });

  const data = {
    id: faker.datatype.uuid(),
    status: 'Archive',
    items,
    percentage: items.reduce((total, item) => total + (item.status !== 'Active'), 0),
  };

  return [200, data];
});

mock.onPost('/api/document_status', { status: 'Done' }).reply((config) => {
  if (Math.random() > 0.95) {
    return [400, { message: 'Update failed' }];
  }

  return [200, { data: 'Successfully updated' }];
})

mock.onAny().passThrough();
