import io from 'socket.io-client';

class WebSocket {
  #socket;

  constructor() {

    // Check if an instance already exists
    if (!WebSocket.instance) {
        
      // Initialize the socket connection
      this.#socket = io.connect('http://localhost:3001');

      // Handle connection events
      this.#socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      this.#socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      this.#socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
      });

      // Cache the instance
      WebSocket.instance = this;
    }

    // Return the cached instance
    return WebSocket.instance;
  }

  // Method to get the socket instance
  getSocket() {
    return this.#socket;
  }

  // Method to emit events
  emit(event, data) {
    this.#socket.emit(event, data);
  }

  // Method to listen for events
  on(event, callback) {
    this.#socket.on(event, callback);
  }

  // Method to remove event listeners
  off(event, callback) {
    this.#socket.off(event, callback);
  }
}

// Create a singleton instance
const socketInstance = new WebSocket();

// Freeze the instance to prevent modifications
Object.freeze(socketInstance);

export default socketInstance;
