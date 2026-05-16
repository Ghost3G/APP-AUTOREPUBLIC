const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3333;

const vehicles = [
  { id: 1, brand: 'Toyota', model: 'Land Cruiser 300', year: 2023, mileage: 15000, vin: 'JTMCR9JAXN00012345', status: 'disponible', salePrice: 95000 },
  { id: 2, brand: 'Nissan', model: 'Patrol', year: 2022, mileage: 20000, vin: 'JN8AY2NE0X9304567', status: 'disponible', salePrice: 64000 },
  { id: 3, brand: 'Range Rover', model: 'Sport', year: 2021, mileage: 18000, vin: 'SALWR2RVXMA123456', status: 'reserve', salePrice: 78000 },
];

const repairs = [
  { id: 1, vehicleId: 1, title: 'Révision moteur', status: 'en cours', technician: 'Alex', cost: 450 },
  { id: 2, vehicleId: 2, title: 'Freins avant', status: 'terminé', technician: 'Sophie', cost: 320 },
];

const invoices = [
  { id: 1, title: 'Facture #001', customer: 'M. Dupont', amount: 450, status: 'payée' },
];

const imports = [
  { id: 1, title: 'Importation Tunis', quantity: 5, status: 'arrivé' },
];

const transfers = [
  { id: 1, from: 'Showroom', to: 'Atelier', item: 'Range Rover Sport', status: 'en transit' },
];

const parts = [
  { id: 1, name: 'Plaquette de frein', stock: 28, price: 45 },
];

const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
];

function sendJSON(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getCollection(path) {
  if (path.startsWith('/vehicles')) return vehicles;
  if (path.startsWith('/repairs')) return repairs;
  if (path.startsWith('/invoices')) return invoices;
  if (path.startsWith('/imports')) return imports;
  if (path.startsWith('/transfers')) return transfers;
  if (path.startsWith('/parts')) return parts;
  return null;
}

function getDashboard() {
  const totalVehicles = vehicles.length;
  const totalRepairs = repairs.length;
  const totalInvoices = invoices.length;
  return {
    stats: {
      totalVehicles,
      totalRepairs,
      totalInvoices,
    },
    recentVehicles: vehicles.slice(0, 5),
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const method = req.method;

  if (method === 'OPTIONS') {
    return sendJSON(res, 204, {});
  }

  if (pathname === '/dashboard' && method === 'GET') {
    return sendJSON(res, 200, getDashboard());
  }

  if (pathname === '/auth/login' && method === 'POST') {
    const body = await parseBody(req).catch(() => ({}));
    const email = body.email || 'admin@example.com';
    const user = users.find((item) => item.email === email) || users[0];
    return sendJSON(res, 200, {
      token: 'mock-jwt-token',
      user,
    });
  }

  if (pathname === '/auth/logout' && method === 'POST') {
    return sendJSON(res, 200, { success: true });
  }

  const collection = getCollection(pathname);
  const idMatch = pathname.match(/\/([0-9]+)$/);
  const id = idMatch ? Number(idMatch[1]) : null;
  const basePath = id ? pathname.replace(/\/([0-9]+)$/, '') : pathname;

  if (collection && basePath && method === 'GET') {
    if (id) {
      const item = collection.find((record) => record.id === id);
      if (!item) return sendJSON(res, 404, { error: 'Not found' });
      return sendJSON(res, 200, item);
    }
    return sendJSON(res, 200, collection);
  }

  if (collection && basePath && method === 'POST') {
    const body = await parseBody(req).catch(() => ({}));
    const newItem = { id: Math.max(0, ...collection.map((item) => item.id)) + 1, ...body };
    collection.push(newItem);
    return sendJSON(res, 201, newItem);
  }

  if (collection && id && basePath && (method === 'PUT' || method === 'PATCH')) {
    const body = await parseBody(req).catch(() => ({}));
    const itemIndex = collection.findIndex((record) => record.id === id);
    if (itemIndex === -1) return sendJSON(res, 404, { error: 'Not found' });
    collection[itemIndex] = { ...collection[itemIndex], ...body };
    return sendJSON(res, 200, collection[itemIndex]);
  }

  if (collection && id && basePath && method === 'DELETE') {
    const itemIndex = collection.findIndex((record) => record.id === id);
    if (itemIndex === -1) return sendJSON(res, 404, { error: 'Not found' });
    const removed = collection.splice(itemIndex, 1)[0];
    return sendJSON(res, 200, removed);
  }

  return sendJSON(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Lightweight API server listening on http://localhost:${PORT}`);
});
