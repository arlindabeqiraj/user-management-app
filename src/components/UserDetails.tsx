import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { deleteUser } from "../store/userSlice";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Edit,
  Trash2,
} from "lucide-react";
import Modal from "./ui/Modal";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const user = users.find((u) => u.id === parseInt(id || "0"));

  const handleDeleteUser = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(deleteUser(user!.id));
    navigate("/");
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          User not found
        </h2>
        <p className="text-gray-600 mb-6">
          The user you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate("/")} className="back-btn">
          <ArrowLeft className="h-4 w-4 icon" />
          <span>Back</span>
        </button>
      </div>

      <div className="card relative">
        <div className="action-buttons-container">
          <button
            onClick={() => navigate(`/edit-user/${user.id}`)}
            className="action-btn-icon"
            title="Edit User"
          >
            <Edit className="h-5 w-5 text-gray-600 hover:text-gray-700" />
          </button>
          <button
            onClick={handleDeleteUser}
            disabled={isDeleting}
            className="action-btn-icon"
            title="Delete User"
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
            ) : (
              <Trash2 className="h-5 w-5 text-red-600 hover:text-red-700" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="user-initials-badge mx-auto lg:mx-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-gray-600">{user.company.name}</p>
              <p className="text-sm text-gray-500 italic">
                "{user.company.catchPhrase}"
              </p>
            </div>

            <div className="space-y-6">
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
                  <h3 className="text-base font-semibold text-blue-900">
                    Contact Information
                  </h3>
                  <h3 className="text-base font-semibold text-blue-900">
                    Address
                  </h3>
                </div>
                <div className="h-px bg-gray-300 mt-2"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">Email</p>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">Phone</p>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">Website</p>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">
                      Location
                    </p>
                    <p className="text-gray-900">
                      {user.address.street}
                      <br />
                      {user.address.suite}
                      <br />
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">Company</p>
                    <p className="text-gray-900">{user.company.name}</p>
                    <p className="text-sm text-gray-600">{user.company.bs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UserDetails;
