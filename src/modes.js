/* eslint-disable no-unused-vars */

import BusTrain from './components/modes/BusTrain.vue';
import CarClub from './components/modes/CarClub.vue';
import PoolVehicle from './components/modes/PoolVehicle.vue';
import Teleconf from './components/modes/Teleconf.vue';
import WalkCycle from './components/modes/WalkCycle.vue';
import Taxi from './components/modes/Taxi.vue';
import SelfDrive from './components/modes/SelfDrive.vue';
import { formatTime } from './utils/formatTime';

const calculateSegments = ({ travelTime, meetingTime, isRoundTrip = false}) => {
  return [
    travelTime,
    isRoundTrip ? meetingTime : undefined,
    isRoundTrip ? travelTime : undefined,
  ].filter(x => x);
};

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
    title: 'Skype Meeting',
    details: Teleconf,
    summarise(j) {
      return `Skype facilities are available at ${j.source}`;
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
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        isRoundTrip: j.isRoundTrip,
      });
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
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.cycling.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
  {
    title: 'Bus/train', // should we split this into 2 options? different cost & emissions calculations
    details: BusTrain,
    summarise(j) {
      return `${formatTime(j.train.time.value)} by train or ${formatTime(j.bus.time.value)} by bus (xx Metrocards are available at ${j.source} - <a href="">check availability and booking</a>)`;
    },
    costFn(j) {
      return '0 (corporate MetroCard) or £4.30 (dayrider ticket)';
    },
    co2Fn(j) {
      const bus =  0.167227 * (j.isRoundTrip ? toMiles(j.bus.distance) * 2 : toMiles(j.bus.distance));
      const train = 0.065613 * (j.isRoundTrip ? toMiles(j.train.distance) * 2 : toMiles(j.train.distance));
      return ((bus + train) / 2).toFixed(2);  //take the average for now
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.bus.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
  {
    title: 'Electric pool vehicle',
    details: PoolVehicle,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} drive (<a href="">check availability and booking</a>)`;
    },
    costFn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      // const perMile = (19700 / 7 + 1285) / 7500 + 0.04;  //this is if vehicle and maintainance cost are included
      return (0.04 * dist).toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.09612 * dist).toFixed(2); // Assumes vehicle is an EV
    },
    timeFn(j) {
      return [
        null,
        ...calculateSegments({
          meetingTime: j.timeAtDest,
          travelTime: j.driving.time.value,
          isRoundTrip: j.isRoundTrip,
        }),
        null,
      ];
    },
  },
  {
    title: 'Car club',
    details: CarClub,
    summarise(j) {
      return `${formatTime(j.driving.time.value)} drive (xx cars at Cookridge Street - <a href="">check availability and booking</a>)`;
    },
    costFn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      let time = Math.ceil(j.isRoundTrip ? (j.driving.time.value * 2 + j.timeAtDest) / 60 : j.driving.time.value / 60); //time in hours, rounded up
      time = Math.max(time, 2); //2 hours minimum
      return ((3.71 * time) + (0.18 * dist)).toFixed(2);
    },
    co2Fn(j) {
      return (0.25885349 * toMiles(j.driving.distance)).toFixed(2);
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.driving.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
  {
    title: 'Taxi',
    details: Taxi,
    summarise(j) {
      return `${formatTime(j.driving.time.value)}`;
    },
    costFn(j) {
      const dist = Math.ceil(toMiles(j.driving.distance));
      const cost =  (3.5 + (1.6 * (dist - 1))); // £3.50 for first mile then £1.60
      const total = j.isRoundTrip ? cost * 2 : cost;
      return total.toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.24020217 * dist).toFixed(2);
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.driving.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
  {
    title: 'Drive your own vehicle',
    details: SelfDrive,
    summarise(j) {
      return `${formatTime(j.driving.time.value)}`;
    },
    costFn(j) {
      const dist = Math.ceil(j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance));
      return (0.45 * dist).toFixed(2); //worst case cost scenario (ie. casual car user doing <10k annual miles)
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return (0.28591256 * dist).toFixed(2);
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.driving.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
];

// helper functions
const toMiles = dist => dist.unit == 'km' ? dist.value / 1.609344 : dist.value;

