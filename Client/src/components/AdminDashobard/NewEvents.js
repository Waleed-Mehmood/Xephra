import React, { useState } from "react";

const NewEvents = ({ setActiveMenu }) => {
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    date: "",
    time: "",
    description: "",
    image: null, // Changed to null for image file storage
    prizePool: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file, // Store the file object instead of URL
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("game", formData.game);
    formDataToSubmit.append("date", formData.date);
    formDataToSubmit.append("time", formData.time);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("prizePool", formData.prizePool);
    formDataToSubmit.append("image", formData.image); // Add image file to form data

    // Call your backend API to save the tournament data (use axios or fetch)
    // Example: axios.post('/api/upload-event', formDataToSubmit);
    
    console.log(formData); // For debugging purpose
    
    // After successful submission, redirect or reset form as needed
    setActiveMenu("postedEvents"); // Example of going back to posted events menu after submission
  };

  return (
    <div className="mx-auto py-16 px-4 bg-[#5C2D33] rounded-lg">
      <h2 className="text-2xl font-bold text-[#b6a99a] mb-6">Create New Tournament</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Tournament Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Game</label>
          <input
            type="text"
            name="game"
            value={formData.game}
            onChange={handleChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Image Upload</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#b6a99a]">Prize Pool</label>
          <input
            type="text"
            name="prizePool"
            value={formData.prizePool}
            onChange={handleChange}
            className="p-2 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#69363f] text-white px-6 py-2 rounded-md hover:bg-[#8f404f] transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default NewEvents;
