import { $ , showToast, go } from "../ui.js";
import { normalizeAuthInput, createUserLocal, verifyLoginLocal, setSession } from "../auth.js";

$("#btnLogin").addEventListener("click", () => {
  const v = normalizeAuthInput($("#mobile").value, $("#pin").value);
  if(!v.ok) return showToast(v.msg, "error");

  const res = verifyLoginLocal({ mobile: v.mobile, pin: v.pin });
  if(!res.ok) return showToast(res.msg, "error");

  setSession({ userId: res.user.id, mobile: res.user.mobile });
  showToast("Login success!", "success");
  go("./home.html");
});

$("#btnRegister").addEventListener("click", () => {
  const v = normalizeAuthInput($("#mobile").value, $("#pin").value);
  if(!v.ok) return showToast(v.msg, "error");

  const res = createUserLocal({ mobile: v.mobile, pin: v.pin });
  if(!res.ok) return showToast(res.msg, "error");

  setSession({ userId: res.user.id, mobile: res.user.mobile });
  showToast("Account created!", "success");
  go("./home.html");
});