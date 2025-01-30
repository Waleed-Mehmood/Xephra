import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEventsByUserId } from "../../redux/features/eventsSlice";
import { useDispatch, useSelector } from "react-redux";

const TournamentCard = (tournament) => {
  const event = tournament?.tournament?.eventId;
  return (
    <div className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <Link to={`/eventuser/${event?._id}`}>
        <img
          className="w-full h-56 object-cover"
          src={`${process.env.REACT_APP_BACKEND}/${event?.image}`}
          alt={event?.title}
        />
      </Link>
      <div className="p-4">
        <Link to={`/eventuser/${event?._id}`}>
          <h3 className="text-xl font-bold text-[#b8a896]">{event?.title}</h3>
        </Link>
        <p className="text-[#69363f] font-bold mt-1">{event?.game}</p>
        <p className="text-sm text-gray-400">{event?.date}</p>
        <p className="text-gray-300 mt-2">{event?.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">
            {event?.prizePool}
          </span>
        </div>
      </div>
    </div>
  );
};

const RegisteredEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector((state) => state.events);
  const userId = JSON.parse(localStorage.getItem("user"))?.UserId;

  useEffect(() => {
    if (userId) {
      dispatch(getEventsByUserId(userId)); // Fetch events on component mount
    }
  }, [dispatch, userId]);

  // Render the UI
  if (loading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div
      className={`mx-auto py-16 px-4 rounded-lg min-h-full ${
        dark ? "bg-[#69363F]" : "bg-[#232122]"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-[#b6a99a] py-6">
        REGISTERED EVENTS
      </h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {participants.length ===0 ? <p className="text-red-500 text-xl lg:text-2xl">No Registered Events! </p> : 
        participants.map((tournament, index) => (
          <TournamentCard key={index} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
