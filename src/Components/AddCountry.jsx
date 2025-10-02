// 📂 src/Pages/AddCountry.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Globe, Camera, MapPin, FileText } from "lucide-react";
import Swal from "sweetalert2";

const AddCountry = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:5000/countries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Country Added Successfully ✅",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: `Failed to add country: ${err}`,
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
    rows,
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <Icon className="w-4 h-4 text-gray-500" /> {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name, { required })}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition duration-150 resize-none"
          rows={rows}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required })}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition duration-150"
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          ⚠ {label} is required
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen mt-5 py-8 px-3">
      <div className="max-w-3xl mx-auto mt-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Country</h1>
          <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
            Add country information to link with tourist spots
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Country Name"
              icon={Globe}
              name="country_Name"
              placeholder="Bangladesh"
            />
            <InputField
              label="Image URL"
              icon={Camera}
              name="image"
              placeholder="example.com/image.jpg"
            />
          </div>

          <InputField
            label="Short Description"
            icon={FileText}
            name="short_description"
            type="textarea"
            rows={3}
            placeholder="Describe the country..."
          />

          <InputField
            label="Capital City"
            icon={MapPin}
            name="capital"
            placeholder="Dhaka"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Add Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
