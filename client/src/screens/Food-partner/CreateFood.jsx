import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [videoName, setVideoName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('name', videoName); // must match backend key
    formData.append('description', description);
    formData.append('video', videoFile);
    axios
      .post(import.meta.env.VITE_BASE_URL + '/api/food', formData, {
        withCredentials: true,
      })
      .then(() => {
        toast.success('Video Uploaded Successfully');
        navigate('/home');
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Upload failed';
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-300 px-4">
      <form
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
          Upload Food Video
        </h2>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Video Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter video name"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            placeholder="Write a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={200}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Video File
          </label>
          <input
            type="file"
            accept="video/*"
            className="w-full text-gray-600"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
