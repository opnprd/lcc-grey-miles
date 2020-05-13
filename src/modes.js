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
      return 4.30; //price of bus dayrider
    },
    co2Fn(j) {
      const bus =  0.167227 * (j.isRoundTrip ? toMiles(j.bus.distance) * 2 : toMiles(j.bus.distance));
      const train = 0.065613 * (j.isRoundTrip ? toMiles(j.train.distance) * 2 : toMiles(j.train.distance));
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
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      const perMile = (19700 / 7 + 1285) / 7500 + 0.04;
      return (perMile * dist).toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.09612 * dist).toFixed(2); // Assumes vehicle is an EV
    },
  },
  {
    title: 'Car club',
    details: CarClub,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} drive (xx cars at Cookridge Street)`;
    },
    costFn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      const time = Math.ceil(j.isRoundTrip ? (j.driving.time.value * 2 + j.timeAtDest) / 60 : j.driving.time.value / 60); //time in hours, rounded up
      return ((3.71 * time) + (0.18 * dist)).toFixed(2);
    },
    co2Fn(j) {
      return (0.25885349 * toMiles(j.driving.distance)).toFixed(2);
    },
  },
  {
    title: 'Taxi',
    details: Taxi,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} (AAA Taxis)`;
    },
    costFn(j) {
      const dist = Math.ceil(j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance));  //round up miles
      const cost =  (3.5 + (1.6 * (dist - 1))); // £3.50 for first mile then £1.60
      return cost.toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.24020217 * dist).toFixed(2);
    },
  },
  {
    title: 'Self drive',
    details: SelfDrive,
    summarise(j) {
      return `${formatTime(j.driving.time.value)}`;
    },
    costFn(j) {
      const dist = Math.ceil(j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance));
      return (0.45*toMiles(j.driving.distance)).toFixed(2); //worst case cost scenario (ie. casual car user doing <10k annual miles)
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.28591256 * dist).toFixed(2);
    },
  },
];

// helper functions
const toMiles = dist => dist.unit == 'km' ? dist.value / 1.609344 : dist.value;

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