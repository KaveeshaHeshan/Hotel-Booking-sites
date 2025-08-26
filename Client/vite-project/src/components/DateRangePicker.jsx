export default function DateRangePicker({ value, onChange }) {
  const { checkIn, checkOut } = value ?? { checkIn: "", checkOut: "" };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <label>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Check-in</div>
        <input
          type="date"
          value={checkIn || ""}
          onChange={(e) => onChange({ ...value, checkIn: e.target.value })}
        />
      </label>

      <label>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Check-out</div>
        <input
          type="date"
          value={checkOut || ""}
          onChange={(e) => onChange({ ...value, checkOut: e.target.value })}
        />
      </label>
    </div>
  );
}
