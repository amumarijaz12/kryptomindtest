import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";

function EditUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userToEdit = users.find((user) => user.login.uuid === userId);

  const [name, setName] = useState(userToEdit?.name.first || "");
  const [email, setEmail] = useState(userToEdit?.email || "");
  const [phone, setPhone] = useState(userToEdit?.phone || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToEdit) {
      navigate("/UserTable");
    }
  }, [userToEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userToEdit,
      name: { ...userToEdit.name, first: name },
      email,
      phone,
    };

    dispatch(updateUser(updatedUser));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-4 min-w-[500px] mx-auto shadow-2xl rounded-md border border-gray-400">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
