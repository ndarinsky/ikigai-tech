import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";

type Props = {
  listUsers?: () => Promise<any[]>;
  getUser?: (id: any) => Promise<any>;
  createUser?: (data: any) => Promise<any>;
};

export default function UsersPage({ listUsers, getUser, createUser }: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [listError, setListError] = useState<any>(null);

  const [selectedId, setSelectedId] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<any>(null);

  const loadUsers = async () => {
    if (!listUsers) return;
    setListLoading(true);
    setListError(null);
    try {
      const data = await listUsers();
      setUsers(data || []);
    } catch (e: any) {
      setListError(e?.message || String(e));
    } finally {
      setListLoading(false);
    }
  };

  const loadDetails = async (id: any) => {
    setSelectedId(id);
    if (!getUser) return;
    setDetails(null);
    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const u = await getUser(id);
      setDetails(u || null);
    } catch (e: any) {
      setDetailsError(e?.message || String(e));
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    if (!createUser) return;
    try {
      await createUser(data);
      await loadUsers();
    } catch {}
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: 12}}>
      <UserForm onCreate={handleCreate} onNameDebounced={() => {}} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <UserList
          users={users}
          onSelect={loadDetails}
          onReload={loadUsers}
          loading={listLoading}
          error={listError}
        />
        <UserDetails user={details} loading={detailsLoading} error={detailsError} />
      </div>
    </div>
  );
}
