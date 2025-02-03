const fs = require('fs');
const path = './users.json'; // Ajuste o caminho aqui

const readData = () => {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
