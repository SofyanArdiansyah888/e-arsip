import sekdaUrl from '../../../../public/sekda.png'
export default function SambutanKadis() {
  return (
    <section id="sambutan" className="py-24 text-center bg-zinc-50">
      
      <div className="flex flex-row  px-48 gap-24 items-center">
        
          <img
            src={sekdaUrl}
            className="rounded-full h-72 w-72 mx-auto bg-cover bg-white"
          />
        
        <div className=" text-left space-y-8 ">
          <h3 className="text-2xl font-semibold">Sekda Maluku Utara</h3>
          <p className="leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut
            pharetra nisi. Proin vitae magna urna. Nunc ut tortor in orci porta
            volutpat. Sed sodales gravida aliquam.
          </p>
          <h3 className="text-2xl font-semibold">Dr. Ir. Palaguna</h3>
        </div>
      </div>
    
    </section>
  );
}
