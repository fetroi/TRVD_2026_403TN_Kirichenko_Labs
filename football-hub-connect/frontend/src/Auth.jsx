import React, { useState } from 'react';
import { supabase } from './api/supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else if (isSignUp) alert('Реєстрація успішна! Тепер ви можете увійти.');
    setLoading(false);
  };

  return (
    <div style={authStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#38bdf8' }}>{isSignUp ? 'Реєстрація' : 'Вхід'}</h2>
        <form onSubmit={handleAuth} style={formStyle}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
          <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Завантаження...' : isSignUp ? 'Створити акаунт' : 'Увійти'}</button>
        </form>
        <p style={{ marginTop: '15px', cursor: 'pointer', fontSize: '14px' }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Вже є акаунт? Увійти' : 'Немає акаунту? Реєстрація'}
        </p>
      </div>
    </div>
  );
}

const authStyle = { backgroundColor: '#0f172a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' };
const cardStyle = { background: '#1e293b', padding: '30px', borderRadius: '12px', border: '1px solid #334155', width: '300px', textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #334155', background: '#0f172a', color: 'white' };
const btnStyle = { backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };