import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { getMyTeamId } from '../../lib/team';
import { State, City } from 'country-state-city';
import { UserPlus } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';

const TOTAL_STEPS = 4;

export default function InviteJoin() {
  const nav = useNavigate();
  const { token: tokenParam } = useParams();
  const [search] = useSearchParams();
  const token = tokenParam || search.get('t') || '';
  const {session} = useAuth()

  // const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // Step 1 — basic
    name: '',
    phone: '',
    age: '',
    // Step 2 — profile/education
    isStudent: false,
    institute: '',
    course: '',
    currentYear: '',
    cgpa: '',
    gender: '',
    dob: '',
    programsKnownCsv: '',
    experienceLevel: '',
    previousProjects: '',
    preferredTrack: '',
    problemPreference: '',
    motivation: '',
    needAccommodation: false,
    // Step 3 — location
    stateInput: '',
    stateIso: '',
    stateName: '',
    cityInput: '',
    cityName: '',
    area: '',
    pincode: ''
  });

  // ---- initial checks: session + already in a team
  useEffect(() => {
    (async () => {
      if (!token) { setMsg('Invalid or missing invite link.'); setChecking(false); return; }
       const s = session || (await supabase.auth.getSession()).data.session;
      if (!s) { nav(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`, { replace: true }); return; }
      const teamId = await getMyTeamId();
      if (teamId) { nav('/team', { replace: true }); return; }
      setChecking(false);
    })();
  }, [nav, token]);

  // ---- location sources
  const allStates = useMemo(() => State.getStatesOfCountry('IN') || [], []);
  const citiesForState = useMemo(
    () => (form.stateIso ? City.getCitiesOfState('IN', form.stateIso) || [] : []),
    [form.stateIso]
  );

  // ---- helpers
  const vInt = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; };
  const vNum = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

  function resolveState(input) {
    const raw = (input || '').trim();
    if (!raw) return null;
    let s = allStates.find(st => st.isoCode.toLowerCase() === raw.toLowerCase());
    if (s) return s;
    const nameOnly = raw.replace(/\s*\([A-Z]{2,3}\)\s*$/i, '').trim().toLowerCase();
    s = allStates.find(st => st.name.toLowerCase() === nameOnly);
    return s || null;
  }
  function resolveCity(input) {
    const raw = (input || '').trim().toLowerCase();
    if (!raw || !citiesForState.length) return null;
    return citiesForState.find(c => c.name.toLowerCase() === raw) || null;
  }

  function onStateInputChange(e) {
    const v = e.target.value;
    setForm(prev => {
      const next = { ...prev, stateInput: v };
      const s = resolveState(v);
      if (s) {
        next.stateIso = s.isoCode; next.stateName = s.name;
        next.cityInput = ''; next.cityName = '';
      } else {
        next.stateIso = ''; next.stateName = '';
        next.cityInput = ''; next.cityName = '';
      }
      return next;
    });
  }
  function onStateBlur() {
    setForm(prev => {
      if (prev.stateIso && prev.stateName) return prev;
      const s = resolveState(prev.stateInput);
      if (s) return { ...prev, stateIso: s.isoCode, stateName: s.name };
      return prev;
    });
  }
  function onCityInputChange(e) {
    const v = e.target.value;
    setForm(prev => ({ ...prev, cityInput: v, cityName: resolveCity(v)?.name || '' }));
  }
  function onCityBlur() {
    setForm(prev => prev.cityName ? prev : ({ ...prev, cityName: resolveCity(prev.cityInput)?.name || '' }));
  }

  // ---- validations
  function validateStep1() {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (form.age) {
      const n = vInt(form.age);
      if (n === null || n < 10 || n > 120) return 'Please enter a valid age.';
    }
    return null;
  }
  function validateStep2() {
    if (form.isStudent && !form.institute.trim()) return 'Please enter your institute/college name.';
    if (form.currentYear) {
      const y = vInt(form.currentYear);
      if (y === null || y < 1 || y > 20) return 'Current year must be 1–20.';
    }
    if (form.cgpa) {
      const c = vNum(form.cgpa);
      if (c === null || c < 0 || c > 10) return 'CGPA must be 0–10.';
    }
    if (form.dob) {
      const d = new Date(form.dob);
      const today = new Date();
      const oldest = new Date(); oldest.setFullYear(oldest.getFullYear() - 120);
      if (Number.isNaN(d.valueOf()) || d > today || d < oldest) {
        return 'Please enter a valid date of birth.';
      }
    }
    return null;
  }
  function validateStep3() {
    if (!form.stateIso || !form.stateName) return 'Please pick a state from suggestions.';
    if (!form.cityName) return 'Please pick a city from suggestions.';
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) return 'Please enter a valid 6-digit pincode.';
    return null;
  }

  function goNext() {
    setMsg('');
    let err = null;
    if (step === 1) err = validateStep1();
    if (step === 2) err = validateStep2();
    if (step === 3) err = validateStep3();
    if (err) { setMsg(err); return; }
    setStep(s => Math.min(TOTAL_STEPS, s + 1));
  }
  function goBack() { setMsg(''); setStep(s => Math.max(1, s - 1)); }

  // prevent Enter from submitting before review
  function onFormKeyDown(e) {
    if (e.key === 'Enter' && step < TOTAL_STEPS) {
      e.preventDefault();
      goNext();
    }
  }

  // ---- submit (join)
  async function submit(e) {
    e?.preventDefault?.();
    setMsg('');
    const err3 = validateStep3();
    if (err3) { setMsg(err3); setStep(3); return; }

    const programsKnown = form.programsKnownCsv
      ? Array.from(new Set(form.programsKnownCsv.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)))
      : null;

    setSubmitting(true);
    const { error } = await supabase.rpc('join_team_by_token', {
      // core
      p_member_name: form.name.trim(),
      p_member_phone: form.phone.trim(),
      p_age: form.age ? vInt(form.age) : null,
      p_is_student: form.isStudent,
      // store institute even if not student (company name)
      p_institute_name: form.institute.trim() || null,
      p_course: form.isStudent ? (form.course || null) : null,
      p_current_year: form.isStudent && form.currentYear ? vInt(form.currentYear) : null,
      p_cgpa: form.isStudent && form.cgpa ? vNum(form.cgpa) : null,

      // location
      p_state_code: form.stateIso,
      p_state_name: form.stateName,
      p_city_id: `${form.stateIso}:${form.cityName}`,
      p_city_name: form.cityName,
      p_area_name: form.area.trim() || null,
      p_pincode: form.pincode || null,

      // extras
      p_gender: form.gender || null,
      p_dob: form.dob || null,
      p_programs_known: programsKnown,
      p_ai_ml_experience_level: form.experienceLevel || null,
      p_previous_projects: form.previousProjects || null,
      p_preferred_track: form.preferredTrack || null,
      p_problem_statement_preference: form.problemPreference || null,
      p_motivation: form.motivation || null,
      p_need_accommodation: Boolean(form.needAccommodation),

      // token
      p_token: token
    });
    setSubmitting(false);

    if (error) { setMsg(error.message); return; }
    nav('/team');
  }

  // ---- UI
  if (checking) return <Loader />;
  // if (!session) {
  //   return (
  //     <div className="c_team-wrap">
  //       <div className="c_team-card"><p>Please log in first.</p></div>
  //     </div>
  //   );
  // }
  if (!token) {
    return (
      <div className="c_team-wrap">
        <div className="c_team-card"><p className="c_team-alert">Invalid invite link.</p></div>
      </div>
    );
  }

  return (
    <div className="c_team-wrap">
      <div className="c_team-card">
        <header className="c_team-header">
          <h2><UserPlus /> Join Team via Invite</h2>
          <span className="c_team-user">{session?.user?.email}</span>
        </header>

        <Stepper step={step} />
        {msg && <div className="c_team-alert">{msg}</div>}

        <form className="c_team-form" onKeyDown={onFormKeyDown} onSubmit={submit} autoComplete="off">
          {/* STEP 1 — Basic */}
          {step === 1 && (
            <section className="c_team-section">
              <h3 className="c_team-title">Basic details</h3>
              <div className="c_team-grid">
                <Field label="Your name" required>
                  <input className="c_team-input" value={form.name}
                         onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                         placeholder="e.g., Ananya Sharma" required />
                </Field>
                <Field label="Phone number" required>
                  <input className="c_team-input" value={form.phone}
                         onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
                         placeholder="e.g., 9876543210" required />
                </Field>
                <Field label="Age (optional)">
                  <input className="c_team-input" value={form.age}
                         onChange={e=>setForm(f=>({...f,age:e.target.value}))}
                         inputMode="numeric" placeholder="e.g., 21" />
                </Field>
              </div>
            </section>
          )}

          {/* STEP 2 — Profile & Education */}
          {step === 2 && (
            <section className="c_team-section">
              <h3 className="c_team-title">Profile & Education</h3>
              <div className="c_team-grid">
                <Field span={2}>
                  <label className="c_team-check">
                    <input type="checkbox" checked={form.isStudent}
                           onChange={e=>setForm(f=>({...f,isStudent:e.target.checked}))} />
                    Are you a student?
                  </label>
                </Field>

                {/* Institute shown always; required if student */}
                <Field label="Institute / College / Company name" span={2} required={form.isStudent}>
                  <input className="c_team-input" value={form.institute}
                         onChange={e=>setForm(f=>({...f,institute:e.target.value}))}
                         placeholder="Institute / College / Company name"
                         required={form.isStudent} />
                </Field>

                {form.isStudent && (
                  <>
                    <Field label="Course" span={2}>
                      <input className="c_team-input" value={form.course}
                             onChange={e=>setForm(f=>({...f,course:e.target.value}))}
                             placeholder="e.g., B.Tech CSE" />
                    </Field>
                    <Field label="Current Year (1–20)">
                      <input className="c_team-input" value={form.currentYear}
                             onChange={e=>setForm(f=>({...f,currentYear:e.target.value}))}
                             inputMode="numeric" placeholder="e.g., 3" />
                    </Field>
                    <Field label="CGPA (0–10)">
                      <input className="c_team-input" value={form.cgpa}
                             onChange={e=>setForm(f=>({...f,cgpa:e.target.value}))}
                             inputMode="decimal" placeholder="e.g., 8.45" />
                    </Field>
                  </>
                )}

                <Field label="Gender">
                  <select className="c_team-input" value={form.gender}
                          onChange={e=>setForm(f=>({...f,gender:e.target.value}))}>
                    <option value="">— Select —</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Date of birth">
                  <input type="date" className="c_team-input" value={form.dob}
                         onChange={e=>setForm(f=>({...f,dob:e.target.value}))}/>
                </Field>
                <Field label="Programs Known (comma-separated)" span={2}>
                  <input className="c_team-input" value={form.programsKnownCsv}
                         onChange={e=>setForm(f=>({...f,programsKnownCsv:e.target.value}))}
                         placeholder="Python, C++, JavaScript" />
                </Field>
                <Field label="AI/ML Experience">
                  <select className="c_team-input" value={form.experienceLevel}
                          onChange={e=>setForm(f=>({...f,experienceLevel:e.target.value}))}>
                    <option value="">— Select —</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </Field>
                <Field label="Preferred Track">
                  <select className="c_team-input" value={form.preferredTrack}
                          onChange={e=>setForm(f=>({...f,preferredTrack:e.target.value}))}>
                    <option value="">— Select —</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Cloud/DevOps">Cloud/DevOps</option>
                    <option value="Open">Open / Other</option>
                  </select>
                </Field>
                <Field label="Previous AI/Tech Projects" span={2}>
                  <textarea className="c_team-input" rows={3} value={form.previousProjects}
                            onChange={e=>setForm(f=>({...f,previousProjects:e.target.value}))}
                            placeholder="Briefly describe previous projects…" />
                </Field>
                <Field label="Problem Statement Preference" span={2}>
                  <textarea className="c_team-input" rows={3} value={form.problemPreference}
                            onChange={e=>setForm(f=>({...f,problemPreference:e.target.value}))}
                            placeholder="Any specific problem areas you prefer…" />
                </Field>
                <Field label="Why do you want to participate?" span={2}>
                  <textarea className="c_team-input" rows={3} value={form.motivation}
                            onChange={e=>setForm(f=>({...f,motivation:e.target.value}))}
                            placeholder="Tell us your motivation…" />
                </Field>
                <Field span={2}>
                  <label className="c_team-check">
                    <input type="checkbox" checked={form.needAccommodation}
                           onChange={e=>setForm(f=>({...f,needAccommodation:e.target.checked}))}/>
                    Need Accommodation
                  </label>
                </Field>
              </div>
            </section>
          )}

          {/* STEP 3 — Location */}
          {step === 3 && (
            <section className="c_team-section">
              <h3 className="c_team-title">Location</h3>
              <div className="c_team-grid">
                <Field label="State / UT" span={2} required>
                  <input list="statesIN" className="c_team-input" value={form.stateInput}
                         onChange={onStateInputChange} onBlur={onStateBlur}
                         placeholder="Start typing & pick from suggestions" required />
                  <datalist id="statesIN">
                    {allStates.map(s => <option key={s.isoCode} value={`${s.name} (${s.isoCode})`} />)}
                  </datalist>
                  {form.stateIso && <small className="c_team-hint">Selected: {form.stateName} ({form.stateIso})</small>}
                </Field>
                <Field label="City" span={2} required>
                  <input list="citiesIN" className="c_team-input" value={form.cityInput}
                         onChange={onCityInputChange} onBlur={onCityBlur}
                         disabled={!form.stateIso}
                         placeholder={form.stateIso ? 'Type your city & pick' : 'Select state first'} required />
                  <datalist id="citiesIN">
                    {citiesForState.map(c => <option key={`${form.stateIso}:${c.name}`} value={c.name} />)}
                  </datalist>
                  {form.cityName && <small className="c_team-hint">Selected: {form.cityName}</small>}
                </Field>
                <Field label="Area / Locality (optional)" span={2}>
                  <input className="c_team-input" value={form.area}
                         onChange={e=>setForm(f=>({...f,area:e.target.value}))}/>
                </Field>
                <Field label="Pincode (optional)">
                  <input className="c_team-input" value={form.pincode}
                         onChange={e=>setForm(f=>({...f,pincode:e.target.value}))}
                         inputMode="numeric" maxLength={6} />
                </Field>
              </div>
            </section>
          )}

          {/* STEP 4 — Review & Join */}
          {step === 4 && (
            <section className="c_team-section">
              <h3 className="c_team-title">Review & Join Team</h3>
              <div className="c_team-review">
                <ReviewRow k="Name" v={form.name} />
                <ReviewRow k="Phone" v={form.phone} />
                <ReviewRow k="Age" v={form.age || '—'} />
                <ReviewRow k="Student" v={form.isStudent ? 'Yes' : 'No'} />
                <ReviewRow k="Institute / College / Company" v={form.institute || '—'} />
                {form.isStudent && (
                  <>
                    <ReviewRow k="Course" v={form.course || '—'} />
                    <ReviewRow k="Current Year" v={form.currentYear || '—'} />
                    <ReviewRow k="CGPA" v={form.cgpa || '—'} />
                  </>
                )}
                <ReviewRow k="Gender" v={form.gender || '—'} />
                <ReviewRow k="DOB" v={form.dob || '—'} />
                <ReviewRow k="Programs Known" v={form.programsKnownCsv || '—'} />
                <ReviewRow k="Experience" v={form.experienceLevel || '—'} />
                <ReviewRow k="Preferred Track" v={form.preferredTrack || '—'} />
                <ReviewRow k="Projects" v={form.previousProjects || '—'} />
                <ReviewRow k="Problem Pref" v={form.problemPreference || '—'} />
                <ReviewRow k="Motivation" v={form.motivation || '—'} />
                <ReviewRow k="Accommodation" v={form.needAccommodation ? 'Needed' : 'Not needed'} />
                <ReviewRow k="State" v={form.stateName || '—'} />
                <ReviewRow k="City" v={form.cityName || '—'} />
                <ReviewRow k="Area" v={form.area || '—'} />
                <ReviewRow k="Pincode" v={form.pincode || '—'} />
              </div>

              <div className="c_team-actions" style={{ marginTop: 10 }}>
                <button type="button" className="c_team-btn" onClick={submit} disabled={submitting}>
                  {submitting ? 'Joining…' : 'Confirm & Join Team'}
                </button>
              </div>
            </section>
          )}

          {/* Bottom nav */}
          <div className="c_team-actions">
            {step > 1 ? (
              <button type="button" className="c_team-btn c_team-btn--ghost" onClick={goBack}>Back</button>
            ) : <span />}
            {step < TOTAL_STEPS ? (
              <button type="button" className="c_team-btn" onClick={goNext}>Next</button>
            ) : (
              <span />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- tiny UI helpers ---------- */
function Stepper({ step }) {
  return (
    <div className="c_team-steps">
      {[1,2,3,4].map(n => (
        <div key={n} className={`c_team-step ${step === n ? 'is-active' : ''} ${step > n ? 'is-done' : ''}`}>
          <div className="c_team-step__dot">{step > n ? '✓' : n}</div>
          <div className="c_team-step__label">
            {n===1 && 'Basic'}
            {n===2 && 'Profile'}
            {n===3 && 'Location'}
            {n===4 && 'Review'}
          </div>
        </div>
      ))}
    </div>
  );
}
function Field({ label, required, span=1, children }) {
  return (
    <div className={`c_team-field c_team-field--span${span}`}>
      {label && <label className="c_team-label">{label}{required && <span className="c_team-req">*</span>}</label>}
      {children}
    </div>
  );
}
function ReviewRow({ k, v }) {
  return (
    <div className="c_team-review__row">
      <div className="c_team-review__k">{k}</div>
      <div className="c_team-review__v">{v}</div>
    </div>
  );
}
