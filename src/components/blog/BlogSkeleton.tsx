export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 bg-gray-200 rounded-lg" />
            <div className="h-5 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-3 bg-gray-100 rounded-full" />
            <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
            <div className="flex items-center gap-2 pt-2">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-2.5 w-24 bg-gray-200 rounded-full" />
                <div className="h-2 w-16 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
