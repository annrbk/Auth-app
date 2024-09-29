import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const formatDate = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", options).replace(",", "");
};

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      getUsers();
    } else {
      navigate("/login");
    }
  }, []);

  const getUsers = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("https://auth-app-backend-qyzb.onrender.com/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        navigate("/login");
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const currentUserId = sessionStorage.getItem("userId");

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      selectAll: false,
      items: users.map(() => false),
    },
  });

  const onSubmit = (data) => {
    const selectedUsers = users.filter((_, index) => data.items[index]);
    console.log("Selected users:", selectedUsers);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setValue(
      "items",
      users.map(() => isChecked)
    );
  };

  const blockUser = async () => {
    const data = getValues();
    const selectedUsers = users.filter((_, index) => data.items[index]);
    if (selectedUsers.length === 0) return;

    try {
      await Promise.all(
        selectedUsers.map(async (user) => {
          const response = await fetch(
            `https://auth-app-backend-qyzb.onrender.com/api/users/block/${user.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            console.log(`User ${user.id} blocked successfully`);

            if (currentUserId == user.id) {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
              sessionStorage.clear();
              navigate("/login");
            }
          } else {
            console.error(
              `Failed to block user ${user.id}:`,
              response.statusText
            );
          }
        })
      );

      await getUsers();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unBlockUser = async () => {
    const data = getValues();
    const selectedUsers = users.filter((_, index) => data.items[index]);
    if (selectedUsers.length === 0) return;

    try {
      await Promise.all(
        selectedUsers.map((user) =>
          fetch(`https://auth-app-backend-qyzb.onrender.com/api/users/unblock/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
        )
      );
      await getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    const data = getValues();
    const selectedUsers = users.filter((_, index) => data.items[index]);
    if (selectedUsers.length === 0) return;

    try {
      await Promise.all(
        selectedUsers.map((user) =>
          fetch(`https://auth-app-backend-qyzb.onrender.com/api/users/delete/${user.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
        )
      );
      await getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) => !(user.is_blocked && user.id === currentUserId)
  );

  if (!filteredUsers || filteredUsers.length === 0) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <button
              className="btn btn-outline-primary mx-1"
              type="button"
              onClick={blockUser}
            >
              Block
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
            </button>
            <button
              className="btn btn-outline-success mx-1"
              type="button"
              onClick={unBlockUser}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-unlock-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
              </svg>
            </button>
            <button
              className="btn btn-outline-danger mx-1"
              type="button"
              onClick={deleteUser}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </div>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <Controller
                  name="selectAll"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) => {
                        field.onChange(e);
                        handleSelectAll(e);
                      }}
                      checked={field.value}
                    />
                  )}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Last Login</th>
              <th scope="col">Registration date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <Controller
                    name={`items.${index}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...field}
                        checked={field.value || false}
                      />
                    )}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.last_login
                    ? formatDate(user.last_login)
                    : "Not logged in"}
                </td>
                <td>{formatDate(user.registration_date)}</td>
                <td>{user.is_blocked ? "Blocked" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
