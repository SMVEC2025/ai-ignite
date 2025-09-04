import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [ready, setReady] = useState(false);
  const nav = useNavigate();

  // Ensure we have a session created by the recovery link
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
      if (!data.session) setMsg('Recovery link invalid or expired. Try again.');
    });
  }, []);

  async function setNewPassword(e) {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message);
    else {
      setMsg('Password updated. You are signed in.');
      nav('/');
    }
  }

  return (
    <div style={box}>
      <h1>Set a new password</h1>
      {!ready ? (
        <p>{msg || 'Checking recovery session…'}</p>
      ) : (
        <form onSubmit={setNewPassword} style={form}>
          <input type="password" placeholder="new password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit">Update password</button>
        </form>
      )}
    </div>
  );
}

const box = { maxWidth: 420, margin: '3rem auto', fontFamily: 'system-ui' };
const form = { display:'grid', gap: 8, marginBottom: 12 };
