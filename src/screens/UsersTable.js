import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../store/userSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter(
      (user) => user.login.uuid !== userToDelete.login.uuid
    );

    dispatch({
      type: "user/setUsers",
      payload: updatedUsers,
    });
    setIsModalOpen(false);
    setUserToDelete(null);
  };
  const handleEditClick = (user) => {
    navigate(`/edit/${user.login.uuid}`);
  };

  return (
    <div className="flex justify-center items-center min-h-full w-full p-5">
      <div
        className="p-4 w-[95vw] mx-auto shadow-2xl rounded-md border border-gray-400
      "
      >
        <div className="flex justify-between align-center mb-2">
          <h1 className="text-2xl font-bold">User Table</h1>
          <Link to="/add-user" className="bg-blue-300 p-2 px-5 rounded-md">
            Add User
          </Link>
        </div>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}
        {status === "succeeded" && (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border text-[#1849D6] border-gray-300 px-4 py-2">
                  NAME
                </th>
                <th className="border text-[#1849D6] border-gray-300 py-2 max-w-[100px]">
                  PICTURE
                </th>
                <th className="border text-[#1849D6] border-gray-300 px-4 py-2">
                  EMAIL
                </th>
                <th className="border text-[#1849D6] border-gray-300 px-4 py-2">
                  PHONE
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.login.uuid} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name.first} {user.name.last}
                  </td>
                  <td className="border border-gray-300 max-w-">
                    <img
                      src={user.picture.thumbnail}
                      alt={`${user.name.first} ${user.name.last}`}
                      className="h-[72px] object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 pl-4 text-center">
                    <button
                      className="text-[#1849D6]"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-[#1849D6] ml-4"
                      onClick={() => handleEditClick(user)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {userToDelete?.name.first} {userToDelete?.name.last}
                </strong>
                ?
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTable;
