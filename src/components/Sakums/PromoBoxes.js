import React from "react";
import "../../styles/PromoBoxes.css";

const PromoBoxes = () => (
  <div className="container">
    <h1>Mūsu Piedāvājums</h1>
    <div className="boxes">
      <div className="box">
        <h2>BMW</h2>
        Šī mašīna kliedz vārdu "Klasika". Izbaudi Vācu komfortu, ātrumu, jaudu,
        un kvalitāti bez dzīšanas uz BMW centru. Par to parūpēsimies mēs. Nāc
        pie mums un izbaudi ko nozīmē BMW.
      </div>
      <div className="box">
        <h2>Audi</h2>
        Vācijā ir teiciens "Kur netiks armija, tiks Audi Quattro". Arī mēs
        pieturāmies pie šī teiciena. Izbaudiet komfortu, stabilitāti izcilu
        vadāmību. Uz priekšu jūs nesīs visi četri riteņi.
      </div>
      <div className="box">
        <h2>Opel</h2>
        Dzīvei nav ne vainas, pamodies, ieej dušā, paēd brokastis un laukā spīd
        saule, bet BWM nav garīgais lai vestu tevi uz darbu. Paņem Opeli,
        ieslēdz Bēthovenu un izbaudi savu braucienu uz otrajām mājām.
      </div>
    </div>
    <div className="boxes">
      <div className="box">
        <h2>Tesla</h2>
        01001101 00010011 01110011 00100000 01101110 01100101 01100100 01101111
        01100100 01100001 01101101 00100000 01101100 00101011 01100100 01111010
        01101001 00100000 01100101 01101100 01100101 01101011 01110100 01110010
        01101111 00100011 01100101 01101110 01100101 01110010 01100001 01110100
        01101111 01110010 01110101 01110011
      </div>
      <div className="box">
        <h2>Mitsubishi</h2>
        Šī mašīna nākusi no zemes kur možas saule. Možas arī cilvēki kas
        izveidoja Mitsubishi. Izveidoja tev komfortu, jaudu, kravnesību un citas
        lietas, par kurām tu nezināji, bet bez kurām vairs neiztikt.
      </div>
      <div className="box">
        <h2>Limuzīns</h2>
        Tavi saldie sešpadsmit, divdesmit, vai nu jau piecdesmit. Kāzas? Balle?
        Atripo ar stilu, nevis ar Honda Civic. Izbaudi kā tas varētu būt, dzīvot
        Las Vegasā.
      </div>
    </div>
    <h1>Un vēl neskaitāmi citi!</h1>
  </div>
);

export default PromoBoxes;
