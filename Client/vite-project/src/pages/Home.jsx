import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DateRangePicker from "../components/DateRangePicker";
import { searchHotels } from "../mocks/hotelsService";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [form, setForm] = useState({
    city: params.get("city") || "",
    guests: Number(params.get("guests") || 1),
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
  });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    setLoading(true);
    try {
      const data = await searchHotels({ city: form.city, guests: form.guests });
      setHotels(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSearch(); // initial list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setParams({
      city: form.city,
      guests: String(form.guests || 1),
      checkIn: form.checkIn || "",
      checkOut: form.checkOut || "",
    });
    runSearch();
  };

  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Find your stay</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:12, gridTemplateColumns:"1fr 1fr 1fr auto", alignItems:"end", maxWidth:900 }}>
        <label>
          <div style={{ fontSize:12, color:"#6b7280" }}>City</div>
          <input value={form.city} onChange={(e)=>setForm({ ...form, city: e.target.value })} placeholder="e.g., Kandy" />
        </label>
        <label>
          <div style={{ fontSize:12, color:"#6b7280" }}>Guests</div>
          <input type="number" min={1} value={form.guests} onChange={(e)=>setForm({ ...form, guests: Number(e.target.value) })} />
        </label>
        <DateRangePicker value={{ checkIn: form.checkIn, checkOut: form.checkOut }} onChange={(v)=>setForm({ ...form, ...v })} />
        <button type="submit" style={{ padding:"8px 14px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>
          Search
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        {loading ? (
          <div>Loading…</div>
        ) : hotels.length === 0 ? (
          <div>No hotels found.</div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
            {hotels.map(h => (
              <div key={h.id} style={{ border:"1px solid #e5e7eb", borderRadius:12, padding:12 }}>
                <div style={{ fontWeight:700 }}>{h.name}</div>
                <div style={{ color:"#6b7280", fontSize:14 }}>{h.city}</div>
                <div style={{ marginTop:6 }}>From {h.minPrice ? `LKR ${h.minPrice}` : "N/A"} / night</div>
                <Link to={`/hotel/${h.id}?checkIn=${form.checkIn}&checkOut=${form.checkOut}&guests=${form.guests}`} style={{ marginTop:10, display:"inline-block", padding:"6px 10px", border:"1px solid #e5e7eb", borderRadius:8, textDecoration:"none" }}>
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
