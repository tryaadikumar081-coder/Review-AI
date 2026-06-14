"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRCodeCard({
  url,
}: {
  url: string;
}) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url).then(setQr);
  }, [url]);

  if (!qr) return <p>Generating QR...</p>;

  return (
    <div>
      <img
        src={qr}
        alt="QR Code"
        width={250}
      />

      <br />

      <a
        href={qr}
        download="review-qr.png"
      >
        Download QR
      </a>
    </div>
  );
}