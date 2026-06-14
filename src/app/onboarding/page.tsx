"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("profiles")
      .upsert({
        user_id: user.id,
        name: user.user_metadata?.full_name,
        email: user.email,
        mobile,
      });

    const slug = businessName
      .toLowerCase()
      .replace(/\s+/g, "-");

    const { data, error } = await supabase
  .from("businesses")
  .insert({
    owner_id: user.id,
    name: businessName,
    slug,
    address,
    google_review_url: googleReviewUrl,
  });

console.log("Business Insert:", data);
console.log("Business Error:", error);

if (error) {
  alert(error.message);
  return;
}

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />

      <input
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        placeholder="Google Review URL"
        value={googleReviewUrl}
        onChange={(e) => setGoogleReviewUrl(e.target.value)}
      />

      <button type="submit">
        Complete Setup
      </button>
    </form>
  );
}