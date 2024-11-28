// import { useSocket } from "@/context/SocketContext";

// const CallNotification = () => {

//     const { ongoingCall } = useSocket();
//     if(!ongoingCall?.isRinging) return;
//     return (<div className="absolute ">

//     </div>)
// }

// export default CallNotification;
"use client";

import { useSocket } from "@/context/SocketContext";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";

const CallNotification = () => {
  const { ongoingCall } = useSocket();

  if (!ongoingCall?.isRinging) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
        {/* Caller Information */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Incoming Call
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-6">
          <img
            src={ongoingCall.participants.caller.profile.imageUrl || "/default-avatar.png"} // Fallback for caller's profile image
            alt={`${ongoingCall.participants.caller.profile.fullName}'s profile`}
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {ongoingCall.participants.caller.profile.fullName || "Unknown Caller"}
            </p>
            <p className="text-sm text-gray-500">is calling you...</p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            className="flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            // onClick={acceptCall}
          >
            <FaPhoneAlt className="mr-2" />
            Accept
          </button>
          <button
            className="flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
            // onClick={declineCall}
          >
            <MdCallEnd className="mr-2" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
