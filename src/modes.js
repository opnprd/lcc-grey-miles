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
  },
  {
    title: 'Walk/Cycle',
    details: WalkCycle,
    summarise(j) {
      return `30-40 minutes by bike (2 ebikes nearby at ${j.source})`;
    },
  },
  {
    title: 'Bus/train',
    details: BusTrain,
    summarise(j) {
      return '23 minutes by train or 28 minutes by bus (2 Metro cards are available nearby)';
    },
  },
  {
    title: 'Pool vehicle',
    details: PoolVehicle,
    summarise(j) {
      return '22 minutes drive (needs booking in advance)';
    },
  },
  {
    title: 'Car club',
    details: CarClub,
    summarise(j) {
      return '22 minutes drive (20 cars at Cookridge Street)';
    },
  },
  {
    title: 'Taxi',
    details: Taxi,
    summarise() {
      return '22 minutes (Arrow Taxis)';
    },
  },
  {
    title: 'Self drive',
    details: SelfDrive,
    summarise() {
      return '22 minutes';
    },
  },
];
