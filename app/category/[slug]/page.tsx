import CategoryClient from "./CategoryClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ THIS IS REQUIRED IN NEXT 16

  console.log("SERVER SLUG:", slug);

  return <CategoryClient slug={slug} />;
}
