// src/pages/TimelinePage.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import Loader from "../../components/Loader/Loader";

export default function Index() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            setMsg("");
            const { data, error } = await supabase
                .from("aiignite_timeline")
                .select("*")
                .order("start_at", { ascending: true })
                .order("sort_index", { ascending: true });

            if (error) setMsg(error.message);
            else setEvents(data || []);
            setLoading(false);
        })();
    }, []);
    const formatter = useMemo(() => {
        return new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, []);
    const now = Date.now();
    const normalized = events.map((e) => {
        const start = e.start_at ? new Date(e.start_at) : null;
        const isPast = start ? start.getTime() < now : false;

        let dateLabel = start ? formatter.format(start) : "";
        let timeLabel = e.display_time || "";

        return {
            ...e,
            isPast: e.status ? e.status === "past" : isPast,
            dateLabel,
            timeLabel,
        };
    });

    return (
        <main className="timeline-page">
            <Breadcrumbs
             items={[
          { label: "Home", href: "/" },
        ]}
        current="Timeline"
        subtitle="Manage your members, invites and slots here."
            />
           

            {loading && <Loader/>}
            {msg && <div className="timeline-error">{msg}</div>}

            {!loading && !msg && (
                <section className="timeline-wrap">
                    <ol className="timeline-list" role="list">
                        {normalized.map((ev, idx) => (
                            <li
                                key={ev.id ?? idx}
                                className={`timeline-item ${ev.isPast ? "is-past" : "is-upcoming"}`}
                            >
                                <span className="timeline-pin">{idx + 1}</span>
                                <div className="timeline-card">
                                    <div className="timeline-status">
                                        <span className={`${ev.status == 'past' ? 'past' : 'upcoming'}`}>{ev.status}</span>

                                    </div>
                                    <div className="timeline-head">
                                        <h3 className="timeline-heading">{ev.title}</h3>
                                        {ev.subtitle && <p className="timeline-sub">{ev.subtitle}</p>}
                                    </div>

                                    <div className="timeline-meta">
                                        {ev.dateLabel && <span className="timeline-date">{ev.dateLabel}</span>}
                                        {ev.timeLabel && (
                                            <>
                                                <span className="timeline-sep">•</span>
                                                <span className="timeline-time">{ev.timeLabel}</span>
                                            </>
                                        )}
                                        {ev.location && (
                                            <>
                                                <span className="timeline-sep">•</span>
                                                <span className="timeline-loc">{ev.location}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            )}
        </main>
    );
}
