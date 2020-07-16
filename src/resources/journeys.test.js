import geocode from './geocode';
import journeys from './journeys';

jest.mock('./geocode');

describe('journey calculation', () => {
  let result;
  let fakeMatrixService;
  let fakeGetDistanceMatrix;
  let randomTime;
  let randomDist;

  const randomNumber = () => Math.random() * 10000;

  beforeEach(() => {
    [randomDist, randomTime] = [randomNumber(), randomNumber()];
    fakeGetDistanceMatrix = jest.fn((opts, cb) => {
      cb({
        rows: [
          {
            elements: [
              {
                distance: { value: randomDist },
                duration: { value: randomTime },
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
    delete global.google;
    geocode.mockRestore();
  });

  beforeEach(async () => {
    result = await journeys([8.681495,49.41461], [8.687872,49.420318]);
  });

  test('it should return the public transport distance and time', async () => {
    // TODO Check for getDistanceMatrixCalled with correct options
    expect(fakeGetDistanceMatrix).toHaveBeenCalledTimes(4);
    expect(result).toHaveProperty('publicTransport.distance.value', (randomDist / 1000).toFixed(2));
    expect(result).toHaveProperty('publicTransport.time.value', (randomTime / 60).toFixed(1));
  });

  test('it should return the driving distance and time', async () => {
    expect(result).toHaveProperty('driving.distance.value', (randomDist / 1000).toFixed(2));
    expect(result).toHaveProperty('driving.distance.unit', 'km');
    expect(result).toHaveProperty('driving.time.value', (randomTime / 60).toFixed(1));
  });

  test('it should return the walking distance and time', async () => {
    expect(result).toHaveProperty('walking.distance.value', (randomDist / 1000).toFixed(2));
    expect(result).toHaveProperty('walking.time.value', (randomTime / 60).toFixed(1));
  });

  test('it should return the cycling distance and time', async () => {
    expect(result).toHaveProperty('cycling.distance.value', (randomDist / 1000).toFixed(2));
    expect(result).toHaveProperty('cycling.time.value', (randomTime / 60).toFixed(1));
  });
});