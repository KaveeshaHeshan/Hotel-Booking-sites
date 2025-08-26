import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as bookings from "../mocks/bookingsService";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState({ open:false, id:null });

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const data = await bookings.listMine(user.id);
    setRows(data);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  if (!user) {
    return (
      <div>
        <h1 style={{ fontWeight:800, fontSize:22 }}>My Bookings</h1>
        <p>You need to log in to see your bookings.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  const doCancel = async () => {
    await bookings.cancel(confirm.id, user.id);
    setConfirm({ open:false, id:null });
    load();
  };

  return (
    <div>
      <h1 style={{ fontWeight:800, fontSize:22 }}>My Bookings</h1>
      {loading ? (
        <div>Loading…</div>
      ) : rows.length === 0 ? (
        <div>No bookings yet.</div>
      ) : (
        <div style={{ display:"grid", gap:12 }}>
          {rows.map(b => (
            <div key={b.id} style={{ border:"1px solid #e5e7eb", borderRadius:12, padding:12, display:"grid", gap:6 }}>
              <div style={{ fontWeight:700 }}>{b.hotel?.name}</div>
              <div style={{ color:"#6b7280" }}>{b.roomType?.title} — LKR {b.totalPrice}</div>
              <div>From <b>{b.checkIn}</b> to <b>{b.checkOut}</b></div>
              <div style={{ display:"flex", gap:8 }}>
                <Link to={`/hotel/${b.hotelId}`} style={{ textDecoration:"none", border:"1px solid #e5e7eb", padding:"4px 10px", borderRadius:8 }}>
                  View Hotel
                </Link>
                <button onClick={()=>setConfirm({ open:true, id:b.id })} style={{ border:"1px solid #e5e7eb", padding:"4px 10px", borderRadius:8, background:"#fff" }}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={confirm.open} title="Cancel booking?" onClose={()=>setConfirm({ open:false, id:null })}>
        <div style={{ display:"flex", gap:8, marginTop:8 }}>
          <button onClick={doCancel} style={{ padding:"6px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>
            Yes, cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
