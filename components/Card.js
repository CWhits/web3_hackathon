import React from "react";

function Card({ title, content }) {
  return (
    <div className="p-1 w-64 shadow-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-2xl">
      <div className="block p-6 bg-white  rounded-xl">
        <div className="mt-10">
          <div className="text-3xl font-bold text-gray-900">{title}</div>

          <p className="mt-2 text-2xl text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
