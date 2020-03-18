import journeys from './journeys';

// API https://jestjs.io/docs/en/api
// Expect functions https://jestjs.io/docs/en/expect

describe('journey calculation', () => {
  let result;

  beforeAll(async () => {
    result = await journeys();
  });

  test('it should return the public transport distance and time', async () => {
    expect(result).toHaveProperty('publicTransport.distance.value', 100);
    expect(result).toHaveProperty('publicTransport.time.value', 30);
  });

  test('it should return the driving distance and time', async () => {
    expect(result).toHaveProperty('driving.distance.value');
    expect(result).toHaveProperty('driving.distance.unit', 'km');
    expect(result).toHaveProperty('driving.time.value');
  });

  test('it should return the walking distance and time', async () => {
    expect(result).toHaveProperty('walking.distance.value');
    expect(result).toHaveProperty('walking.time.value');
  });

  test('it should return the cycling distance and time', async () => {
    expect(result).toHaveProperty('cycling.distance.value');
    expect(result).toHaveProperty('cycling.time.value');
  });
});
