import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProviders";

const AddTouristsSpot = () => {
  const { user } = useContext(AuthContext) || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    fetch("http://localhost:5000/tourists-spots", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Tourist Spot Added Successfully!");
        reset();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 shadow-md rounded-xl mt-15">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add Tourists Spot
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Image URL */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Image URL</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              https://
            </span>
            <input
              type="text"
              placeholder="example.com/image.jpg"
              {...register("image", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
              autoComplete="off"
            />
          </div>
        </fieldset>

        {/* Tourist Spot Name */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Tourist Spot Name</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              🏞️
            </span>
            <input
              type="text"
              placeholder="Eiffel Tower"
              {...register("tourists_spot_name", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
          </div>
        </fieldset>

        {/* Country Name */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Country Name</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              🌍
            </span>
            <input
              type="text"
              placeholder="France"
              {...register("country_Name", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
          </div>
        </fieldset>

        {/* Location */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Location</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              📍
            </span>
            <input
              type="text"
              placeholder="Paris"
              {...register("location", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
          </div>
        </fieldset>

        {/* Short Description */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            placeholder="A famous landmark visited by millions every year."
            {...register("short_description", { required: true })}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            rows="3"
          />
        </fieldset>

        {/* Average Cost */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Average Cost</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              $
            </span>
            <input
              type="number"
              placeholder="500"
              {...register("average_cost", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
          </div>
        </fieldset>

        {/* Seasonality */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Best Season</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              ☀️
            </span>
            <select
              {...register("seasonality", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            >
              <option value="">Select Season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="autumn">Autumn</option>
            </select>
          </div>
        </fieldset>

        {/* Travel Time */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Travel Time</label>
          <div className="flex">
            <input
              type="number"
              placeholder="7"
              {...register("travel_time", { required: true })}
              className="flex flex-1 border rounded-l-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
            <span className="flex items-center px-3 rounded-r-md bg-gray-200">
              days
            </span>
          </div>
        </fieldset>

        {/* Total Visitors */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">
            Total Visitors Per Year
          </label>
          <div className="flex">
            <input
              type="number"
              placeholder="10000"
              {...register("totaVisitorsPerYear", { required: true })}
              className="flex flex-1 border rounded-l-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
            />
            <span className="flex items-center px-3 rounded-r-md bg-gray-200">
              /year
            </span>
          </div>
        </fieldset>

        {/* User Email */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Your Email</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              📧
            </span>
            <input
              type="email"
              defaultValue={user?.email}
              {...register("user_email", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
              readOnly={!!user?.email}
            />
          </div>
        </fieldset>

        {/* User Name */}
        <fieldset className="w-full space-y-1">
          <label className="block text-sm font-medium">Your Name</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-md bg-gray-200">
              👤
            </span>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("user_name", { required: true })}
              className="flex flex-1 border rounded-r-md p-2 focus:ring focus:ring-blue-200 border-gray-300"
              readOnly={!!user?.displayName}
            />
          </div>
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTouristsSpot;
