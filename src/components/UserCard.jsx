import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
             <figure className="relative w-full h-64 overflow-hidden rounded-t-xl">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover object-top"
        />
      </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName} {lastName}
                </h2>

                {age && gender && <p>{age ?? "N/A"}, {gender ?? "N/A"}</p>}

                <p>{about}</p>

                <div className="card-actions justify-center gap-4 my-4">
                    <button className="btn btn-secondry bg-indigo-400 p-4">Ignore</button>
                    <button className="btn btn-primary bg-pink-400 p-2">Intrested</button>

                </div>
            </div>
        </div>
    );
};

export default UserCard;
