import React, { useState } from "react";
import axios from "axios"; // ✅ FIX 1
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailId, setEmailID] = useState(user.emailId);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          emailId, 
          age,
          gender,
          photoUrl,
          about,
        },
        {
          withCredentials: true, 
        }
      );
      console.log(res.data);
      
      dispatch(addUser(res.data));


      toast.success("Profile updated successfully 🎉");
    } catch (err) {
        console.log(err);
        
      toast.error(
      err?.response?.data?.message || "Failed to update profile ❌"
    );
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen overflow-y-auto py-10 gap-10 flex-wrap">  
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-[28rem] shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <label className="label"><span className="label-text">First Name:</span></label>
            <input className="input input-bordered w-full" value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />

            <label className="label"><span className="label-text">Last Name:</span></label>
            <input className="input input-bordered w-full" value={lastName}
              onChange={(e) => setLastName(e.target.value)} />

            <label className="label"><span className="label-text">Email:</span></label>
            <input type="email" className="input input-bordered w-full" value={emailId}
              onChange={(e) => setEmailID(e.target.value)} />

            <label className="label"><span className="label-text">Age:</span></label>
            <input type="number" className="input input-bordered w-full" value={age}
              onChange={(e) => setAge(e.target.value)} />

            <label className="label"><span className="label-text">Gender:</span></label>
            <input className="input input-bordered w-full" value={gender}
              onChange={(e) => setGender(e.target.value)} />

            <label className="label"><span className="label-text">Photo URL:</span></label>
            <input className="input input-bordered w-full" value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)} />

            <label className="label"><span className="label-text">About:</span></label>
            <input className="input input-bordered w-full" value={about}
              onChange={(e) => setAbout(e.target.value)} />

            <div className="card-actions justify-center mt-6">
              <button
                className="btn btn-primary w-full"
                onClick={saveProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={ { firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about}} />
    </div>
  );
};

export default EditProfile;
