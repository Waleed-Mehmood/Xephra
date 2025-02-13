import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostedTournaments } from "../../redux/features/eventsSlice";
import Loading from "../../utils/Loading/Loading";

const CompletedEvents = ({ dark }) => {
  const dispatch = useDispatch();
  const { hostedEvents, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchHostedTournaments());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const TournamentCard = ({ _id, title, game, date, time, description, image, prizePool }) => {
    return (
      <Link
        to={`/eventadmin/${_id}`}
        className="bg-[#202938] rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl block"
      >
        <img className="w-full h-56 object-cover" src={`${process.env.REACT_APP_BACKEND}/${image}`} alt={title} />
        <div className="p-4">
          <h3 className="text-xl font-bold text-[#b8a896]">{title}</h3>
          <p className="text-[#69363f] font-bold mt-1">{game}</p>
          <p className="text-sm text-gray-400">{date} • {time}</p>
          <p className="text-gray-300 mt-2">{description}</p>
          <p className="text-lg font-semibold text-[#FFD700] mt-2">Prize Pool: {prizePool}</p>

          {/* User Ranking Button */}
          <Link
            to={`/tournamentrankings/${_id}`}
            className="mt-4 inline-block bg-[#69363F] text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:bg-[#894b5c] hover:scale-105"
          >
            Users Ranking
          </Link>
        </div>
      </Link>
    );
  };

  return (
    <div className={`mx-auto py-10 px-4 rounded-lg ${dark ? "bg-[#69363F]" : "bg-[#232122]"}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#b6a99a]">Completed Events</h2>
      </div>

      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hostedEvents.map((tournament) => (
          <TournamentCard key={tournament._id} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default CompletedEvents;
