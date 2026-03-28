import React, { useEffect, useState } from 'react';
import { getPlayers } from '../services/playerService';
import { useAuth } from '../context/AuthContext';

const TeamManagement = () => {
  const [players, setPlayers] = useState([]);
  const { session } = useAuth();

  useEffect(() => {
    if (session?.access_token) {
      getPlayers(session.access_token).then(setPlayers);
    }
  }, [session]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Управління складом команди</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {players.map(player => (
          <div key={player.id} style={cardStyle}>
            <div style={avatarPlaceholder}>{player.number}</div>
            <h3>{player.profiles?.full_name}</h3>
            <p><strong>Позиція:</strong> {player.position}</p>
            <p>
              <strong>Статус:</strong> 
              <span style={{ color: player.health_status === 'Ready' ? 'green' : 'red' }}>
                {player.health_status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '15px',
  textAlign: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const avatarPlaceholder = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#095db8',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  margin: '0 auto 10px'
};

export default TeamManagement;