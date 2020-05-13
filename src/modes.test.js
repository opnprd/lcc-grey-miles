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

  test.each([
    [1, 0.59],  // [miles, expected cost]
    [4, 2.35],
    [15, 8.8],
  ])('pool vehicle cost fn should return correct cost', (dist, cost) => {
    let journey = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = Number(pool.costFn(journey));
    journey.isRoundTrip = true;
    const roundTripResult = Number(pool.costFn(journey));
    expect(result).toBe(cost);
    expect(roundTripResult).toBeCloseTo(cost * 2, 1);
  });

  test.each([
    [0.1, 3.5],
    [1, 3.5],
    [2, 5.1],
    [4.1, 9.9],
  ])('taxi cost fn should give correct results (rounding up distance)', (dist, cost) => {
    const j = { driving: { distance: { value: dist, unit: 'miles'} } };
    const result = Number(taxi.costFn(j));
    expect(result).toBe(cost);
  });
});