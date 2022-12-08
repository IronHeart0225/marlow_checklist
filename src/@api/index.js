import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';

const mock = new MockAdapter(axios, { delayResponse: 0 });

const createRandomDocument = () => {
  const categoryId = faker.helpers.arrayElement([0, 1, 2]);
  const CATEGORY_NAMES = [
    'Attention',
    'Optional',
    'Mandatory',
  ];
  const DOCUMENT_STATUS = [
    'Pending',
    'Done',
    'Skip',
  ];

  return {
    id: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(DOCUMENT_STATUS),
    documentInfo: {
      description: faker.random.words(2),
      documentNumber: `${faker.random.numeric(4)}/${faker.random.numeric(4)}`,
      issueDate: faker.date.recent(30),
      unlimited: faker.datatype.boolean(),
      categoryName: CATEGORY_NAMES[categoryId],
      categoryId,
      documentId: 0,
      expiryDate: faker.date.soon(30),
      nation: faker.address.countryCode('alpha-3'),
      counter: 0,
      followUp: true,
      optional: categoryId === 1,
    },
  };
}

mock.onGet('/api/document_list').reply((config) => {
  let items = [];
  Array.from({ length: 15 }).forEach(() => {
    items.push(createRandomDocument());
  });

  const data = {
    id: faker.datatype.uuid(),
    status: 'Archive',
    items,
    percentage: items.reduce((total, item) => total + (item.status !== 'Pending'), 0),
  };

  return [200, data];
});

mock.onPost('/api/document_status', { status: 'Done' }).reply((config) => {
  if (Math.random() > 0.95) {
    return [400, { message: 'Error message' }];
  }

  return [200, { data: 'Successfully updated' }];
})

mock.onAny().passThrough();
