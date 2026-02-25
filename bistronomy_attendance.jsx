import { useState, useEffect, useCallback } from "react";

// ─── Initial Employees ────────────────────────────────────────────────────────
const INITIAL_EMPLOYEES = [
  { id: "e1",  name: "Maurizio",                 dept: "Kitchen",    role: "Chief Chef" },
  { id: "e2",  name: "Edwin Njogo Ndung'u",       dept: "Kitchen",    role: "Chef" },
  { id: "e3",  name: "James Mashalia",            dept: "Kitchen",    role: "Chef de Partie" },
  { id: "e4",  name: "Albert Maisiba Obino",      dept: "Kitchen",    role: "Ass Chef" },
  { id: "e5",  name: "Everlyne Mawondo Mwabili",  dept: "Kitchen",    role: "Pastry Chef" },
  { id: "e6",  name: "Esther Peter",              dept: "Restaurant", role: "Supervisor/Res." },
  { id: "e7",  name: "Michael Mwagandi Ngata",    dept: "Restaurant", role: "Supervisor" },
  { id: "e8",  name: "Christopher Njoga Maina",   dept: "Restaurant", role: "Waiter" },
  { id: "e9",  name: "Walter Mwatsuma Kiti",      dept: "Restaurant", role: "Waiter" },
  { id: "e10", name: "Daniel Gichura Karaya",     dept: "Restaurant", role: "Waiter" },
  { id: "e11", name: "Jumaa Kenga Randu",         dept: "Restaurant", role: "Waiter" },
  { id: "e12", name: "Freshiah Nyambura Njoroge", dept: "Restaurant", role: "Waitress" },
  { id: "e13", name: "Esther Muthoni Mwangi",     dept: "Restaurant", role: "Waitress" },
  { id: "e14", name: "Taylor Kate Murithi",       dept: "Restaurant", role: "Waitress" },
  { id: "e15", name: "Pinkett Wangechi",          dept: "Restaurant", role: "Waitress" },
  { id: "e16", name: "Loiseline Wairimu Maina",   dept: "Restaurant", role: "Waitress" },
  { id: "e17", name: "Alex Muinde Muthoka",       dept: "Bar",        role: "Barman" },
  { id: "e18", name: "Lucy Kambe Mkirema",        dept: "Stewards",   role: "Steward" },
  { id: "e19", name: "Herbert Sanga Chigube",     dept: "Stewards",   role: "Steward" },
  { id: "e20", name: "Susan Mutheu Syombua",      dept: "Stewards",   role: "Steward" },
  { id: "e21", name: "Magdaline Wairimu Macharia",dept: "Stewards",   role: "Steward" },
  { id: "e22", name: "Damien",                    dept: "Admin",      role: "Manager" },
  { id: "e23", name: "James Mwandembe Mwambingu", dept: "Admin",      role: "HR" },
  { id: "e24", name: "Musa Ali Mjumbe",           dept: "Admin",      role: "Procurement" },
  { id: "e25", name: "Brenda Wanjiko Ng'ang'a",   dept: "Admin",      role: "Cashier" },
  { id: "e26", name: "Brian Ochieng",             dept: "Admin",      role: "ICT" },
  { id: "e27", name: "Salim",                     dept: "Security",   role: "Security" },
  { id: "e28", name: "Simba",                     dept: "Security",   role: "Security" },
];

const DEPTS = ["Kitchen","Restaurant","Bar","Stewards","Admin","Security"];
const DEPT_COLORS = {
  Kitchen:"#e8f5ee", Restaurant:"#fff8e8", Bar:"#eef2ff",
  Stewards:"#fff0f0", Admin:"#f0f7ff", Security:"#f5f0ff"
};
const DEPT_ACCENT = {
  Kitchen:"#2d7a4f", Restaurant:"#b8860b", Bar:"#3b5bdb",
  Stewards:"#c0392b", Admin:"#1a6fbf", Security:"#6b3fa0"
};
const STATUS_OPTS = [
  { v:"present", label:"Present",  color:"#2d7a4f", bg:"#e8f5ee" },
  { v:"absent",  label:"Absent",   color:"#c0392b", bg:"#fdecea" },
  { v:"dayoff",  label:"Day Off",  color:"#b8860b", bg:"#fef9e7" },
  { v:"ph",      label:"Public Holiday", color:"#6b3fa0", bg:"#f0ebff" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0,10);
const fmtDate = d => { const dt=new Date(d+"T12:00:00"); return dt.toLocaleDateString("en-KE",{weekday:"short",day:"numeric",month:"short",year:"numeric"}); };
const monthKey = (y,m) => `${y}-${String(m).padStart(2,"0")}`;
const isWeekend = dateStr => { const d=new Date(dateStr+"T12:00:00"); return d.getDay()===0||d.getDay()===6; };
const daysInMonth = (y,m) => new Date(y,m,0).getDate();
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function initials(name){ return name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }

// ─── Styles ───────────────────────────────────────────────────────────────────
const G = {
  navy:"#1a2744", navyD:"#111b33", gold:"#c9a84c", goldL:"#e8c96a",
  cream:"#faf7f2", warm:"#f0ebe0", text:"#1a2744", muted:"#7a8099",
  green:"#2d7a4f", greenBg:"#e8f5ee",
  red:"#c0392b", redBg:"#fdecea",
  amber:"#b8860b", amberBg:"#fef9e7",
  grey:"#9aa0b4", greyBg:"#f4f5f8",
};

const css = {
  sidebar:{ width:240,flexShrink:0,background:G.navy,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,zIndex:100,fontFamily:"'DM Sans',sans-serif" },
  brandBox:{ padding:"28px 24px 20px",borderBottom:"1px solid rgba(255,255,255,.08)" },
  navItem:(a)=>({ display:"flex",alignItems:"center",gap:10,padding:"11px 24px",color:a?"#e8c96a":"rgba(255,255,255,.65)",cursor:"pointer",fontSize:14,fontWeight:500,borderLeft:`3px solid ${a?"#c9a84c":"transparent"}`,background:a?"rgba(201,168,76,.12)":"transparent",transition:"all .15s" }),
  main:{ marginLeft:240,flex:1,display:"flex",flexDirection:"column",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif" },
  topbar:{ background:"#fff",borderBottom:"1px solid #e8e4da",padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50 },
  card:{ background:"#fff",borderRadius:12,boxShadow:"0 2px 16px rgba(26,39,68,.08)",border:"1px solid #ece8de",marginBottom:20 },
  cardH:{ padding:"18px 24px",borderBottom:"1px solid #f0ebe0",display:"flex",alignItems:"center",justifyContent:"space-between" },
  cardB:{ padding:24 },
  btn:(v)=>{
    const styles={
      primary:{background:G.navy,color:"#fff",border:"none"},
      gold:{background:G.gold,color:"#fff",border:"none"},
      ghost:{background:"transparent",color:G.navy,border:"1.5px solid #ddd"},
      danger:{background:G.redBg,color:G.red,border:`1px solid #f5c6c2`},
      success:{background:G.greenBg,color:G.green,border:`1px solid #b8dfc8`},
    };
    return{ ...styles[v||"primary"],display:"inline-flex",alignItems:"center",gap:6,padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s" };
  },
  input:{ width:"100%",padding:"9px 12px",border:"1.5px solid #ddd",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontSize:14,color:G.text,background:"#fff",outline:"none",boxSizing:"border-box" },
  label:{ display:"block",fontSize:11,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5 },
  badge:(v)=>{
    const m={present:{bg:G.greenBg,c:G.green},absent:{bg:G.redBg,c:G.red},dayoff:{bg:G.amberBg,c:G.amber},ph:{bg:"#f0ebff",c:"#6b3fa0"},weekend:{bg:G.greyBg,c:G.grey}};
    const s=m[v]||m.weekend;
    return{background:s.bg,color:s.c,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,display:"inline-block"};
  },
};

// ─── Storage hook ─────────────────────────────────────────────────────────────
function useStorage(key, fallback) {
  const [val, setVal] = useState(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(key);
        setVal(r ? JSON.parse(r.value) : fallback);
      } catch { setVal(fallback); }
      setReady(true);
    })();
  }, [key]);

  const save = useCallback(async (v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { await window.storage.set(key, JSON.stringify(next)); } catch {}
  }, [key, val]);

  return [val, save, ready];
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = type==="success"?G.green:type==="error"?G.red:G.navy;
  return <div style={{ position:"fixed",bottom:24,right:24,background:bg,color:"#fff",padding:"12px 22px",borderRadius:10,fontSize:14,fontWeight:500,boxShadow:"0 8px 24px rgba(0,0,0,.2)",zIndex:999,animation:"fadeIn .3s" }}>{msg}</div>;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(26,39,68,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,backdropFilter:"blur(3px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:16,boxShadow:"0 16px 48px rgba(26,39,68,.2)",width:500,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto" }}>
        <div style={{ padding:"22px 26px 16px",borderBottom:"1px solid #f0ebe0",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.navy }}>{title}</span>
          <button onClick={onClose} style={{ background:"none",border:"none",fontSize:20,cursor:"pointer",color:G.muted,lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding:"22px 26px" }}>{children}</div>
        {footer && <div style={{ padding:"14px 26px",borderTop:"1px solid #f0ebe0",display:"flex",justifyContent:"flex-end",gap:10 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, dept, size=36 }) {
  const bg = DEPT_ACCENT[dept]||G.navy;
  return <div style={{ width:size,height:size,borderRadius:"50%",background:bg,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.33,fontWeight:700,flexShrink:0 }}>{initials(name)}</div>;
}

// ─── Status Pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const labels = { present:"Present", absent:"Absent", dayoff:"Day Off", ph:"Public Holiday", weekend:"Weekend" };
  return <span style={css.badge(status)}>{labels[status]||status}</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background:"#fff",borderRadius:12,padding:"20px 22px",border:"1px solid #ece8de",boxShadow:"0 2px 12px rgba(26,39,68,.07)",borderTop:`3px solid ${accent}` }}>
      <div style={{ fontSize:10,textTransform:"uppercase",letterSpacing:"0.09em",color:G.muted,fontWeight:700 }}>{label}</div>
      <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:34,color:G.navy,lineHeight:1.1,margin:"6px 0 2px" }}>{value}</div>
      <div style={{ fontSize:11,color:G.muted }}>{sub}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const now = new Date();
  const [page, setPage] = useState("dashboard");
  const [yr, setYr] = useState(now.getFullYear());
  const [mo, setMo] = useState(now.getMonth()+1);
  const [toast, setToast] = useState({ msg:"", type:"" });

  const [employees, setEmployees, empReady] = useStorage("bist-employees", INITIAL_EMPLOYEES);
  // attendance: { "2026-01-15": { "e1": { status:"present"|"absent"|"dayoff"|"ph", timeIn:"08:00", timeOut:"17:00" } } }
  const [attendance, setAttendance, attReady] = useStorage("bist-attendance", {});

  const [empModal, setEmpModal] = useState({ open:false, emp:null });
  const [delModal, setDelModal] = useState({ open:false, emp:null });
  const [markDate, setMarkDate] = useState(today());
  const [deptFilter, setDeptFilter] = useState("");
  const [search, setSearch] = useState("");
  const [reportTab, setReportTab] = useState("dept");

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg:"", type:"" }), 2800);
  };

  // ── Attendance helpers ──
  const getRecord = (dateStr, empId) => attendance[dateStr]?.[empId] || null;
  const setRecord = async (dateStr, empId, data) => {
    await setAttendance(prev => ({
      ...prev,
      [dateStr]: { ...(prev[dateStr]||{}), [empId]: data }
    }));
  };

  // ── Monthly stats ──
  const monthStats = () => {
    const days = daysInMonth(yr, mo);
    const mk = monthKey(yr, mo);
    let present=0, absent=0, dayoff=0, totalSlots=0;
    for (let d=1; d<=days; d++) {
      const ds = `${mk}-${String(d).padStart(2,"0")}`;
      if (isWeekend(ds)) continue;
      employees.forEach(e => {
        totalSlots++;
        const r = getRecord(ds, e.id);
        if (!r) return;
        if (r.status==="present") present++;
        else if (r.status==="absent") absent++;
        else if (r.status==="dayoff") dayoff++;
      });
    }
    const rate = totalSlots > 0 ? Math.round((present/totalSlots)*100) : 0;
    return { present, absent, dayoff, rate, totalSlots };
  };

  // ── Dept summary for month ──
  const deptSummary = () => {
    const days = daysInMonth(yr, mo);
    const mk = monthKey(yr, mo);
    return DEPTS.map(dept => {
      const emps = employees.filter(e=>e.dept===dept);
      let present=0, absent=0, dayoff=0, weekdays=0;
      for (let d=1; d<=days; d++) {
        const ds = `${mk}-${String(d).padStart(2,"0")}`;
        if (isWeekend(ds)) continue;
        weekdays++;
        emps.forEach(e => {
          const r = getRecord(ds, e.id);
          if (!r) return;
          if (r.status==="present") present++;
          else if (r.status==="absent") absent++;
          else if (r.status==="dayoff") dayoff++;
        });
      }
      const slots = emps.length * weekdays;
      return { dept, emps:emps.length, present, absent, dayoff, rate: slots>0?Math.round((present/slots)*100):0 };
    });
  };

  // ── Employee month stats ──
  const empMonthStats = (empId) => {
    const days = daysInMonth(yr, mo);
    const mk = monthKey(yr, mo);
    let present=0, absent=0, dayoff=0;
    for (let d=1; d<=days; d++) {
      const ds = `${mk}-${String(d).padStart(2,"0")}`;
      if (isWeekend(ds)) continue;
      const r = getRecord(ds, empId);
      if (!r) continue;
      if (r.status==="present") present++;
      else if (r.status==="absent") absent++;
      else if (r.status==="dayoff") dayoff++;
    }
    return { present, absent, dayoff };
  };

  const nav = (p) => { setPage(p); setSearch(""); setDeptFilter(""); };

  if (!empReady || !attReady) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:G.cream,fontFamily:"'DM Sans',sans-serif",color:G.muted }}>
      Loading attendance data…
    </div>
  );

  // ─────────────── PAGES ───────────────────────────────────────────────────────

  // ── Dashboard ──
  const renderDashboard = () => {
    const s = monthStats();
    const ds = deptSummary();
    const todayRecs = employees.map(e => ({ emp:e, rec:getRecord(today(), e.id) }));
    const marked = todayRecs.filter(x=>x.rec).length;
    return (
      <div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
          <StatCard label="Total Employees" value={employees.length} sub="Active staff" accent={G.navy} />
          <StatCard label="Present Today" value={todayRecs.filter(x=>x.rec?.status==="present").length} sub={`of ${employees.length} staff`} accent={G.green} />
          <StatCard label="Absent Today" value={todayRecs.filter(x=>x.rec?.status==="absent").length} sub="Marked absent" accent={G.red} />
          <StatCard label="Monthly Attendance" value={`${s.rate}%`} sub={`${s.present} present days`} accent={G.gold} />
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {/* Today */}
          <div style={css.card}>
            <div style={css.cardH}>
              <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>Today's Status</span>
              <span style={{ fontSize:12,color:G.muted }}>{fmtDate(today())}</span>
            </div>
            <div style={{ padding:0,maxHeight:360,overflowY:"auto" }}>
              {marked===0 && <div style={{ padding:"32px",textAlign:"center",color:G.muted,fontSize:13 }}>No attendance marked yet today.<br/><span style={{ fontSize:12 }}>Go to Mark Attendance to get started.</span></div>}
              {todayRecs.filter(x=>x.rec).map(({emp,rec})=>(
                <div key={emp.id} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 20px",borderBottom:"1px solid #f5f3ef" }}>
                  <Avatar name={emp.name} dept={emp.dept} size={32}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13,fontWeight:600,color:G.navy }}>{emp.name}</div>
                    <div style={{ fontSize:11,color:G.muted }}>{emp.dept} · {emp.role}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <StatusPill status={rec.status}/>
                    {rec.timeIn && <div style={{ fontSize:11,color:G.muted,marginTop:2 }}>{rec.timeIn} – {rec.timeOut||"…"}</div>}
                  </div>
                </div>
              ))}
              {marked < employees.length && marked > 0 && (
                <div style={{ padding:"10px 20px",textAlign:"center",fontSize:12,color:G.muted }}>
                  {employees.length - marked} employees not yet marked
                </div>
              )}
            </div>
          </div>
          {/* Dept chart */}
          <div style={css.card}>
            <div style={css.cardH}><span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>Monthly by Department</span></div>
            <div style={{ padding:"16px 24px" }}>
              {ds.filter(d=>d.emps>0).map(d=>(
                <div key={d.dept} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ fontSize:12,fontWeight:600,color:G.text }}>{d.dept}</span>
                    <span style={{ fontSize:12,color:G.muted }}>{d.rate}% · {d.emps} staff</span>
                  </div>
                  <div style={{ background:"#f0ebe0",borderRadius:4,height:8,overflow:"hidden" }}>
                    <div style={{ width:`${d.rate}%`,height:"100%",background:DEPT_ACCENT[d.dept]||G.navy,borderRadius:4,transition:"width .4s" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Mark Attendance ──
  const renderMark = () => {
    const isWE = isWeekend(markDate);
    const filtered = employees.filter(e => !deptFilter || e.dept===deptFilter);
    const marked = filtered.filter(e => getRecord(markDate, e.id)).length;

    const setStatus = async (empId, status) => {
      const existing = getRecord(markDate, empId) || {};
      await setRecord(markDate, empId, { ...existing, status, timeIn: existing.timeIn||"", timeOut: existing.timeOut||"" });
      showToast("Attendance saved");
    };
    const setTime = async (empId, field, val) => {
      const existing = getRecord(markDate, empId) || { status:"present" };
      await setRecord(markDate, empId, { ...existing, [field]: val });
    };
    const markAll = async (status) => {
      for (const e of filtered) {
        const existing = getRecord(markDate, e.id) || {};
        await setRecord(markDate, e.id, { ...existing, status, timeIn: existing.timeIn||"", timeOut: existing.timeOut||"" });
      }
      showToast(`All marked as ${status}`);
    };

    return (
      <div style={css.card}>
        <div style={css.cardH}>
          <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>Mark Attendance</span>
          <div style={{ display:"flex",gap:10,alignItems:"center",flexWrap:"wrap" }}>
            <input type="date" value={markDate} onChange={e=>setMarkDate(e.target.value)} style={{ ...css.input,width:160,padding:"7px 10px" }}/>
            <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} style={{ ...css.input,width:160,padding:"7px 28px 7px 10px" }}>
              <option value="">All Departments</option>
              {DEPTS.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
            {!isWE && <>
              <button style={css.btn("success")} onClick={()=>markAll("present")}>✓ All Present</button>
              <button style={css.btn("danger")} onClick={()=>markAll("absent")}>✗ All Absent</button>
            </>}
          </div>
        </div>
        {isWE && <div style={{ padding:"24px",textAlign:"center",color:G.amber,background:G.amberBg,fontSize:13,fontWeight:600 }}>⚠️ {fmtDate(markDate)} is a Weekend — attendance tracking is optional.</div>}
        <div style={{ padding:"10px 24px",background:G.warm,fontSize:12,color:G.muted,display:"flex",gap:16 }}>
          <span>📅 {fmtDate(markDate)}</span>
          <span>👥 {filtered.length} employees</span>
          <span style={{ color:G.green,fontWeight:600 }}>✓ {marked} marked</span>
          <span style={{ color:G.red }}>○ {filtered.length - marked} pending</span>
        </div>
        <div>
          {DEPTS.filter(d=>!deptFilter||d===deptFilter).map(dept=>{
            const emps = filtered.filter(e=>e.dept===dept);
            if (!emps.length) return null;
            return (
              <div key={dept}>
                <div style={{ padding:"10px 24px",background:DEPT_COLORS[dept]||"#f8f8f8",borderTop:"1px solid #f0ebe0",fontSize:11,fontWeight:700,color:DEPT_ACCENT[dept]||G.navy,textTransform:"uppercase",letterSpacing:"0.08em" }}>
                  {dept}
                </div>
                {emps.map(emp=>{
                  const rec = getRecord(markDate, emp.id);
                  return (
                    <div key={emp.id} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 24px",borderBottom:"1px solid #f5f3ef",flexWrap:"wrap" }}>
                      <Avatar name={emp.name} dept={emp.dept} size={36}/>
                      <div style={{ minWidth:180 }}>
                        <div style={{ fontSize:13,fontWeight:600,color:G.navy }}>{emp.name}</div>
                        <div style={{ fontSize:11,color:G.muted }}>{emp.role}</div>
                      </div>
                      <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                        {STATUS_OPTS.map(opt=>(
                          <button key={opt.v} onClick={()=>setStatus(emp.id, opt.v)}
                            style={{ padding:"5px 12px",borderRadius:20,border:`1.5px solid ${rec?.status===opt.v?opt.color:"#ddd"}`,background:rec?.status===opt.v?opt.bg:"#fff",color:rec?.status===opt.v?opt.color:G.muted,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .12s" }}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      {rec?.status==="present" && (
                        <div style={{ display:"flex",gap:8,alignItems:"center",marginLeft:"auto" }}>
                          <div>
                            <div style={{ fontSize:10,color:G.muted,fontWeight:600,textTransform:"uppercase",marginBottom:2 }}>Time In</div>
                            <input type="time" defaultValue={rec.timeIn||""} onBlur={e=>setTime(emp.id,"timeIn",e.target.value)}
                              style={{ padding:"5px 8px",border:"1.5px solid #ddd",borderRadius:6,fontSize:13,width:90,fontFamily:"'DM Sans',sans-serif" }}/>
                          </div>
                          <div style={{ marginTop:14,color:G.muted }}>→</div>
                          <div>
                            <div style={{ fontSize:10,color:G.muted,fontWeight:600,textTransform:"uppercase",marginBottom:2 }}>Time Out</div>
                            <input type="time" defaultValue={rec.timeOut||""} onBlur={e=>setTime(emp.id,"timeOut",e.target.value)}
                              style={{ padding:"5px 8px",border:"1.5px solid #ddd",borderRadius:6,fontSize:13,width:90,fontFamily:"'DM Sans',sans-serif" }}/>
                          </div>
                        </div>
                      )}
                      {!rec && <span style={{ marginLeft:"auto",fontSize:11,color:"#ccc" }}>Not marked</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Records ──
  const renderRecords = () => {
    const mk = monthKey(yr, mo);
    const days = daysInMonth(yr, mo);
    const filtered = employees.filter(e =>
      (!deptFilter || e.dept===deptFilter) &&
      (!search || e.name.toLowerCase().includes(search.toLowerCase()))
    );
    return (
      <div style={css.card}>
        <div style={css.cardH}>
          <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>Attendance Records — {MONTHS[mo-1]} {yr}</span>
          <div style={{ display:"flex",gap:10 }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search employee…" style={{ ...css.input,width:200,padding:"7px 10px" }}/>
            <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} style={{ ...css.input,width:160,padding:"7px 28px 7px 10px" }}>
              <option value="">All Departments</option>
              {DEPTS.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
            <thead>
              <tr style={{ background:G.warm }}>
                <th style={{ padding:"10px 16px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.muted,fontWeight:700,borderBottom:"2px solid #e8e4da",position:"sticky",left:0,background:G.warm,minWidth:180 }}>Employee</th>
                {Array.from({length:days},(_,i)=>{
                  const d=String(i+1).padStart(2,"0");
                  const ds=`${mk}-${d}`;
                  const we=isWeekend(ds);
                  return <th key={i} style={{ padding:"6px 4px",textAlign:"center",fontSize:9,color:we?G.grey:G.muted,fontWeight:700,borderBottom:"2px solid #e8e4da",minWidth:26 }}>{i+1}</th>;
                })}
                <th style={{ padding:"10px 12px",textAlign:"center",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.green,fontWeight:700,borderBottom:"2px solid #e8e4da" }}>P</th>
                <th style={{ padding:"10px 12px",textAlign:"center",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.red,fontWeight:700,borderBottom:"2px solid #e8e4da" }}>A</th>
                <th style={{ padding:"10px 12px",textAlign:"center",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.amber,fontWeight:700,borderBottom:"2px solid #e8e4da" }}>DO</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp,ei)=>{
                const s = empMonthStats(emp.id);
                return (
                  <tr key={emp.id} style={{ background:ei%2===0?"#fff":G.cream }}>
                    <td style={{ padding:"8px 16px",position:"sticky",left:0,background:ei%2===0?"#fff":G.cream,borderBottom:"1px solid #f0ebe0" }}>
                      <div style={{ fontWeight:600,color:G.navy,fontSize:12 }}>{emp.name}</div>
                      <div style={{ fontSize:10,color:G.muted }}>{emp.dept}</div>
                    </td>
                    {Array.from({length:days},(_,i)=>{
                      const ds=`${mk}-${String(i+1).padStart(2,"0")}`;
                      const we=isWeekend(ds);
                      const rec=getRecord(ds,emp.id);
                      const dotColor={ present:G.green, absent:G.red, dayoff:G.amber, ph:"#6b3fa0" }[rec?.status]||"#e0e0e0";
                      const bg = we?"#f4f5f8":rec?.status==="present"?G.greenBg:rec?.status==="absent"?G.redBg:rec?.status==="dayoff"?G.amberBg:rec?.status==="ph"?"#f0ebff":"transparent";
                      const sym = we?"–":rec?.status==="present"?"✓":rec?.status==="absent"?"✗":rec?.status==="dayoff"?"D":rec?.status==="ph"?"P":"";
                      const col = we?G.grey:dotColor;
                      return <td key={i} style={{ padding:"4px 2px",textAlign:"center",borderBottom:"1px solid #f0ebe0" }}>
                        <span title={rec?.timeIn?`${rec.timeIn}–${rec.timeOut||"?"}`:""} style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:22,height:22,borderRadius:4,background:bg,color:col,fontSize:10,fontWeight:800 }}>{sym}</span>
                      </td>;
                    })}
                    <td style={{ textAlign:"center",padding:"8px 12px",fontWeight:700,color:G.green,fontSize:12,borderBottom:"1px solid #f0ebe0" }}>{s.present}</td>
                    <td style={{ textAlign:"center",padding:"8px 12px",fontWeight:700,color:G.red,fontSize:12,borderBottom:"1px solid #f0ebe0" }}>{s.absent}</td>
                    <td style={{ textAlign:"center",padding:"8px 12px",fontWeight:700,color:G.amber,fontSize:12,borderBottom:"1px solid #f0ebe0" }}>{s.dayoff}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ── Employees ──
  const EmpForm = ({ init, onSave, onClose }) => {
    const [f, setF] = useState(init || { name:"", dept:"Kitchen", role:"", phone:"", email:"" });
    return (
      <Modal open title={init?.id?"Edit Employee":"Add Employee"} onClose={onClose}
        footer={<>
          <button style={css.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={css.btn("primary")} onClick={()=>{ if(!f.name.trim()){return;} onSave(f); onClose(); }}>
            {init?.id?"Save Changes":"Add Employee"}
          </button>
        </>}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          {[["name","Full Name","text",true],["role","Job Title","text",false],["phone","Phone","tel",false],["email","Email","email",false]].map(([k,l,t,full])=>(
            <div key={k} style={{ gridColumn:full||k==="name"?"1/-1":"auto" }}>
              <label style={css.label}>{l}</label>
              <input type={t} value={f[k]||""} onChange={e=>setF({...f,[k]:e.target.value})} style={css.input} placeholder={l}/>
            </div>
          ))}
          <div>
            <label style={css.label}>Department</label>
            <select value={f.dept} onChange={e=>setF({...f,dept:e.target.value})} style={{ ...css.input,appearance:"none" }}>
              {DEPTS.map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    );
  };

  const renderEmployees = () => {
    const filtered = employees.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.dept.toLowerCase().includes(search.toLowerCase()));
    return (
      <div style={css.card}>
        <div style={css.cardH}>
          <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>Employees ({employees.length})</span>
          <div style={{ display:"flex",gap:10 }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" style={{ ...css.input,width:200,padding:"7px 10px" }}/>
            <button style={css.btn("primary")} onClick={()=>setEmpModal({open:true,emp:null})}>＋ Add Employee</button>
          </div>
        </div>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <thead>
            <tr style={{ background:G.warm }}>
              {["Employee","Department","Role","This Month","Actions"].map(h=>(
                <th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.muted,fontWeight:700,borderBottom:"2px solid #e8e4da" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp,i)=>{
              const s = empMonthStats(emp.id);
              return (
                <tr key={emp.id} style={{ background:i%2===0?"#fff":G.cream }}>
                  <td style={{ padding:"12px 16px",borderBottom:"1px solid #f0ebe0" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <Avatar name={emp.name} dept={emp.dept} size={34}/>
                      <div>
                        <div style={{ fontWeight:600,color:G.navy }}>{emp.name}</div>
                        {emp.email && <div style={{ fontSize:11,color:G.muted }}>{emp.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 16px",borderBottom:"1px solid #f0ebe0" }}>
                    <span style={{ background:DEPT_COLORS[emp.dept],color:DEPT_ACCENT[emp.dept],padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600 }}>{emp.dept}</span>
                  </td>
                  <td style={{ padding:"12px 16px",borderBottom:"1px solid #f0ebe0",color:G.muted,fontSize:12 }}>{emp.role}</td>
                  <td style={{ padding:"12px 16px",borderBottom:"1px solid #f0ebe0" }}>
                    <div style={{ display:"flex",gap:8,fontSize:12 }}>
                      <span style={{ color:G.green,fontWeight:700 }}>✓{s.present}</span>
                      <span style={{ color:G.red }}>✗{s.absent}</span>
                      <span style={{ color:G.amber }}>D{s.dayoff}</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 16px",borderBottom:"1px solid #f0ebe0" }}>
                    <div style={{ display:"flex",gap:6 }}>
                      <button style={css.btn("ghost")} onClick={()=>setEmpModal({open:true,emp:emp})}>✏️ Edit</button>
                      <button style={css.btn("danger")} onClick={()=>setDelModal({open:true,emp:emp})}>🗑</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {empModal.open && (
          <EmpForm init={empModal.emp} onClose={()=>setEmpModal({open:false,emp:null})}
            onSave={async f => {
              if (f.id) {
                await setEmployees(prev=>prev.map(e=>e.id===f.id?{...e,...f}:e));
                showToast("Employee updated");
              } else {
                await setEmployees(prev=>[...prev,{...f,id:`e${Date.now()}`}]);
                showToast("Employee added","success");
              }
            }}/>
        )}
        <Modal open={delModal.open} title="Remove Employee" onClose={()=>setDelModal({open:false,emp:null})}
          footer={<>
            <button style={css.btn("ghost")} onClick={()=>setDelModal({open:false,emp:null})}>Cancel</button>
            <button style={css.btn("danger")} onClick={async()=>{
              await setEmployees(prev=>prev.filter(e=>e.id!==delModal.emp.id));
              showToast("Employee removed","error");
              setDelModal({open:false,emp:null});
            }}>Yes, Remove</button>
          </>}>
          <p style={{ color:G.muted,fontSize:14 }}>Are you sure you want to remove <strong style={{color:G.navy}}>{delModal.emp?.name}</strong>? Their attendance history will be preserved.</p>
        </Modal>
      </div>
    );
  };

  // ── Reports ──
  const renderReports = () => {
    const ds = deptSummary();
    const days = daysInMonth(yr, mo);
    return (
      <div>
        <div style={{ display:"flex",gap:4,background:G.warm,padding:4,borderRadius:10,marginBottom:20,width:"fit-content" }}>
          {["dept","emp"].map(t=>(
            <button key={t} onClick={()=>setReportTab(t)} style={{ padding:"8px 20px",borderRadius:7,fontSize:13,fontWeight:600,cursor:"pointer",border:"none",background:reportTab===t?"#fff":"transparent",color:reportTab===t?G.navy:G.muted,boxShadow:reportTab===t?"0 1px 6px rgba(0,0,0,.08)":"none",transition:"all .15s" }}>
              {t==="dept"?"By Department":"By Employee"}
            </button>
          ))}
        </div>
        {reportTab==="dept" && (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
            {ds.filter(d=>d.emps>0).map(d=>(
              <div key={d.dept} style={{ ...css.card,marginBottom:0 }}>
                <div style={{ padding:"16px 20px",borderBottom:"1px solid #f0ebe0",display:"flex",alignItems:"center",gap:10 }}>
                  <div style={{ width:10,height:10,borderRadius:"50%",background:DEPT_ACCENT[d.dept] }}/>
                  <span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.navy }}>{d.dept}</span>
                  <span style={{ marginLeft:"auto",fontSize:12,color:G.muted }}>{d.emps} staff</span>
                </div>
                <div style={{ padding:"16px 20px" }}>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14 }}>
                    {[["Present",d.present,G.green],[" Absent",d.absent,G.red],["Day Off",d.dayoff,G.amber]].map(([l,v,c])=>(
                      <div key={l} style={{ textAlign:"center",padding:"10px",background:"#faf7f2",borderRadius:8 }}>
                        <div style={{ fontSize:22,fontFamily:"'DM Serif Display',serif",color:c,fontWeight:700 }}>{v}</div>
                        <div style={{ fontSize:10,color:G.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginTop:2 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ fontSize:12,color:G.muted }}>Attendance Rate</span>
                    <span style={{ fontSize:12,fontWeight:700,color:d.rate>=80?G.green:d.rate>=60?G.amber:G.red }}>{d.rate}%</span>
                  </div>
                  <div style={{ background:"#f0ebe0",borderRadius:4,height:8,overflow:"hidden" }}>
                    <div style={{ width:`${d.rate}%`,height:"100%",background:d.rate>=80?G.green:d.rate>=60?G.amber:G.red,borderRadius:4 }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {reportTab==="emp" && (
          <div style={css.card}>
            <div style={{ padding:"0 0 0 0",overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
                <thead>
                  <tr style={{ background:G.warm }}>
                    {["Employee","Dept","Present","Absent","Day Off","Rate"].map(h=>(
                      <th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em",color:G.muted,fontWeight:700,borderBottom:"2px solid #e8e4da" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...employees].sort((a,b)=>a.dept.localeCompare(b.dept)||a.name.localeCompare(b.name)).map((emp,i)=>{
                    const s = empMonthStats(emp.id);
                    const weekdays = Array.from({length:days},(_,j)=>{
                      const ds=`${monthKey(yr,mo)}-${String(j+1).padStart(2,"0")}`;
                      return !isWeekend(ds);
                    }).filter(Boolean).length;
                    const rate = weekdays>0?Math.round((s.present/weekdays)*100):0;
                    return (
                      <tr key={emp.id} style={{ background:i%2===0?"#fff":G.cream }}>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <Avatar name={emp.name} dept={emp.dept} size={28}/>
                            <span style={{ fontWeight:600,color:G.navy }}>{emp.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0",fontSize:12,color:DEPT_ACCENT[emp.dept] }}>{emp.dept}</td>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0",fontWeight:700,color:G.green }}>{s.present}</td>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0",fontWeight:700,color:s.absent>0?G.red:G.muted }}>{s.absent}</td>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0",color:G.amber }}>{s.dayoff}</td>
                        <td style={{ padding:"10px 16px",borderBottom:"1px solid #f0ebe0" }}>
                          <span style={{ fontWeight:700,color:rate>=80?G.green:rate>=60?G.amber:G.red }}>{rate}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Export ──
  const exportCSV = () => {
    const mk = monthKey(yr, mo);
    const days = daysInMonth(yr, mo);
    const headers = ["Employee","Department","Role",...Array.from({length:days},(_,i)=>`${i+1}`),"Present","Absent","DayOff"];
    const rows = employees.map(emp=>{
      const dayCells = Array.from({length:days},(_,i)=>{
        const ds=`${mk}-${String(i+1).padStart(2,"0")}`;
        if(isWeekend(ds)) return "WE";
        const r=getRecord(ds,emp.id);
        if(!r) return "";
        if(r.status==="present") return r.timeIn?`${r.timeIn}-${r.timeOut||"?"}`:r.status.toUpperCase();
        return r.status.toUpperCase();
      });
      const s=empMonthStats(emp.id);
      return [emp.name,emp.dept,emp.role,...dayCells,s.present,s.absent,s.dayoff];
    });
    const csv = [headers,...rows].map(r=>r.join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=`Bistronomy_Attendance_${MONTHS[mo-1]}_${yr}.csv`; a.click();
    showToast("CSV downloaded ✓");
  };

  const exportHTML = () => {
    const mk = monthKey(yr, mo);
    const days = daysInMonth(yr, mo);
    const ds2 = deptSummary();
    let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Attendance Report ${MONTHS[mo-1]} ${yr}</title>
    <style>body{font-family:Arial,sans-serif;padding:20px;color:#1a2744}h1,h2{color:#1a2744}table{border-collapse:collapse;width:100%;margin-bottom:20px;font-size:11px}th,td{border:1px solid #ddd;padding:6px 8px;text-align:center}th{background:#1a2744;color:#fff}.present{background:#e8f5ee;color:#2d7a4f}.absent{background:#fdecea;color:#c0392b}.dayoff{background:#fef9e7;color:#b8860b}.we{background:#f4f5f8;color:#9aa0b4}</style></head><body>
    <h1>The Bistronomy Culinary Diani Beach Ltd</h1>
    <h2>Attendance Report — ${MONTHS[mo-1]} ${yr}</h2>
    <h3>Department Summary</h3>
    <table><tr><th>Department</th><th>Staff</th><th>Present Days</th><th>Absent</th><th>Day Off</th><th>Rate</th></tr>
    ${ds2.map(d=>`<tr><td>${d.dept}</td><td>${d.emps}</td><td>${d.present}</td><td>${d.absent}</td><td>${d.dayoff}</td><td>${d.rate}%</td></tr>`).join("")}
    </table>
    <h3>Full Attendance</h3>
    <table><tr><th>Employee</th><th>Dept</th>${Array.from({length:days},(_,i)=>`<th>${i+1}</th>`).join("")}<th>P</th><th>A</th><th>DO</th></tr>
    ${employees.map(emp=>{
      const cells = Array.from({length:days},(_,i)=>{
        const ds=`${mk}-${String(i+1).padStart(2,"0")}`;
        if(isWeekend(ds)) return `<td class="we">–</td>`;
        const r=getRecord(ds,emp.id);
        if(!r) return `<td></td>`;
        const cls={present:"present",absent:"absent",dayoff:"dayoff"}[r.status]||"";
        const sym={present:"✓",absent:"✗",dayoff:"D",ph:"P"}[r.status]||r.status;
        return `<td class="${cls}" title="${r.timeIn||""}">${sym}</td>`;
      }).join("");
      const s=empMonthStats(emp.id);
      return `<tr><td style="text-align:left">${emp.name}</td><td>${emp.dept}</td>${cells}<td class="present">${s.present}</td><td class="absent">${s.absent}</td><td class="dayoff">${s.dayoff}</td></tr>`;
    }).join("")}
    </table></body></html>`;
    const blob = new Blob([html],{type:"text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=`Bistronomy_Attendance_${MONTHS[mo-1]}_${yr}.html`; a.click();
    showToast("Report downloaded — open in browser to print as PDF ✓");
  };

  const renderExport = () => (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
      {[
        { icon:"📊", title:"Export as CSV", desc:"Download a spreadsheet-ready CSV file. Open in Excel or Google Sheets.", action:exportCSV, label:"Download CSV", color:G.green },
        { icon:"📄", title:"Export as PDF", desc:"Download an HTML report and print/save as PDF using your browser's print feature (Ctrl+P → Save as PDF).", action:exportHTML, label:"Download Report", color:G.navy },
      ].map(ex=>(
        <div key={ex.title} style={{ ...css.card,marginBottom:0 }}>
          <div style={{ padding:"28px",textAlign:"center" }}>
            <div style={{ fontSize:40,marginBottom:12 }}>{ex.icon}</div>
            <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.navy,marginBottom:8 }}>{ex.title}</div>
            <div style={{ fontSize:13,color:G.muted,marginBottom:24,lineHeight:1.6 }}>{ex.desc}</div>
            <button style={{ ...css.btn("primary"),background:ex.color,justifyContent:"center",width:"100%",padding:"12px" }} onClick={ex.action}>{ex.label}</button>
          </div>
        </div>
      ))}
      <div style={{ ...css.card,marginBottom:0,gridColumn:"1/-1" }}>
        <div style={css.cardH}><span style={{ fontFamily:"'DM Serif Display',serif",fontSize:16 }}>Export Summary — {MONTHS[mo-1]} {yr}</span></div>
        <div style={{ padding:"16px 24px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
          {(()=>{const s=monthStats(); return [
            ["Total Employees",employees.length],
            ["Present Days",s.present],
            ["Absent Days",s.absent],
            ["Attendance Rate",`${s.rate}%`],
          ]})().map(([l,v])=>(
            <div key={l} style={{ textAlign:"center",padding:"14px",background:G.cream,borderRadius:10 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:26,color:G.navy }}>{v}</div>
              <div style={{ fontSize:11,color:G.muted,marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Month selector init ──
  const months = [];
  for (let y=2025;y<=2027;y++) for (let m=1;m<=12;m++) months.push({y,m});

  const PAGES = [
    { id:"dashboard", label:"Dashboard",  icon:"📊" },
    { id:"mark",      label:"Mark Attendance", icon:"✅" },
    { id:"records",   label:"Records",    icon:"📋" },
    { id:"employees", label:"Employees",  icon:"👥" },
    { id:"reports",   label:"Reports",    icon:"📈" },
    { id:"export",    label:"Export",     icon:"⬇️" },
  ];

  const PAGE_TITLES = { dashboard:"Dashboard", mark:"Mark Attendance", records:"Attendance Records", employees:"Employees", reports:"Reports", export:"Export Data" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf7f2; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f0ebe0; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
        button:hover { opacity: .88; }
        input[type=time]::-webkit-calendar-picker-indicator { opacity: 0.5; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{ display:"flex",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif" }}>
        {/* Sidebar */}
        <aside style={css.sidebar}>
          <div style={css.brandBox}>
            <div style={{ fontFamily:"'DM Serif Display',serif",color:"#e8c96a",fontSize:20,lineHeight:1.2 }}>The Bistronomy</div>
            <div style={{ color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:3 }}>Culinary · Diani Beach</div>
          </div>
          <nav style={{ flex:1,padding:"12px 0" }}>
            <div style={{ padding:"10px 24px 4px",color:"rgba(255,255,255,.3)",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700 }}>Menu</div>
            {PAGES.map(p=>(
              <div key={p.id} style={css.navItem(page===p.id)} onClick={()=>nav(p.id)}>
                <span style={{ fontSize:15 }}>{p.icon}</span> {p.label}
              </div>
            ))}
          </nav>
          <div style={{ padding:"14px 24px",borderTop:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.25)",fontSize:10 }}>
            Attendance Management System
          </div>
        </aside>

        {/* Main */}
        <main style={css.main}>
          <div style={css.topbar}>
            <div style={{ fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.navy }}>{PAGE_TITLES[page]}</div>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <span style={{ background:G.navy,color:"#e8c96a",fontSize:11,fontWeight:700,letterSpacing:"0.08em",padding:"5px 14px",borderRadius:20,textTransform:"uppercase" }}>{MONTHS[mo-1]} {yr}</span>
              <select value={`${yr}-${mo}`} onChange={e=>{ const [y,m]=e.target.value.split("-"); setYr(+y); setMo(+m); }}
                style={{ ...css.input,width:"auto",padding:"6px 28px 6px 10px",fontSize:12,appearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a8099'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center" }}>
                {months.map(({y,m})=><option key={`${y}-${m}`} value={`${y}-${m}`}>{MONTHS[m-1]} {y}</option>)}
              </select>
            </div>
          </div>

          <div style={{ padding:28,flex:1 }}>
            {page==="dashboard" && renderDashboard()}
            {page==="mark"      && renderMark()}
            {page==="records"   && renderRecords()}
            {page==="employees" && renderEmployees()}
            {page==="reports"   && renderReports()}
            {page==="export"    && renderExport()}
          </div>
        </main>
      </div>
      <Toast msg={toast.msg} type={toast.type}/>
    </>
  );
}
