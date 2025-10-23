# Simple Chat App (Node + Express + Socket.IO)

This is a minimal real-time chat application that works over the local network.
Two or more devices (phones, laptops) on the same Wi‑Fi can open the app in a browser
and exchange messages in real time.

## How it works
- Server: Node.js + Express + socket.io
- Client: single-page HTML/JS (responsive for mobile)
- Messages are stored in server memory (last 200 messages)

## Run locally
1. Install Node.js (v16+ recommended).
2. Open a terminal in this project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Find your computer's local IP address (on Windows: `ipconfig`, on mac/linux: `ifconfig` or `ip addr`).
   Suppose it's `192.168.1.100` and the server shows `http://localhost:3000`.
6. On your phone (connected to the same Wi‑Fi), open browser and visit:
   `http://192.168.1.100:3000`

## Notes
- This is a demo app with in-memory storage (no database).
- For public access, deploy to a hosting service and use HTTPS (or use ngrok for quick external access).
- The server keeps last 200 messages in memory and serves them to new clients.
