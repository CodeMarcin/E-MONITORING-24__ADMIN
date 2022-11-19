import { TopSection } from "./Pages/TopSection/TopSection";
import { Login } from "./Pages/Login/Login";
import { PopupModal } from "./Components/PopupModal/PopupModal";
import { Header } from "./Components/Header/Header";
import { Accordion } from "./Components/Accordion/Accordion";

const test = () => {
  console.log('test')
};

const ACCORDION: IAccordionProps = {
  title: "Lorem ipsum #1",
  leftSection: {
    leftTitle: "Nabywca",
    leftContent: ["Firma lorem ipsum #1", "ul. Lorem ipsum dolor 12", "07 - 417 Myszyniec", "mail@mail.com"],
    NIP: "342-321-32-42",
  },
  rightSection: true,
  bottomMenu: [
    { label: "Edytuj", action: "asd"},
    { label: "Usuń", action: test },
  ],
};

function App() {
  return (
    <div className="App">
      {/* <TopSection /> */}
      <div className={"container--main"}>
        <Accordion items={ACCORDION} />
        <Accordion items={ACCORDION} />
      </div>
      {/* <Login /> */}
    </div>
  );
}

export default App;
