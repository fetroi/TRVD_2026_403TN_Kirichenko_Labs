import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const getPlayers = async (token) => {
  const response = await axios.get(`${API_URL}/players`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePlayerStatus = async (token, playerId, status) => {
  const response = await axios.patch(`${API_URL}/players/${playerId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};