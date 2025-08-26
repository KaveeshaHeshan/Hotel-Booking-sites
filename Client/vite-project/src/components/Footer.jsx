export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        padding: "10px 16px",
        color: "#6b7280",
        fontSize: 14,
      }}
    >
      © {new Date().getFullYear()} HotelBook — Demo UI
    </footer>
  );
}
