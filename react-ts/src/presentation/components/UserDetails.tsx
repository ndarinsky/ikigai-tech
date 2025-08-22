import React from "react";

type Props = {
  user?: any;
  loading?: boolean;
  error?: any;
};

export default function UserDetails({ user = null, loading = false, error = null }: Props) {
  if (loading) return <div>Loading user…</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Select a user</div>;
  return (
    <div style={{ border: "1px solid #black", padding: 12 }}>
      <b>User Details</b>
      <div>ID: {user.id}</div>
      <div>Name: {user.name}</div>
      {user.email && <div>Email: {user.email}</div>}
    </div>
  );
}
