const SkeletonLine = ({ className }) => (
  <div
    className={`bg-gray-200/80 rounded animate-pulse ${className}`}
  />
);

const AdminProductsSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="bg-[#FAF7F5] px-6 py-4 flex gap-6">
        <SkeletonLine className="h-4 w-1/3" />
        <SkeletonLine className="h-4 w-20 ml-auto" />
      </div>

      {/* ROWS */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-6 px-6 py-5 border-t"
        >
          {/* IMAGE */}
          <SkeletonLine className="w-14 h-14 rounded-xl" />

          {/* TEXT */}
          <div className="flex-1 space-y-2">
            <SkeletonLine className="h-4 w-48" />
            <SkeletonLine className="h-3 w-24" />
          </div>

          {/* PRICE */}
          <SkeletonLine className="h-4 w-14" />

          {/* STOCK */}
          <SkeletonLine className="h-4 w-10" />

          {/* CATEGORY */}
          <SkeletonLine className="h-4 w-20" />

          {/* STATUS */}
          <SkeletonLine className="h-6 w-20 rounded-full" />

          {/* ACTIONS */}
          <div className="flex gap-4">
            <SkeletonLine className="h-6 w-6 rounded-full" />
            <SkeletonLine className="h-6 w-6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProductsSkeleton;
