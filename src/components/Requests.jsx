import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err?.response?.data);

    }
  }
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return;
  if (request.length === 0) return <h1 className="text-center mt-10">No Requests Found</h1>;
  return (
    <div className="my-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        Connection Request
      </h1>

      {request.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="max-w-2xl mx-auto mb-4 p-5 bg-base-300 rounded-xl flex items-center gap-5 shadow-md hover:shadow-lg transition-shadow">

            <img src={photoUrl} alt={firstName} className="w-20 h-20 rounded-full object-cover border-2 border-base-content/20" />

            <div className="text-left flex-1">
              <h2 className="text-lg font-semibold">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm opacity-70">
                  {age}, {gender}
                </p>
              )}

              {about && (
                <p className="mt-2 text-sm leading-relaxed opacity-90">
                  {about}
                </p>
              )}
            </div>
            <div>
              <button className="btn btn-danger bg-indigo-400 p-5 m-4">Reject</button>
              <button className="btn btn-secondary bg-pink-400 p-5">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests