import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, onNext }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));

      // 🔥 move to next user
      onNext();
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-md">
      <figure className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && <p>{age}, {gender}</p>}
        {about && <p>{about}</p>}

        <div className="card-actions justify-center gap-4 my-4">
          <button
            className="btn bg-indigo-400 p-5"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>

          <button
            className="btn bg-pink-400 p-4"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
