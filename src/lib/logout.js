import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
export async function logout(navigate, to = '/login') {
  const { error } = await supabase.auth.signOut(); // ends current device session
  if (error) throw error;
  navigate(to, { replace: true });
}