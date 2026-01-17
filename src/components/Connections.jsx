import axios from 'axios'
import { BASE_URL } from "../utils/constants";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import toast from "react-hot-toast";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections",
        { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to load feed ❌"
      );
    }
  }

  useEffect(() => {
    fetchConnections();
  }, [])

  if (!connections) return;
  if (connections.length === 0) return <h1> No Connections Found</h1>;
  return (
    <div className="my-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        Connections
      </h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
          <div
            key={connection._id}
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
          </div>
        );
      })}
    </div>
  );

}

export default Connections