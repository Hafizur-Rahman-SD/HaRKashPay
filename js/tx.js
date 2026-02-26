const KEYS = {
  TX: "harkash_tx",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function addTx(tx) {
  const list = read(KEYS.TX, []);
  list.unshift(tx);
  write(KEYS.TX, list);
}

export function getMyTx(userId) {
  const list = read(KEYS.TX, []);
  return list.filter((t) => t.userId === userId);
}

export function seedDemoTx(userId) {
  const existing = getMyTx(userId);
  if (existing.length) return;

  const now = Date.now();
  const demo = [
    { title: "Bank Deposit", type: "ADD_MONEY", amount: 5000, ts: now - 1000 * 60 * 60 * 3 },
    { title: "Electricity Bill", type: "PAY_BILL", amount: 1200, ts: now - 1000 * 60 * 60 * 5 },
    { title: "Cashout", type: "CASHOUT", amount: 1000, ts: now - 1000 * 60 * 60 * 9 },
  ];

  demo.forEach((d) => {
    addTx({
      id: crypto.randomUUID(),
      userId,
      title: d.title,
      type: d.type,
      amount: d.amount,
      meta: {},
      createdAt: d.ts,
    });
  });
}