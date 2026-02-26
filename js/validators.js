export function onlyDigits(v) {
  return String(v ?? "").replace(/\D/g, "");
}

export function isValidMobile11(mobile) {
  const m = onlyDigits(mobile);
  return m.length === 11;
}

export function isValidPin6(pin) {
  const p = onlyDigits(pin);
  return p.length === 6;
}

export function toInt(n) {
  const x = Math.floor(Number(n));
  return Number.isFinite(x) ? x : NaN;
}

export function validateAmountPositive(amount) {
  const x = toInt(amount);
  if (!Number.isFinite(x)) return { ok: false, msg: "Amount must be a number" };
  if (x <= 0) return { ok: false, msg: "Amount must be greater than 0" };
  return { ok: true, value: x };
}

export function validateTransferAmount(amount) {
  const base = validateAmountPositive(amount);
  if (!base.ok) return base;
  if (base.value > 50000) return { ok: false, msg: "Max transfer is 50,000" };
  return base;
}

export function calcCashoutFee(amount) {
  const a = toInt(amount);
  if (!Number.isFinite(a) || a <= 0) return 0;
  // 1000 e 15 taka => 1.5% in blocks
  return Math.ceil(a / 1000) * 15;
}