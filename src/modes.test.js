/* eslint-disable no-unused-vars */

import modes from './modes';

jest.mock('./components/modes/BusTrain.vue', () => {});
jest.mock('./components/modes/CarClub.vue', () => {});
jest.mock('./components/modes/PoolVehicle.vue', () => {});
jest.mock('./components/modes/Teleconf.vue', () => {});
jest.mock('./components/modes/Cycle.vue', () => {});
jest.mock('./components/modes/Taxi.vue', () => {});
jest.mock('./components/modes/SelfDrive.vue', () => {});
jest.mock('./components/modes/Walk.vue', () => {});

describe('cost calculations', () => {
  const [ teleConf, walk, cycle, busTrain, pool, carClub, taxi, selfDrive ] = modes;

  test('pool vehicle cost should be £0.04 per mile', () => {
    const dist = Math.random() * 100 + 1;
    const j = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = pool.costFn(j).value;
    expect(result).toBeCloseTo(dist * 0.04);

    const j2 = { driving: { distance: { value: dist * 1.609344, unit: 'km'} } }; // check km is converted correctly.
    const result2 = pool.costFn(j2).value;
    expect(result2).toBe(result);
  });

  test.each([
    [0.1, 3.5],
    [1, 3.5],
    [2, 5.1],
    [4.1, 9.9],
  ])('taxi cost fn should give correct results (rounding up distance)', (dist, cost) => {
    let j = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = taxi.costFn(j).value;
    j.isRoundTrip = true;
    const roundTripResult = taxi.costFn(j).value;
    expect(result).toBe(cost);
    expect(roundTripResult).toBe(cost * 2);
  });

  test.each([
    [1, 10, 2.96], //[ distance (mi), time(minutes), expected £ ]
    [1, 20, 3.89],
    [0.5, 90, 7.51],
    [10, 80, 9.22],
  ])('car club cost should give correct results based on distance and 15 minute time blocks (rounded up with 30 minutes added)', (dist, mins, cost) => {
    let j = {
      driving: {
        distance: { value: dist, unit: 'miles' },
        time: { value: mins, unit: 'mins' },
      },
    };
    const result = carClub.costFn(j).value;
    expect(result).toBeCloseTo(cost);
  });
});