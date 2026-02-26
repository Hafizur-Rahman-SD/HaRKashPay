import { $, showToast, go } from "../ui.js";
import { requireAuthOrRedirect } from "../guard.js";
import { applyBonus } from "../money.js";

const session = requireAuthOrRedirect();
if (!session) throw new Error("No session");

$("#btnApply").addEventListener("click", () => {
  const res = applyBonus({ userId: session.userId, code: $("#code").value });
  if (!res.ok) return showToast(res.msg, "error");

  showToast("Bonus added!", "success");
  go("./home.html");
});