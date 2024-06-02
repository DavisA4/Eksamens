import React from "react";
import { Timeline, ConfigProvider } from "antd";
import Footer from "./Footer"; // Assuming Footer is properly capitalized in its definition file
import "../styles/styles.css"; // Ensure this is scoped properly if affecting other components
import Header from "./Navbar";

const timelineData = [
  {
    date: "22.01.2023",
    content: "Pirmā doma par iespēju izīrēt mašīnu",
    color: "gray",
  },
  {
    date: "13.02.2023",
    content: "Tirgus izpēte, Finansējuma iegūšana",
    color: "green",
  },
  {
    date: "15.03.2023",
    content: "Problēmas nokārtot muitu izdrukas",
    color: "red",
  },
  {
    date: "26.03.2023",
    content: "Importējam pirmās mašīnas no Vācijas",
    color: "gray",
  },
  {
    date: "15.04.2023",
    content: "Mašīnām ir veiktas apkopes, un izieta apskate",
    color: "green",
  },
  { date: "28.04.2023", content: "Mājaslapas izstrāde 75%", color: "gray" },
];

function Mes() {
  return (
    <div>
      <Header />
      <div className="back">
        <section className="section-header">
          <h1>Kas Mēs Esam</h1>
          <p>
            Testa teksts test teststsrtdffff dffffffff sterte sdfsd fgdfg
            dfdgkdfm dgfkmsk skdf 4HAY2PMCAFSTWB0526R1 sfmskfmsdf nkslmfs
            fskdmfkls fskldkld sflk ndkf n df kdls fnklsdf ksd fsn fkld fkls
            fsdkflsklfnsld
          </p>
        </section>
        <hr className="hr4" />

        <section className="section-timeline">
          <h1>Kā šeit nokļuvām</h1>
          <ConfigProvider
            theme={{
              token: {
                colorBorder: "#000000",
                colorBorderSecondary: "#ffffff",
                colorInfo: "#FADB14",
                colorBgBase: "#000000",
                colorTextBase: "#FADB14",
                borderRadius: 3,
                colorPrimary: "#FADB14",
                fontSize: "17px",
              },
            }}
          >
            <Timeline mode="alternate">
              {timelineData.map((item, index) => (
                <Timeline.Item key={index} color={item.color}>
                  {item.content} {item.date}
                </Timeline.Item>
              ))}
            </Timeline>
          </ConfigProvider>
        </section>
      </div>
      <hr className="hr4" />
      <Footer />
    </div>
  );
}

export default Mes;
