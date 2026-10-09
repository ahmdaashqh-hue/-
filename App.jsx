import { useState, useEffect } from "react";
import "./App.css";

const surahs = [
  ["الفَاتِحَة", 7, "مَكِّيَّة"],
  ["البَقَرَة", 286, "مَدَنِيَّة"],
  ["آل عِمْرَان", 200, "مَدَنِيَّة"],
  ["النِّسَاء", 176, "مَدَنِيَّة"],
  ["المَائِدَة", 120, "مَدَنِيَّة"],
  ["الأَنْعَام", 165, "مَكِّيَّة"],
  ["الأَعْرَاف", 206, "مَكِّيَّة"],
  ["الأَنْفَال", 75, "مَدَنِيَّة"],
  ["التَّوْبَة", 129, "مَدَنِيَّة"],
  ["يُونُس", 109, "مَكِّيَّة"],
  ["هُود", 123, "مَكِّيَّة"],
  ["يُوسُف", 111, "مَكِّيَّة"],
  ["الرَّعْد", 43, "مَدَنِيَّة"],
  ["إِبْرَاهِيم", 52, "مَكِّيَّة"],
  ["الحِجْر", 99, "مَكِّيَّة"],
  ["النَّحْل", 128, "مَكِّيَّة"],
  ["الإِسْرَاء", 111, "مَكِّيَّة"],
  ["الكَهْف", 110, "مَكِّيَّة"],
  ["مَرْيَم", 98, "مَكِّيَّة"],
  ["طَه", 135, "مَكِّيَّة"]
];

const tabs = [
  ["home", "الرئيسية", "⌂"],
  ["quran", "المصحف", "۞"],
  ["search", "البحث", "⌕"],
  ["calendar", "المناسبات", "▦"],
  ["settings", "الإعدادات", "⚙"]
];

function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [clock, setClock] = useState(new Date());
  const [saved, setSaved] = useState([]);
  const [dark, setDark] = useState(true);
  const [fontSize, setFontSize] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = surahs.filter(s => s[0].includes(query.trim()));

  function toggleSaved(name) {
    setSaved(old =>
      old.includes(name)
        ? old.filter(item => item !== name)
        : [...old, name]
    );
  }

  const time = clock.toLocaleTimeString("ar-IQ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const date = clock.toLocaleDateString("ar-IQ", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <main className={dark ? "app dark" : "app light"}>
      <header className="app-header">
        <div className="logo-section">
          <span className="logo-symbol">۞</span>
          <div>
            <h1 className="app-title">مُصْحَفُ النُّور</h1>
            <p className="app-subtitle">نُورٌ عَلَى نُورٍ</p>
          </div>
        </div>
        <button className="icon-btn" onClick={() => setPage("settings")}>⚙</button>
      </header>

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-overlay">
              <span className="eyebrow">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</span>
              <h2>السَّلَامُ عَلَيْكَ<br />يَا أَبَا عَبْدِ اللهِ</h2>
              <div className="ornament">✦ ━━━━━ ۞ ━━━━━ ✦</div>
              <p>الْقُرْآنُ الْكَرِيمُ • سَكِينَةٌ لِلرُّوحِ</p>
              <button className="gold-btn" onClick={() => setPage("quran")}>
                <span>۞</span> ابدأ القراءة
              </button>
            </div>
            <div className="hero-caption">كَرْبَلَاءُ • مَدْرَسَةُ الْوَفَاءِ</div>
          </section>

          <section className="clock-card">
            <div className="clock-face">
              <div className="clock-center"></div>
              {[...Array(12)].map((_, i) => (
                <span
                  className="clock-number"
                  key={i}
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-48px) rotate(-${i * 30}deg)`
                  }}
                >
                  {i === 0 ? "١٢" : ["", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "١٠", "١١"][i]}
                </span>
              ))}
              <div
                className="hand hour-hand"
                style={{
                  transform: `translateX(-50%) rotate(${((clock.getHours() % 12) * 30) + (clock.getMinutes() * 0.5)}deg)`
                }}
              ></div>
              <div
                className="hand minute-hand"
                style={{
                  transform: `translateX(-50%) rotate(${clock.getMinutes() * 6}deg)`
                }}
              ></div>
              <div
                className="hand second-hand"
                style={{
                  transform: `translateX(-50%) rotate(${clock.getSeconds() * 6}deg)`
                }}
              ></div>
            </div>
            <div className="clock-info">
              <span className="section-kicker">وَقْتُكَ وَذِكْرُ اللهِ</span>
              <h2 className="digital-time">{time}</h2>
              <p>{date}</p>
              <div className="mini-divider"></div>
              <span>التَّقْوِيمُ الْهِجْرِيُّ</span>
              <strong>تَأْكِيدُ التَّارِيخِ الْهِجْرِيِّ قَيْدُ الإِضَافَة</strong>
            </div>
          </section>

          <section className="quick-grid">
            {[
              ["۞", "القرآن الكريم", "quran"],
              ["⌕", "البحث في الآيات", "search"],
              ["▦", "المناسبات", "calendar"],
              ["♧", "المحفوظات", "saved"]
            ].map(item => (
              <button
                className="quick-card"
                key={item[1]}
                onClick={() => setPage(item[2])}
              >
                <span>{item[0]}</span>
                <strong>{item[1]}</strong>
                <small>اِفْتَحِ القِسْمَ ←</small>
              </button>
            ))}
          </section>

          <section className="section-heading">
            <div>
              <span className="section-kicker">رِحْلَتُكَ مَعَ الْقُرْآنِ</span>
              <h2>وِرْدُكَ الْيَوْمِيُّ</h2>
            </div>
            <button className="text-btn" onClick={() => setPage("quran")}>عرض السور ←</button>
          </section>

          <button className="continue-card" onClick={() => setPage("quran")}>
            <div className="surah-seal">۞</div>
            <div>
              <h3>اِبْدَأْ بِسُورَةِ الْفَاتِحَةِ</h3>
              <p>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
              <small>اضغط للانتقال إلى فهرس السور</small>
            </div>
            <span className="continue-arrow">←</span>
          </button>
        </>
      )}

      {page === "quran" && (
        <section className="content-section">
          <SectionTitle title="فِهْرِسُ السُّوَرِ" subtitle="كَلَامُ اللهِ نُورٌ وَهُدًى" />
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحث عن اسم السورة..."
          />
          <div className="surah-list">
            {filtered.map((s) => (
              <div className="surah-row" key={s[0]}>
                <span className="surah-seal">{surahs.indexOf(s) + 1}</span>
                <div className="surah-info">
                  <strong>{s[0]}</strong>
                  <small>{s[2]} • {s[1]} آية</small>
                </div>
                <button className="save-btn" onClick={() => toggleSaved(s[0])}>
                  {saved.includes(s[0]) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
          <p className="notice">هذه قائمة أولية للعرض، وسيُربط فهرس القرآن الكامل في الخطوة التالية.</p>
        </section>
      )}

      {page === "search" && (
        <section className="content-section">
          <SectionTitle title="البَحْثُ فِي الْقُرْآنِ" subtitle="آيَاتٌ تَهْدِي الْقُلُوبَ" />
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="اكتب اسم سورة للبحث..."
          />
          <div className="surah-list">
            {filtered.map(s => (
              <div className="surah-row" key={s[0]}>
                <div className="surah-info">
                  <strong>{s[0]}</strong>
                  <small>{s[2]} • {s[1]} آية</small>
                </div>
                <button className="text-btn" onClick={() => setPage("quran")}>عرض</button>
              </div>
            ))}
          </div>
          <p className="notice">البحث الحالي بأسماء السور؛ البحث في نصوص الآيات سيُربط بقاعدة القرآن لاحقاً.</p>
        </section>
      )}

      {page === "saved" && (
        <section className="content-section">
          <SectionTitle title="الْمَحْفُوظَاتُ" subtitle="مَوَاضِعُ تَعُودُ إِلَيْهَا" />
          {saved.length === 0 ? (
            <p className="empty-state">لم تحفظ أي سورة بعد. اضغط ☆ بجانب السورة لحفظها.</p>
          ) : (
            saved.map(name => (
              <div className="surah-row" key={name}>
                <strong>{name}</strong>
                <button className="save-btn" onClick={() => toggleSaved(name)}>★</button>
              </div>
            ))
          )}
        </section>
      )}

      {page === "calendar" && (
        <section className="content-section">
          <SectionTitle title="التَّقْوِيمُ وَالْمُنَاسَبَاتُ" subtitle="ذِكْرَى أَهْلِ الْبَيْتِ عَلَيْهِمُ السَّلَامُ" />
          <div className="calendar-date">
            <span>التَّارِيخُ الْمِيلَادِيُّ</span>
            <strong>{date}</strong>
            <small>التاريخ الهجري الدقيق يحتاج ربط تقويم موثوق.</small>
          </div>
          {[
            ["١ مُحَرَّم", "بِدَايَةُ شَهْرِ مُحَرَّم", "يُحدَّد وفق التقويم الهجري المعتمد"],
            ["١٠ مُحَرَّم", "عَاشُورَاءُ الْحُسَيْنِ (ع)", "ذِكْرَى اسْتِشْهَادِ الإِمَامِ الْحُسَيْنِ"],
            ["٢٠ صَفَر", "زِيَارَةُ الأَرْبَعِينِ", "الموعد الهجري يحتاج تقويماً موثوقاً"]
          ].map(e => (
            <div className="event-row" key={e[0]}>
              <span className="event-date">{e[0]}</span>
              <div>
                <strong>{e[1]}</strong>
                <small>{e[2]}</small>
              </div>
            </div>
          ))}
          <p className="notice">هذه مناسبات تعريفية؛ سنضيف بقية الولادات والوفيات بعد التحقق من تواريخها ومصادرها.</p>
        </section>
      )}

      {page === "settings" && (
        <section className="content-section">
          <SectionTitle title="الإِعْدَادَاتُ" subtitle="خُصُوصِيَّتُكَ وَرَاحَتُكَ" />
          <div className="setting-row">
            <span>المظهر الداكن</span>
            <button className="gold-btn small" onClick={() => setDark(!dark)}>
              {dark ? "داكن" : "فاتح"}
            </button>
          </div>
          <div className="setting-row">
            <span>حجم الخط القرآني</span>
            <div className="font-controls">
              <button onClick={() => setFontSize(Math.max(18, fontSize - 2))}>−</button>
              <strong>{fontSize}</strong>
              <button onClick={() => setFontSize(Math.min(40, fontSize + 2))}>+</button>
            </div>
          </div>
          <p className="sample-verse" style={{ fontSize: `${fontSize}px` }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="notice">التلاوة والتنزيل والتفسير ستُفعَّل بعد ربط مصادر موثوقة للصوت والنصوص.</p>
        </section>
      )}

      <footer className="footer">
        <div className="footer-ornament">❖ ━━━━━ ۞ ━━━━━ ❖</div>
        <h2>يَا حُسَيْنُ</h2>
        <p>السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللهِ</p>
        <small>مُصْحَفُ النُّور • نُسْخَةٌ تَجْرِيبِيَّةٌ</small>
      </footer>

      <nav className="bottom-nav">
        {tabs.map(t => (
          <button
            key={t[0]}
            className={page === t[0] ? "nav-item active" : "nav-item"}
            onClick={() => setPage(t[0])}
          >
            <span>{t[2]}</span>
            <small>{t[1]}</small>
          </button>
        ))}
      </nav>
    </main>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title-wrap">
      <span className="section-ornament">۞</span>
      <div>
        <h2 className="section-main-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <span className="section-ornament">۞</span>
    </div>
  );
}

export default App;
