import { $, showToast, go } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { cashout } from "../money.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

$("#btnCashout").addEventListener("click", () => {
  const res = cashout({
    userId: session.userId,
    agentMobile: $("#agent").value,
    amount: $("#amount").value,
    pin: $("#pin").value,
  });
  if (!res.ok) return showToast(res.msg, "error");

  showToast("Cashout successful!", "success");
  go("./home.html");
});