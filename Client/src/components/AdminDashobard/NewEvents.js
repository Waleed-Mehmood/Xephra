import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const NewEvents = ({ setActiveMenu, dark }) => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.events);
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    date: "",
    time: "",
    description: "",
    image: null,
    prizePool: "",
    rules: "",
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
      image: file,
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
    formDataToSubmit.append("rules", formData.rules);
    formDataToSubmit.append("image", formData.image);

    dispatch(createEvent(formDataToSubmit));
    setFormData({
      title: "",
      game: "",
      date: "",
      time: "",
      description: "",
      image: null,
      prizePool: "",
      rules: "",
    })

    // setActiveMenu("postedEvents");
  };
  if(loading){
    return <Loading/>
  }

  return (
    <div
      className={`mx-auto py-16 px-4 rounded-lg ${
        dark ? "bg-[#69363F]" : "bg-[#232122]"
      } `}
    >
      <h2 className="text-2xl font-bold text-[#b6a99a] mb-6">
        Create New Tournament
      </h2>
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
          <label className="text-[#b6a99a]">Rules</label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            className="p-2 rounded-md"
            rows="2"
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
          className={`text-white px-6 py-2 rounded-md transition ${
            dark
              ? "bg-[#302B27] hover:bg-[#49413C]"
              : "bg-[#854951] hover:bg-[#A15D66]"
          }`}
        >
          Create Event
        </button>
        {error && <p className="text-red-500">{error?.error}</p>}
      </form>
    </div>
  );
};

export default NewEvents;
