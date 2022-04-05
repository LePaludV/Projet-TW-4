import { io } from 'socket.io-client';
const ENDPOINT = "http://localhost:3001/";
let socket;

export const initiateSocketConnection = () => {
	socket = io(process.env.ENDPOINT);
	console.log(`Connecting socket...`);
}

export const sendIntineraire = (obj) => {
	socket.emit('Itineraire',obj);
}