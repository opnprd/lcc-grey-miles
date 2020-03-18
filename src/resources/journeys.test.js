import fetch from 'node-fetch';
import journeys from './journeys';
import geocode from './geocode';

jest.mock('./geocode');

// API https://jestjs.io/docs/en/api
// Expect functions https://jestjs.io/docs/en/expect

describe('journey calculation', () => {
  let result;

  beforeEach(() => {
    // TODO Replace this with a mock function to save backend calls
    global.fetch = fetch;

    /**
     * Mocked geocode which returns a known sequence of results
     * These are added using the mockResolvedValueOnce which mimics async function calls
     * The first call will return the first registered value
     * The second call will return the second one
     */
    geocode
      .mockResolvedValueOnce([8.681495,49.41461])
      .mockResolvedValueOnce([8.687872,49.420318]);
  });

  afterAll(() => {
    delete global.fetch;
    geocode.mockRestore();
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
