import sekdaUrl from "../../../assets/images/sekda.jpeg";
export default function SambutanKadis() {
  return (
    <section id="sambutan" className="py-16 text-center bg-zinc-50  lg:px-48">
      <div className="flex flex-col xl:flex-row  items-center">
        <div className="w-1/2 h-auto mb-24 xl:mb-0">
          <img
            src={sekdaUrl}
            className="rounded-full w-48 h-48 lg:h-60  lg:w-60 mx-auto  bg-white object-fill"
          />
          <div className="mt-8 p-3 bg-red-600 rounded-xl font-semibold capitalize text-white">
          Tugas dalam daerah
          </div>
        </div>

        <div className=" text-left space-y-8 mx-8 lg:ml-24 self-center mb-16 ">
          <h3 className="text-4xl font-semibold">Sekda Maluku Utara</h3>
          <p className="leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut
            pharetra nisi. Proin vitae magna urna. Nunc ut tortor in orci porta
            volutpat. Sed sodales gravida aliquam.
          </p>
          <h3 className="text-xl font-semibold">Drs. SAMSUDDIN A.KADIR</h3>
        </div>
      </div>
    </section>
  );
}
