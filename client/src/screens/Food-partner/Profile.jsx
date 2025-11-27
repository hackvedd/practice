import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const dummy = {
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  _id: '1',
  name: 'John Doe',
  address: '123 Main St, Springfield',
  email: 'john@example.com',
  totalCustomers: 1200,
  videos: [
    {
      _id: 1,
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      _id: 2,
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      _id: 2,
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
    // Add more videos as needed
  ],
};

const formatCustomers = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export default function Profile() {
  const [profile, setProfile] = React.useState(dummy);
  const id = useParams().profile;

  useEffect(() => {
    // Fetch profile data or perform any setup actions here
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.foodPartner);
        setProfile(res.data.foodPartner);
      })
      .catch(() => {
        console.log('Error fetching profile data');
      });
  }, [id]);

  return (
    <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto py-6 px-2 sm:px-4">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
        <img
          src={profile.photo}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-indigo-500"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {profile.address}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">{profile.email}</p>
          <p className="text-indigo-600 font-semibold mt-2 text-sm sm:text-base">
            Total Customers Served: {formatCustomers(profile.totalCustomers)}
          </p>
        </div>
      </div>

      {/* Videos Section */}
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Videos</h3>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {profile.videos.map((vid) => (
          <div
            key={vid._id}
            className="relative group rounded-lg overflow-hidden bg-black"
          >
            <video
              src={vid.video}
              poster={vid.thumbnail}
              className="w-full aspect-[9/16] object-cover"
              controls={false}
              muted
              loop
              preload="metadata"
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
