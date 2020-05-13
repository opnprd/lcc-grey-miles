export const formatTime = value => {
  value = Math.round(Number(value));
  if (value < 60)
    return `${value.toFixed(0)} minutes`;
  else {
    let hours = Math.floor(value / 60);
    let mins = (value % 60).toFixed(0);
    if (hours == 1)
      return `${hours} hour ${mins} minutes`;
    else
      return `${hours} hours ${mins} minutes`;
  }
};
