"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserSelect() {
  const [users, setUsers] = useState<
    { userId: number; firstName: string; lastName: string }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    function fetchUsers() {
      fetch("http://localhost:3000/api/users", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsers(data);
        });
    }

    fetchUsers();
  }, []);

  return (
    <>
      <Select
        onValueChange={(value) => {
          setSelectedUser(parseInt(value));
          console.log(selectedUser);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {users.map((user) => {
              return (
                <SelectItem key={user.userId} value={user.userId.toString()}>
                  {user.firstName} {user.lastName}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
