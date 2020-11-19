const fs = require('fs');
const faker = require('faker');

const fakeData = [];

for(let i = 0 ; i < 3000 ; i++) {
  fakeData.push({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  });
}

fs.writeFileSync('./mock_api/db.json', JSON.stringify(fakeData, null, 2));