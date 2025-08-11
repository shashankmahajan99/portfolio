/* global marked, DOMPurify, html2pdf, Sortable */

// Local persistence
const STORAGE_KEY = 'resumeBuilderState.v2';
const STORAGE_VERSION = 2;

const state = {
  // Parsed from resume.md
  header: { name: '', role: '', contactsMd: '' },
  sections: [], // [{ id, title, contentMd, visible }]
  // UI/options
  selectedSectionId: null,
  cleanupBuzz: true,
  keywords: [],
  // Base and current docs
  baseMd: '',
  currentMd: '',
  baseMdHash: '',
};

const els = {
  name: () => document.getElementById('name'),
  role: () => document.getElementById('role'),
  contacts: () => document.getElementById('contacts'),
  sectionsList: () => document.getElementById('sectionsList'),
  addSectionBtn: () => document.getElementById('addSectionBtn'),
  editor: () => document.getElementById('editor'),
  editorTitle: () => document.getElementById('editorTitle'),
  sectionTitle: () => document.getElementById('sectionTitle'),
  sectionContent: () => document.getElementById('sectionContent'),
  deleteSectionBtn: () => document.getElementById('deleteSectionBtn'),
  saveSectionBtn: () => document.getElementById('saveSectionBtn'),
  cleanupBuzz: () => document.getElementById('cleanup-buzz'),
  keywords: () => document.getElementById('keywords'),
  previewSurface: () => document.getElementById('resumeSurface'),
  resetBtn: () => document.getElementById('resetBtn'),
  clearSavedBtn: () => document.getElementById('clearSavedBtn'),
  pdfBtn: () => document.getElementById('pdfBtn'),
  mdBtn: () => document.getElementById('mdBtn'),
  toggleControls: () => document.getElementById('toggleControls'),
  controls: () => document.querySelector('.controls'),
};

// Debounced autosave
let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 300);
}
function saveState() {
  try {
    const payload = {
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString(),
      baseMdHash: state.baseMdHash,
      header: state.header,
      sections: state.sections,
      cleanupBuzz: state.cleanupBuzz,
      keywords: state.keywords,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // Storage full or disabled; fail silently.
    // You could notify the user here if desired.
  }
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    if (!data.version || data.version > STORAGE_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}
function clearSaved() {
  localStorage.removeItem(STORAGE_KEY);
}

document.addEventListener('DOMContentLoaded', async () => {
  const md = await fetch('/resume.md').then(r => r.text()).catch(() => '# Error\nCould not load resume.md');
  state.baseMd = md;
  state.baseMdHash = hashString(md);

  // Prefer saved state if present
  const saved = loadState();
  if (saved) {
    // If resume.md changed significantly, we still load saved edits to preserve user work.
    state.header = saved.header || state.header;
    state.sections = (saved.sections || []).map(s => ({
      id: s.id || crypto.randomUUID(),
      title: s.title || 'Section',
      contentMd: s.contentMd || '',
      visible: typeof s.visible === 'boolean' ? s.visible : true,
    }));
    state.cleanupBuzz = typeof saved.cleanupBuzz === 'boolean' ? saved.cleanupBuzz : true;
    state.keywords = Array.isArray(saved.keywords) ? saved.keywords : [];
  } else {
    // First load from base resume.md
    parseResumeMd(md);
  }

  hydrateControls();
  renderSectionsList();
  renderPreview();

  // Drag-and-drop reorder
  Sortable.create(els.sectionsList(), {
    animation: 150,
    handle: '.section-drag',
    onEnd: (evt) => {
      const { oldIndex, newIndex } = evt;
      if (oldIndex === newIndex) return;
      const arr = state.sections;
      const [moved] = arr.splice(oldIndex, 1);
      arr.splice(newIndex, 0, moved);
      renderPreview();
      scheduleSave();
    }
  });

  // Wire header inputs
  els.name().addEventListener('input', () => { state.header.name = els.name().value; renderPreview(); scheduleSave(); });
  els.role().addEventListener('input', () => { state.header.role = els.role().value; renderPreview(); scheduleSave(); });
  els.contacts().addEventListener('input', () => { state.header.contactsMd = els.contacts().value; renderPreview(); scheduleSave(); });

  // Wire options
  els.cleanupBuzz().addEventListener('change', () => { state.cleanupBuzz = els.cleanupBuzz().checked; renderPreview(); scheduleSave(); });
  els.keywords().addEventListener('input', () => { state.keywords = parseKeywords(els.keywords().value); renderPreview(); scheduleSave(); });

  // Section CRUD
  els.addSectionBtn().addEventListener('click', onAddSection);
  els.saveSectionBtn().addEventListener('click', onSaveSection);
  els.deleteSectionBtn().addEventListener('click', onDeleteSection);

  // Actions
  els.resetBtn().addEventListener('click', () => {
    parseResumeMd(state.baseMd);
    hydrateControls();
    renderSectionsList();
    renderPreview();
    clearSaved();
  });
  els.clearSavedBtn().addEventListener('click', () => {
    clearSaved();
    // Keep current UI as-is, just remove persistence
    // If you want to also reset the UI, uncomment below:
    // parseResumeMd(state.baseMd); hydrateControls(); renderSectionsList(); renderPreview();
  });
  els.mdBtn().addEventListener('click', downloadMd);
  els.pdfBtn().addEventListener('click', downloadPdf);

  // Mobile: toggle controls panel visibility
  els.toggleControls().addEventListener('click', () => {
    const isHidden = els.controls().getAttribute('data-collapsed') === 'true';
    if (isHidden) {
      els.controls().removeAttribute('data-collapsed');
      els.toggleControls().setAttribute('aria-expanded', 'true');
      els.toggleControls().textContent = 'Hide Controls';
    } else {
      els.controls().setAttribute('data-collapsed', 'true');
      els.toggleControls().setAttribute('aria-expanded', 'false');
      els.toggleControls().textContent = 'Show Controls';
    }
  });

  // Save on unload just in case
  window.addEventListener('beforeunload', () => {
    saveState();
  });
});

function hydrateControls() {
  els.name().value = state.header.name || '';
  els.role().value = state.header.role || '';
  els.contacts().value = state.header.contactsMd || '';
  els.cleanupBuzz().checked = state.cleanupBuzz;
  els.keywords().value = state.keywords.join(', ');
}

function renderSectionsList() {
  const ul = els.sectionsList();
  ul.innerHTML = '';
  state.sections.forEach((s, index) => {
    const li = document.createElement('li');
    li.className = 'section-item';
    li.dataset.id = s.id;

    const drag = document.createElement('div');
    drag.className = 'section-drag';
    drag.title = 'Drag to reorder';
    drag.textContent = '≡';

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = s.title || `Untitled ${index + 1}`;

    const actions = document.createElement('div');
    actions.className = 'section-actions';

    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = s.visible;
    chk.title = 'Toggle visibility';
    chk.addEventListener('change', () => { s.visible = chk.checked; renderPreview(); scheduleSave(); });

    const edit = document.createElement('button');
    edit.className = 'btn small';
    edit.textContent = 'Edit';
    edit.addEventListener('click', () => openEditor(s.id));

    actions.appendChild(chk);
    actions.appendChild(edit);
    li.appendChild(drag);
    li.appendChild(title);
    li.appendChild(actions);
    ul.appendChild(li);
  });
}

function openEditor(id) {
  state.selectedSectionId = id;
  const s = state.sections.find(x => x.id === id);
  if (!s) return;
  els.editor().hidden = false;
  els.editorTitle().textContent = `Edit: ${s.title || 'Untitled'}`;
  els.sectionTitle().value = s.title || '';
  els.sectionContent().value = s.contentMd || '';
}

function onSaveSection() {
  const id = state.selectedSectionId;
  if (!id) return;
  const s = state.sections.find(x => x.id === id);
  if (!s) return;
  s.title = els.sectionTitle().value.trim() || s.title;
  s.contentMd = els.sectionContent().value;
  renderSectionsList();
  renderPreview();
  scheduleSave();
}

function onDeleteSection() {
  const id = state.selectedSectionId;
  if (!id) return;
  const idx = state.sections.findIndex(x => x.id === id);
  if (idx === -1) return;
  state.sections.splice(idx, 1);
  state.selectedSectionId = null;
  els.editor().hidden = true;
  renderSectionsList();
  renderPreview();
  scheduleSave();
}

function onAddSection() {
  const title = prompt('New section title (e.g., Publications, Volunteering):', 'New Section');
  if (title === null) return;
  const sec = {
    id: crypto.randomUUID(),
    title: (title || '').trim() || 'New Section',
    contentMd: '',
    visible: true,
  };
  state.sections.push(sec);
  renderSectionsList();
  openEditor(sec.id);
  renderPreview();
  scheduleSave();
}

function parseResumeMd(md) {
  // Extract header (before first H2)
  const idx = md.search(/^##\s+/m);
  const headerTop = idx === -1 ? md : md.slice(0, idx).trim();
  const after = idx === -1 ? '' : md.slice(idx);

  const { name, role, contactsMd } = parseHeader(headerTop);
  state.header = { name, role, contactsMd };

  // Extract sections
  const titles = [];
  const secRe = /^##\s+(.+?)\s*$/gm;
  let match;
  while ((match = secRe.exec(after)) !== null) {
    titles.push({ title: match[1].trim(), start: match.index });
  }
  const sections = [];
  for (let i = 0; i < titles.length; i++) {
    const start = titles[i].start;
    const end = i + 1 < titles.length ? titles[i + 1].start : after.length;
    const block = after.slice(start, end);
    const titleLine = block.match(/^##\s+(.+?)\s*$/m);
    const title = titleLine ? titleLine[1].trim() : `Section ${i + 1}`;
    const contentMd = block.replace(/^##\s+.+\n?/, '').trim();
    sections.push({
      id: crypto.randomUUID(),
      title,
      contentMd,
      visible: true,
    });
  }
  state.sections = sections;
  state.cleanupBuzz = true;
  state.keywords = [];
}

function parseHeader(topMd) {
  const lines = topMd.split('\n').map(l => l.trim());
  const nameLine = lines.find(l => l.startsWith('# ')) || '';
  const roleLine = lines.find(l => /^\*\*.+\*\*$/.test(l)) || '';
  const name = nameLine.replace(/^#\s+/, '').trim();
  const role = roleLine.replace(/^\*\*|\*\*$/g, '').trim();
  const contactLines = lines.filter(l =>
    l && l !== nameLine && l !== roleLine && !/^---+$/.test(l)
  );
  const contactsMd = contactLines.join('\n');
  return { name, role, contactsMd };
}

function buildHeaderMd(h) {
  const name = h.name ? `# ${h.name}\n` : '';
  const role = h.role ? `**${h.role}**\n` : '';
  const contacts = h.contactsMd ? `${h.contactsMd.trim()}\n` : '';
  return [name, role, contacts, '\n---\n'].join('').replace(/\n{3,}/g, '\n\n');
}

function buildSectionsMd(sections, keywords) {
  const arr = [];
  for (const s of sections) {
    if (!s.visible) continue;
    let body = s.contentMd || '';
    if (s.title.toLowerCase().includes('skills') && keywords?.length) {
      const list = keywords.join(', ');
      body = `${body.trim()}\n\n- **Role/Company Keywords**: ${list}\n`;
    }
    arr.push(`## ${s.title}\n\n${body.trim()}\n`);
  }
  return arr.join('\n');
}

function cleanupBuzzwords(md) {
  let out = md;
  // Remove "enterprise-grade"
  out = out.replace(/\benterprise[- ]grade\b/gi, 'enterprise');
  // Remove "-enabled" suffix
  out = out.replace(/(\b[A-Za-z0-9+/]+)-enabled\b/gi, '$1');
  // Soften "enabled/enabling"
  out = out.replace(/\benabling\b/gi, 'allowing');
  out = out.replace(/\benabled\b/gi, 'supported');
  // Normalize spaces
  out = out.replace(/[ ]{2,}/g, ' ');
  return out;
}

function renderPreview() {
  // Build MD from state
  const headerMd = buildHeaderMd(state.header);
  const sectionsMd = buildSectionsMd(state.sections, state.keywords);
  let md = `${headerMd}\n${sectionsMd}`.trim() + '\n';
  if (state.cleanupBuzz) md = cleanupBuzzwords(md);

  // Convert to HTML
  const unsafeHtml = marked.parse(md, { mangle: false, headerIds: true });
  const safeHtml = DOMPurify.sanitize(unsafeHtml);

  // Inject into the exact surface used for PDF
  const surface = els.previewSurface();
  surface.innerHTML = safeHtml;

  // Persist current MD for downloads
  state.currentMd = md;
}

function parseKeywords(s) {
  return (s || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
}

async function downloadPdf() {
 const element = els.previewSurface();
  
  // Create a clone to avoid modifying the original
  const clone = element.cloneNode(true);
  
  // Apply PDF-specific styles
  clone.style.width = '794px';
  clone.style.minHeight = '1123px';
  clone.style.maxHeight = '1123px';
  clone.style.overflow = 'hidden';
  clone.style.fontSize = '10.5px';
  clone.style.padding = '15px';
  
  // Temporarily add to DOM for rendering
  document.body.appendChild(clone);
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  
  const opt = {
    margin: 8,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['avoid-all'] }
  };

  try {
    await html2pdf().from(clone).set(opt).save();
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('PDF generation failed. Please try again.');
  } finally {
    // Clean up
    document.body.removeChild(clone);
  }
}

function downloadMd() {
  const blob = new Blob([state.currentMd || ''], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'resume.md';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
}

// Simple, fast hash to detect content changes (not cryptographic)
function hashString(str) {
  let h = 5381, i = str.length;
  while (i) { h = (h * 33) ^ str.charCodeAt(--i); }
  return (h >>> 0).toString(16);
}
