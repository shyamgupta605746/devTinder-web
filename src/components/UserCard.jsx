import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt={`${firstName}`}
                    className="w-full h-64 object-cover"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title">
                    {firstName} {lastName}
                </h2>

                <p>{age ?? "N/A"}, {gender ?? "Male"}</p>

                <p>{about}</p>

                <div className="card-actions justify-center gap-4 my-4">
                    <button className="btn btn-secondry p-4">Ignore</button>
                    <button className="btn btn-primary p-2">Intrested</button>

                </div>
            </div>
        </div>
    );
};

export default UserCard;
