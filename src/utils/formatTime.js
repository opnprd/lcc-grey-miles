export const formatTime = value => {
  value = Math.round(Number(value));
  const hours = Math.floor(value / 60);
  const mins = value % 60;
  if (hours === 0 && mins === 0) return '0';
  let timeString = '';
  if (hours > 0) {
    timeString += hours;
    timeString += (hours === 1 ? ' hour ': ' hours ');
  }
  if (mins > 0) timeString += `${mins.toFixed(0)} minutes`;
  return timeString;
};