import type { Vehicle, RepairTicket } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

function buildUrl(path: string) {
  if (API_BASE) return `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  return `/api/${path.replace(/^\//, '')}`;
}

export async function fetchDashboardData() {
  const response = await fetch(buildUrl('dashboard'));
  return response.json();
}

export async function fetchShowroomVehicles(): Promise<Vehicle[]> {
  const response = await fetch(buildUrl('vehicles'));
  return response.json();
}

export async function fetchGarageTickets(): Promise<RepairTicket[]> {
  const response = await fetch(buildUrl('repairs'));
  return response.json();
}

export async function fetchInvoices() {
  const response = await fetch(buildUrl('invoices'));
  return response.json();
}
