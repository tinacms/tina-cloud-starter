"use client";

import { useEditState } from "tinacms/dist/react";

export default function ReRender() {
  const { edit } = useEditState();

  if (edit) {
    fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: window.location.pathname, // Pass the current path to revalidate
      }),
    });
  }

  return null;
}
