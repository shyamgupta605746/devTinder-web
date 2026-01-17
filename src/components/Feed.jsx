import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import toast from "react-hot-toast";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    try {
      if (feed.length > 0) return;

      const res = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );

      dispatch(addFeed(res.data));
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to load feed ❌"
      );
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleNextUser = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (!feed || feed.length === 0) {
    return <h1 className="text-center mt-10">No users found</h1>;
  }

  if (currentIndex >= feed.length) {
    return <h1 className="text-center mt-10">No more users 🎉</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard
        user={feed[currentIndex]}
        onNext={handleNextUser}
      />
    </div>
  );
};

export default Feed;
