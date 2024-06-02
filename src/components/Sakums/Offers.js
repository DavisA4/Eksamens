import React from "react"; // Importē React bibliotēku
import "../../styles/Offers.css"; // Importē CSS stilus

// Definē Offers komponenti kā funkcionālu komponenti
const Offers = () => (
  // Definē konteineru, kurā būs atlaides piedāvājumi
  <div className="container">
    <h1 className="yho">Mīlam atlaides, Tāpat kā mīlam jūs!</h1>{" "}
    {/* Lielais virsraksts */}
    {/* Definē pirmo atlaides piedāvājumu */}
    <div className="box9">
      <h2>10%</h2> {/* Atlaides procentuālais lielums */}
      Ģimenes vērtības ir svarīgas. Kā arī atpūta, ceļojumi un kopā pavadītais
      laiks. Pierādot derīgu 3+ Ģimenes karti, tiek piemērota 10% atlaide
      braucienam.
    </div>
    {/* Definē otro atlaides piedāvājumu */}
    <div className="box9">
      <h2>20%</h2> {/* Atlaides procentuālais lielums */}
      Mēs atbalstam labu transportu. Vēlamies lai jūs savos galamērķos katru
      dienu nonāktu ar komfortu, stilu, un pats galvenais - drošību. Tāpēc
      piedāvājam jums iespēju saņemt katram otrajam braucienam 15% atlaidi.
    </div>
    {/* Definē trešo atlaides piedāvājumu */}
    <div className="box9">
      <h2>50%</h2> {/* Atlaides procentuālais lielums */}
      Mēs godinam labus darbus, un vēl labākus cilvēkus. Katru dienu notiek
      negadījumi un bieži nepieciešama ir tieši asins pārliešana. Pierādot
      nodotas asinis, atbalstīsim jūs ar 50% atlaidi. Par labiem darbiem!
    </div>
  </div>
);

export default Offers; // Eksportē Offers komponenti
