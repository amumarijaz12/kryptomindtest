import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const FileUploadForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const maxFiles = 5;
  const maxSize = 10 * 1024 * 1024; // 10MB

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify({ ...values, uploadedFiles }, null, 2));
      navigate("/");
    },
  });

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (uploadedFiles.length + acceptedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    const validFiles = acceptedFiles.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type) &&
        file.size <= maxSize
    );

    if (rejectedFiles.length > 0) {
      alert(
        `Some files are invalid. Make sure the files are in .jpg, .png, or .svg format and are less than 10MB.`
      );
    }

    setUploadedFiles([...uploadedFiles, ...validFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".jpg,.png,.svg",
    maxSize,
    multiple: true,
  });

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-4 min-w-[500px] mx-auto shadow-2xl rounded-md border border-gray-400">
        <form
          onSubmit={formik.handleSubmit}
          className="container max-w-[550px]  shadow-white rounded-lg "
        >
          <div>
            <label htmlFor="name" className="block font-medium">
              Name <span className="">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter your Name"
              className={`w-full border p-2 rounded ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="pt-2">
            <label htmlFor="email" className="block font-medium">
              Email <span className="">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full border p-2 rounded ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="pt-2">
            <label htmlFor="phone" className="block font-medium">
              Phone <span className="">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="Enter your PhoneNumber"
              className={`w-full border p-2 rounded ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            ) : null}
          </div>
          <div className="mt-4">
            <label className="block text-xl font-medium">Media Upload</label>
            <p>
              Add your documents here, and you can upload up to 5 files max.
            </p>
            <div
              {...getRootProps()}
              className="border-dashed border-2 mt-[16px] flex flex-col items-center justify-center border-blue-400 p-4 rounded cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <img src="/backup.svg" className=" " />
              <p>
                Drag your file(s) here or{" "}
                <span className="text-blue-800 font-bold">browse</span>
              </p>
              <p>Max 10MB files are allowed</p>
            </div>
            <p className="text-sm mt-2">
              Only .jpg, .png, and .svg files are allowed.
            </p>
            <ul className="mt-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full mt-[16px] text-center text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUploadForm;
