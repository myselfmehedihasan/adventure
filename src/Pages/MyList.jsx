// 📂 src/Pages/MyList.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import UpdateSpotModal from "../Components/UpdateSpotModal.jsx";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [mySpots, setMySpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch spots for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myspots?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMySpots(data))
        .catch((err) => console.error("Error fetching spots:", err));
    }
  }, [user]);

  // Delete spot
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the spot from your list!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/myspots/${id}`, { method: "DELETE" })
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

  // Open modal to update
  const handleUpdateClick = (spot) => {
    setSelectedSpot(spot);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSpot(null);
  };

  const handleSpotUpdate = (updatedSpot) => {
    setMySpots((prev) =>
      prev.map((spot) => (spot._id === updatedSpot._id ? updatedSpot : spot))
    );
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
        <>
          {/* ---------------- Desktop Table ---------------- */}
          <div className="hidden lg:block overflow-x-auto w-full">
            <table className="table table-zebra w-full min-w-[700px]">
              <thead className="bg-blue-100">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mySpots.map((spot, index) => (
                  <tr
                    key={spot._id}
                    className="group hover:bg-black/20 transition-colors duration-200"
                  >
                    <th>{index + 1}</th>
                    <td>
                      <img
                        src={spot.image}
                        alt={spot.tourists_spot_name}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td>{spot.tourists_spot_name}</td>
                    <td>{spot.location}</td>
                    <td>${spot.average_cost}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => handleUpdateClick(spot)}
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

          {/* ---------------- Mobile Cards ---------------- */}
          <div className="lg:hidden flex flex-col gap-4">
            {mySpots.map((spot, index) => (
              <div
                key={spot._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400 active:bg-gray-100"
                tabIndex={0}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{index + 1}. {spot.tourists_spot_name}</span>
                  <span className="text-gray-500">${spot.average_cost}</span>
                </div>
                <img
                  src={spot.image}
                  alt={spot.tourists_spot_name}
                  className="w-full h-36 object-cover rounded mt-2"
                />
                <p className="text-sm text-gray-600 mt-1">{spot.location}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdateClick(spot)}
                    className="btn btn-sm btn-info text-white flex-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(spot._id)}
                    className="btn btn-sm btn-error text-white flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Update Modal */}
      <UpdateSpotModal
        spot={selectedSpot}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleSpotUpdate}
      />
    </div>
  );
};

export default MyList;
