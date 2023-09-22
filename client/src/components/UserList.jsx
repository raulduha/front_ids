import { useEffect, useState } from "react";
import { getAllUsers } from "../api/users.api";
import { UserCard } from "./UserCard";

export function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const res = await getAllUsers()
            setUsers(res.data);
        }
        loadUsers();
    }, [])

    return <div>
        {users.map(user => (
            <UserCard key={user.id} user={user} />
        ))}
        </div>
}
