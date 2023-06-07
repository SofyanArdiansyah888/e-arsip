import { useGet } from "@/hooks/useApi";
import sekdaUrl from "@/assets/images/sekda.jpg";
import LokasiSekda from "@/models/LokasiSekda.entity";
import { GetDetailPayload } from "@/models/GenericPayload";
import Layout from "./Layouts";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import url from "@/assets/images/pemandangan.jpg";

export default function MalukuUtara() {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.style.padding = "0";
    body.style.background = "white";
    return () => {
      body.style.background = "#0f172a";
      body.style.padding = "16px";
    };
  }, []);
  return (
    <Layout>
      <Navbar />
      <section id="about" className="py-24 pt-6 text-center h-auto md:h-[calc(100vh-70px)]">
        
        <div className="flex flex-col-reverse lg:flex-row mt-12 md:mt-32 gap-12 px-8 lg:px-24 items-center">
          <div className="flex-1 text-left space-y-8 ">
            <h3 className="text-2xl font-semibold">Provinsi Maluku Utara</h3>
            <p className="leading-7">
            Maluku Utara (disingkat Malut) merupakan provinsi bagian Timur Indonesia yang resmi terbentuk pada 4 Oktober 1999 yang sebelumnya menjadi kabupaten dari provinsi Maluku bersama dengan Halmahera Tengah, berdasarkan UU RI Nomor 46 Tahun 1999 dan UU RI Nomor Tahun 2003.
            </p>
            <p className="leading-7">
            Provinsi Maluku Utara terdiri dari 1.474 pulau, jumlah pulau yang dihuni sebanyak 89 dan sisanya sebanyak 1.385 tidak berpenghuni. Jumlah penduduk Maluku Utara pada tahun 2021 mencapai 1.316.973 jiwa, dengan kepadatan penduduk sebanyak 41 jiwa/km2
            </p>
            <p className="leading-7">
            Saat awal pendirian Provinsi Maluku Utara, ibu kota ditempatkan di Kota Ternate berlokasi di kaki Gunung Gamalama dalam kurun waktu kurang lebih 11 tahun, hingga pada 4 Agustus 2010 setelah adanya masa transisi dan persiapan pembangunan, Maluku Utara memindahkan ibukota ke Sofifi yang terletak di Pulau Halmahera yang merupakan pulau terbesarnya.
            </p>
            {/* <p className="leading-7">
          Geografis Maluku Utara yang terletak pada Koordinat 3º 40' LS- 3º 0' LU123º 50' - 129º 50' BT, sebenarnya merupakan gugusan kepulauan dengan rasio daratan dan perairan sebanyak 24 : 76. Memiliki gugusan pulau sebanyak 395 buah, 83% atau sekitar 331 pulaunya belum berpenghuni.
          </p>
          <p className="leading-7">
            Provinsi Maluku Utara terkenal juga dengan sebutan Moloku Kie Raha atau Kesultanan Empat Gunung di Maluku, karena pada mulanya daerah ini merupakan wilayah 4 kerajaan besar Islam Timur Nusantara, terdiri dari: Kesultanan Bacan, Kesultanan Jailolo, Kesultanan Tidore, dan Kesultanan Ternate.
          </p>
          <p className="leading-7">
            Terdapat beragam suku yang mendiami wilayah Maluku Utara, yaitu Suku Madole,Suku Pagu, Suku Ternate, Suku Makian Barat, Suku Kao, Suku Tidore, Suku Buli, Suku Patani, Suku Maba, Suku Sawai, Suku Weda, Suku Gane, Suku Makian Timur, Suku Kayoa, Suku Bacan, Suku Sula, Suku Ange, Suku Siboyo, Suku Kadai, Suku Galela, Suku Tobelo, Suku Loloda, Suku Tobaru, Suku Sahu, Suku Arab, dan Eropa.
          </p>
          <p className="leading-7">
            Pergerakan perekonomian daerah di Maluku Utara sebagian besar bersumber dari perekonomian rakyat yang bertumpu pada sektor pertanian, perikanan dan jenis hasil laut lainnya. Komoditas utama yang mendukung nadi perekonomian di Maluku Utara meliputi Kopra, Buah Pala, Cengkeh Perikanan, yang sebagian telah diekspor ke Jepang, Emas dan Nikel yang sebagian telah diekspor ke Jepang
          </p> */}
          </div>
          <div className="flex-1">
            <img src={url} className="rounded-xl h-72" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
