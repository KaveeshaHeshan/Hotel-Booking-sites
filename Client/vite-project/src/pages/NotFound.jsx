import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 style={{ fontWeight:800, fontSize:22 }}>404 — Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

