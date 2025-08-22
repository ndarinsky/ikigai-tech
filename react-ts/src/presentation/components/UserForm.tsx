import React, { useEffect, useState } from "react";

export function useDebouncedValue(value: number, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

type Props = {
  onCreate?: (data: any) => void;
  onNameDebounced?: (value: any) => void;
};

export default function UserForm({ onCreate, onNameDebounced }: Props) {
  const [name, setName] = useState<any>("abc");
  const [email, setEmail] = useState<any>("abc@test.com");
  const debouncedName = useDebouncedValue(name, 300);

  useEffect(() => {
    if (onNameDebounced) onNameDebounced(debouncedName);
  }, [debouncedName]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onCreate) onCreate({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input value={name} onChange={(e: any) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Create</button>
    </form>
  );
}

