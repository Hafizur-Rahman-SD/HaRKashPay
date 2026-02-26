import { $, showToast, go } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { transferMoney } from "../money.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

$("#btnTransfer").addEventListener("click", () => {
  const res = transferMoney({
    userId: session.userId,
    toMobile: $("#to").value,
    amount: $("#amount").value,
    pin: $("#pin").value,
  });
  if (!res.ok) return showToast(res.msg, "error");

  showToast("Transfer successful!", "success");
  go("./home.html");
});