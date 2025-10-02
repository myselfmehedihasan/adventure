import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateSpotModal = ({ spot, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    image: "",
    tourists_spot_name: "",
    country_Name: "",
    location: "",
    short_description: "",
    average_cost: "",
    seasonality: "",
    travel_time: "",
    totaVisitorsPerYear: "",
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (spot) {
      const initData = {
        image: spot.image || "",
        tourists_spot_name: spot.tourists_spot_name || "",
        country_Name: spot.country_Name || "",
        location: spot.location || "",
        short_description: spot.short_description || "",
        average_cost: spot.average_cost || "",
        seasonality: spot.seasonality || "",
        travel_time: spot.travel_time || "",
        totaVisitorsPerYear: spot.totaVisitorsPerYear || "",
      };
      setFormData(initData);
      setOriginalData(initData);
    }
  }, [spot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/myspots/${spot._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update spot");

      onUpdate({ ...spot, ...formData });
      Swal.fire("Updated!", "Tourist spot updated successfully.", "success");
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update spot", "error");
    }
  };

  // ✅ Check if form has any changes
  const isFormChanged = () => {
    return Object.keys(formData).some((key) => formData[key] !== originalData[key]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Tourist Spot
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Image & Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="text"
              name="tourists_spot_name"
              value={formData.tourists_spot_name}
              onChange={handleChange}
              placeholder="Tourist Spot Name"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Country & Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="country_Name"
              value={formData.country_Name}
              onChange={handleChange}
              placeholder="Country Name"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Short Description */}
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full px-3 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-200"
            rows={3}
            required
          />

          {/* Cost, Travel Time, Visitors */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="average_cost"
              value={formData.average_cost}
              onChange={handleChange}
              placeholder="Average Cost"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="text"
              name="travel_time"
              value={formData.travel_time}
              onChange={handleChange}
              placeholder="Travel Duration (e.g., 7 days)"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="number"
              name="totaVisitorsPerYear"
              value={formData.totaVisitorsPerYear}
              onChange={handleChange}
              placeholder="Total Visitors / Year"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Seasonality */}
          <select
            name="seasonality"
            value={formData.seasonality}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="">Select Season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="autumn">Autumn</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormChanged()}
              className={`px-5 py-2 rounded-md text-white font-semibold ${
                isFormChanged()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSpotModal;
