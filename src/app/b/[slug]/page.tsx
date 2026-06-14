import { supabase } from "@/lib/supabase";
import ReviewCard from "@/components/ReviewCard";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!business) {
    return <h1>Business Not Found</h1>;
  }

  const { data: reviews } = await supabase
    .from("review_templates")
    .select("*")
    .eq("business_id", business.id);

  const randomReview =
    reviews?.[
      Math.floor(Math.random() * reviews.length)
    ];

  return (
    <div>
      <h1>{business.name}</h1>

      <ReviewCard
        review={randomReview?.review_text || ""}
        googleUrl={business.google_review_url}
      />
    </div>
  );
}