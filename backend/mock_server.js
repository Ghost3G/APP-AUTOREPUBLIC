const http = require('http');

const vehicles = [
  { id: 1, brand: 'Toyota', model: 'Land Cruiser 300', year: 2023, mileage: 15000, vin: 'JTMCR9JAXN00012345', status: 'disponible', salePrice: 95000 },
  { id: 2, brand: 'Nissan', model: 'Patrol', year: 2022, mileage: 20000, vin: 'JN8AY2NE0X9304567', status: 'disponible', salePrice: 64000 },
  { id: 3, brand: 'Range Rover', model: 'Sport', year: 2021, mileage: 18000, vin: 'SALWR2RVXMA123456', status: 'reserve', salePrice: 78000 },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (method === 'GET' && (url === '/vehicles' || url === '/vehicles/')) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(vehicles));
    return;
  }

  if (method === 'GET' && url === '/dashboard') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ stats: { totalVehicles: vehicles.length } }));
    return;
  }

  // generic 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
