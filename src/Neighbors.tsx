import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

function Neighbors() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth(); 

    useEffect(() => {
        if (!auth.isAuthenticated || !auth.user?.access_token) {
            console.error("User not authenticated or token missing");
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch("https://bpjbvyslu5.execute-api.us-east-2.amazonaws.com/users", {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token ?? ''}`, 
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", (error as Error).message);
                setError((error as Error).message);
            }
        };

        fetchUsers();
    }, [auth.isAuthenticated, auth.user?.access_token]);

    return (
        <div>
            <h2>Users</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.firstName} {user.lastName} - {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No users found.</p>
            )}
        </div>
    );
}

export default Neighbors;
