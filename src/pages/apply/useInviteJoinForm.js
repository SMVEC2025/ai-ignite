import { useState, useMemo } from 'react';
import { State, City } from 'country-state-city';

const TOTAL_STEPS = 4;

export const useInviteJoinForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', age: '', isStudent: false, institute: '', course: '',
    currentYear: '', cgpa: '', gender: '', dob: '', programsKnownCsv: '',
    experienceLevel: '', previousProjects: '', preferredTrack: '',
    problemPreference: '', motivation: '', needAccommodation: false,
    stateInput: '', stateIso: '', stateName: '', cityInput: '',
    cityName: '', area: '', pincode: ''
  });
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');

  const vInt = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : null; };
  const vNum = (v) => { const n = Number(v); return Number.isFinite(n) ? n : null; };

  const allStates = useMemo(() => State.getStatesOfCountry('IN') || [], []);
  const citiesForState = useMemo(() => {
    return form.stateIso ? City.getCitiesOfState('IN', form.stateIso) || [] : [];
  }, [form.stateIso]);

  const validateStep1 = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    const age = vInt(form.age);
    if (form.age && (age === null || age < 10 || age > 120)) return 'Please enter a valid age.';
    return null;
  };
  const validateStep2 = () => {
    if (form.isStudent && !form.institute.trim()) return 'Please enter your institute/college name.';
    const currentYear = vInt(form.currentYear);
    if (form.currentYear && (currentYear === null || currentYear < 1 || currentYear > 20)) return 'Current year must be 1–20.';
    const cgpa = vNum(form.cgpa);
    if (form.cgpa && (cgpa === null || cgpa < 0 || cgpa > 10)) return 'CGPA must be 0–10.';
    const dob = new Date(form.dob);
    if (form.dob && (isNaN(dob.valueOf()) || dob > new Date() || dob < new Date(new Date().setFullYear(new Date().getFullYear() - 120)))) {
      return 'Please enter a valid date of birth.';
    }
    return null;
  };
  const validateStep3 = () => {
    if (!form.stateIso || !form.stateName) return 'Please pick a state from suggestions.';
    if (!form.cityName) return 'Please pick a city from suggestions.';
    if (form.pincode && !/^\d{6}$/.test(form.pincode)) return 'Please enter a valid 6-digit pincode.';
    return null;
  };

  const goNext = () => {
    setMsg('');
    let err = null;
    if (step === 1) err = validateStep1();
    else if (step === 2) err = validateStep2();
    else if (step === 3) err = validateStep3();
    if (err) {
      setMsg(err);
      return false;
    }
    setStep(s => Math.min(TOTAL_STEPS, s + 1));
    return true;
  };
  const goBack = () => { setMsg(''); setStep(s => Math.max(1, s - 1)); };

  const onStateInputChange = (e) => {
    const v = e.target.value;
    const s = allStates.find(st => st.name.toLowerCase() === v.toLowerCase() || st.isoCode.toLowerCase() === v.toLowerCase());
    setForm(prev => ({
      ...prev,
      stateInput: v,
      stateIso: s?.isoCode || '',
      stateName: s?.name || '',
      cityInput: s ? '' : prev.cityInput,
      cityName: s ? '' : prev.cityName
    }));
  };
  const onCityInputChange = (e) => {
    const v = e.target.value;
    const city = citiesForState.find(c => c.name.toLowerCase() === v.toLowerCase());
    setForm(prev => ({ ...prev, cityInput: v, cityName: city?.name || '' }));
  };

  const onBlur = (field) => {
    if (field === 'state' && form.stateInput && !form.stateIso) {
      const s = allStates.find(st => st.name.toLowerCase() === form.stateInput.toLowerCase());
      if (s) setForm(prev => ({ ...prev, stateIso: s.isoCode, stateName: s.name, cityInput: '', cityName: '' }));
    } else if (field === 'city' && form.cityInput && !form.cityName) {
      const city = citiesForState.find(c => c.name.toLowerCase() === form.cityInput.toLowerCase());
      if (city) setForm(prev => ({ ...prev, cityName: city.name }));
    }
  };

  return {
    form, setForm, step, msg, setMsg, goNext, goBack, allStates,
    citiesForState, validateStep3, onStateInputChange, onCityInputChange, onBlur,
    TOTAL_STEPS, vInt, vNum
  };
};