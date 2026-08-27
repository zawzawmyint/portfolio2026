export async function getBlogs() {
  const url = "https://mediumpostsapi.vercel.app/api/cuzawzawmyint";

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidate every 1 hour
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
