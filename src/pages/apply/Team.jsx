import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate, Navigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/BreadCrumbs';

export default function Team() {
  const [rows, setRows] = useState([]);
  const [invite, setInvite] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  async function load() {
    const { data, error } = await supabase.rpc('get_my_team');
    if (error) setMsg(error.message);
    else setRows(data || []);
  }

  useEffect(() => { load(); }, []);

  const teamId = useMemo(() => rows[0]?.team_id ?? null, [rows]);

  async function makeInvite() {
    if(rows?.length >=4){
      setMsg("Team limit reached. Cannot invite more members.");
      return;
    }
    setMsg('');
    const { data, error } = await supabase.rpc('generate_invite', { p_team_id: teamId });
    if (error) setMsg(error.message);
    else {
      const token = data?.[0]?.token;
      const url = `${window.location.origin}/invite/${token}`;
      setInvite(url);
    }
  }

  if (!teamId) {
    return (
      <Navigate to="/apply" replace />
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
        current="My Team"
        subtitle="Manage your members, invites and slots here."
      />
      <div className="team-page">
        <header className="team-topbar">
          <div className="team-topbar__left">
            <h1 className="team-title">My Team</h1>
            <span className="team-badge">{rows.length}/4</span>
          </div>
        </header>

        <section className="team-panel">
          <div className="team-panel__head">
            <h2 className="team-heading">Members</h2>
          </div>

          <ul className="team-grid">
            {rows.map((r) => (
              <li className="team-card" key={r.member_user_id}>
                <div className="team-card__avatar">
                  {r.member_name?.[0]?.toUpperCase()}
                </div>
                <div className="team-card__body">
                  <div className="team-card__row">
                    <span className="team-card__name">{r.member_name}</span>
                  </div>
                  <div className="team-card__meta">
                    <a className="team-link" href={`mailto:${r.member_email}`}>
                      {r.member_email}
                    </a>

                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="team-panel">
          <div className="team-panel__head">
            <h2 className="team-heading">Invite a Friend</h2>
          </div>
          <div className="team-actions">
            <button className="team-btn" onClick={makeInvite}>
              Generate Invite Link
            </button>

            {invite && (
              <div className="team-invite">
                <label className="team-label">Share this link</label>
                <div className="team-inputrow">
                  <input
                    className="team-input"
                    value={invite}
                    readOnly
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    className="team-btn team-btn--outline"
                    onClick={() => navigator.clipboard.writeText(invite)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {msg && <p className="team-msg">{msg}</p>}
      </div>
    </>

  );
}
