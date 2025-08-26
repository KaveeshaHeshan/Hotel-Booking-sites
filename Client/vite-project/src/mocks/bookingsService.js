import { getDB, saveDB } from "./db.js";

export async function listMine(userId) {
  const { bookings, hotels, roomTypes } = getDB();
  const mine = bookings
    .filter(b => b.userId === userId)
    .map(b => ({
      ...b,
      hotel: hotels.find(h => h.id === b.hotelId),
      roomType: roomTypes.find(r => r.id === b.roomTypeId),
    }));
  await new Promise(r => setTimeout(r, 150));
  return mine;
}

export async function create({ userId, hotelId, roomTypeId, checkIn, checkOut }) {
  const db = getDB();
  const room = db.roomTypes.find(r => r.id === roomTypeId);
  if (!room) throw new Error("Room type not found");

  const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)));
  const totalPrice = nights * room.pricePerNight;

  const booking = {
    id: "b" + Math.random().toString(36).slice(2, 8),
    userId, hotelId, roomTypeId, checkIn, checkOut, totalPrice, status: "CONFIRMED",
  };
  db.bookings.push(booking);
  saveDB(db);
  await new Promise(r => setTimeout(r, 150));
  return booking;
}

export async function cancel(id, userId) {
  const db = getDB();
  const idx = db.bookings.findIndex(b => b.id === id && b.userId === userId);
  if (idx === -1) throw new Error("Booking not found");
  db.bookings.splice(idx, 1);
  saveDB(db);
  await new Promise(r => setTimeout(r, 120));
  return true;
}
