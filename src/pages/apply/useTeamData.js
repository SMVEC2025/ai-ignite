import { useEffect, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient'; // Adjust path as needed

// A custom hook to handle data fetching, loading, and error states
export const useTeamData = () => {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase.rpc('get_my_team');
        if (error) {
          throw error;
        }
        setRows(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return { rows, loading, error };
};