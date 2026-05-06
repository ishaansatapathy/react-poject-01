import { useState } from "react";
import "./App.css";

const API_URL = "/api/v1/public/randomusers";

async function getUsers(page, limit) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`${API_URL}?${params}`);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Users fetch nahi ho paaye");
  }

  return data.data;
}

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadUsers(nextPage = page) {
    try {
      setIsLoading(true);
      setError("");

      const result = await getUsers(nextPage, limit);
      setUsers(result.data);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="toolbar">
        <div>
          <p className="eyebrow">FreeAPI</p>
          <h1>Get Users</h1>
        </div>

        <div className="controls">
          <label>
            Limit
            <select
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </label>

          <button type="button" onClick={() => loadUsers(page)} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get users"}
          </button>
        </div>
      </section>

      {error && <p className="error">{error}</p>}

      <section className="user-grid">
        {users.map(user => (
          <article className="user-card" key={user.login.uuid}>
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <div>
              <h2>
                {user.name.first} {user.name.last}
              </h2>
              <p>{user.email}</p>
              <span>{user.location.country}</span>
            </div>
          </article>
        ))}
      </section>

      <nav className="pagination" aria-label="Users pagination">
        <button
          type="button"
          onClick={() => loadUsers(page - 1)}
          disabled={isLoading || page <= 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => loadUsers(page + 1)}
          disabled={isLoading || page >= totalPages}
        >
          Next
        </button>
      </nav>
    </main>
  );
}

export default App;
