/**
 * Revalidates Next.js pages by path using the revalidation API
 * @param paths - The path(s) of the page(s) to revalidate
 * @returns Promise resolving to boolean indicating success
 */
export async function revalidatePage(paths: string | string[]): Promise<boolean> {
  try {
    const revalidationSecret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET;
    
    if (!revalidationSecret) {
      console.warn('Revalidation secret not found in environment variables');
      return false;
    }
    
    const pathsToRevalidate = Array.isArray(paths) ? paths : [paths];
    console.log('Revalidating paths:', pathsToRevalidate);
    
    const results = await Promise.all(
      pathsToRevalidate.map(async (path) => {
        const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
        
        const response = await fetch(
          `/api/revalidate?secret=${revalidationSecret}&path=${sanitizedPath}`,
          { method: 'GET' }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to revalidate path ${path}:`, errorText);
          return false;
        }
        
        console.log(`Successfully revalidated: ${path}`);
        return true;
      })
    );
    
    // Return true only if all revalidations were successful
    return results.every(result => result === true);
  } catch (error) {
    console.error('Error revalidating paths:', error);
    return false;
  }
}
