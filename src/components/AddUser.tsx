import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { addUser } from "../store/userSlice";
import { ArrowLeft, User, MapPin, Building, X } from "lucide-react";
import { UserFormData } from "../types";

const AddUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.users);

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    const isDuplicateEmail = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (isDuplicateEmail) {
      newErrors.email = "Email already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof UserFormData]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof UserFormData] as any),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch(addUser(formData));
    navigate("/");
  };

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
            Fill in the details to create a new user account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`input-field ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`input-field ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="input-field"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="input-field"
                  placeholder="Enter website"
                />
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
                  value={formData.address.street}
                  onChange={(e) =>
                    handleNestedInputChange("address", "street", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter street address"
                />
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
                  value={formData.address.suite}
                  onChange={(e) =>
                    handleNestedInputChange("address", "suite", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter suite/apartment"
                />
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
                  value={formData.address.city}
                  onChange={(e) =>
                    handleNestedInputChange("address", "city", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter city"
                />
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
                  value={formData.address.zipcode}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "address",
                      "zipcode",
                      e.target.value
                    )
                  }
                  className="input-field"
                  placeholder="Enter zip code"
                />
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
                  value={formData.company.name}
                  onChange={(e) =>
                    handleNestedInputChange("company", "name", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter company name"
                />
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
                  value={formData.company.catchPhrase}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "company",
                      "catchPhrase",
                      e.target.value
                    )
                  }
                  className="input-field"
                  placeholder="Enter company catch phrase"
                />
              </div>

              <div>
                <label
                  htmlFor="bs"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Business Strategy
                </label>
                <input
                  type="text"
                  id="bs"
                  value={formData.company.bs}
                  onChange={(e) =>
                    handleNestedInputChange("company", "bs", e.target.value)
                  }
                  className="input-field"
                  placeholder="Enter business strategy"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-12 border-t border-gray-200">
            <button
              type="submit"
              className="btn-modern-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>Create User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
