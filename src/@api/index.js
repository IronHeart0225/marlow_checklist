import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';

const mock = new MockAdapter(axios, { delayResponse: 0 });

const createRandomDocument = () => {
  const categoryId = faker.helpers.arrayElement([0, 1, 2]);
  const CATEGORY_NAMES = [
    'Mandatory',
    'Attention',
    'Optional',
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
      unlimited: true,
      categoryName: CATEGORY_NAMES[categoryId],
      categoryId,
      documentId: 0,
      expiryDate: faker.date.soon(30),
      nation: faker.address.countryCode('alpha-3'),
      counter: 0,
      followUp: true,
      optional: true,
    },
  };
}

mock.onGet('/api/document_list').reply((config) => {
  const data = {
    id: faker.datatype.uuid(),
    status: 'Archive',
    items: [],
    percentage: 0,
  };

  Array.from({ length: 3 }).forEach(() => {
    data.items.push(createRandomDocument());
  })
  return [200, data];
});

mock.onPost('/api/document_status', { status: 'Done' }).reply((config) => {
  if (Math.random() > 0.95) {
    return [400, { message: 'Error message' }];
  }

  return [200, { data: 'Successfully updated' }];
})

mock.onAny().passThrough();
