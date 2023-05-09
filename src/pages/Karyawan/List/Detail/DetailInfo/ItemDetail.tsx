export default function ItemDetail({
    title,
    description,
  }: {
    title: string;  
    description: string | number ;
  }) {
    return (
      <div className="mt-1 mb-2">
        <div className="font-semibold font-md mb-2 capitalize">{title}</div>
        <div className="capitalize">{description}</div>
        {/* <div className="w-full h-px bg-black/[0.03] z-10 relative mt-1"  /> */}
      </div>
           
    );
  }
  