import { getSession } from "./auth.js";
import { go } from "./ui.js";

export function requireAuthOrRedirect() {
  const session = getSession();
  if (!session) {
    go("./login.html");
    return null;
  }
  return session;
}