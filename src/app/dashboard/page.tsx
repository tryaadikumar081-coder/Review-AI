"use client";

import QRCodeCard from "@/components/QRCodeCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBusiness();
  }, []);

  async function checkBusiness() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: businessData } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    if (!businessData) {
      router.push("/onboarding");
      return;
    }

    setBusiness(businessData);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "40px",
      }}
    >
      <h1>Dashboard</h1>

      <br />

      <p>
        <strong>Business Name:</strong> {business.name}
      </p>

      <p>
        <strong>Slug:</strong> {business.slug}
      </p>

      <div>
        <strong>Google Reviews:</strong>
        <br />
        <a
            href={business.google_review_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            Open Google Reviews
        </a>
    </div>

      <p>
        <strong>Address:</strong> {business.address}
      </p>

      <h2>Review QR Code</h2>

        <QRCodeCard
        url={`http://192.168.30.22:3000/b/${business.slug}`}
        />

      <br />

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}