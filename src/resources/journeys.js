async function getPublicTransport(from, to) {
  return {
    distance: { value: 100, unit: 'km' },
    time: { value: 30, unit: 'minutes' },
  };
}

export default async function(from, to) {
  const [
    publicTransport,
  ] = await Promise.all([
    getPublicTransport(from, to),
  ]);

  return {
    publicTransport,
    driving: {
      distance: {
        value: 100,
        unit: 'km',
      },
    },
  };
}