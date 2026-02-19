import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Broker - Home" },
    { name: "description", content: "Buy, Sell, Find Jobs and Houses easily." },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Broker</h1>
      <p>Your marketplace for Jobs, Houses, and Electronics.</p>

      <div style={{ marginTop: "20px" }}>
        <h3>What you can do:</h3>
        <ul>
          <li>Find Jobs</li>
          <li>Buy or Sell Houses</li>
          <li>Sell Electronics</li>
          <li>Post Your Own Listings</li>
        </ul>
      </div>
    </div>
  );
}
