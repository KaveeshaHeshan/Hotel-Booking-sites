import { getDB } from "./db.js";

export async function searchHotels({ city = "", guests = 1 }) {
  const { hotels, roomTypes } = getDB();
  const normalized = city.trim().toLowerCase();
  const filtered = hotels.filter(h => !normalized || h.city.toLowerCase().includes(normalized));

  const withMinPrice = filtered.map(h => {
    const types = roomTypes.filter(rt => rt.hotelId === h.id && rt.maxGuests >= guests);
    const minPrice = types.length ? Math.min(...types.map(t => t.pricePerNight)) : null;
    return { ...h, minPrice };
  });

  await new Promise(r => setTimeout(r, 200));
  return withMinPrice;
}

export async function getHotel(id) {
  const { hotels } = getDB();
  await new Promise(r => setTimeout(r, 150));
  return hotels.find(h => h.id === id) || null;
}

export async function getRoomsByHotel(hotelId) {
  const { roomTypes } = getDB();
  await new Promise(r => setTimeout(r, 150));
  return roomTypes.filter(r => r.hotelId === hotelId);
}
