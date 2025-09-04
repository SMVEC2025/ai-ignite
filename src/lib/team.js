import { supabase } from './supabaseClient';

export async function getMyTeamId() {
  const { data, error } = await supabase.rpc('get_my_team');
  if (error) {
    console.error('get_my_team error:', error);
    return null;
  }
  return Array.isArray(data) && data.length ? data[0].team_id : null;
}
