"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      <div
        style={{
          padding: "40px",
          border: "1px solid #333",
          borderRadius: "12px",
        }}
      >
        <h1>AI Review Platform</h1>

        <button
          onClick={signIn}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}