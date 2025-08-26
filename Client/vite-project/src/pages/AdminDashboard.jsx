import { useEffect, useState } from "react";
import { getDB, saveDB } from "../mocks/db.js";


export default function AdminDashboard() {
  const [db, setDb] = useState(getDB());
  const [hotel, setHotel] = useState({ name:"", city:"", address:"", description:"" });
  const [room, setRoom] = useState({ hotelId:"", title:"", pricePerNight:100, maxGuests:2, amenities:"AC,WiFi" });

  useEffect(() => setDb(getDB()), []);

  const addHotel = (e) => {
    e.preventDefault();
    const data = getDB();
    const id = "h" + Math.random().toString(36).slice(2,8);
    data.hotels.push({ id, ...hotel, images: [] });
    saveDB(data);
    setDb(data);
    setHotel({ name:"", city:"", address:"", description:"" });
  };

  const addRoom = (e) => {
    e.preventDefault();
    const data = getDB();
    const id = "r" + Math.random().toString(36).slice(2,8);
    const amenities = room.amenities.split(",").map(s => s.trim()).filter(Boolean);
    data.roomTypes.push({ id, hotelId: room.hotelId, title: room.title, pricePerNight: Number(room.pricePerNight), maxGuests: Number(room.maxGuests), amenities });
    saveDB(data);
    setDb(data);
    setRoom({ hotelId:"", title:"", pricePerNight:100, maxGuests:2, amenities:"AC,WiFi" });
  };

  return (
    <div>
      <h1 style={{ fontWeight:800, fontSize:22 }}>Admin</h1>

      <section style={{ marginTop:16 }}>
        <h2 style={{ fontWeight:700 }}>Add Hotel</h2>
        <form onSubmit={addHotel} style={{ display:"grid", gap:8, maxWidth: 520 }}>
          <input placeholder="Name" value={hotel.name} onChange={(e)=>setHotel({ ...hotel, name:e.target.value })} />
          <input placeholder="City" value={hotel.city} onChange={(e)=>setHotel({ ...hotel, city:e.target.value })} />
          <input placeholder="Address" value={hotel.address} onChange={(e)=>setHotel({ ...hotel, address:e.target.value })} />
          <textarea placeholder="Description" value={hotel.description} onChange={(e)=>setHotel({ ...hotel, description:e.target.value })} />
          <button style={{ padding:"6px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>Save Hotel</button>
        </form>
      </section>

      <section style={{ marginTop:24 }}>
        <h2 style={{ fontWeight:700 }}>Add Room Type</h2>
        <form onSubmit={addRoom} style={{ display:"grid", gap:8, maxWidth: 520 }}>
          <select value={room.hotelId} onChange={(e)=>setRoom({ ...room, hotelId:e.target.value })}>
            <option value="">Select hotel</option>
            {db.hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          <input placeholder="Title (e.g., Deluxe Double)" value={room.title} onChange={(e)=>setRoom({ ...room, title:e.target.value })} />
          <input type="number" placeholder="Price per night" value={room.pricePerNight} onChange={(e)=>setRoom({ ...room, pricePerNight:e.target.value })} />
          <input type="number" placeholder="Max guests" value={room.maxGuests} onChange={(e)=>setRoom({ ...room, maxGuests:e.target.value })} />
          <input placeholder="Amenities (comma separated)" value={room.amenities} onChange={(e)=>setRoom({ ...room, amenities:e.target.value })} />
          <button style={{ padding:"6px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>Save Room Type</button>
        </form>
      </section>

      <section style={{ marginTop:24 }}>
        <h2 style={{ fontWeight:700 }}>Current Hotels</h2>
        <ul>
          {db.hotels.map(h => (
            <li key={h.id}>{h.name} — {h.city}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
