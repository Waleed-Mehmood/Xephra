import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const TournamentCard = ({ _id, title, game, date, time, description, image, prizePool }) => {
  const { loading, error, message } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const imageUrl = `${process.env.REACT_APP_BACKEND}/${image}`;
  return (
    <div className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <Link to={`/eventuser/${_id}`}><img className="w-full h-56 object-cover" src={imageUrl} alt={title} /></Link>
      <div className="p-4">
      <Link to={`/eventuser/${_id}`}><h3 className="text-xl font-bold text-[#b8a896]">{title}</h3></Link>
        <p className="text-[#69363f] font-bold mt-1">{game}</p>
        <p className="text-sm text-gray-400">{date} • {time}</p>
        <p className="text-gray-300 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">{prizePool}</span>
          <button
            disabled={loading} className="bg-[#69363f] text-white px-4 py-2 rounded-md hover:bg-[#8f404f] transition">
            {loading ? "Joining..." : "Join Now"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

const UpcomingEvents = ({dark}) => {
  const dispatch = useDispatch();
  const { loading, error, events, message, event } = useSelector(
      (state) => state.events
    );

  useEffect(() => {
      dispatch(getEvents());
    }, [dispatch , event]);

  if (loading) {
      return <Loading />;
    }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );  

  return (
    <div className={`mx-auto py-16 px-4 rounded-lg ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
      <h2 className="text-3xl font-bold text-center mb-8 text-[#b6a99a] py-6">UPCOMING EVENTS</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.length === 0
          ? "No events posted yet"
          : sortedEvents?.map((tournament, index) => (
              <TournamentCard
                key={index}
                {...tournament}
              />
            ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
