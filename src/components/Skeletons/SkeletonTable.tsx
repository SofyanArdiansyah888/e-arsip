export default function SkeletonTable() {
    return (
      <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
        <div className=" h-8 bg-gray-200 rounded-md dark:bg-gray-700  mb-4"></div>
  
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((_,index) => (
          <div key={index} className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 mb-2.5"></div>
        ))}
  
        <span className="sr-only">Loading...</span>
      </div>
    );
  }