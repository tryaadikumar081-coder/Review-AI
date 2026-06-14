"use client";

export default function ReviewCard({
  review,
  googleUrl,
}: {
  review: string;
  googleUrl: string;
}) {
  async function copyReview() {
    await navigator.clipboard.writeText(review);
    alert("Review copied");
  }

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        {review}
      </p>

      <button
        onClick={copyReview}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Copy Review
      </button>

      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Review on Google
        </button>
      </a>
    </div>
  );
}