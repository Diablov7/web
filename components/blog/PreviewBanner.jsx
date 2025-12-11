'use client'

export default function PreviewBanner({ isDraft, isUnpublished }) {
  if (!isDraft && !isUnpublished) return null

  const bannerText = isDraft 
    ? '⚠️ PREVIEW MODE - Viewing DRAFT (not published)'
    : '⚠️ PREVIEW MODE - This article is not published yet'

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-center py-3 px-5 font-semibold flex items-center justify-center gap-3 shadow-lg">
      <span>{bannerText}</span>
      <a 
        href="/studio" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-red-500 px-4 py-1.5 rounded-md text-sm font-semibold hover:scale-105 transition-transform"
      >
        Back to Editor
      </a>
    </div>
  )
}

