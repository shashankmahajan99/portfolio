/* global marked, DOMPurify, html2pdf */
const state = {
  baseMd: '',
  currentMd: '',
};

const els = {
  role: () => document.getElementById('role'),
  company: () => document.getElementById('company'),
  secExperience: () => document.getElementById('sec-experience'),
  secProjects: () => document.getElementById('sec-projects'),
  secSkills: () => document.getElementById('sec-skills'),
  secEducation: () => document.getElementById('sec-education'),
  secAchievements: () => document.getElementById('sec-achievements'),
  cleanupBuzz: () => document.getElementById('cleanup-buzz'),
  keywords: () => document.getElementById('keywords'),
  preview: () => document.getElementById('preview'),
  resetBtn: () => document.getElementById('resetBtn'),
  pdfBtn: () => document.getElementById('pdfBtn'),
  mdBtn: () => document.getElementById('mdBtn'),
};

document.addEventListener('DOMContentLoaded', async () => {
  // Load base resume.md from public
  const md = await fetch('/resume.md').then(r => r.text()).catch(() => '# Error\nCould not load resume.md');
  state.baseMd = md;
  // Prefill role from current resume (2nd line is **Role**)
  const roleMatch = md.split('\n').find(l => /^\*\*.+\*\*$/.test(l));
  if (roleMatch) els.role().value = roleMatch.replace(/^\*\*|\*\*$/g, '');
  render();

  // Wire controls
  for (const id of [
    'role','company','sec-experience','sec-projects','sec-skills','sec-education','sec-achievements','cleanup-buzz','keywords'
  ]) {
    const el = document.getElementById(id);
    el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', render);
  }
  els.resetBtn().addEventListener('click', reset);
  els.pdfBtn().addEventListener('click', downloadPdf);
  els.mdBtn().addEventListener('click', downloadMd);
});

function reset() {
  els.role().value = extractRole(state.baseMd) || 'Senior Full-Stack Developer';
  els.company().value = '';
  els.secExperience().checked = true;
  els.secProjects().checked = true;
  els.secSkills().checked = true;
  els.secEducation().checked = true;
  els.secAchievements().checked = true;
  els.cleanupBuzz().checked = true;
  els.keywords().value = '';
  render();
}

function render() {
  const options = {
    role: (els.role().value || '').trim(),
    company: (els.company().value || '').trim(),
    include: {
      experience: els.secExperience().checked,
      projects: els.secProjects().checked,
      skills: els.secSkills().checked,
      education: els.secEducation().checked,
      achievements: els.secAchievements().checked,
    },
    cleanupBuzz: els.cleanupBuzz().checked,
    keywords: (els.keywords().value || '').split(',').map(s => s.trim()).filter(Boolean),
  };

  const md = buildMd(state.baseMd, options);
  state.currentMd = md;

  const unsafeHtml = marked.parse(md, { mangle: false, headerIds: true });
  const safeHtml = DOMPurify.sanitize(unsafeHtml);
  els.preview().innerHTML = safeHtml;
}

function buildMd(base, options) {
  // Split top matter (header + contact) and sections
  const headerTop = extractBeforeFirstSection(base);
  const sections = {
    experience: extractSection(base, 'PROFESSIONAL EXPERIENCE'),
    projects: extractSection(base, 'KEY TECHNICAL PROJECTS'),
    skills: extractSection(base, 'TECHNICAL SKILLS'),
    education: extractSection(base, 'EDUCATION'),
    achievements: extractSection(base, 'ACHIEVEMENTS & CERTIFICATIONS'),
  };

  // Role/title replacement (line with **Role**)
  let top = replaceRole(headerTop, options.role);

  // Optional target company note (non-intrusive, comment-like)
  if (options.company) {
    top = top.replace(/\n+$/, '') + `\n\n<!-- Target: ${options.company} -->\n`;
  }

  // Rebuild Markdown with selected sections
  let md = top + '\n';
  if (options.include.experience && sections.experience) md += '\n' + sections.experience + '\n';
  if (options.include.projects && sections.projects) md += '\n' + sections.projects + '\n';
  if (options.include.skills && sections.skills) md += '\n' + emphasizeKeywords(sections.skills, options.keywords) + '\n';
  if (options.include.education && sections.education) md += '\n' + sections.education + '\n';
  if (options.include.achievements && sections.achievements) md += '\n' + sections.achievements + '\n';

  // Cleanup buzzwords if selected
  if (options.cleanupBuzz) {
    md = cleanupBuzzwords(md);
  }

  // Tiny normalization
  md = md.replace(/[ \t]+\n/g, '\n'); // trim trailing spaces
  return md;
}

function extractBeforeFirstSection(md) {
  const idx = md.search(/^##\s+/m);
  return idx === -1 ? md : md.slice(0, idx).trimEnd();
}

function extractSection(md, header) {
  const re = new RegExp(`^##\\s+${escapeRegExp(header)}[\\s\\S]*?(?=^##\\s+|\\Z)`, 'm');
  const m = md.match(re);
  return m ? m[0].trim() : '';
}

function replaceRole(mdTop, newRole) {
  if (!newRole) return mdTop;
  const lines = mdTop.split('\n');
  const idx = lines.findIndex(l => /^\*\*.+\*\*$/.test(l));
  if (idx !== -1) {
    lines[idx] = `**${newRole}**`;
    return lines.join('\n');
  }
  // Fallback: insert under name
  const nameIdx = lines.findIndex(l => /^#\s+/.test(l));
  if (nameIdx !== -1) {
    lines.splice(nameIdx + 1, 0, `**${newRole}**`);
  }
  return lines.join('\n');
}

function extractRole(mdTop) {
  const m = mdTop.split('\n').find(l => /^\*\*.+\*\*$/.test(l));
  return m ? m.replace(/^\*\*|\*\*$/g, '') : '';
}

function emphasizeKeywords(skillsSection, keywords) {
  if (!keywords?.length) return skillsSection;
  const list = keywords.map(k => k.replace(/\|/g, '\\|')).join(', ');
  const injected = `\n- **Role/Company Keywords**: ${list}\n`;
  // Append near end of skills section
  return skillsSection.replace(/\s*$/, injected);
}

function cleanupBuzzwords(md) {
  let out = md;

  // 1) Remove "enterprise-grade" (case-insensitive), keep "enterprise" where sensible
  out = out.replace(/\benterprise[- ]grade\b/gi, 'enterprise');

  // 2) Remove hyphenated "-enabled": "Web3-enabled" -> "Web3"
  out = out.replace(/(\b[A-Za-z0-9+/]+)-enabled\b/gi, '$1');

  // 3) Tone down "enabled/enabling" (keeps grammar)
  out = out.replace(/\benabling\b/gi, 'allowing');
  out = out.replace(/\benabled\b/gi, 'supported');

  // 4) Collapse multiple spaces left by replacements
  out = out.replace(/[ ]{2,}/g, ' ');

  return out;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function downloadPdf() {
  const element = document.getElementById('preview');
  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };
  await html2pdf().from(element).set(opt).save();
}

function downloadMd() {
  const blob = new Blob([state.currentMd], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'resume.md';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}
