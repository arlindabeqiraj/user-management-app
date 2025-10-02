import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateUser } from "../store/userSlice";
import {
  ArrowLeft,
  Save,
  X,
  User as UserIcon,
  MapPin,
  Building,
} from "lucide-react";

import { User } from "../types";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = users.find((u) => u.id === parseInt(id || "0"));

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        companyName: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street is required";
    }

    if (!formData.suite.trim()) {
      newErrors.suite = "Suite is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "Zip code is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.catchPhrase.trim()) {
      newErrors.catchPhrase = "Catch phrase is required";
    }

    if (!formData.bs.trim()) {
      newErrors.bs = "Business strategy is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...user!,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: {
          ...user!.address,
          street: formData.street,
          suite: formData.suite,
          city: formData.city,
          zipcode: formData.zipcode,
        },
        company: {
          name: formData.companyName,
          catchPhrase: formData.catchPhrase,
          bs: formData.bs,
        },
      };

      dispatch(updateUser(updatedUser));
      navigate(`/user/${user!.id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          User not found
        </h2>
        <p className="text-gray-600 mb-6">
          The user you're trying to edit doesn't exist.
        </p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft className="h-4 w-4 icon" />
          <span>Back</span>
        </button>
      </div>

      <div className="card relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 bg-transparent border-none outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Update the information for {user.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-field ${errors.name ? "error" : ""}`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field ${errors.email ? "error" : ""}`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`input-field ${errors.phone ? "error" : ""}`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`input-field ${errors.website ? "error" : ""}`}
                  placeholder="Enter website URL"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={`input-field ${errors.street ? "error" : ""}`}
                  placeholder="Enter street address"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="suite"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Suite
                </label>
                <input
                  type="text"
                  id="suite"
                  name="suite"
                  value={formData.suite}
                  onChange={handleInputChange}
                  className={`input-field ${errors.suite ? "error" : ""}`}
                  placeholder="Enter suite/apartment"
                />
                {errors.suite && (
                  <p className="text-red-500 text-sm mt-1">{errors.suite}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`input-field ${errors.city ? "error" : ""}`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  className={`input-field ${errors.zipcode ? "error" : ""}`}
                  placeholder="Enter zip code"
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Company Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.companyName ? "error" : ""}`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="catchPhrase"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Catch Phrase
                </label>
                <input
                  type="text"
                  id="catchPhrase"
                  name="catchPhrase"
                  value={formData.catchPhrase}
                  onChange={handleInputChange}
                  className={`input-field ${errors.catchPhrase ? "error" : ""}`}
                  placeholder="Enter company catch phrase"
                />
                {errors.catchPhrase && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.catchPhrase}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="bs"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Business Strategy
                </label>
                <textarea
                  id="bs"
                  name="bs"
                  value={formData.bs}
                  onChange={handleInputChange}
                  rows={3}
                  className={`input-field ${errors.bs ? "error" : ""}`}
                  placeholder="Enter business strategy description"
                />
                {errors.bs && (
                  <p className="text-red-500 text-sm mt-1">{errors.bs}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-12 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-modern-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
