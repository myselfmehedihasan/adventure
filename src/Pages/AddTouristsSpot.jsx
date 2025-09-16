import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Globe, Camera, DollarSign, Calendar, Clock, Users, Mail, User } from "lucide-react";
import { AuthContext } from "../providers/AuthProviders";

const AddTouristsSpot = () => {
  // Simulated user data - replace with actual AuthContext
  const { user } = useContext(AuthContext) || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Simulate API call with setTimeout
    setTimeout(() => {
      alert("Tourist spot added successfully! ✅");
      reset();
    }, 1000);
    
    // Uncomment for actual implementation:
    fetch("http://localhost:5000/addtouristspot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Added successfully! ✅");
        reset();
      })
      .catch((err) => {
        alert(`Error: ${err}`);
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
    rows
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500" />
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required, min })}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
          rows={rows}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
      ) : type === 'select' ? (
        <select
          {...register(name, { required })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white"
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
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {prefix}
            </span>
          )}
          <input
            type={type}
            {...register(name, { required, min })}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 ${
              prefix ? 'pl-16' : ''
            } ${suffix ? 'pr-16' : ''} ${readOnly ? 'bg-gray-50' : ''}`}
            readOnly={readOnly}
            defaultValue={defaultValue}
            min={min}
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {suffix}
            </span>
          )}
        </div>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <span className="w-4 h-4">⚠️</span>
          {name === 'travel_time' ? 'Travel time must be at least 1 day' : `${label} is required`}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 ">
      <div className="max-w-2xl mx-auto  mt-5">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
            Add Tourist Spot
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Share your favorite travel destination with the world
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl -mt-20 p-8 md:p-10 ">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Basic Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
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
                placeholder="example.com/image.jpg"
                prefix="https://"
              />

              <InputField
                label="Description"
                icon={MapPin}
                name="short_description"
                type="textarea"
                placeholder="Describe what makes this place special..."
                rows={4}
              />
            </div>

            {/* Travel Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Travel Details
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
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

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
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

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Add Tourist Spot
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Help others discover amazing places around the world 🌍
        </div>
      </div>
    </div>
  );
};

export default AddTouristsSpot;