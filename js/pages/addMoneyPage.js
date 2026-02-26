import { $, showToast, go } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { BANKS_BD, addMoney } from "../money.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

const bankSel = $("#bank");
BANKS_BD.forEach((b) => {
  const opt = document.createElement("option");
  opt.value = b;
  opt.textContent = b;
  bankSel.appendChild(opt);
});

$("#btnAdd").addEventListener("click", () => {
  const res = addMoney({
    userId: session.userId,
    bankName: bankSel.value,
    amount: $("#amount").value,
    pin: $("#pin").value,
  });
  if (!res.ok) return showToast(res.msg, "error");

  showToast("Money added successfully!", "success");
  go("./home.html");
});