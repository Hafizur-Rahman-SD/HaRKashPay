import { $, showToast, go } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { BILL_TYPES, payBill } from "../money.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

const sel = $("#billType");
BILL_TYPES.forEach((t) => {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  sel.appendChild(opt);
});

$("#btnPay").addEventListener("click", () => {
  const res = payBill({
    userId: session.userId,
    billType: sel.value,
    billNumber: $("#billNo").value,
    amount: $("#amount").value,
    pin: $("#pin").value,
  });
  if (!res.ok) return showToast(res.msg, "error");

  showToast("Bill paid successfully!", "success");
  go("./home.html");
});