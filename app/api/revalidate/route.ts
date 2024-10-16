import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { path } = await request.json();
  if (!path) {
    return new Response('Path missing', { status: 400 });
  }

  // Revalidate the specified path
  revalidatePath(path);
  return new Response(`Revalidated ${path}`, { status: 200 });
}
