export default function SkeletonCard() {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-2 mt-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, index) => (
        <div
          key={index}
          className="col-span-4 h-52 bg-gray-200 rounded-md "
        ></div>
      ))}
    </div>
  );
}
