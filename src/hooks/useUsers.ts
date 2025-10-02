import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  setSearchTerm,
  setSortBy,
  setSortOrder,
} from "../store/userSlice";
import { User } from "../types";

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, searchTerm, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.users
  );

  const loadUsers = useCallback(async () => {
    try {
      await dispatch(fetchUsers()).unwrap();
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }, [dispatch]);

  const createUser = useCallback(
    (userData: Omit<User, "id">) => {
      try {
        dispatch(addUser(userData));
        return { success: true };
      } catch (error) {
        console.error("Failed to create user:", error);
        return { success: false, error: "Failed to create user" };
      }
    },
    [dispatch]
  );

  const editUser = useCallback(
    (user: User) => {
      try {
        dispatch(updateUser(user));
        return { success: true };
      } catch (error) {
        console.error("Failed to update user:", error);
        return { success: false, error: "Failed to update user" };
      }
    },
    [dispatch]
  );

  const removeUser = useCallback(
    (userId: number) => {
      try {
        dispatch(deleteUser(userId));
        return { success: true };
      } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Failed to delete user" };
      }
    },
    [dispatch]
  );

  const searchUsers = useCallback(
    (term: string) => {
      dispatch(setSearchTerm(term));
    },
    [dispatch]
  );

  const sortUsers = useCallback(
    (field: "name" | "email" | "company", order: "asc" | "desc") => {
      dispatch(setSortBy(field));
      dispatch(setSortOrder(order));
    },
    [dispatch]
  );

  const getUserById = useCallback(
    (id: number) => {
      return users.find((user) => user.id === id);
    },
    [users]
  );

  const filteredAndSortedUsers = useCallback(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortBy === "company") {
        aValue = a.company.name;
        bValue = b.company.name;
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [users, searchTerm, sortBy, sortOrder]);

  return {
    users: filteredAndSortedUsers(),
    allUsers: users,
    loading,
    error,
    searchTerm,
    sortBy,
    sortOrder,

    loadUsers,
    createUser,
    editUser,
    removeUser,
    searchUsers,
    sortUsers,
    getUserById,
  };
};
