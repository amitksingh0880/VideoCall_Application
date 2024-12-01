// import { useSocket } from "@/context/SocketContext";

// const CallNotification = () => {

//     const { ongoingCall } = useSocket();
//     if(!ongoingCall?.isRinging) return;
//     return (<div className="absolute ">

//     </div>)
// }

// export default CallNotification;
"use client";

import { useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";

const CallNotification = () => {
  const { ongoingCall, handleAcceptCall, handleDeclineCall } = useSocket();
  const [callDeclined, setCallDeclined] = useState(false);

  const declineCall = () => {
    setCallDeclined(true); // Show "Call Declined" message
    handleDeclineCall({
      ongoingCall: ongoingCall ?? undefined, // Safely handle null or undefined
      isEmitHangup: true,
    });

    // Hide message after a short delay (optional)
    setTimeout(() => {
      setCallDeclined(false);
    }, 3000); // 3 seconds
  };

  // If no ongoing call and no declined message, return null
  if (!ongoingCall?.isRinging && !callDeclined) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      {callDeclined ? (
        // Display "Call Declined" Message
        <div className="bg-white p-4 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-xl font-bold text-red-600">Call Declined</h2>
        </div>
      ) : (
        // Show Incoming Call Notification
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Incoming Call</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img
              src={
                ongoingCall?.participants.caller.profile.imageUrl ||
                "/default-avatar.png"
              }
              alt={`${
                ongoingCall?.participants.caller.profile.fullName || "Unknown"
              }'s profile`}
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {ongoingCall?.participants.caller.profile.fullName ||
                  "Unknown Caller"}
              </p>
              <p className="text-sm text-gray-500">is calling you...</p>
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              className="flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
              onClick={() => ongoingCall && handleAcceptCall(ongoingCall)}
            >
              <FaPhoneAlt className="mr-2" />
              Accept
            </button>
            <button
              className="flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
              onClick={declineCall}
            >
              <MdCallEnd className="mr-2" />
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallNotification;
