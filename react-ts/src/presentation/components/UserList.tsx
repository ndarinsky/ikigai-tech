import React from "react";

type Props = {
  users?: any[];
  onSelect?: (id: any) => void;
  onReload?: () => void;
  loading?: boolean;
  error?: any;
};

export default function UserList({
  users = [],
  onSelect,
  onReload,
  loading = false,
  error = null,
}: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
      <div>
        <b>Users</b>
        <button onClick={onReload} disabled={loading}>
          {loading ? "Loading…" : "Reload"}
        </button>
        {error && <span>{error}</span>}
      </div>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            <button onClick={() => onSelect && onSelect(u.id)}>
              {u.name}
              {u.email ? ` (${u.email})` : ""}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
