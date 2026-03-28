import React, { useState, useEffect } from 'react';
import { supabase } from './api/supabase';
import Auth from './Auth'; 

function App() {
  const [session, setSession] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNumber, setNewNumber] = useState('');
  const [newPosition, setNewPosition] = useState('Півзахисник');
  const [filter, setFilter] = useState('Всі'); 
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) getPlayers(); }, [session]);

  async function getPlayers() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('players').select('*').order('number', { ascending: true });
      if (error) throw error;
      setPlayers(data || []);
    } catch (error) { console.error(error.message); } 
    finally { setLoading(false); }
  }

  async function handleAddPlayer(e) {
    e.preventDefault();
    if (!newNumber) return;
    const { data: { user } } = await supabase.auth.getUser();

    if (editingId) {
      await supabase.from('players').update({ number: parseInt(newNumber), position: newPosition }).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('players').insert([{ number: parseInt(newNumber), position: newPosition, health_status: 'В строю', user_id: user.id }]);
    }
    setNewNumber('');
    getPlayers();
  }

  async function deletePlayer(id) {
    await supabase.from('players').delete().eq('id', id);
    getPlayers();
  }

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'В строю' ? 'Травмований' : 'В строю';
    await supabase.from('players').update({ health_status: newStatus }).eq('id', id);
    getPlayers();
  }

  if (!session) return <Auth />;

  const filteredPlayers = players.filter(p => filter === 'Всі' || p.position === filter);

  return (
    <div style={containerStyle}>
      {/* Підключення іконок */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <style>
        {`
          @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .player-card-anim { animation: slideIn 0.3s ease-out forwards; opacity: 0; }
          .premium-card:hover { border-color: #d4af37 !important; background: #16161a !important; }
          .filter-btn { padding: 10px 20px; border-radius: 8px; border: 1px solid #27272a; background: transparent; color: #a1a1aa; cursor: pointer; transition: 0.2s; font-size: 0.75em; font-weight: 700; letter-spacing: 1px; }
          .filter-btn.active { background: #d4af37; color: #000; border-color: #d4af37; }
          input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        `}
      </style>

      {/* Header */}
      <div style={headerContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={logoSquare}><i className="fas fa-futbol"></i></div>
          <div>
            <h1 style={titleStyle}>FootballHub</h1>
            <div style={subtitleStyle}>PROFESSIONAL SQUAD MANAGEMENT</div>
          </div>
        </div>
        <button onClick={() => supabase.auth.signOut()} style={exitBtn}>
          <i className="fas fa-power-off"></i>
        </button>
      </div>

      {/* Stats */}
      <div style={statsWrapper}>
        <div style={statCard}>
          <span style={statLabel}>ГРАВЦІВ</span>
          <div style={statValue}>{players.length}</div>
        </div>
        <div style={statCard}>
          <span style={{...statLabel, color: '#4ade80'}}>В СТРОЮ</span>
          <div style={statValue}>{players.filter(p => p.health_status === 'В строю').length}</div>
        </div>
        <div style={statCard}>
          <span style={{...statLabel, color: '#f87171'}}>ТРАВМИ</span>
          <div style={statValue}>{players.filter(p => p.health_status !== 'В строю').length}</div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAddPlayer} style={premiumForm}>
        <input type="number" placeholder="№" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} style={premiumInput} />
        <select value={newPosition} onChange={(e) => setNewPosition(e.target.value)} style={premiumInput}>
          {['Воротар', 'Захисник', 'Півзахисник', 'Нападник'].map(pos => <option key={pos} value={pos}>{pos}</option>)}
        </select>
        <button type="submit" style={goldButton}>
          <i className={editingId ? "fas fa-save" : "fas fa-plus"}></i>
        </button>
      </form>

      {/* Filter Row */}
      <div style={filterRow}>
        {['Всі', 'Воротар', 'Захисник', 'Півзахисник', 'Нападник'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`filter-btn ${filter === f ? 'active' : ''}`}>{f.toUpperCase()}</button>
        ))}
      </div>

      {/* List */}
      <div style={listGrid}>
        {filteredPlayers.map((p, index) => (
          <div key={p.id} className="premium-card player-card-anim" style={{...playerCard, animationDelay: `${index * 0.05}s`}}>
            <div style={cardMainInfo}>
              <div style={numberBox}>№ {p.number}</div>
              <div style={{marginLeft: '15px'}}>
                <div style={cardPos}>{p.position.toUpperCase()}</div>
                <div style={cardStatus(p.health_status)}>
                   <i className={`fas ${p.health_status === 'В строю' ? 'fa-circle-check' : 'fa-medkit'}`} style={{marginRight: '6px'}}></i>
                   {p.health_status}
                </div>
              </div>
            </div>

            <div style={cardActions}>
              <button onClick={() => toggleStatus(p.id, p.health_status)} style={actionBtn} title="Статус">
                <i className="fas fa-notes-medical"></i>
              </button>
              <button onClick={() => {setEditingId(p.id); setNewNumber(p.number); setNewPosition(p.position); window.scrollTo(0,0);}} style={{...actionBtn, color: '#d4af37'}} title="Редагувати">
                <i className="fas fa-pen-to-square"></i>
              </button>
              <button onClick={() => deletePlayer(p.id)} style={{...actionBtn, color: '#ef4444'}} title="Видалити">
                <i className="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* СТИЛІ */
const containerStyle = { backgroundColor: '#09090b', color: '#fff', minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Inter", sans-serif' };
const headerContainer = { width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1f1f23', paddingBottom: '20px' };
const titleStyle = { fontSize: '1.4em', fontWeight: '900', margin: 0 };
const subtitleStyle = { fontSize: '0.6em', color: '#52525b', letterSpacing: '2px', fontWeight: 'bold' };
const logoSquare = { width: '40px', height: '40px', background: '#d4af37', borderRadius: '8px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2em' };
const exitBtn = { background: 'transparent', border: '1px solid #27272a', color: '#ef4444', padding: '10px', borderRadius: '8px', cursor: 'pointer' };

const statsWrapper = { display: 'flex', gap: '15px', marginBottom: '30px', width: '100%', maxWidth: '1000px' };
const statCard = { flex: 1, background: '#141417', padding: '20px', borderRadius: '16px', border: '1px solid #1f1f23' };
const statLabel = { fontSize: '0.6em', color: '#52525b', fontWeight: '800' };
const statValue = { fontSize: '2em', fontWeight: 'bold', marginTop: '5px' };

const premiumForm = { display: 'flex', gap: '10px', marginBottom: '40px', background: '#141417', padding: '20px', borderRadius: '16px', border: '1px solid #1f1f23', width: '100%', maxWidth: '1000px' };
const premiumInput = { padding: '12px', borderRadius: '8px', border: '1px solid #27272a', background: '#09090b', color: '#fff', flex: 1, outline: 'none' };
const goldButton = { background: '#d4af37', color: '#000', border: 'none', padding: '0 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

const filterRow = { display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', width: '100%', maxWidth: '1000px' };
const listGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '15px', width: '100%', maxWidth: '1000px' };

const playerCard = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#141417', padding: '18px 22px', borderRadius: '18px', border: '1px solid #1f1f23', transition: '0.2s' };
const cardMainInfo = { display: 'flex', alignItems: 'center', flex: 1 };
const numberBox = { padding: '10px 15px', borderRadius: '10px', background: '#09090b', fontSize: '1em', fontWeight: '900', border: '1px solid #27272a', color: '#d4af37', minWidth: '45px', textAlign: 'center' };
const cardPos = { fontSize: '0.9em', fontWeight: '800' };
const cardStatus = (s) => ({ fontSize: '0.75em', color: s === 'В строю' ? '#4ade80' : '#f87171', fontWeight: '600', marginTop: '4px' });

const cardActions = { display: 'flex', gap: '8px', flexShrink: 0 };
const actionBtn = { background: '#1c1c21', border: '1px solid #27272a', color: '#fff', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '1em' };

export default App;