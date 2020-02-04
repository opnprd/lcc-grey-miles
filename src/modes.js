import BusTrain from './components/modes/BusTrain.vue';
import CarClub from './components/modes/CarClub.vue';
import PoolVehicle from './components/modes/PoolVehicle.vue';
import Teleconf from './components/modes/Teleconf.vue';
import WalkCycle from './components/modes/WalkCycle.vue';
import Taxi from './components/modes/Taxi.vue';
import SelfDrive from './components/modes/SelfDrive.vue';

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
  },
  {
    title: 'Walk/Cycle',
    details: WalkCycle,
    summarise(j) {
      return `30-40 minutes by bike (2 ebikes nearby at ${j.source})`;
    },
    costFn(j) {
      return 0;
    },
  },
  {
    title: 'Bus/train',
    details: BusTrain,
    summarise(j) {
      return `${j.time.train} minutes by train or ${j.time.bus} minutes by bus (2 Metro cards are available nearby)`;
    },
    costFn(j) {
      // TODO Need to calculate cost with/without metro card
      return 5;
    },
  },
  {
    title: 'Pool vehicle',
    details: PoolVehicle,
    summarise(j) {
      return `${j.time.drive} minutes drive (needs booking in advance)`;
    },
    costFn(j) {
      // TODO How is this calculated?
      return 10;
    },
  },
  {
    title: 'Car club',
    details: CarClub,
    summarise(j) {
      return `${j.time.drive} minutes drive (20 cars at Cookridge Street)`;
    },
    costFn(j) {
      // TODO How is this calculated?
      return (10*j.time.drive/30).toFixed(2);
    },
  },
  {
    title: 'Taxi',
    details: Taxi,
    summarise(j) {
      return `${j.time.drive} minutes (Arrow Taxis)`;
    },
    costFn(j) {
      // TODO How is this calculated?
      return (0.50*j.time.drive).toFixed(2);
    },
  },
  {
    title: 'Self drive',
    details: SelfDrive,
    summarise(j) {
      return `${j.time.drive} minutes`;
    },
    costFn(j) {
      // TODO How is this calculated?
      return 0.5*j.time.drive;
    },
  },
];
