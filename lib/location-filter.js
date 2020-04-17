const locationFilter = entry => {
    let freehold = entry['FREEHOLD - Occupied by LA; Ground Lease; Leasehold to Third Party; Licence to Third Party; Vacant OR LEASEHOLD - Occupied by LA; Ground Lease; Sub Lease; Licence'].toLowerCase();
    return entry.Type.toLowerCase().includes('office')
        && (freehold.includes('council occupied') || freehold === 'lease in' || freehold === 'leased in')
        && entry.Easting != 0 && entry.Northing != 0;
};

module.exports = { locationFilter };