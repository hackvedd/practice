import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

// You can use any icon library, here are SVGs for demo
const LikeIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? '#ef4444' : 'none'}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#000000"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.657 0-3.156.832-4 2.09A4.978 4.978 0 0 0 7 3.75c-2.761 0-5 2.015-5 4.5 0 7.28 9 11.25 9 11.25s9-3.97 9-11.25z"
    />
  </svg>
);

const SaveIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? '#6366f1' : 'none'}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#6366f1"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 3H7a2 2 0 0 0-2 2v16l7-5 7 5V5a2 2 0 0 0-2-2z"
    />
  </svg>
);

const Home = () => {
  const [videos, setVideos] = React.useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/food`,
          {
            withCredentials: true,
          },
        );
        console.log(response);
        setVideos(response.data.foodItem);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const toggleLike = async (item) => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/food/like`,
        { foodId: item._id },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res);
        console.log('video liked');
        if (res.data.like) {
          setVideos((prev) =>
            prev.map((v) =>
              v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v,
            ),
          );
        } else {
          setVideos((prev) =>
            prev.map((v) =>
              v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v,
            ),
          );
        }
      })
      .catch((err) => [console.log(err)]);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video) => (
        <div
          key={video._id}
          className="relative h-screen flex items-center justify-center snap-start bg-black"
        >
          {/* Inner container (video box) */}
          <div className="h-[99%] w-[360px] sm:w-[400px] md:w-[430px] lg:w-[480px] relative rounded-xl overflow-hidden shrink-0">
            <video
              src={video.video}
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
              loop
              muted
              autoPlay
              playsInline
            />

            {/* Overlay: Description & Visit Store (bottom left) */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-start pb-16 px-4 z-10">
              <p
                className="text-white text-base font-medium mb-4 w-full text-left"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={video.description}
              >
                {video.description}
              </p>

              <Link
                to={`/food-partner/${video.foodPartner}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition"
                style={{ width: 'fit-content' }}
              >
                Visit Store
              </Link>
            </div>

            {/* Overlay: Like & Save (bottom right) */}
            <div className="absolute top-[65%] right-0 flex flex-col items-center gap-6 pb-24 pr-4 z-10">
              <button
                onClick={() => toggleLike(video)}
                className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
                title="Like"
              >
                <LikeIcon filled={false} />
              </button>
              <span className="text-xs text-white font-semibold -mt-4">
                {video.likeCount}
              </span>
              <button
                className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
                title="Save"
              >
                <SaveIcon filled={false} />
              </button>
              <span className="text-xs text-white font-semibold -mt-4">
                {video.saveCount}
              </span>
            </div>
          </div>
        </div>
      ))}
      <NavigationBar className="absolute left-[49.6%] -translate-x-1/2 bottom-0" />
    </div>
  );
};

export default Home;
