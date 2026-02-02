export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-muted animate-pulse rounded-lg" />
        <div className="h-10 w-36 bg-muted animate-pulse rounded-lg" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  )
}
