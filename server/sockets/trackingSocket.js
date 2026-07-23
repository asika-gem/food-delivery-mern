const trackingSocket = (io) => {
  // Store latest location for each order
  const latestLocations = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join tracking room
    socket.on("joinTracking", ({ orderId }) => {
      if (!orderId) return;

      const roomName = `order_${orderId}`;

      socket.join(roomName);

      console.log(`Socket ${socket.id} joined tracking room: ${roomName}`);

      // Send latest location immediately if available
      const latestLocation = latestLocations.get(orderId);

      if (latestLocation) {
        socket.emit("locationUpdate", latestLocation);

        console.log("Sent latest location to new client:", latestLocation);
      }
    });

    // Rider sends location
    socket.on("riderLocation", ({ orderId, latitude, longitude }) => {
      if (!orderId || latitude == null || longitude == null) {
        return;
      }

      const location = {
        latitude,
        longitude,
      };

      console.log("Rider location:", {
        orderId,
        ...location,
      });

      // Save latest location
      latestLocations.set(orderId, location);

      // Send to everyone in tracking room
      io.to(`order_${orderId}`).emit("locationUpdate", location);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default trackingSocket;
