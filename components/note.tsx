import React from "react";

type Props = {
  title: string;
};

function Note({ title }: Props) {
  return (
    <div className="flex flex-col text-center">
      <section className="my-2">
        <h2 className="mb-2">Nonton Film {title} - Nonton Movie </h2>
        <p className="text-sm">
          Nonton Movie adalah website atau situs penyedia layanan streaming
          movie/film terbaik dan tercepat, situs Nonton Movie selalu berusaha
          dan berupaya untuk memanjakan anda semua lewat film-film atau
          movie-movie yang kami sediakan disitus kami, tidak lupa juga kami
          selalu up-to-date dalam menyediakan movie-movie atau film-film terbaru
          yang baru saja rilis di bioskop, Netflix, Disney+, HBO, Apple TV+,
          Amazon Prime Video dan lainnya, namun sekali lagi kami tekankan, situs
          Nonton Movie tidak menyediakan film/movie dari negara Indonesia untuk
          turut mendukung industri kreatif bangsa Indonesia.
        </p>
        <p className="text-sm">
          Bagi teman-teman sekalian yang nyaman dan suka untuk menonton disitus
          streaming film dan serial tv Nonton Movie , jangan lupa untuk
          membagikan keseruan dan kenyamanan dalam menonton film {title} ke
          teman-teman anda, keluarga anda, sahabat anda maupun rekan kerja anda,
          terima kasih dan selamat menikmati film yang anda tonton sekarang :).
        </p>
      </section>
      <section className="my-2">
        <h2 className="mb-2">Tips Nonton Film di Nonton Movie </h2>
        <p className="text-sm">
          Bagi teman-teman yang sering menonton film atau series disitus Nonton
          Movie ini ada beberapa tips yang perlu anda ketahui sebelum menonton.
          Pertama, pastikan koneksi internet anda stabil dan cepat, minimal
          10-30Mbps untuk streaming film kualitas 360-720p tanpa patah-patah
          atau buffering. Kedua, pastikan browser anda dalam up-to-date (kami
          sarankan menggunakan google chrome terbaru), selalu meng-update
          browser anda untuk pengalaman streaming terbaik disitus Nonton Movie .
          Ketiga, ajak teman-teman anda untuk nonton bareng atau nobar disitus
          kesayangan Nonton Movie biar tidak membuang-buang quota anda, sediakan
          juga camilan seperti pop-corn atau minuman untuk menemani anda.
          Keempat, jika kamu menyukai film ini maka jangan pernah ragu untuk
          segera membagikannya ke teman-teman anda biar mereka juga bisa
          menikmati film yang bagus menurut anda serta membantu situs Nonton
          Movie untuk berkembang :). NO SPOILER! yang terakhir jangan pernah
          menyebarkan spoiler film yang sudah anda nonton namun teman anda belum
          pernah nonton sama sekali.
        </p>
      </section>
      <section className="my-2">
        <h2 className="mb-2">Tentang Nonton Movie </h2>
        <p className="text-sm">
          Nonton Movie merupakan situs nonton film online gratis untuk semua
          rakyat INDONESIA, situs ini dikhususkan untuk para pecinta film namun
          tidak memiliki akses ke bioskop ataupun untuk menonton film yang tidak
          ada tayang dinegara Indonesia, dan perlu diketahui Nonton Movie tidak
          menyimpan segala konten film-film yang ada disitus ini, Nonton Movie
          hanya mengambil film dari berbagai sumber yang berada di internet
          lewat website/forum ataupun situs penyedia layanan streaming seperti
          youtube, facebook atau yang lainnya.
        </p>
      </section>
      <section className="my-2">
        <h2 className="text-sm">
          Tags : Nonton {title} | Download {title} Subtitle Indonesia Nonton
          Movie {title} | Nonton Film {title} Subtitle Indonesia Film {title} |{" "}
          {title} Sub Indo
        </h2>
      </section>
    </div>
  );
}

export default Note;
