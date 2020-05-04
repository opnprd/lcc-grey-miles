import geocode from './geocode';
import journeys from './journeys';

jest.mock('./geocode');

// API https://jestjs.io/docs/en/api
// Expect functions https://jestjs.io/docs/en/expect

describe('journey calculation', () => {
  let result;
  let fakeFetch;
  let fakeMatrixService;
  let fakeGetDistanceMatrix;

  beforeEach(() => {
    fakeFetch = jest.fn().mockResolvedValue({
      json: async () => ({
        features: [
          {
            properties: {
              summary: {
                distance: 1234,
                duration: 3600,
              },
            },
          },
        ],
      }),
    });
    global.fetch = fakeFetch;

    fakeGetDistanceMatrix = jest.fn((opts, cb) => {
      cb({
        rows: [
          {
            elements: [
              {
                distance: { value: 2000 },
                duration: { value: 1800 },
              },
            ],
          },
        ],
      }, 'OK');
    });
    fakeMatrixService = jest.fn().mockReturnValue({
      getDistanceMatrix: fakeGetDistanceMatrix,
    });
    global.google = {
      maps: {
        LatLng: jest.fn(),
        DistanceMatrixService: fakeMatrixService,
        UnitSystem: {
          METRIC: 'METRIC_UNIT_SYSTEM',
        },
      },
    };

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
    delete global.google;
    geocode.mockRestore();
  });

  // Better to run before each test, in case we end up mocking the implementation
  beforeEach(async () => {
    result = await journeys([8.681495,49.41461], [8.687872,49.420318]);
  });

  test('it should return the public transport distance and time', async () => {
    // TODO Check for getDistanceMatrixCalled with correct options
    expect(fakeGetDistanceMatrix).toHaveBeenCalledTimes(2);
    expect(result).toHaveProperty('bus.distance.value', '2.00');
    expect(result).toHaveProperty('bus.time.value', '30.0');
    expect(result).toHaveProperty('train.distance.value', '2.00');
    expect(result).toHaveProperty('train.time.value', '30.0');
  });

  test('it should return the driving distance and time', async () => {
    expect(result).toHaveProperty('driving.distance.value', '1.23');
    expect(result).toHaveProperty('driving.distance.unit', 'km');
    expect(result).toHaveProperty('driving.time.value', '60.0');
  });

  test('it should return the walking distance and time', async () => {
    expect(result).toHaveProperty('walking.distance.value', '1.23');
    expect(result).toHaveProperty('walking.time.value', '60.0');
  });

  test('it should return the cycling distance and time', async () => {
    expect(result).toHaveProperty('cycling.distance.value', '1.23');
    expect(result).toHaveProperty('cycling.time.value', '60.0');
  });
});
