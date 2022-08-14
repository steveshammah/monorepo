import React from 'react';

const Card = ({ person }) => {
  return (
    <div className="p-6  w-102 h-32 mr-1 bg-white rounded-xl shadow-xl flex items-center space-x-5 mb-5">
      <div className="shrink-0">
        <img
          className="block mx-auto h-20 rounded-full sm:mx-0 sm:shrink-0"
          src={person.avatar}
          alt="avatar"
        />
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-gray-900 capitalize">
          {person.username}
        </p>
        <p className="text-sm text-gray-500 text-ellipsis w-36 overflow-hidden">
          {person.email}
        </p>
      </div>
    </div>
  );
};

export default Card;
