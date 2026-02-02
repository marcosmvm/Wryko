export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-muted animate-pulse rounded-lg" />
        <div className="h-10 w-36 bg-muted animate-pulse rounded-lg" />
        <div className="h-10 w-36 bg-muted animate-pulse rounded-lg" />
      </div>
      <div className="h-96 bg-muted animate-pulse rounded-xl" />
    </div>
  )
}
