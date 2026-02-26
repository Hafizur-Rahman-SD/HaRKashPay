import { $, formatMoney, formatTime } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { getMyTx } from "../tx.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

function render() {
  const list = $("#list");
  list.innerHTML = "";

  const filter = $("#filter").value;
  const q = ($("#search").value || "").trim().toLowerCase();

  let items = getMyTx(session.userId);

  if (filter !== "ALL") items = items.filter((t) => t.type === filter);
  if (q) {
    items = items.filter((t) => {
      const metaStr = JSON.stringify(t.meta || {}).toLowerCase();
      return (
        String(t.title).toLowerCase().includes(q) ||
        String(t.type).toLowerCase().includes(q) ||
        metaStr.includes(q)
      );
    });
  }

  if (!items.length) {
    list.innerHTML = `<div class="muted">No transactions found.</div>`;
    return;
  }

  items.forEach((t) => {
    const row = document.createElement("div");
    row.className = "bg-white rounded-2xl px-4 py-3 border border-gray-200 flex justify-between";
    row.innerHTML = `
      <div>
        <div class="font-semibold">${t.title}</div>
        <div class="muted">${formatTime(t.createdAt)}</div>
        <div class="muted">${t.type}</div>
      </div>
      <div class="text-right">
        <div class="font-black">${formatMoney(t.amount)}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

$("#filter").addEventListener("change", render);
$("#search").addEventListener("input", render);

$("#btnClear").addEventListener("click", () => {
  $("#filter").value = "ALL";
  $("#search").value = "";
  render();
});

render();