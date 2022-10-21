import { io } from "socket.io-client";

import { endpoints } from "../constants";

export const socket = io(endpoints.chat, { autoConnect: false });
