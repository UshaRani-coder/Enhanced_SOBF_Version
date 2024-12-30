import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAdmin, getAdmins, removeAdmin, updateAdmin } from "../Reducers/adminSlice";
import { toast } from "react-toast";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { admins, status } = useSelector((state) => state.admins);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAdmins());
    }
  }, [status, dispatch]);

  const openModal = (admin = null) => {
    setIsModalOpen(true);
    if (admin) {
      setIsEditing(true);
      setFormData(admin);
    } else {
      setIsEditing(false);
      setFormData({ username: "", email: "", phone: "" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ username: "", email: "", phone: "" });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAdmins());
      toast.success("Successfully added admins data .")
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone } = formData;

    // Validation logic
    if (!username.trim()) {
      alert("Please provide a valid username.");
      return;
    }
    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }
    if (!phone.trim() || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert("Please provide a valid 10-digit phone number.");
      return;
    }

    // Handle editing or adding admin
    if (isEditing) {
      const { id, ...adminData } = formData;
      dispatch(updateAdmin({ id: formData._id, adminData }));
      toast.success("Successfully updated admins data .")
    } else {
      dispatch(addAdmin(formData)); // For adding new admins
      toast.success("Successfully added admins data .")
    }

    closeModal();
  };


  return (
    <div>
      <div className="flex justify-between items-center w-full py-6 px-14 pb-4">
        <h3 className="text-md md:text-2xl font-semibold">List of all the admins</h3>
        <button
          className="px-4 py-1 md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => openModal()}
        >
          Add admin
        </button>
      </div>

      {/* Admin Table */}
      <table className="bg-white border border-gray-300 mt-[24px] w-[98%] items-center">
        <thead>
          <tr className="border-b bg-gray-200 text-[15px] md:text-[16px] lg:text-[20px]">
            <th className="py-2 px-2 md:px-4 text-left">Name</th>
            <th className="py-2 px-2 md:px-4 text-left">Email</th>
            <th className="py-2 px-2 md:px-4 text-left">Phone</th>
            <th className="py-2 px-2 md:px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin) => (
            
            <tr key={admin._id} className="border-b text-[10px] md:text-[12px] lg:text-[16px]">
              <td className="py-2 px-2 md:px-4 truncate">{admin.username}</td>
              <td className="py-2 px-2 md:px-4 truncate">{admin.email}</td>
              <td className="py-2 px-2 md:px-4">{admin.phone}</td>
              <td className="py-2 px-2 md:px-4 text-center">
                <div className="buttons flex gap-x-4 justify-center">
                  <button
                    className="text-green-700  hover:underline"
                    onClick={() => openModal(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => dispatch(removeAdmin(admin._id))} // Pass the admin ID
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Admin" : "Add Admin"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg "
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  bg-blue-600 text-white rounded-lg"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
