const KEY = "hb_mock_db_v1";

function seed() {
  const exists = localStorage.getItem(KEY);
  if (exists) return JSON.parse(exists);

  const hotels = [
    { id: "h1", name: "Seaside Resort", city: "Galle", address: "Beach Rd 01", description: "Ocean views, breakfast included", images: [] },
    { id: "h2", name: "Hilltop Hotel",  city: "Kandy", address: "Lake View 22", description: "Calm stay near the Temple of the Tooth", images: [] },
  ];

  const roomTypes = [
    { id: "r1", hotelId: "h1", title: "Deluxe Double", pricePerNight: 120, maxGuests: 2, amenities: ["AC", "WiFi"] },
    { id: "r2", hotelId: "h1", title: "Family Suite",  pricePerNight: 200, maxGuests: 4, amenities: ["AC", "WiFi", "Kitchenette"] },
    { id: "r3", hotelId: "h2", title: "Standard",      pricePerNight: 90,  maxGuests: 2, amenities: ["Fan", "WiFi"] },
  ];

  const users = [
    { id: "u1", name: "Demo User", email: "demo@demo.com", password: "demo123" },
  ];

  const bookings = []; // {id,userId,hotelId,roomTypeId,checkIn,checkOut,totalPrice,status}

  const db = { hotels, roomTypes, users, bookings };
  localStorage.setItem(KEY, JSON.stringify(db));
  return db;
}

export function getDB() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : seed();
}

export function saveDB(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}
