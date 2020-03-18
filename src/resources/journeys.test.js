import fetch from 'node-fetch';
import journeys from './journeys';

// API https://jestjs.io/docs/en/api
// Expect functions https://jestjs.io/docs/en/expect

describe('journey calculation', () => {
  let result;

  beforeEach(() => {
    // TODO Replace this with a mock function to save backend calls
    global.fetch = fetch;
    // TODO Add mock for geocode which returns a known sequence of results
  });

  afterAll(() => {
    delete global.fetch;
  });

  // Better to run before each test, in case we end up mocking the implementation
  beforeEach(async () => {
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
