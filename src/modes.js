/* eslint-disable no-unused-vars */

import BusTrain from './components/modes/BusTrain.vue';
import CarClub from './components/modes/CarClub.vue';
import PoolVehicle from './components/modes/PoolVehicle.vue';
import Teleconf from './components/modes/Teleconf.vue';
import Cycle from './components/modes/Cycle.vue';
import Taxi from './components/modes/Taxi.vue';
import SelfDrive from './components/modes/SelfDrive.vue';
import Walk from './components/modes/Walk.vue';
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
      return {
        value: 0,
      };
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
    title: 'Walk',
    details: Walk,
    summarise(j) {
      return `${formatTime(j.walking.time.value)} walking`;
    },
    costFn(j) {
      return 0;
    },
    co2Fn(j) {
      return {
        value: 0,
      };
    },
    displayFn(j) {
      return !j.carrying; //hide if user is carrying lots of stuff
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.walking.time.value,
        isRoundTrip: j.isRoundTrip,
      });
    },
  },
  {
    title: 'Cycle',
    details: Cycle,
    summarise(j) {
      return `${formatTime(j.cycling.time.value)} by bike (xx ebikes nearby at ${j.source})`;
    },
    costFn(j) {
      return 0;
    },
    co2Fn(j) {
      return {
        value: 0,
      };
    },
    displayFn(j) {
      return !j.carrying;
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
    title: 'Public Transport',
    details: BusTrain,
    summarise(j) {
      return `${formatTime(j.publicTransport.time.value)} by public transport (xx Metrocards are available at ${j.source} - <a>check availability and booking</a>)`;
    },
    costFn(j) {
      return '0 (corporate MetroCard) or ~£4.30 (dayrider ticket). Prices may vary.';
    },
    co2Fn(j) {
      const bus =  0.167227 * (j.isRoundTrip ? toMiles(j.publicTransport.distance) * 2 : toMiles(j.publicTransport.distance));
      const train = 0.065613 * (j.isRoundTrip ? toMiles(j.publicTransport.distance) * 2 : toMiles(j.publicTransport.distance));
      return {
        value: train,
        message: `${train.toFixed(2)} - ${bus.toFixed(2)}kg CO2 emitted (dependant on mode of public transport)`,
      };
    },
    timeFn(j) {
      return calculateSegments({
        meetingTime: j.timeAtDest,
        travelTime: j.publicTransport.time.value,
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
      return {
        value: 0.09612 * dist, // Assumes vehicle is an EV
      };
    },
    timeFn(j) {
      return [
        ...calculateSegments({
          meetingTime: j.timeAtDest,
          travelTime: j.driving.time.value,
          isRoundTrip: j.isRoundTrip,
        }),
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
      let time = j.isRoundTrip ? ((j.driving.time.value * 2) + j.timeAtDest) : j.driving.time.value;  // always add buffer of 30 minutes
      time += 30;
      const timeBlocks = Math.ceil(time / 15);  //priced in 15 minute blocks
      return ((timeBlocks * 0.9275) + (dist * 0.18)).toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return {
        value: 0.25885349 * dist,
      };
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
      return '<strong>Private hire taxis should only be used in exceptional situations.</strong> There needs to be an important business need.  If you do use a taxi you should use our contract if possible. Information on this and details for our policy can be found <a>here</a>.';
    },
    costFn(j) {
      const dist = Math.ceil(toMiles(j.driving.distance));
      const cost =  (3.5 + (1.6 * (dist - 1))); // £3.50 for first mile then £1.60
      const total = j.isRoundTrip ? cost * 2 : cost;
      return total.toFixed(2);
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      return {
        value: 0.24020217 * dist,
      };
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
      return '<strong>Driving your own petrol or diesel car should be your last resort</strong>';
    },
    costFn(j) {
      // const dist = Math.ceil(j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance));
      // return (0.45 * dist).toFixed(2); //worst case cost scenario (ie. casual car user doing <10k annual miles)
      return null;  //don't display cost for self-drive
    },
    co2Fn(j) {
      const dist = j.isRoundTrip ? toMiles(j.driving.distance) * 2 : toMiles(j.driving.distance);
      const petrolEmissions = 0.28591256 * dist;
      const hybridEmissions =  0.18259 * dist;
      const evEmissions = 0.09612 * dist;
      return {
        value: petrolEmissions,
        message: `${petrolEmissions.toFixed(2)}kg / ${hybridEmissions.toFixed(2)}kg / ${evEmissions.toFixed(2)}kg (petrol / hybrid / electric vehicle) CO2 emitted`,
      };
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

