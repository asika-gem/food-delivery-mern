import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const joinTracking = (orderId) => {
  if (!orderId) return;

  socket.emit("joinTracking", {
    orderId,
  });
};

export const sendRiderLocation = ({ orderId, latitude, longitude }) => {
  if (!orderId || latitude == null || longitude == null) {
    return;
  }

  socket.emit("riderLocation", {
    orderId,
    latitude,
    longitude,
  });
};

export const onLocationUpdate = (callback) => {
  socket.on("locationUpdate", callback);
};

export const removeLocationUpdateListener = (callback) => {
  socket.off("locationUpdate", callback);
};

export default socket;
