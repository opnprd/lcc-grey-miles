/* eslint-disable no-unused-vars */

import BusTrain from './components/modes/BusTrain.vue';
import CarClub from './components/modes/CarClub.vue';
import PoolVehicle from './components/modes/PoolVehicle.vue';
import Teleconf from './components/modes/Teleconf.vue';
import WalkCycle from './components/modes/WalkCycle.vue';
import Taxi from './components/modes/Taxi.vue';
import SelfDrive from './components/modes/SelfDrive.vue';

/**
 * Each mode of transport is described below. The fields are as follows:
 * * title: Display name of the mode of transport
 * * details: A Vue component to render for detailed information
 * * summarise: A function to present the summary of the function
 * * costFn: A function to calculate the cost of travel in £
 * * co2Fn: A function to calculate the CO2 emissions in kg for that mode of transport
 * * displayFn: If applicable, function to determine whether the mode should be displayed. Defaults to true.
 */
export default [
  {
    title: 'Tele/videoconference',
    details: Teleconf,
    summarise(j) {
      return `Skype facilities at ${j.source}`;
    },
    costFn(j) {
      return 0;
    },
    co2Fn(j) {
      return 0;
    },
    displayFn(j) {
      return !j.presenceRequired; //hide if presence is required
    },
  },
  {
    title: 'Walk/Cycle',
    details: WalkCycle,
    summarise(j) {
      return `${formatTime(j.walking.time.value)} walking or ${formatTime(j.cycling.time.value)} by bike (xx ebikes nearby at ${j.source})`;
    },
    costFn(j) {
      return 0;
    },
    co2Fn(j) {
      return 0;
    },
    displayFn(j) {
      return !j.carrying; //hide if user is carrying lots of stuff
    },
  },
  {
    title: 'Bus/train', // should we split this into 2 options? different cost & emissions calculations
    details: BusTrain,
    summarise(j) {
      return `${formatTime(j.train.time.value)} by train or ${formatTime(j.bus.time.value)} by bus (xx Metro cards are available nearby)`;
    },
    costFn(j) {
      // TODO Need to calculate cost with/without metro card
      return 5;
    },
    co2Fn(j) {
      const bus =  0.167227 * miles(j.bus.distance.value);
      const train = 0.065613 * miles(j.train.distance.value);
      return ((bus + train) / 2).toFixed(2);  //take the average for now
    },
  },
  {
    title: 'Pool vehicle',
    details: PoolVehicle,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} drive (needs booking in advance)`;
    },
    costFn(j) {
      return (0.04 * miles(j.driving.distance.value)).toFixed(2); //Cost of electricity only - do we need to factor in lease & maintenance?
    },
    co2Fn(j) {
      return (0.2446754 * miles(j.driving.distance.value)).toFixed(2); //assuming same as Car Club
    },
  },
  {
    title: 'Car club',
    details: CarClub,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} drive (xx cars at Cookridge Street)`;
    },
    costFn(j) {
      return (3.71*j.driving.time.value/60).toFixed(2); //£3.71 per hour
    },
    co2Fn(j) {
      return (0.2446754 * miles(j.driving.distance.value)).toFixed(2);
    },
  },
  {
    title: 'Taxi',
    details: Taxi,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} (AAA Taxis)`;
    },
    costFn(j) {
      const dist = miles(j.driving.distance.value);
      const cost =  (3.5 + (1.6 * (dist - 1))); // £3.50 for first mile then £1.60
      return Math.max(3.5, cost).toFixed(2);
    },
    co2Fn(j) {
      return (0.24020217 * miles(j.driving.distance.value)).toFixed(2);
    },
  },
  {
    title: 'Self drive',
    details: SelfDrive,
    summarise(j) {
      return `${formatTime(j.driving.time.value)}`;
    },
    costFn(j) {
      return (0.45*miles(j.driving.distance.value)).toFixed(2); //worst case cost scenario (ie. casual car user doing <10k annual miles)
    },
    co2Fn(j) {
      return (0.28591256 * miles(j.driving.distance.value)).toFixed(2);
    },
  },
];

// helper functions
const miles = km => km / 1.609344;

const formatTime = value => {
  value = Number(value);
  if (value < 60) return `${value.toFixed(0)} minutes`;
  else {
    let hours = Math.floor(value / 60);
    let mins = (value % 60).toFixed(0);
    if (hours == 1) return `${hours} hour ${mins} minutes`;
    else return `${hours} hours ${mins} minutes`;
  }
};