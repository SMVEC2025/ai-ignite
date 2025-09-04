// src/pages/Announcements.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Breadcrumbs from '../../components/common/BreadCrumbs';
import { Bell, Calendar, Clock } from 'lucide-react';

const LOCALE = 'en-IN';
const TZ = 'Asia/Kolkata';

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setMsg('');
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, body, posted_at, updated_at')
        .eq('is_published', true)
        .order('posted_at', { ascending: false });

      setLoading(false);
      if (error) { setMsg(error.message); return; }
      setItems(data || []);
    })();
  }, []);

  const fmtFull = (dt) => {
    if (!dt) return '—';
    try {
      return new Date(dt).toLocaleString(LOCALE, {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: TZ,
      });
    } catch {
      return String(dt);
    }
  };

  const fmtDate = (dt) => {
    if (!dt) return '—';
    try {
      return new Date(dt).toLocaleDateString(LOCALE, {
        dateStyle: 'medium',
        timeZone: TZ,
      });
    } catch {
      return String(dt);
    }
  };

  const fmtTime = (dt) => {
    if (!dt) return '—';
    try {
      return new Date(dt).toLocaleTimeString(LOCALE, {
        timeStyle: 'short',
        timeZone: TZ,
      });
    } catch {
      return String(dt);
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
        ]}
        current="Announcements"
        subtitle="Stay up to date with the latest updates."
      />

      <div className="c_announce-wrap">
        <div className="c_announce-card">
          {msg && <div className="c_announce-alert">{msg}</div>}

          <section className="c_announce-section">
            {loading ? (
              <p className="c_announce-dim">Loading…</p>
            ) : items.length === 0 ? (
              <p className="c_announce-dim">No announcements yet.</p>
            ) : (
              <ul className="c_announce-list">
                {items.map((item) => (
                  <AnnouncementItem
                    key={item.id}
                    item={item}
                    fmtFull={fmtFull}
                    fmtDate={fmtDate}
                    fmtTime={fmtTime}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function AnnouncementItem({ item, fmtFull, fmtDate, fmtTime }) {
  const postedFull = fmtFull(item.posted_at);
  const postedDate = fmtDate(item.posted_at);
  const postedTime = fmtTime(item.posted_at);
  const updatedFull =
    item.updated_at && item.updated_at !== item.posted_at ? fmtFull(item.updated_at) : null;

  return (
    <li className="c_announce-item">
      <div className="c_announce-item__head">
        <div className="c_announce-item__titlewrap">
          <span className="c_announce-icon"><Bell size={18} /></span>
          <h4 className="c_announce-item__title">{item.title}</h4>
        </div>
      </div>

      <div className="c_announce-meta-line">
        <span className="c_announce-meta-chip">
          <Calendar size={16} /> <span>{postedDate}</span>
        </span>
        <span className="c_announce-meta-chip">
          <Clock size={16} /> <span>{postedTime}</span>
        </span>
      </div>

      <p className="c_announce-item__body">{item.body}</p>

      {updatedFull && (
        <div className="c_announce-item__meta">
          <span className="c_announce-dim">{updatedFull}</span>
        </div>
      )}
    </li>
  );
}
