export function $(sel) {
  return document.querySelector(sel);
}

export function go(path) {
  window.location.href = path;
}

export function showToast(msg, type = "info") {
  const wrap = document.createElement("div");
  wrap.className = "toast toast-top toast-center z-50";

  const alert = document.createElement("div");
  alert.className =
    type === "success"
      ? "alert alert-success"
      : type === "error"
      ? "alert alert-error"
      : "alert alert-info";

  alert.innerHTML = `<span>${msg}</span>`;
  wrap.appendChild(alert);
  document.body.appendChild(wrap);

  setTimeout(() => wrap.remove(), 2200);
}

export function formatMoney(n) {
  const num = Number(n) || 0;
  return `৳${num.toLocaleString("en-US")}`;
}

export function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}