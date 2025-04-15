import { useState } from 'react';

export default function RideSelector({ dummyData, onSelectDate }) {
  const [showMenu, setShowMenu] = useState(false);

  const sortedData = [...dummyData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="absolute top-4 right-4 z-[9999]">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        Recent Trips
      </button>

      {showMenu && (
        <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg w-48 p-3 max-h-60 overflow-y-auto">
          <ul className="space-y-2">
            {sortedData.map((ride) => (
              <li
                key={ride.date}
                onClick={() => {
                  onSelectDate(ride.date);
                  setShowMenu(false);
                }}
                className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer rounded"
              >
                {ride.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}