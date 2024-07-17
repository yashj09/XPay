import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Header from "./Header";

const Users = ({ balance }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
      );
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header balance={balance} setFilter={setFilter} />
      <main className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {users.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </main>
    </div>
  );
};

export default Users;
