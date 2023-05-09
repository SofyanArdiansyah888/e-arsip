import CardNews from "./CardNews";

export default function Berita() {
  return (
    <section id="berita" className="py-24 text-center ">
      <h2 className="text-4xl  font-semibold">Berita Terbaru</h2>
      <div className="border-b-2 border-gray-700 w-64 mx-auto mt-4" />

      <div className="flex flex-row mt-24 gap-4 px-24 items-center">
        <CardNews />
        <CardNews />
        <CardNews />
        <CardNews />
      </div>
    </section>
  );
}


