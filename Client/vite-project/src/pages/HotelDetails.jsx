import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getHotel, getRoomsByHotel } from "../mocks/hotelsService";
import { create as createBooking } from "../mocks/bookingsService";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import DateRangePicker from "../components/DateRangePicker";

export default function HotelDetails() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [dates, setDates] = useState({
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
    guests: Number(params.get("guests") || 1),
  });

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ open: false, roomId: null, error: "", success: "" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const h = await getHotel(id);
      const r = await getRoomsByHotel(id);
      setHotel(h);
      setRooms(r);
      setLoading(false);
    })();
  }, [id]);

  const canBook = useMemo(() => {
    return Boolean(dates.checkIn && dates.checkOut && new Date(dates.checkIn) < new Date(dates.checkOut));
  }, [dates]);

  const openBook = (roomId) => {
    setBooking({ open: true, roomId, error: "", success: "" });
  };

  const confirmBook = async () => {
    if (!user) {
      setBooking(b => ({ ...b, error: "Please login first." }));
      return;
    }
    if (!canBook) {
      setBooking(b => ({ ...b, error: "Select valid dates." }));
      return;
    }
    try {
      await createBooking({
        userId: user.id,
        hotelId: id,
        roomTypeId: booking.roomId,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
      });
      setBooking(b => ({ ...b, success: "Booking confirmed!", error: "" }));
    } catch (e) {
      setBooking(b => ({ ...b, error: e.message || "Failed to book." }));
    }
  };

  if (loading) return <div>Loading…</div>;
  if (!hotel) return <div>Hotel not found.</div>;

  return (
    <div>
      <h1 style={{ fontWeight:800, fontSize:22 }}>{hotel.name}</h1>
      <div style={{ color:"#6b7280" }}>{hotel.city} — {hotel.address}</div>
      <p style={{ marginTop:8 }}>{hotel.description}</p>

      <div style={{ marginTop:12 }}>
        <DateRangePicker value={dates} onChange={(v) => {
          const next = { ...dates, ...v };
          setDates(next);
          setParams({ checkIn: next.checkIn || "", checkOut: next.checkOut || "", guests: String(next.guests || 1) });
        }} />
      </div>

      <h2 style={{ marginTop:16, fontWeight:700 }}>Available Rooms</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16, marginTop:8 }}>
        {rooms.map(rt => (
          <div key={rt.id} style={{ border:"1px solid #e5e7eb", borderRadius:12, padding:12 }}>
            <div style={{ fontWeight:700 }}>{rt.title}</div>
            <div style={{ fontSize:14, color:"#6b7280" }}>Max {rt.maxGuests} guests</div>
            <div style={{ marginTop:6 }}>LKR {rt.pricePerNight} / night</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:6 }}>
              {rt.amenities.map(a => <span key={a} style={{ fontSize:12, color:"#374151", border:"1px solid #e5e7eb", borderRadius:20, padding:"2px 8px" }}>{a}</span>)}
            </div>
            <button disabled={!canBook} onClick={()=>openBook(rt.id)} style={{ marginTop:10, padding:"6px 10px", border:"1px solid #e5e7eb", borderRadius:8, background: canBook ? "#111" : "#888", color:"#fff", cursor: canBook ? "pointer" : "not-allowed" }}>
              Book
            </button>
          </div>
        ))}
      </div>

      <Modal open={booking.open} title="Confirm Booking" onClose={()=>setBooking({ open:false, roomId:null, error:"", success:"" })}>
        <p>Check-in: <b>{dates.checkIn || "-"}</b></p>
        <p>Check-out: <b>{dates.checkOut || "-"}</b></p>
        {booking.error && <div style={{ color:"#dc2626", marginTop:8 }}>{booking.error}</div>}
        {booking.success && <div style={{ color:"#16a34a", marginTop:8 }}>{booking.success}</div>}
        {!booking.success && (
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <button onClick={confirmBook} style={{ padding:"6px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>
              Confirm
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
