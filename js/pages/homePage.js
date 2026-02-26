import { $, showToast, formatMoney, formatTime } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { logoutLocal, getMeLocal } from "../auth.js";
import { getMyTx, seedDemoTx } from "../tx.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

function renderBalance() {
  const me = getMeLocal(session.userId);
  $("#balance").textContent = formatMoney(me?.balance ?? 0);
  $("#myMobile").textContent = `Logged in: ${me?.mobile ?? ""}`;
}

function renderLatest() {
  const list = $("#txList");
  list.innerHTML = "";

  const items = getMyTx(session.userId).slice(0, 4);
  if (!items.length) {
    list.innerHTML = `<div class="muted">No transactions yet. Click “Load Demo Data”.</div>`;
    return;
  }

  items.forEach((t) => {
    const row = document.createElement("div");
    row.className = "bg-white rounded-2xl px-4 py-3 border border-gray-200 flex justify-between";
    row.innerHTML = `
      <div>
        <div class="font-semibold">${t.title}</div>
        <div class="muted">${formatTime(t.createdAt)}</div>
      </div>
      <div class="text-right">
        <div class="font-black">${formatMoney(t.amount)}</div>
        <div class="muted">${t.type}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

$("#btnLogout").addEventListener("click", () => {
  logoutLocal();
  showToast("Logged out", "success");
  window.location.href = "./login.html";
});

$("#btnDemo").addEventListener("click", () => {
  seedDemoTx(session.userId);
  showToast("Demo transactions added!", "success");
  renderLatest();
});

renderBalance();
renderLatest();