// characters.js — キャラクターSVG定義
// window.CHAR_SVGS[kind][stageKey] = SVG文字列（絵文字のフォールバックあり）

window.CHAR_SVGS = {

  // ── ひよこ (pet) ──────────────────────────────────────
  pet: {
    egg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="22" rx="11" ry="13" fill="#f5eed8" stroke="#c9a85a" stroke-width="1.5"/>
      <ellipse cx="15.5" cy="15" rx="3" ry="5" fill="rgba(255,255,255,0.4)"/>
    </svg>`,

    baby: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M9,30 Q20,36 31,30 L31,36 Q20,40 9,36Z" fill="#f5eed8" stroke="#c9a85a" stroke-width="1.5"/>
      <path d="M9,30 Q14,33 20,33 Q26,33 31,30" fill="none" stroke="#c9a85a" stroke-width="1.5"/>
      <path d="M15,28 L17,25 L14,23" fill="none" stroke="#c9a85a" stroke-width="1" stroke-linecap="round"/>
      <circle cx="20" cy="19" r="11" fill="#ffd745"/>
      <circle cx="16" cy="18" r="2.2" fill="#222"/>
      <circle cx="24" cy="18" r="2.2" fill="#222"/>
      <circle cx="16.8" cy="17.2" r="0.8" fill="#fff"/>
      <circle cx="24.8" cy="17.2" r="0.8" fill="#fff"/>
      <polygon points="18.5,21.5 21.5,21.5 20,24" fill="#ff8c22"/>
      <path d="M10,24 Q7,21 9,17 Q12,21 11,26Z" fill="#f7c030"/>
      <path d="M30,24 Q33,21 31,17 Q28,21 29,26Z" fill="#f7c030"/>
    </svg>`,

    child: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="28" rx="11" ry="9" fill="#ffd745"/>
      <circle cx="20" cy="15" r="10" fill="#ffd745"/>
      <circle cx="16" cy="14" r="2.2" fill="#222"/>
      <circle cx="24" cy="14" r="2.2" fill="#222"/>
      <circle cx="16.8" cy="13.2" r="0.8" fill="#fff"/>
      <circle cx="24.8" cy="13.2" r="0.8" fill="#fff"/>
      <polygon points="18.5,17 21.5,17 20,19.5" fill="#ff8c22"/>
      <path d="M9,25 Q5,19 9,13 Q12,21 11,27Z" fill="#f7c030"/>
      <path d="M31,25 Q35,19 31,13 Q28,21 29,27Z" fill="#f7c030"/>
      <line x1="16" y1="37" x2="13" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="16" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="19" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="21" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="24" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="27" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    adult: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,23 Q35,14 37,8 Q31,17 27,25Z" fill="#d4a020"/>
      <path d="M30,26 Q38,19 38,12 Q33,22 30,28Z" fill="#f7c030" opacity=".7"/>
      <ellipse cx="17" cy="27" rx="12" ry="9" fill="#e8b820"/>
      <ellipse cx="16" cy="22" rx="3.5" ry="5" fill="#e04848"/>
      <circle cx="18" cy="13" r="9" fill="#e8b820"/>
      <path d="M14,7 Q16,3 18,6 Q19,1.5 21,5 Q22,3 23,6 Q21,5 18,8" fill="#cc1c1c"/>
      <circle cx="22" cy="13" r="2.2" fill="#222"/>
      <circle cx="22.8" cy="12.2" r="0.8" fill="#fff"/>
      <polygon points="24,15 28.5,16 24,17.5" fill="#ff8c22"/>
      <path d="M7,26 Q4,19 7,14 Q10,21 9,28Z" fill="#c89014"/>
      <line x1="12" y1="36" x2="9" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="36" x2="12" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="36" x2="15" y2="38" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="19" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="22" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="25" y2="38" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    master: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,22 Q5,14 3,4 Q9,16 15,22 Q7,11 6,2 Q14,13 18,22" fill="#e85000" opacity=".9"/>
      <path d="M20,22 Q35,14 37,4 Q31,16 25,22 Q33,11 34,2 Q26,13 22,22" fill="#e85000" opacity=".9"/>
      <path d="M16,29 Q8,38 5,40 Q16,33 20,30 Q24,33 35,40 Q32,38 24,29" fill="#ff7010"/>
      <ellipse cx="20" cy="24" rx="9" ry="7" fill="#ffc020"/>
      <circle cx="20" cy="14" r="9" fill="#ffc020"/>
      <path d="M20,7 Q17,1 15,4 Q18,6 20,9" fill="#e82000"/>
      <path d="M20,7 Q20,0 20,4 Q20,7 20,9" fill="#ff5010"/>
      <path d="M20,7 Q23,1 25,4 Q22,6 20,9" fill="#e82000"/>
      <circle cx="16.5" cy="14" r="2.5" fill="#8b1500"/>
      <circle cx="23.5" cy="14" r="2.5" fill="#8b1500"/>
      <circle cx="16.5" cy="14" r="1.5" fill="#ffaa00"/>
      <circle cx="23.5" cy="14" r="1.5" fill="#ffaa00"/>
      <polygon points="18.5,17 21.5,17 20,20.5" fill="#ff7010"/>
      <circle cx="5" cy="7" r="1.8" fill="#ffd000"/>
      <circle cx="35" cy="7" r="1.8" fill="#ffd000"/>
      <circle cx="3" cy="17" r="1.2" fill="#ff8000"/>
      <circle cx="37" cy="17" r="1.2" fill="#ff8000"/>
    </svg>`,

    // ── バリアントB: ブルー/クール系 ──
    child_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="28" rx="11" ry="9" fill="#44aaff"/>
      <circle cx="20" cy="15" r="10" fill="#44aaff"/>
      <circle cx="16" cy="14" r="2.2" fill="#111"/>
      <circle cx="24" cy="14" r="2.2" fill="#111"/>
      <circle cx="16.8" cy="13.2" r="0.8" fill="#fff"/>
      <circle cx="24.8" cy="13.2" r="0.8" fill="#fff"/>
      <polygon points="18.5,17 21.5,17 20,19.5" fill="#ff8c22"/>
      <path d="M9,25 Q5,19 9,13 Q12,21 11,27Z" fill="#2288ee"/>
      <path d="M31,25 Q35,19 31,13 Q28,21 29,27Z" fill="#2288ee"/>
      <line x1="16" y1="37" x2="13" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="16" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="19" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="21" y2="39" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="24" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="27" y2="40" stroke="#ff8c22" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    adult_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,23 Q35,14 37,8 Q31,17 27,25Z" fill="#8a5810"/>
      <path d="M30,26 Q38,19 38,12 Q33,22 30,28Z" fill="#c07818" opacity=".7"/>
      <ellipse cx="17" cy="27" rx="12" ry="9" fill="#c07818"/>
      <ellipse cx="16" cy="22" rx="3.5" ry="5" fill="#cc2222"/>
      <circle cx="18" cy="13" r="9" fill="#c07818"/>
      <path d="M14,7 Q16,3 18,6 Q19,1.5 21,5 Q22,3 23,6 Q21,5 18,8" fill="#aa1010"/>
      <circle cx="22" cy="13" r="2.2" fill="#111"/>
      <circle cx="22.8" cy="12.2" r="0.8" fill="#ff8800"/>
      <polygon points="24,15 28.5,16 24,17.5" fill="#cc8820"/>
      <path d="M7,26 Q4,19 7,14 Q10,21 9,28Z" fill="#8a5810"/>
      <line x1="16" y1="36" x2="13" y2="39" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="16" y2="39" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="19" y2="38" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="19" y2="38" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="22" y2="39" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="25" y2="38" stroke="#cc8820" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    master_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,22 Q5,14 3,4 Q9,16 15,22 Q7,11 6,2 Q14,13 18,22" fill="#3322aa" opacity=".9"/>
      <path d="M20,22 Q35,14 37,4 Q31,16 25,22 Q33,11 34,2 Q26,13 22,22" fill="#3322aa" opacity=".9"/>
      <path d="M16,29 Q8,38 5,40 Q16,33 20,30 Q24,33 35,40 Q32,38 24,29" fill="#5533cc"/>
      <ellipse cx="20" cy="24" rx="9" ry="7" fill="#6644cc"/>
      <circle cx="20" cy="14" r="9" fill="#6644cc"/>
      <path d="M20,7 Q17,1 15,4 Q18,6 20,9" fill="#2200aa"/>
      <path d="M20,7 Q20,0 20,4 Q20,7 20,9" fill="#4422cc"/>
      <path d="M20,7 Q23,1 25,4 Q22,6 20,9" fill="#2200aa"/>
      <circle cx="16.5" cy="14" r="2.5" fill="#110044"/>
      <circle cx="23.5" cy="14" r="2.5" fill="#110044"/>
      <circle cx="16.5" cy="14" r="1.5" fill="#ee2244"/>
      <circle cx="23.5" cy="14" r="1.5" fill="#ee2244"/>
      <polygon points="18.5,17 21.5,17 20,20.5" fill="#5533cc"/>
      <circle cx="5" cy="7" r="1.8" fill="#8866ff"/>
      <circle cx="35" cy="7" r="1.8" fill="#8866ff"/>
      <circle cx="3" cy="17" r="1.2" fill="#aa44ff"/>
      <circle cx="37" cy="17" r="1.2" fill="#aa44ff"/>
    </svg>`,

    // ── バリアントC: ピンク/神聖系 ──
    child_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="28" rx="11" ry="9" fill="#ffaacc"/>
      <circle cx="20" cy="15" r="10" fill="#ffaacc"/>
      <path d="M20,8 Q17.5,5.5 17.5,8 Q17.5,10.5 20,12 Q22.5,10.5 22.5,8 Q22.5,5.5 20,8" fill="#ff4488" opacity=".7"/>
      <circle cx="16" cy="14" r="2.2" fill="#222"/>
      <circle cx="24" cy="14" r="2.2" fill="#222"/>
      <circle cx="16.8" cy="13.2" r="0.8" fill="#fff"/>
      <circle cx="24.8" cy="13.2" r="0.8" fill="#fff"/>
      <polygon points="18.5,17 21.5,17 20,19.5" fill="#ff6699"/>
      <path d="M9,25 Q5,19 9,13 Q12,21 11,27Z" fill="#ff88bb"/>
      <path d="M31,25 Q35,19 31,13 Q28,21 29,27Z" fill="#ff88bb"/>
      <line x1="16" y1="37" x2="13" y2="40" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="16" y2="40" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="37" x2="19" y2="39" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="21" y2="39" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="24" y2="40" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="27" y2="40" stroke="#ff6699" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    adult_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,23 Q35,14 37,8 Q31,17 27,25Z" fill="#ddd8cc"/>
      <path d="M30,26 Q38,19 38,12 Q33,22 30,28Z" fill="#f0ece0" opacity=".7"/>
      <ellipse cx="17" cy="27" rx="12" ry="9" fill="#f5f0e8"/>
      <ellipse cx="16" cy="22" rx="3.5" ry="5" fill="#ffbbdd"/>
      <circle cx="18" cy="13" r="9" fill="#f5f0e8"/>
      <path d="M14,7 Q16,3 18,6 Q19,1.5 21,5 Q22,3 23,6 Q21,5 18,8" fill="#ffccee"/>
      <circle cx="22" cy="13" r="2.2" fill="#3366cc"/>
      <circle cx="22.8" cy="12.2" r="0.8" fill="#fff"/>
      <polygon points="24,15 28.5,16 24,17.5" fill="#ffbb88"/>
      <path d="M7,26 Q4,19 7,14 Q10,21 9,28Z" fill="#e8e4d8"/>
      <circle cx="3" cy="22" r="1.2" fill="#ffddee" opacity=".8"/>
      <circle cx="37" cy="22" r="1.2" fill="#ffddee" opacity=".8"/>
      <line x1="16" y1="36" x2="13" y2="39" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="16" y2="39" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="19" y2="38" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="19" y2="38" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="22" y2="39" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="25" y2="38" stroke="#ffbb88" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    master_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,22 Q5,14 3,4 Q9,16 15,22 Q7,11 6,2 Q14,13 18,22" fill="#ffccee" opacity=".9"/>
      <path d="M20,22 Q35,14 37,4 Q31,16 25,22 Q33,11 34,2 Q26,13 22,22" fill="#ccddff" opacity=".9"/>
      <path d="M16,29 Q8,38 5,40 Q16,33 20,30 Q24,33 35,40 Q32,38 24,29" fill="#eeccff"/>
      <ellipse cx="20" cy="24" rx="9" ry="7" fill="#fff8f0"/>
      <circle cx="20" cy="14" r="9" fill="#fff8f0"/>
      <path d="M20,7 Q17,1 15,4 Q18,6 20,9" fill="#ffaacc"/>
      <path d="M20,7 Q20,0 20,4 Q20,7 20,9" fill="#ffccdd"/>
      <path d="M20,7 Q23,1 25,4 Q22,6 20,9" fill="#ffaacc"/>
      <circle cx="16.5" cy="14" r="2.5" fill="#664488"/>
      <circle cx="23.5" cy="14" r="2.5" fill="#664488"/>
      <circle cx="16.5" cy="14" r="1.5" fill="#ffee88"/>
      <circle cx="23.5" cy="14" r="1.5" fill="#ffee88"/>
      <polygon points="18.5,17 21.5,17 20,20.5" fill="#ffaa88"/>
      <circle cx="5" cy="7" r="1.8" fill="#ffffaa"/>
      <circle cx="35" cy="7" r="1.8" fill="#ffffaa"/>
      <circle cx="3" cy="17" r="1.2" fill="#ffaacc"/>
      <circle cx="37" cy="17" r="1.2" fill="#ffaacc"/>
      <circle cx="20" cy="5" r="1.2" fill="#ffee44"/>
    </svg>`,
  },

  // ── ねこ (cat) ─────────────────────────────────────────
  cat: {
    egg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="24" rx="11" ry="13" fill="#f0e8d8" stroke="#c0a078" stroke-width="1.5"/>
      <path d="M12,14 L11,8 L16,13" fill="#f0e8d8" stroke="#c0a078" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M28,14 L29,8 L24,13" fill="#f0e8d8" stroke="#c0a078" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M12,14 L11,9 L15,13" fill="#e8c8a0"/>
      <path d="M28,14 L29,9 L25,13" fill="#e8c8a0"/>
      <ellipse cx="15" cy="17" rx="2.5" ry="4" fill="rgba(255,255,255,0.4)"/>
    </svg>`,

    baby: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle cx="20" cy="24" r="13" fill="#f5dfc0"/>
      <path d="M10,15 L9,8 L15,14" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M30,15 L31,8 L25,14" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M10,15 L10,10 L14,14" fill="#e8c8a0"/>
      <path d="M30,15 L30,10 L26,14" fill="#e8c8a0"/>
      <circle cx="15.5" cy="23" r="3.8" fill="#3a2010"/>
      <circle cx="24.5" cy="23" r="3.8" fill="#3a2010"/>
      <circle cx="16.5" cy="22" r="1.8" fill="#fff"/>
      <circle cx="25.5" cy="22" r="1.8" fill="#fff"/>
      <ellipse cx="20" cy="27.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M18,29.5 Q20,31.5 22,29.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="7" y1="25" x2="13" y2="26.5" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".7"/>
      <line x1="7" y1="27.5" x2="13" y2="28" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".7"/>
      <line x1="33" y1="25" x2="27" y2="26.5" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".7"/>
      <line x1="33" y1="27.5" x2="27" y2="28" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".7"/>
    </svg>`,

    child: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,38 Q34,30 32,20 Q28,30 26,37Z" fill="#d4a870"/>
      <ellipse cx="20" cy="29" rx="10" ry="9" fill="#f5dfc0"/>
      <circle cx="20" cy="17" r="10" fill="#f5dfc0"/>
      <path d="M12,10 L10,3 L16,10" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M28,10 L30,3 L24,10" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M12,10 L11,5 L15,10" fill="#e8c8a0"/>
      <path d="M28,10 L29,5 L25,10" fill="#e8c8a0"/>
      <circle cx="16" cy="17" r="2.5" fill="#3a2010"/>
      <circle cx="24" cy="17" r="2.5" fill="#3a2010"/>
      <circle cx="16.8" cy="16.2" r="1" fill="#fff"/>
      <circle cx="24.8" cy="16.2" r="1" fill="#fff"/>
      <ellipse cx="20" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M18,22.5 Q20,24.5 22,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="5" y1="19" x2="13" y2="20" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="35" y1="19" x2="27" y2="20" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".5"/>
    </svg>`,

    adult: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M30,38 Q37,27 35,16 Q30,27 27,36Z" fill="#c89060"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#f5dfc0"/>
      <circle cx="19" cy="17" r="10" fill="#f5dfc0"/>
      <path d="M11,10 L9,3 L15,10" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#f5dfc0" stroke="#c8a078" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#e8c8a0"/>
      <path d="M27,10 L28,5 L24,10" fill="#e8c8a0"/>
      <circle cx="15" cy="17" r="2.5" fill="#2c1a08"/>
      <circle cx="23" cy="17" r="2.5" fill="#2c1a08"/>
      <circle cx="15.8" cy="16.2" r="1" fill="#fff"/>
      <circle cx="23.8" cy="16.2" r="1" fill="#fff"/>
      <ellipse cx="19" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,22.5 Q19,24.5 21,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#c8a078" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <path d="M10,26 Q19,30 28,26" stroke="#4a5ac0" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="19" cy="28.5" r="1.5" fill="#7080e8"/>
    </svg>`,

    master: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M33,38 Q40,24 38,12 Q32,25 29,36Z" fill="#9060b0"/>
      <circle cx="39" cy="13" r="1.5" fill="#cc88ff" opacity=".7"/>
      <circle cx="38" cy="7" r="1" fill="#ffd000" opacity=".8"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#e8d4f8"/>
      <circle cx="19" cy="17" r="10" fill="#e8d4f8"/>
      <path d="M11,10 L9,3 L15,10" fill="#e8d4f8" stroke="#b090d0" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#e8d4f8" stroke="#b090d0" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#d4b8f0"/>
      <path d="M27,10 L28,5 L24,10" fill="#d4b8f0"/>
      <path d="M16,9 Q19,6 22,9 Q20,7 16,9" fill="#e8d000"/>
      <circle cx="15" cy="17" r="3" fill="#3a0060"/>
      <circle cx="23" cy="17" r="3" fill="#3a0060"/>
      <circle cx="15.8" cy="16" r="1.4" fill="#cc88ff"/>
      <circle cx="23.8" cy="16" r="1.4" fill="#cc88ff"/>
      <ellipse cx="19" cy="21" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,23 Q19,25 21,23" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#b090d0" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#b090d0" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <circle cx="5" cy="11" r="1.5" fill="#ffd000" opacity=".75"/>
      <circle cx="33" cy="11" r="1.5" fill="#ffd000" opacity=".75"/>
      <circle cx="5" cy="25" r="1" fill="#cc88ff" opacity=".8"/>
      <circle cx="33" cy="25" r="1" fill="#cc88ff" opacity=".8"/>
    </svg>`,

    // ── バリアントB: グレータビー/黒ねこ ──
    child_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,38 Q34,30 32,20 Q28,30 26,37Z" fill="#667788"/>
      <ellipse cx="20" cy="29" rx="10" ry="9" fill="#8899aa"/>
      <circle cx="20" cy="17" r="10" fill="#8899aa"/>
      <path d="M12,10 L10,3 L16,10" fill="#8899aa" stroke="#667788" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M28,10 L30,3 L24,10" fill="#8899aa" stroke="#667788" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M12,10 L11,5 L15,10" fill="#778899"/>
      <path d="M28,10 L29,5 L25,10" fill="#778899"/>
      <path d="M13,17 L17,18 M13,20 L17,20" stroke="#99aabb" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="16" cy="17" r="2.5" fill="#2233aa"/>
      <circle cx="24" cy="17" r="2.5" fill="#2233aa"/>
      <circle cx="16.8" cy="16.2" r="1" fill="#fff"/>
      <circle cx="24.8" cy="16.2" r="1" fill="#fff"/>
      <ellipse cx="20" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M18,22.5 Q20,24.5 22,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="5" y1="19" x2="13" y2="20" stroke="#8899aa" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="35" y1="19" x2="27" y2="20" stroke="#8899aa" stroke-width="1" stroke-linecap="round" opacity=".5"/>
    </svg>`,

    adult_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M30,38 Q37,27 35,16 Q30,27 27,36Z" fill="#222233"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#222233"/>
      <circle cx="19" cy="17" r="10" fill="#222233"/>
      <path d="M11,10 L9,3 L15,10" fill="#222233" stroke="#333344" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#222233" stroke="#333344" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#333344"/>
      <path d="M27,10 L28,5 L24,10" fill="#333344"/>
      <circle cx="15" cy="17" r="2.5" fill="#cc2222"/>
      <circle cx="23" cy="17" r="2.5" fill="#cc2222"/>
      <circle cx="15.8" cy="16.2" r="1" fill="#ff8888"/>
      <circle cx="23.8" cy="16.2" r="1" fill="#ff8888"/>
      <ellipse cx="19" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,22.5 Q19,24.5 21,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#444455" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#444455" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <path d="M10,26 Q19,30 28,26" stroke="#cc2222" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="19" cy="28.5" r="1.5" fill="#ff4444"/>
    </svg>`,

    master_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M33,38 Q40,24 38,12 Q32,25 29,36Z" fill="#110022"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#110022"/>
      <circle cx="19" cy="17" r="10" fill="#110022"/>
      <path d="M11,10 L9,3 L15,10" fill="#110022" stroke="#220044" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#110022" stroke="#220044" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#220033"/>
      <path d="M27,10 L28,5 L24,10" fill="#220033"/>
      <path d="M16,9 Q19,6 22,9 Q20,7 16,9" fill="#cc0000"/>
      <circle cx="15" cy="17" r="3" fill="#ff0000"/>
      <circle cx="23" cy="17" r="3" fill="#ff0000"/>
      <circle cx="15.8" cy="16" r="1.4" fill="#ffcc00"/>
      <circle cx="23.8" cy="16" r="1.4" fill="#ffcc00"/>
      <ellipse cx="19" cy="21" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,23 Q19,25 21,23" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#440022" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#440022" stroke-width="1" stroke-linecap="round" opacity=".5"/>
      <circle cx="5" cy="11" r="1.5" fill="#cc0000" opacity=".8"/>
      <circle cx="33" cy="11" r="1.5" fill="#cc0000" opacity=".8"/>
      <circle cx="5" cy="25" r="1" fill="#880000" opacity=".8"/>
      <circle cx="33" cy="25" r="1" fill="#880000" opacity=".8"/>
    </svg>`,

    // ── バリアントC: 白ねこ/天上系 ──
    child_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M28,38 Q34,30 32,20 Q28,30 26,37Z" fill="#e8e0f8"/>
      <ellipse cx="20" cy="29" rx="10" ry="9" fill="#f5f5ff"/>
      <circle cx="20" cy="17" r="10" fill="#f5f5ff"/>
      <path d="M12,10 L10,3 L16,10" fill="#f5f5ff" stroke="#d8d0ee" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M28,10 L30,3 L24,10" fill="#f5f5ff" stroke="#d8d0ee" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M12,10 L11,5 L15,10" fill="#e8e0f0"/>
      <path d="M28,10 L29,5 L25,10" fill="#e8e0f0"/>
      <circle cx="16" cy="17" r="2.5" fill="#3399ff"/>
      <circle cx="24" cy="17" r="2.5" fill="#3399ff"/>
      <circle cx="16.8" cy="16.2" r="1" fill="#fff"/>
      <circle cx="24.8" cy="16.2" r="1" fill="#fff"/>
      <ellipse cx="20" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M18,22.5 Q20,24.5 22,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="5" y1="19" x2="13" y2="20" stroke="#d8d0ee" stroke-width="1" stroke-linecap="round" opacity=".7"/>
      <line x1="35" y1="19" x2="27" y2="20" stroke="#d8d0ee" stroke-width="1" stroke-linecap="round" opacity=".7"/>
    </svg>`,

    adult_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M30,38 Q37,27 35,16 Q30,27 27,36Z" fill="#f8e8a0"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#fffaf0"/>
      <circle cx="19" cy="17" r="10" fill="#fffaf0"/>
      <path d="M11,10 L9,3 L15,10" fill="#fffaf0" stroke="#e8d890" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#fffaf0" stroke="#e8d890" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#f5e898"/>
      <path d="M27,10 L28,5 L24,10" fill="#f5e898"/>
      <circle cx="15" cy="17" r="2.5" fill="#886600"/>
      <circle cx="23" cy="17" r="2.5" fill="#886600"/>
      <circle cx="15.8" cy="16.2" r="1" fill="#fff"/>
      <circle cx="23.8" cy="16.2" r="1" fill="#fff"/>
      <ellipse cx="19" cy="20.5" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,22.5 Q19,24.5 21,22.5" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#e8d890" stroke-width="1" stroke-linecap="round" opacity=".6"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#e8d890" stroke-width="1" stroke-linecap="round" opacity=".6"/>
      <path d="M10,26 Q19,30 28,26" stroke="#ddaa00" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="19" cy="28.5" r="1.5" fill="#ffcc44"/>
      <circle cx="4" cy="14" r="1.2" fill="#ffee88" opacity=".7"/>
      <circle cx="34" cy="14" r="1.2" fill="#ffee88" opacity=".7"/>
    </svg>`,

    master_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M33,38 Q40,24 38,12 Q32,25 29,36Z" fill="#fffacc"/>
      <circle cx="39" cy="13" r="1.5" fill="#ffee88" opacity=".8"/>
      <ellipse cx="19" cy="29" rx="11" ry="9" fill="#fffff8"/>
      <circle cx="19" cy="17" r="10" fill="#fffff8"/>
      <path d="M11,10 L9,3 L15,10" fill="#fffff8" stroke="#eeeedd" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M27,10 L29,3 L23,10" fill="#fffff8" stroke="#eeeedd" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M11,10 L10,5 L14,10" fill="#fffaee"/>
      <path d="M27,10 L28,5 L24,10" fill="#fffaee"/>
      <path d="M16,9 Q19,6 22,9 Q20,7 16,9" fill="#ffdd44"/>
      <circle cx="15" cy="17" r="3" fill="#886600"/>
      <circle cx="23" cy="17" r="3" fill="#886600"/>
      <circle cx="15.8" cy="16" r="1.4" fill="#ffee88"/>
      <circle cx="23.8" cy="16" r="1.4" fill="#ffee88"/>
      <ellipse cx="19" cy="21" rx="1.5" ry="1" fill="#e07878"/>
      <path d="M17,23 Q19,25 21,23" fill="none" stroke="#c06060" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="4" y1="19" x2="12" y2="20" stroke="#eeeedd" stroke-width="1" stroke-linecap="round" opacity=".6"/>
      <line x1="34" y1="19" x2="26" y2="20" stroke="#eeeedd" stroke-width="1" stroke-linecap="round" opacity=".6"/>
      <circle cx="4" cy="10" r="1.8" fill="#ffee44" opacity=".8"/>
      <circle cx="34" cy="10" r="1.8" fill="#ffee44" opacity=".8"/>
      <circle cx="4" cy="24" r="1.2" fill="#ffcc00" opacity=".7"/>
      <circle cx="34" cy="24" r="1.2" fill="#ffcc00" opacity=".7"/>
    </svg>`,
  },

  // ── スライム (slime) ───────────────────────────────────
  slime: {
    egg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,13 Q26,21 26,28 Q26,35 20,37 Q14,35 14,28 Q14,21 20,13Z" fill="#88ddbb" stroke="#44aa88" stroke-width="1.5"/>
      <ellipse cx="16.5" cy="21" rx="2" ry="3.5" fill="rgba(255,255,255,0.4)"/>
      <circle cx="18" cy="30" r="1.5" fill="#116644"/>
      <circle cx="22" cy="30" r="1.5" fill="#116644"/>
    </svg>`,

    baby: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,14 Q29,14 31,23 Q32,32 20,34 Q8,32 9,23 Q11,14 20,14Z" fill="#66ccaa"/>
      <path d="M20,14 Q22,10 20,8 Q18,10 20,14" fill="#66ccaa" stroke="#33aa80" stroke-width="1"/>
      <ellipse cx="14" cy="19" rx="3" ry="4.5" fill="rgba(255,255,255,0.2)"/>
      <circle cx="16" cy="23" r="2.5" fill="#116644"/>
      <circle cx="24" cy="23" r="2.5" fill="#116644"/>
      <circle cx="16.8" cy="22.2" r="1" fill="#fff"/>
      <circle cx="24.8" cy="22.2" r="1" fill="#fff"/>
      <path d="M17,28 Q20,30.5 23,28" fill="none" stroke="#116644" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    child: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,11 Q31,11 33,22 Q34,34 20,36 Q6,34 7,22 Q9,11 20,11Z" fill="#44bbaa"/>
      <path d="M20,11 Q23,6 20,4 Q17,6 20,11" fill="#44bbaa" stroke="#228888" stroke-width="1"/>
      <ellipse cx="13" cy="17" rx="3.5" ry="5.5" fill="rgba(255,255,255,0.2)"/>
      <circle cx="15" cy="22" r="3" fill="#114444"/>
      <circle cx="25" cy="22" r="3" fill="#114444"/>
      <circle cx="16" cy="21" r="1.2" fill="#fff"/>
      <circle cx="26" cy="21" r="1.2" fill="#fff"/>
      <path d="M16,28 Q20,31 24,28" fill="none" stroke="#114444" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="20" cy="32" rx="3.5" ry="1.5" fill="#55ccbb" opacity=".4"/>
    </svg>`,

    adult: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="12,11 14.5,4 18.5,10 20,2.5 21.5,10 25.5,4 28,11" fill="#f0c000" stroke="#c08000" stroke-width="1"/>
      <circle cx="14.5" cy="6" r="1.2" fill="#ff4444"/>
      <circle cx="20" cy="4" r="1.2" fill="#4488ff"/>
      <circle cx="25.5" cy="6" r="1.2" fill="#44aa44"/>
      <path d="M20,13 Q33,13 35,24 Q36,35 20,37 Q4,35 5,24 Q7,13 20,13Z" fill="#3399cc"/>
      <ellipse cx="13" cy="19" rx="4" ry="6" fill="rgba(255,255,255,0.18)"/>
      <circle cx="15" cy="24" r="3" fill="#0a3366"/>
      <circle cx="25" cy="24" r="3" fill="#0a3366"/>
      <circle cx="16" cy="23" r="1.2" fill="#fff"/>
      <circle cx="26" cy="23" r="1.2" fill="#fff"/>
      <path d="M16,30 Q20,33 24,30" fill="none" stroke="#0a3366" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    master: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="10,10 13,2 18,9 20,0 22,9 27,2 30,10" fill="#ffd700" stroke="#cc8800" stroke-width="1.2"/>
      <circle cx="13" cy="4" r="1.5" fill="#ff2222"/>
      <circle cx="20" cy="1.5" r="1.5" fill="#2244ff"/>
      <circle cx="27" cy="4" r="1.5" fill="#22aa22"/>
      <ellipse cx="10" cy="10" rx="2" ry="1.5" fill="#bb7700" opacity=".7"/>
      <ellipse cx="30" cy="10" rx="2" ry="1.5" fill="#bb7700" opacity=".7"/>
      <path d="M20,12 Q33,12 35,24 Q36,36 20,38 Q4,36 5,24 Q7,12 20,12Z" fill="#6644cc"/>
      <ellipse cx="12" cy="19" rx="5" ry="8" fill="rgba(255,255,255,0.14)"/>
      <circle cx="14" cy="25" r="3.5" fill="#1a0044"/>
      <circle cx="26" cy="25" r="3.5" fill="#1a0044"/>
      <circle cx="15" cy="24" r="1.5" fill="#cc88ff"/>
      <circle cx="27" cy="24" r="1.5" fill="#cc88ff"/>
      <path d="M14,32 Q20,36 26,32" fill="none" stroke="#1a0044" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="3" cy="17" r="1.5" fill="#cc88ff" opacity=".8"/>
      <circle cx="37" cy="17" r="1.5" fill="#cc88ff" opacity=".8"/>
      <circle cx="3" cy="29" r="1" fill="#ffd700" opacity=".8"/>
      <circle cx="37" cy="29" r="1" fill="#ffd700" opacity=".8"/>
      <circle cx="7" cy="37" r="1.2" fill="#cc88ff" opacity=".6"/>
      <circle cx="33" cy="37" r="1.2" fill="#cc88ff" opacity=".6"/>
    </svg>`,

    // ── バリアントB: ファイア/ダーク系 ──
    child_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,11 Q31,11 33,22 Q34,34 20,36 Q6,34 7,22 Q9,11 20,11Z" fill="#ff5533"/>
      <path d="M20,11 Q23,6 20,4 Q17,6 20,11" fill="#ff5533" stroke="#cc2200" stroke-width="1"/>
      <ellipse cx="13" cy="17" rx="3.5" ry="5.5" fill="rgba(255,255,255,0.15)"/>
      <circle cx="15" cy="22" r="3" fill="#6b0000"/>
      <circle cx="25" cy="22" r="3" fill="#6b0000"/>
      <circle cx="16" cy="21" r="1.2" fill="#ff8800"/>
      <circle cx="26" cy="21" r="1.2" fill="#ff8800"/>
      <path d="M16,28 Q20,31 24,28" fill="none" stroke="#6b0000" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    adult_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="12,11 14.5,4 18.5,10 20,2.5 21.5,10 25.5,4 28,11" fill="#cc3300" stroke="#882200" stroke-width="1"/>
      <circle cx="14.5" cy="6" r="1.2" fill="#ff8800"/>
      <circle cx="20" cy="4" r="1.2" fill="#ffcc00"/>
      <circle cx="25.5" cy="6" r="1.2" fill="#ff4400"/>
      <path d="M20,13 Q33,13 35,24 Q36,35 20,37 Q4,35 5,24 Q7,13 20,13Z" fill="#cc4400"/>
      <ellipse cx="13" cy="19" rx="4" ry="6" fill="rgba(255,255,255,0.12)"/>
      <circle cx="15" cy="24" r="3" fill="#550000"/>
      <circle cx="25" cy="24" r="3" fill="#550000"/>
      <circle cx="16" cy="23" r="1.2" fill="#ff6600"/>
      <circle cx="26" cy="23" r="1.2" fill="#ff6600"/>
      <path d="M16,30 Q20,33 24,30" fill="none" stroke="#550000" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    master_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="10,10 13,2 18,9 20,0 22,9 27,2 30,10" fill="#550000" stroke="#330000" stroke-width="1.2"/>
      <circle cx="13" cy="4" r="1.5" fill="#ff0000"/>
      <circle cx="20" cy="1.5" r="1.5" fill="#ff4400"/>
      <circle cx="27" cy="4" r="1.5" fill="#ff2200"/>
      <ellipse cx="10" cy="10" rx="2" ry="1.5" fill="#440000" opacity=".7"/>
      <ellipse cx="30" cy="10" rx="2" ry="1.5" fill="#440000" opacity=".7"/>
      <path d="M20,12 Q33,12 35,24 Q36,36 20,38 Q4,36 5,24 Q7,12 20,12Z" fill="#220011"/>
      <ellipse cx="12" cy="19" rx="5" ry="8" fill="rgba(255,0,0,0.1)"/>
      <circle cx="14" cy="25" r="3.5" fill="#110000"/>
      <circle cx="26" cy="25" r="3.5" fill="#110000"/>
      <circle cx="15" cy="24" r="1.5" fill="#ff2200"/>
      <circle cx="27" cy="24" r="1.5" fill="#ff2200"/>
      <path d="M14,32 Q20,36 26,32" fill="none" stroke="#330000" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="3" cy="17" r="1.5" fill="#ff4400" opacity=".8"/>
      <circle cx="37" cy="17" r="1.5" fill="#ff4400" opacity=".8"/>
      <circle cx="3" cy="29" r="1" fill="#cc2200" opacity=".8"/>
      <circle cx="37" cy="29" r="1" fill="#cc2200" opacity=".8"/>
    </svg>`,

    // ── バリアントC: サンダー/黄金系 ──
    child_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <path d="M20,11 Q31,11 33,22 Q34,34 20,36 Q6,34 7,22 Q9,11 20,11Z" fill="#ffcc00"/>
      <path d="M20,11 Q23,6 20,4 Q17,6 20,11" fill="#ffcc00" stroke="#cc9900" stroke-width="1"/>
      <ellipse cx="13" cy="17" rx="3.5" ry="5.5" fill="rgba(255,255,255,0.2)"/>
      <circle cx="15" cy="22" r="3" fill="#664400"/>
      <circle cx="25" cy="22" r="3" fill="#664400"/>
      <circle cx="16" cy="21" r="1.2" fill="#fff"/>
      <circle cx="26" cy="21" r="1.2" fill="#fff"/>
      <path d="M16,28 Q20,31 24,28" fill="none" stroke="#664400" stroke-width="2" stroke-linecap="round"/>
      <circle cx="4" cy="20" r="1.2" fill="#ffee00" opacity=".7"/>
      <circle cx="36" cy="20" r="1.2" fill="#ffee00" opacity=".7"/>
    </svg>`,

    adult_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="12,11 14.5,4 18.5,10 20,2.5 21.5,10 25.5,4 28,11" fill="#ffee44" stroke="#ccaa00" stroke-width="1"/>
      <circle cx="14.5" cy="6" r="1.2" fill="#ff44aa"/>
      <circle cx="20" cy="4" r="1.2" fill="#44aaff"/>
      <circle cx="25.5" cy="6" r="1.2" fill="#44ff88"/>
      <ellipse cx="10" cy="11" rx="2" ry="1.5" fill="#ccaa00" opacity=".7"/>
      <ellipse cx="30" cy="11" rx="2" ry="1.5" fill="#ccaa00" opacity=".7"/>
      <path d="M20,13 Q33,13 35,24 Q36,35 20,37 Q4,35 5,24 Q7,13 20,13Z" fill="#ddeecc"/>
      <ellipse cx="13" cy="19" rx="4" ry="6" fill="rgba(255,255,255,0.25)"/>
      <circle cx="15" cy="24" r="3" fill="#226644"/>
      <circle cx="25" cy="24" r="3" fill="#226644"/>
      <circle cx="16" cy="23" r="1.2" fill="#fff"/>
      <circle cx="26" cy="23" r="1.2" fill="#fff"/>
      <path d="M16,30 Q20,33 24,30" fill="none" stroke="#226644" stroke-width="2" stroke-linecap="round"/>
      <circle cx="3" cy="17" r="1.5" fill="#ffee44" opacity=".7"/>
      <circle cx="37" cy="17" r="1.5" fill="#ffee44" opacity=".7"/>
    </svg>`,

    master_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <polygon points="10,10 13,2 18,9 20,0 22,9 27,2 30,10" fill="#ffdd44" stroke="#cc9900" stroke-width="1.2"/>
      <circle cx="13" cy="4" r="1.5" fill="#ff44aa"/>
      <circle cx="20" cy="1.5" r="1.5" fill="#44aaff"/>
      <circle cx="27" cy="4" r="1.5" fill="#44ff88"/>
      <ellipse cx="10" cy="10" rx="2" ry="1.5" fill="#bb8800" opacity=".7"/>
      <ellipse cx="30" cy="10" rx="2" ry="1.5" fill="#bb8800" opacity=".7"/>
      <path d="M20,12 Q33,12 35,24 Q36,36 20,38 Q4,36 5,24 Q7,12 20,12Z" fill="#ffffee"/>
      <ellipse cx="12" cy="19" rx="5" ry="8" fill="rgba(255,255,200,0.3)"/>
      <circle cx="14" cy="25" r="3.5" fill="#334400"/>
      <circle cx="26" cy="25" r="3.5" fill="#334400"/>
      <circle cx="15" cy="24" r="1.5" fill="#ffee44"/>
      <circle cx="27" cy="24" r="1.5" fill="#ffee44"/>
      <path d="M14,32 Q20,36 26,32" fill="none" stroke="#334400" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="3" cy="17" r="1.5" fill="#ffdd44" opacity=".9"/>
      <circle cx="37" cy="17" r="1.5" fill="#ffdd44" opacity=".9"/>
      <circle cx="3" cy="29" r="1" fill="#ffaa00" opacity=".8"/>
      <circle cx="37" cy="29" r="1" fill="#ffaa00" opacity=".8"/>
      <circle cx="7" cy="37" r="1.2" fill="#ffdd44" opacity=".7"/>
      <circle cx="33" cy="37" r="1.2" fill="#ffdd44" opacity=".7"/>
    </svg>`,
  },

  // ── 植物 (plant) ────────────────────────────────────────
  plant: {
    seed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <ellipse cx="20" cy="27" rx="8" ry="9.5" fill="#8B5E3C" stroke="#5a3a20" stroke-width="1.5"/>
      <path d="M16,20 Q20,18 24,20 Q20,16 16,20Z" fill="#6a4428"/>
      <ellipse cx="16.5" cy="23" rx="2.5" ry="4" fill="#a07048" opacity=".6"/>
    </svg>`,

    sprout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="21" stroke="#5a8a30" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,30 Q13,26 11,18 Q17,20 20,30" fill="#6ab040"/>
      <path d="M20,26 Q27,22 29,14 Q23,16 20,26" fill="#88cc50"/>
      <line x1="20" y1="30" x2="14.5" y2="22.5" stroke="#4a8030" stroke-width="0.8" stroke-linecap="round" opacity=".5"/>
      <line x1="20" y1="26" x2="25.5" y2="18.5" stroke="#5a9e3c" stroke-width="0.8" stroke-linecap="round" opacity=".5"/>
    </svg>`,

    leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="10" stroke="#4a7828" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,28 Q9,23 7,13 Q15,15 20,28" fill="#5aaa38"/>
      <path d="M20,22 Q31,17 33,7 Q25,9 20,22" fill="#78cc50"/>
      <path d="M20,14 Q15,8 16,2 Q20,7 20,14" fill="#66bb44"/>
      <line x1="20" y1="28" x2="12" y2="18" stroke="#3a8028" stroke-width="0.8" stroke-linecap="round" opacity=".5"/>
      <line x1="20" y1="22" x2="28" y2="12" stroke="#4a9a30" stroke-width="0.8" stroke-linecap="round" opacity=".5"/>
    </svg>`,

    bloom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="18" stroke="#3a6820" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,30 Q9,25 7,16 Q15,18 20,30" fill="#4a9a30"/>
      <path d="M20,24 Q31,19 33,10 Q25,12 20,24" fill="#66bb44"/>
      <ellipse cx="20" cy="12" rx="3" ry="5" fill="#ff88aa"/>
      <ellipse cx="15.5" cy="13.5" rx="5" ry="2.8" fill="#ff88aa" transform="rotate(-40,15.5,13.5)"/>
      <ellipse cx="24.5" cy="13.5" rx="5" ry="2.8" fill="#ff88aa" transform="rotate(40,24.5,13.5)"/>
      <ellipse cx="14" cy="17" rx="4.5" ry="2.5" fill="#ffaacc" transform="rotate(-70,14,17)"/>
      <ellipse cx="26" cy="17" rx="4.5" ry="2.5" fill="#ffaacc" transform="rotate(70,26,17)"/>
      <circle cx="20" cy="12.5" r="4" fill="#ffee44"/>
      <circle cx="20" cy="12.5" r="2" fill="#f8a820"/>
    </svg>`,

    tree: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="28" width="6" height="12" rx="2" fill="#6b3d1e" stroke="#4a2810" stroke-width="1"/>
      <ellipse cx="20" cy="26" rx="14" ry="11" fill="#228a20"/>
      <ellipse cx="20" cy="22" rx="13" ry="11" fill="#38aa2c"/>
      <ellipse cx="20" cy="16" rx="10" ry="9" fill="#50c840"/>
      <ellipse cx="14" cy="19" rx="5" ry="4" fill="#60d450" opacity=".7"/>
      <ellipse cx="26" cy="17" rx="4" ry="3.5" fill="#60d450" opacity=".7"/>
      <ellipse cx="20" cy="12" rx="3.5" ry="3" fill="#78e060" opacity=".6"/>
    </svg>`,

    // ── バリアントB: 深海/ブルー系 ──
    leaf_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="10" stroke="#2255aa" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,28 Q9,23 7,13 Q15,15 20,28" fill="#2266cc"/>
      <path d="M20,22 Q31,17 33,7 Q25,9 20,22" fill="#44aaee"/>
      <path d="M20,14 Q15,8 16,2 Q20,7 20,14" fill="#3388cc"/>
    </svg>`,

    bloom_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="18" stroke="#224488" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,30 Q9,25 7,16 Q15,18 20,30" fill="#2255aa"/>
      <path d="M20,24 Q31,19 33,10 Q25,12 20,24" fill="#3377cc"/>
      <ellipse cx="20" cy="12" rx="3" ry="5" fill="#4499ff"/>
      <ellipse cx="15.5" cy="13.5" rx="5" ry="2.8" fill="#3388ee" transform="rotate(-40,15.5,13.5)"/>
      <ellipse cx="24.5" cy="13.5" rx="5" ry="2.8" fill="#3388ee" transform="rotate(40,24.5,13.5)"/>
      <ellipse cx="14" cy="17" rx="4.5" ry="2.5" fill="#5599ff" transform="rotate(-70,14,17)"/>
      <ellipse cx="26" cy="17" rx="4.5" ry="2.5" fill="#5599ff" transform="rotate(70,26,17)"/>
      <circle cx="20" cy="12.5" r="4" fill="#aaddff"/>
      <circle cx="20" cy="12.5" r="2" fill="#66bbff"/>
    </svg>`,

    tree_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="28" width="6" height="12" rx="2" fill="#3a2810" stroke="#261808" stroke-width="1"/>
      <ellipse cx="20" cy="26" rx="14" ry="11" fill="#224488"/>
      <ellipse cx="20" cy="22" rx="13" ry="11" fill="#3355aa"/>
      <ellipse cx="20" cy="16" rx="10" ry="9" fill="#4477cc"/>
      <ellipse cx="14" cy="19" rx="5" ry="4" fill="#5588dd" opacity=".7"/>
      <ellipse cx="26" cy="17" rx="4" ry="3.5" fill="#5588dd" opacity=".7"/>
      <ellipse cx="20" cy="12" rx="3.5" ry="3" fill="#66aaee" opacity=".6"/>
    </svg>`,

    // ── バリアントC: 桜/バイオレット系 ──
    leaf_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="10" stroke="#884488" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,28 Q9,23 7,13 Q15,15 20,28" fill="#aa44cc"/>
      <path d="M20,22 Q31,17 33,7 Q25,9 20,22" fill="#cc66ee"/>
      <path d="M20,14 Q15,8 16,2 Q20,7 20,14" fill="#bb55dd"/>
    </svg>`,

    bloom_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <line x1="20" y1="38" x2="20" y2="18" stroke="#663388" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20,30 Q9,25 7,16 Q15,18 20,30" fill="#8833aa"/>
      <path d="M20,24 Q31,19 33,10 Q25,12 20,24" fill="#aa44cc"/>
      <ellipse cx="20" cy="12" rx="3" ry="5" fill="#ffaadd"/>
      <ellipse cx="15.5" cy="13.5" rx="5" ry="2.8" fill="#ffbbee" transform="rotate(-40,15.5,13.5)"/>
      <ellipse cx="24.5" cy="13.5" rx="5" ry="2.8" fill="#ffbbee" transform="rotate(40,24.5,13.5)"/>
      <ellipse cx="14" cy="17" rx="4.5" ry="2.5" fill="#ffccff" transform="rotate(-70,14,17)"/>
      <ellipse cx="26" cy="17" rx="4.5" ry="2.5" fill="#ffccff" transform="rotate(70,26,17)"/>
      <circle cx="20" cy="12.5" r="4" fill="#ffeeaa"/>
      <circle cx="20" cy="12.5" r="2" fill="#ffdd44"/>
    </svg>`,

    tree_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="28" width="6" height="12" rx="2" fill="#8b5e3c" stroke="#6b3e2c" stroke-width="1"/>
      <ellipse cx="20" cy="26" rx="14" ry="11" fill="#cc88aa"/>
      <ellipse cx="20" cy="22" rx="13" ry="11" fill="#ffaacc"/>
      <ellipse cx="20" cy="16" rx="10" ry="9" fill="#ffccdd"/>
      <ellipse cx="14" cy="19" rx="5" ry="4" fill="#fff0f5" opacity=".7"/>
      <ellipse cx="26" cy="17" rx="4" ry="3.5" fill="#fff0f5" opacity=".7"/>
      <ellipse cx="20" cy="12" rx="3.5" ry="3" fill="#fff8fb" opacity=".8"/>
      <circle cx="12" cy="20" r="1.5" fill="#ff88bb" opacity=".8"/>
      <circle cx="28" cy="18" r="1.5" fill="#ff88bb" opacity=".8"/>
      <circle cx="20" cy="14" r="1.2" fill="#ffaabb" opacity=".8"/>
    </svg>`,
  },

  // ── きのこ (mushroom) ──────────────────────────────────
  mushroom: {
    seed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <circle cx="20" cy="28" r="8" fill="#c8884a" stroke="#8b5a28" stroke-width="1.5"/>
      <path d="M16,21 Q20,19 24,21 Q20,17 16,21Z" fill="#8b5a28"/>
      <ellipse cx="17" cy="24" rx="2" ry="3" fill="#daa870" opacity=".6"/>
    </svg>`,

    sprout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17.5" y="26" width="5" height="12" rx="2.5" fill="#f0d090"/>
      <path d="M10,26 Q20,14 30,26 Q20,30 10,26Z" fill="#cc3322"/>
      <path d="M11,26 Q20,29 29,26 Q20,30 11,26Z" fill="#f0c0b0" opacity=".6"/>
      <ellipse cx="14.5" cy="22" rx="2.5" ry="1.5" fill="#ffbbaa" opacity=".7"/>
      <ellipse cx="25.5" cy="21" rx="2" ry="1.2" fill="#ffbbaa" opacity=".7"/>
    </svg>`,

    leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="23" width="6" height="15" rx="3" fill="#e8c878"/>
      <path d="M6,23 Q20,9 34,23 Q20,29 6,23Z" fill="#dd2211"/>
      <circle cx="13" cy="18" r="2.5" fill="#fff" opacity=".85"/>
      <circle cx="27" cy="18" r="2.5" fill="#fff" opacity=".85"/>
      <circle cx="20" cy="14" r="2" fill="#fff" opacity=".85"/>
      <path d="M7,23 Q20,27 33,23 Q20,29 7,23Z" fill="#f4c0a8" opacity=".6"/>
    </svg>`,

    bloom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="16" y="21" width="8" height="17" rx="3.5" fill="#d4a840"/>
      <path d="M4,21 Q20,5 36,21 Q20,30 4,21Z" fill="#ee2200"/>
      <circle cx="11.5" cy="14" r="3" fill="#fff" opacity=".85"/>
      <circle cx="28.5" cy="14" r="3" fill="#fff" opacity=".85"/>
      <circle cx="20" cy="9.5" r="2.5" fill="#fff" opacity=".85"/>
      <circle cx="7.5" cy="20" r="2" fill="#fff" opacity=".7"/>
      <circle cx="32.5" cy="20" r="2" fill="#fff" opacity=".7"/>
      <circle cx="16" cy="21" r="2.2" fill="#cc1100"/>
      <circle cx="24" cy="21" r="2.2" fill="#cc1100"/>
      <path d="M5,21 Q20,29 35,21 Q20,30.5 5,21Z" fill="#f4b89a" opacity=".6"/>
    </svg>`,

    tree: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="15" y="19" width="10" height="21" rx="4" fill="#c09030"/>
      <path d="M1,20 Q20,2 39,20 Q20,31 1,20Z" fill="#cc1100"/>
      <circle cx="10" cy="11" r="3.5" fill="#fff" opacity=".85"/>
      <circle cx="30" cy="11" r="3.5" fill="#fff" opacity=".85"/>
      <circle cx="20" cy="7" r="3" fill="#fff" opacity=".85"/>
      <circle cx="6" cy="19" r="2.5" fill="#fff" opacity=".7"/>
      <circle cx="34" cy="19" r="2.5" fill="#fff" opacity=".7"/>
      <circle cx="15.5" cy="20" r="2.5" fill="#bb0000"/>
      <circle cx="24.5" cy="20" r="2.5" fill="#bb0000"/>
      <path d="M2,20 Q20,31 38,20 Q20,33 2,20Z" fill="#f0a890" opacity=".6"/>
      <circle cx="2" cy="24" r="1.5" fill="#ffee00" opacity=".8"/>
      <circle cx="38" cy="24" r="1.5" fill="#ffee00" opacity=".8"/>
      <circle cx="20" cy="3.5" r="1.8" fill="#ffee00" opacity=".8"/>
      <circle cx="6" cy="11" r="1.2" fill="#ee8800" opacity=".7"/>
      <circle cx="34" cy="11" r="1.2" fill="#ee8800" opacity=".7"/>
    </svg>`,

    // ── バリアントB: ブルー/毒系 ──
    leaf_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="23" width="6" height="15" rx="3" fill="#9988cc"/>
      <path d="M6,23 Q20,9 34,23 Q20,29 6,23Z" fill="#3322aa"/>
      <circle cx="13" cy="18" r="2.5" fill="#aaddff" opacity=".85"/>
      <circle cx="27" cy="18" r="2.5" fill="#aaddff" opacity=".85"/>
      <circle cx="20" cy="14" r="2" fill="#aaddff" opacity=".85"/>
      <path d="M7,23 Q20,27 33,23 Q20,29 7,23Z" fill="#9988cc" opacity=".5"/>
    </svg>`,

    bloom_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="16" y="21" width="8" height="17" rx="3.5" fill="#8866aa"/>
      <path d="M4,21 Q20,5 36,21 Q20,30 4,21Z" fill="#5522aa"/>
      <circle cx="11.5" cy="14" r="3" fill="#ccaaff" opacity=".85"/>
      <circle cx="28.5" cy="14" r="3" fill="#ccaaff" opacity=".85"/>
      <circle cx="20" cy="9.5" r="2.5" fill="#ccaaff" opacity=".85"/>
      <circle cx="7.5" cy="20" r="2" fill="#ccaaff" opacity=".7"/>
      <circle cx="32.5" cy="20" r="2" fill="#ccaaff" opacity=".7"/>
      <circle cx="16" cy="21" r="2.2" fill="#440088"/>
      <circle cx="24" cy="21" r="2.2" fill="#440088"/>
      <path d="M5,21 Q20,29 35,21 Q20,30.5 5,21Z" fill="#9988cc" opacity=".5"/>
    </svg>`,

    tree_b: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="15" y="19" width="10" height="21" rx="4" fill="#665588"/>
      <path d="M1,20 Q20,2 39,20 Q20,31 1,20Z" fill="#440088"/>
      <circle cx="10" cy="11" r="3.5" fill="#ddbbff" opacity=".85"/>
      <circle cx="30" cy="11" r="3.5" fill="#ddbbff" opacity=".85"/>
      <circle cx="20" cy="7" r="3" fill="#ddbbff" opacity=".85"/>
      <circle cx="6" cy="19" r="2.5" fill="#ddbbff" opacity=".7"/>
      <circle cx="34" cy="19" r="2.5" fill="#ddbbff" opacity=".7"/>
      <circle cx="15.5" cy="20" r="2.5" fill="#220066"/>
      <circle cx="24.5" cy="20" r="2.5" fill="#220066"/>
      <path d="M2,20 Q20,31 38,20 Q20,33 2,20Z" fill="#9977bb" opacity=".5"/>
      <circle cx="2" cy="24" r="1.5" fill="#aa44ff" opacity=".8"/>
      <circle cx="38" cy="24" r="1.5" fill="#aa44ff" opacity=".8"/>
      <circle cx="20" cy="3.5" r="1.8" fill="#ccaaff" opacity=".8"/>
    </svg>`,

    // ── バリアントC: ゴールデン/輝き系 ──
    leaf_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="17" y="23" width="6" height="15" rx="3" fill="#d4aa40"/>
      <path d="M6,23 Q20,9 34,23 Q20,29 6,23Z" fill="#cc7700"/>
      <circle cx="13" cy="18" r="2.5" fill="#ffffcc" opacity=".85"/>
      <circle cx="27" cy="18" r="2.5" fill="#ffffcc" opacity=".85"/>
      <circle cx="20" cy="14" r="2" fill="#ffffcc" opacity=".85"/>
      <path d="M7,23 Q20,27 33,23 Q20,29 7,23Z" fill="#e8c870" opacity=".5"/>
    </svg>`,

    bloom_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="16" y="21" width="8" height="17" rx="3.5" fill="#c09030"/>
      <path d="M4,21 Q20,5 36,21 Q20,30 4,21Z" fill="#cc7700"/>
      <circle cx="11.5" cy="14" r="3" fill="#ffffaa" opacity=".85"/>
      <circle cx="28.5" cy="14" r="3" fill="#ffffaa" opacity=".85"/>
      <circle cx="20" cy="9.5" r="2.5" fill="#ffffaa" opacity=".85"/>
      <circle cx="7.5" cy="20" r="2" fill="#ffffaa" opacity=".7"/>
      <circle cx="32.5" cy="20" r="2" fill="#ffffaa" opacity=".7"/>
      <circle cx="16" cy="21" r="2.2" fill="#885500"/>
      <circle cx="24" cy="21" r="2.2" fill="#885500"/>
      <path d="M5,21 Q20,29 35,21 Q20,30.5 5,21Z" fill="#e8c870" opacity=".5"/>
      <circle cx="4" cy="16" r="1.2" fill="#ffee44" opacity=".8"/>
      <circle cx="36" cy="16" r="1.2" fill="#ffee44" opacity=".8"/>
    </svg>`,

    tree_c: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="15" y="19" width="10" height="21" rx="4" fill="#aa7700"/>
      <path d="M1,20 Q20,2 39,20 Q20,31 1,20Z" fill="#cc8800"/>
      <circle cx="10" cy="11" r="3.5" fill="#ffffcc" opacity=".9"/>
      <circle cx="30" cy="11" r="3.5" fill="#ffffcc" opacity=".9"/>
      <circle cx="20" cy="7" r="3" fill="#ffffcc" opacity=".9"/>
      <circle cx="6" cy="19" r="2.5" fill="#ffffcc" opacity=".7"/>
      <circle cx="34" cy="19" r="2.5" fill="#ffffcc" opacity=".7"/>
      <circle cx="15.5" cy="20" r="2.5" fill="#664400"/>
      <circle cx="24.5" cy="20" r="2.5" fill="#664400"/>
      <path d="M2,20 Q20,31 38,20 Q20,33 2,20Z" fill="#e8c870" opacity=".5"/>
      <circle cx="2" cy="24" r="1.5" fill="#ffee00" opacity=".9"/>
      <circle cx="38" cy="24" r="1.5" fill="#ffee00" opacity=".9"/>
      <circle cx="20" cy="3.5" r="1.8" fill="#ffee00" opacity=".9"/>
      <circle cx="6" cy="11" r="1.2" fill="#ffcc44" opacity=".8"/>
      <circle cx="34" cy="11" r="1.2" fill="#ffcc44" opacity=".8"/>
    </svg>`,
  },

};
