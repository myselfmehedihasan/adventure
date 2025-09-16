// 📂 src/Pages/MyList.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [mySpots, setMySpots] = useState([]);

  // ✅ Fetch only logged-in user’s spots
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myspots?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMySpots(data))
        .catch((err) => console.error("Error fetching spots:", err));
    }
  }, [user]);

  // ✅ Delete spot
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the spot from your list!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/myspots/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Spot removed successfully.", "success");
              setMySpots(mySpots.filter((spot) => spot._id !== id));
            }
          });
      }
    });
  };

  // ✅ Update spot (navigate or modal → for now console log)
  const handleUpdate = (id) => {
    Swal.fire("Update", "Redirect to update form (to be implemented).", "info");
    console.log("Update spot with id:", id);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        My Tourist Spots List
      </h2>

      {mySpots.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any tourist spots yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mySpots.map((spot) => (
                <tr key={spot._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={spot.image}
                      alt={spot.tourists_spot_name}
                      className="h-16 w-24 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">
                    {spot.tourists_spot_name}
                  </td>
                  <td className="p-3">{spot.location}</td>
                  <td className="p-3">${spot.average_cost}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(spot._id)}
                      className="btn btn-sm btn-info text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(spot._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyList;
