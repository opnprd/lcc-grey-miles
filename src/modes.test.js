/* eslint-disable no-unused-vars */

import modes from './modes';

jest.mock('./components/modes/BusTrain.vue', () => {});
jest.mock('./components/modes/CarClub.vue', () => {});
jest.mock('./components/modes/PoolVehicle.vue', () => {});
jest.mock('./components/modes/Teleconf.vue', () => {});
jest.mock('./components/modes/WalkCycle.vue', () => {});
jest.mock('./components/modes/Taxi.vue', () => {});
jest.mock('./components/modes/SelfDrive.vue', () => {});

describe('cost calculations', () => {
  const [ teleConf, walkCycle, busTrain, pool, carClub, taxi, selfDrive ] = modes;

  test('pool vehicle cost should be £0.04 per mile', () => {
    const dist = Math.random() * 100 + 1;
    const j = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = Number(pool.costFn(j));
    expect(result).toBeCloseTo(dist * 0.04);

    const j2 = { driving: { distance: { value: dist * 1.609344, unit: 'km'} } }; // check km is converted correctly.
    const result2 = Number(pool.costFn(j2));
    expect(result2).toBe(result);
  });

  test.each([
    [0.1, 3.5],
    [1, 3.5],
    [2, 5.1],
    [4.1, 9.9],
  ])('taxi cost fn should give correct results (rounding up distance)', (dist, cost) => {
    let j = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = Number(taxi.costFn(j));
    j.isRoundTrip = true;
    const roundTripResult = Number(taxi.costFn(j));
    expect(result).toBe(cost);
    expect(roundTripResult).toBe(cost * 2);
  });

  test.each([
    [1, 10, 7.60], //[ distance (mi), time(minutes), expected £ ]
    [1, 60, 7.60],
    [4.5, 82, 8.23],
    [10, 120, 9.22],
  ])('car club cost should give correct results based on distance and time (min. 2 hours, rounded upwards to nearest hour)', (dist, mins, cost) => {
    let j = {
      driving: {
        distance: { value: dist, unit: 'miles' },
        time: { value: mins, unit: 'mins' },
      },
    };
    const result = Number(carClub.costFn(j));
    expect(result).toBe(cost);
  });
});