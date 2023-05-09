export default function About() {
  return (
    <section id="about" className="pt-24 text-center">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#BBF7D0"
          fill-opacity="0.5"
          d="M0,32L24,74.7C48,117,96,203,144,224C192,245,240,203,288,192C336,181,384,203,432,202.7C480,203,528,181,576,165.3C624,149,672,139,720,154.7C768,171,816,213,864,234.7C912,256,960,256,1008,213.3C1056,171,1104,85,1152,69.3C1200,53,1248,107,1296,117.3C1344,128,1392,96,1416,80L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}
