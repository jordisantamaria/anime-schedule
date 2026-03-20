"use client";

export function BackButton() {
  return (
    <button
      onClick={() => {
        if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
          window.history.back();
        } else {
          window.location.href = "/";
        }
      }}
      className="mb-4 inline-block text-sm text-accent hover:text-accent-hover cursor-pointer"
    >
      &larr; 戻る
    </button>
  );
}
