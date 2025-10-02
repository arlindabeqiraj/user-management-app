import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchUsers,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  deleteUser,
} from "../store/userSlice";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  Users,
} from "lucide-react";
import Modal from "./ui/Modal";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, error, searchTerm, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.users
  );
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSort = (field: "name" | "email" | "company") => {
    if (sortBy === field) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortBy(field));
      dispatch(setSortOrder("asc"));
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUserToDelete({ id: userId, name: user.name });
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      setDeletingUserId(userToDelete.id);
      setShowDeleteModal(false);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(deleteUser(userToDelete.id));
      setDeletingUserId(null);
      setUserToDelete(null);
    }
  };

  const filteredAndSortedUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "email":
          aValue = a.email;
          bValue = b.email;
          break;
        case "company":
          aValue = a.company.name;
          bValue = b.company.name;
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <button onClick={() => dispatch(fetchUsers())} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <div className="w-full sm:w-96">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-field"
            />
            <Search className="search-icon h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      ))}
                    {sortBy !== "name" && (
                      <ArrowUpDown className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {sortBy === "email" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      ))}
                    {sortBy !== "email" && (
                      <ArrowUpDown className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("company")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Company</span>
                    {sortBy === "company" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      ))}
                    {sortBy !== "company" && (
                      <ArrowUpDown className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="user-initials-badge">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.company.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.company.catchPhrase}
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/user/${user.id}`}
                        className="action-btn-icon"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-gray-600 hover:text-gray-700" />
                      </Link>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="action-btn-icon"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4 text-gray-600 hover:text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deletingUserId === user.id}
                        className="action-btn-icon"
                        title="Delete User"
                      >
                        {deletingUserId === user.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding a new user."}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        type="danger"
        isLoading={deletingUserId !== null}
      />
    </div>
  );
};

export default UserList;
