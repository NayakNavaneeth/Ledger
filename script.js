// Ledger — simple expense tracker
// State lives in memory for this session. See README for how to wire up
// localStorage once you're hosting this yourself (it's commented below).

let entries = [];

const entriesList = document.getElementById('entriesList');
const emptyState = document.getElementById('emptyState');
const totalInEl = document.getElementById('totalIn');
const totalOutEl = document.getElementById('totalOut');
const balanceEl = document.getElementById('balance');
const form = document.getElementById('entryForm');
const todayEl = document.getElementById('today');

const fmt = (n) => `$${n.toFixed(2)}`;

function today() {
  return new Date().toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}
todayEl.textContent = today();

function render() {
  entriesList.innerHTML = '';
  emptyState.style.display = entries.length ? 'none' : 'block';

  let totalIn = 0, totalOut = 0;

  // newest first
  [...entries].reverse().forEach((entry) => {
    const li = document.createElement('li');
    li.className = 'entry';

    const desc = document.createElement('span');
    desc.className = 'entry__desc';
    desc.textContent = entry.desc;

    const cat = document.createElement('span');
    cat.className = 'entry__cat';
    cat.textContent = entry.category;

    const amt = document.createElement('span');
    amt.className = `entry__amount entry__amount--${entry.type}`;
    amt.textContent = `${entry.type === 'in' ? '+' : '-'}${fmt(entry.amount)}`;

    const del = document.createElement('button');
    del.className = 'entry__del';
    del.textContent = 'remove';
    del.addEventListener('click', () => {
      entries = entries.filter((e) => e.id !== entry.id);
      render();
    });

    li.append(desc, cat, amt, del);
    entriesList.appendChild(li);
  });

  entries.forEach((e) => {
    if (e.type === 'in') totalIn += e.amount;
    else totalOut += e.amount;
  });

  totalInEl.textContent = fmt(totalIn);
  totalOutEl.textContent = fmt(totalOut);
  balanceEl.textContent = fmt(totalIn - totalOut);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;

  if (!desc || isNaN(amount) || amount <= 0) return;

  entries.push({
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    desc, amount, type, category
  });

  form.reset();
  render();
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ledger-entries.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Clear all entries? This cannot be undone.')) {
    entries = [];
    render();
  }
});

/* --- Optional: persist between visits once you're hosting this yourself ---
   Uncomment the block below and replace the in-memory `entries = []` above
   with a load from storage:

   function save() { localStorage.setItem('ledger-entries', JSON.stringify(entries)); }
   function load() { return JSON.parse(localStorage.getItem('ledger-entries') || '[]'); }
   entries = load();
   // then call save() at the end of the submit and delete handlers.
------------------------------------------------------------------------- */

render();
