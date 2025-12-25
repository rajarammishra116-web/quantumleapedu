import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function AdminLogin({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (e) {
      console.error(e);
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <input
        className="input"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn-primary w-full">
        Login
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
