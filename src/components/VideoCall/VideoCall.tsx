"use client";

import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";

const VideoCall = () => {
    const { localStream } = useSocket();
    const [isMicOn, setIsMicOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);

    useEffect(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            setIsVideoOn(videoTrack.enabled);
            const audioTrack = localStream.getAudioTracks()[0]
            setIsMicOn(audioTrack.enabled);
        }
    }, [localStream]);

    const toggleCamera = useCallback(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            videoTrack.enabled = !videoTrack.enabled;
            setIsVideoOn(videoTrack.enabled);
        }
    }, [localStream]);

    const toggleMic = useCallback(() => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0]
            audioTrack.enabled = !audioTrack.enabled;
            setIsMicOn(audioTrack.enabled);
        }
    }, [localStream]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Video Container */}
            <div className="mb-8">
                {localStream && (
                    <VideoContainer
                        stream={localStream}
                        isLocalStream={true}
                        isOnCall={false}
                    />
                )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg">
                {/* Microphone Toggle */}
                <button
                    onClick={toggleMic}
                    className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-transform transform hover:scale-110"
                    title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                >
                    {isMicOn ? <MdMicOff size={28} /> : <MdMic size={28} />}
                </button>

                {/* End Call Button */}
                <button
                    className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition-transform transform hover:scale-110"
                    onClick={() => { }}
                    title="End Call"
                >
                    End Call
                </button>

                {/* Camera Toggle */}
                <button
                    onClick={toggleCamera}
                    className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-transform transform hover:scale-110"
                    title={isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
                >
                    {isVideoOn ? <MdVideocamOff size={28} /> : <MdVideocam size={28} />}
                </button>
            </div>
        </div>

    );
};

export default VideoCall;
