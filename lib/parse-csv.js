const csv = require('csv-parser');

function parseCSV(inputStream) {
    return new Promise((resolve, reject) => {
        const output = [];
        inputStream.pipe(csv())
          .on('data', (data) => output.push(data))
          .on('end', () => resolve(output))
          .on('error', () => reject());
    });
}

module.exports = { parseCSV };