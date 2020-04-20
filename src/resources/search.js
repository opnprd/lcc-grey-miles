export default function searchCouncilLocations(input, locations) {
    const tokens = input.match(/\S+/g).map(token => token.toLowerCase());
    const results = locations.filter(el => {
        let match = true;
        tokens.forEach(token => {
            if (!el.name.toLowerCase().includes(token) && !el.addr.toLowerCase().includes(token)) match = false;
        });
        return match;
    });
    return results;
}