// 📂 src/Pages/AddTouristsSpot.jsx
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Globe,
  Camera,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Mail,
  User,
} from "lucide-react";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const AddTouristsSpot = () => {
  const { user } = useContext(AuthContext) || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.user_email = user?.email;
    data.user_name = user?.displayName;

    fetch("http://localhost:5000/addtouristspot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Spot Added Successfully ✅",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: `Failed to add spot: ${err}`,
          icon: "error",
        });
      });
  };

  const InputField = ({
    label,
    icon: Icon,
    type = "text",
    placeholder,
    name,
    required = true,
    prefix,
    suffix,
    readOnly = false,
    defaultValue,
    min,
    rows,
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <Icon className="w-4 h-4 text-gray-500" /> {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name, { required, min })}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition duration-150 resize-none"
          rows={rows}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
      ) : type === "select" ? (
        <select
          {...register(name, { required })}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition duration-150 bg-white"
        >
          <option value="">Select {label}</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="autumn">Autumn</option>
        </select>
      ) : (
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {prefix}
            </span>
          )}
          <input
            type={type}
            {...register(name, { required, min })}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition duration-150 ${
              prefix ? "pl-12" : ""
            } ${suffix ? "pr-12" : ""} ${readOnly ? "bg-gray-50" : ""}`}
            readOnly={readOnly}
            defaultValue={defaultValue}
            min={min}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {suffix}
            </span>
          )}
        </div>
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          ⚠ {name === "travel_time"
            ? "Travel time must be at least 1 day"
            : `${label} is required`}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen mt-5  bg-tr py-8 px-3">
      <div className="max-w-5xl mx-auto mt-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Tourist Spot</h1>
          <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
            Share your favorite travel destination with the world
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Basic Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-1">
              Basic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <InputField
                label="Tourist Spot Name"
                icon={MapPin}
                name="tourists_spot_name"
                placeholder="Eiffel Tower"
              />
              <InputField
                label="Country Name"
                icon={Globe}
                name="country_Name"
                placeholder="France"
              />
            </div>
            <InputField
              label="Location"
              icon={MapPin}
              name="location"
              placeholder="Paris, Île-de-France"
            />
            <InputField
              label="Image URL"
              icon={Camera}
              name="image"
              placeholder="https://example.com/image.jpg"
            />
            <InputField
              label="Description"
              icon={MapPin}
              name="short_description"
              type="textarea"
              placeholder="Describe what makes this place special..."
              rows={3}
            />
          </div>

          {/* Travel Details */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-1">
              Travel Details
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              <InputField
                label="Average Cost"
                icon={DollarSign}
                name="average_cost"
                type="number"
                placeholder="500"
                prefix="$"
              />
              <InputField
                label="Travel Duration"
                icon={Clock}
                name="travel_time"
                type="number"
                placeholder="3"
                suffix="days"
                min={1}
              />
              <InputField
                label="Annual Visitors"
                icon={Users}
                name="totaVisitorsPerYear"
                type="number"
                placeholder="10000"
                suffix="/year"
              />
            </div>
            <InputField
              label="Best Season"
              icon={Calendar}
              name="seasonality"
              type="select"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-1">
              Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              <InputField
                label="Your Name"
                icon={User}
                name="user_name"
                defaultValue={user?.displayName}
                readOnly={!!user?.displayName}
              />
              <InputField
                label="Email Address"
                icon={Mail}
                name="user_email"
                type="email"
                defaultValue={user?.email}
                readOnly={!!user?.email}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Add Tourist Spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTouristsSpot;
