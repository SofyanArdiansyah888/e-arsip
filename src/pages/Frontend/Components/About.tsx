export default function About() {
  return (
    <section id="about" className="py-24 text-center ">
      <h2 className="text-4xl  font-semibold">Tentang Kami</h2>
      <div className="border-b-2 border-gray-700 w-64 mx-auto mt-4" />

      <div className="flex flex-row mt-32 gap-12 px-24 items-center">
        <div className="flex-1 text-left space-y-8 ">
          <h3 className="text-2xl font-semibold">
            E Arsip Pemprov Maluku Utara
          </h3>
          <p className="leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut
            pharetra nisi. Proin vitae magna urna. Nunc ut tortor in orci porta
            volutpat. Sed sodales gravida aliquam. Ut nec facilisis ligula, id
            mattis enim. Nullam et nisl dapibus, elementum leo ut, hendrerit
            enim. Maecenas eget nisl velit. Curabitur dictum, lectus et
            dignissim ullamcorper, ipsum tortor faucibus lectus, quis mattis
            sapien diam non risus. Integer dictum tincidunt pellentesque.
            Integer accumsan magna purus. Proin posuere vitae est et lobortis.
            Curabitur in dui id nulla fermentum semper a nec dolor. Aliquam
            euismod tincidunt mi, sed finibus felis placerat id. Aliquam laoreet
            sem sed suscipit malesuada. Quisque vitae lacus id erat euismod
            mattis sed vel eros. Cras tincidunt eros ipsum, sit amet aliquam
            nisl imperdiet a. Nulla nibh elit, feugiat ac rhoncus ac, tempus eu
            ante. Suspendisse tincidunt eros in sem fermentum consectetur. Ut
            magna leo, hendrerit eget porttitor vitae, venenatis ut ligula.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="https://file.sulselprov.go.id/upload/header/62993cd128426.png"
            className="rounded-xl h-72"
          />
        </div>
      </div>
    
    </section>
  );
}
