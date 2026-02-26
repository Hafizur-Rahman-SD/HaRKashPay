import {
  validateAmountPositive,
  validateTransferAmount,
  isValidMobile11,
  isValidPin6,
  onlyDigits,
  calcCashoutFee,
} from "./validators.js";
import {
  findUserByMobile,
  getMeLocal,
  updateBalanceLocal,
  getUsedBonusCodes,
  markBonusUsed,
} from "./auth.js";
import { addTx } from "./tx.js";

export const BANKS_BD = [
  "Dutch-Bangla Bank",
  "BRAC Bank",
  "City Bank",
  "Islami Bank",
  "Sonali Bank",
  "Eastern Bank",
  "Prime Bank",
  "Bank Asia",
  "UCB Bank",
  "IFIC Bank",
];

export const BILL_TYPES = [
  "Electricity",
  "Gas",
  "Water",
  "Internet",
  "Mobile Recharge",
  "Education Fee",
];

export const BONUS_COUPONS = [
  { code: "WELCOME50", amount: 50 },
  { code: "HARKASH100", amount: 100 },
  { code: "BONUS200", amount: 200 },
];

function mustMatchPin(me, pin) {
  const p = onlyDigits(pin);
  if (!isValidPin6(p)) return { ok: false, msg: "Please give 6 digit PIN" };
  if (me.pin !== p) return { ok: false, msg: "Wrong PIN" };
  return { ok: true };
}

function txCommon(userId, title, type, amount, meta = {}) {
  addTx({
    id: crypto.randomUUID(),
    userId,
    title,
    type,
    amount: Number(amount),
    meta,
    createdAt: Date.now(),
  });
}

export function addMoney({ userId, bankName, amount, pin }) {
  const me = getMeLocal(userId);
  if (!me) return { ok: false, msg: "User not found" };

  const pinOk = mustMatchPin(me, pin);
  if (!pinOk.ok) return pinOk;

  const a = validateAmountPositive(amount);
  if (!a.ok) return a;

  const newBal = (me.balance || 0) + a.value;
  updateBalanceLocal(userId, newBal);

  txCommon(userId, `Add Money (${bankName})`, "ADD_MONEY", a.value, { bankName });

  return { ok: true, balance: newBal };
}

export function cashout({ userId, agentMobile, amount, pin }) {
  const me = getMeLocal(userId);
  if (!me) return { ok: false, msg: "User not found" };

  const pinOk = mustMatchPin(me, pin);
  if (!pinOk.ok) return pinOk;

  const mobile = onlyDigits(agentMobile);
  if (!isValidMobile11(mobile)) return { ok: false, msg: "Agent number must be 11 digits" };

  const a = validateAmountPositive(amount);
  if (!a.ok) return a;

  const fee = calcCashoutFee(a.value);
  const total = a.value + fee;

  if ((me.balance || 0) < total) {
    return { ok: false, msg: `Insufficient balance. Need ৳${total}` };
  }

  const newBal = me.balance - total;
  updateBalanceLocal(userId, newBal);

  txCommon(userId, `Cashout to ${mobile}`, "CASHOUT", a.value, { agentMobile: mobile, fee });

  return { ok: true, balance: newBal, fee, total };
}

export function transferMoney({ userId, toMobile, amount, pin }) {
  const me = getMeLocal(userId);
  if (!me) return { ok: false, msg: "User not found" };

  const pinOk = mustMatchPin(me, pin);
  if (!pinOk.ok) return pinOk;

  const receiverMobile = onlyDigits(toMobile);
  if (!isValidMobile11(receiverMobile)) return { ok: false, msg: "Receiver number must be 11 digits" };

  const a = validateTransferAmount(amount);
  if (!a.ok) return a;

  if ((me.balance || 0) < a.value) {
    return { ok: false, msg: "Insufficient balance" };
  }

  const receiver = findUserByMobile(receiverMobile);
  if (!receiver) {
    return { ok: false, msg: "Receiver not found (demo: receiver must be registered)" };
  }
  if (receiver.id === me.id) {
    return { ok: false, msg: "You cannot transfer to your own number" };
  }

  // sender -
  updateBalanceLocal(me.id, me.balance - a.value);
  // receiver +
  updateBalanceLocal(receiver.id, (receiver.balance || 0) + a.value);

  txCommon(me.id, `Transfer to ${receiverMobile}`, "TRANSFER_SENT", a.value, { to: receiverMobile });
  txCommon(receiver.id, `Received from ${me.mobile}`, "TRANSFER_RECEIVED", a.value, { from: me.mobile });

  return { ok: true };
}

export function payBill({ userId, billType, billNumber, amount, pin }) {
  const me = getMeLocal(userId);
  if (!me) return { ok: false, msg: "User not found" };

  const pinOk = mustMatchPin(me, pin);
  if (!pinOk.ok) return pinOk;

  const ref = onlyDigits(billNumber);
  if (ref.length < 6) return { ok: false, msg: "Bill number must be at least 6 digits" };

  const a = validateAmountPositive(amount);
  if (!a.ok) return a;

  if ((me.balance || 0) < a.value) return { ok: false, msg: "Insufficient balance" };

  updateBalanceLocal(userId, me.balance - a.value);
  txCommon(userId, `${billType} Bill`, "PAY_BILL", a.value, { billType, billNumber: ref });

  return { ok: true };
}

export function applyBonus({ userId, code }) {
  const me = getMeLocal(userId);
  if (!me) return { ok: false, msg: "User not found" };

  const c = String(code || "").trim().toUpperCase();
  if (!c) return { ok: false, msg: "Enter a coupon code" };

  const found = BONUS_COUPONS.find((x) => x.code === c);
  if (!found) return { ok: false, msg: "Invalid coupon code" };

  const used = getUsedBonusCodes(userId);
  if (used.includes(c)) return { ok: false, msg: "This coupon already used" };

  updateBalanceLocal(userId, (me.balance || 0) + found.amount);
  markBonusUsed(userId, c);

  txCommon(userId, `Bonus (${c})`, "BONUS", found.amount, { code: c });

  return { ok: true, amount: found.amount };
}