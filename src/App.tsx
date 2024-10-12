import FormComponent from "./components/FormComponent";
import ColumnWarper from "./components/ColumnWraper";
import InfoCard from "./components/InfoCard";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const unclaimedCards = useSelector(
    (state: RootState) => state.board.unclaimed
  );
  const firstContactCards = useSelector(
    (state: RootState) => state.board.firstContact
  );
  const preparingWorkOfferCards = useSelector(
    (state: RootState) => state.board.preparingWorkOffer
  );
  const sendToTherapistCards = useSelector(
    (state: RootState) => state.board.sendToTherapist
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-primary min-h-screen p-5">
        <header className="flex flex-col items-center justify-center text-2xl text-black mb-8">
          <b className="text-gray-700">Kanban Board</b>
        </header>

        <div className="flex flex-row ">
          <FormComponent />
          <div className="flex flex-row h-full justify-between gap-3 w-full">
            <div className="flex-1">
              <ColumnWarper cardType="Unclaimed" count={unclaimedCards.length}>
                {unclaimedCards.length > 0 ? (
                  unclaimedCards.map((card, index) => (
                    <InfoCard
                      key={index}
                      age={card.age}
                      title={card.title}
                      email={card.email}
                      phone={card.phone}
                      name={card.name}
                      status="Unclaimed"
                      id={card.id}
                    />
                  ))
                ) : (
                  <p className="text-gray-700 font-bold m-2">
                    No unclaimed cards available.
                  </p>
                )}
              </ColumnWarper>
            </div>
            <div className="flex-1">
              <ColumnWarper
                cardType="First Contact"
                count={firstContactCards.length}
              >
                {firstContactCards.length > 0 ? (
                  firstContactCards.map((card, index) => (
                    <InfoCard
                      key={index}
                      age={card.age}
                      title={card.title}
                      email={card.email}
                      phone={card.phone}
                      name={card.name}
                      id={card.id}
                      status="First Contact"
                    />
                  ))
                ) : (
                  <p className="text-gray-700 font-bold m-2">
                    No First Contact cards available.
                  </p>
                )}
              </ColumnWarper>
            </div>
            <div className="flex-1">
              <ColumnWarper
                cardType="Preparing Work Offer"
                count={preparingWorkOfferCards.length}
              >
                {preparingWorkOfferCards.length > 0 ? (
                  preparingWorkOfferCards.map((card, index) => (
                    <InfoCard
                      key={index}
                      age={card.age}
                      title={card.title}
                      email={card.email}
                      phone={card.phone}
                      name={card.name}
                      id={card.id}
                      status="Work Offer"
                    />
                  ))
                ) : (
                  <p className="text-gray-700 font-bold m-2">
                    No Preparing Work Offer cards available.
                  </p>
                )}
              </ColumnWarper>
            </div>
            <div className="flex-1">
              <ColumnWarper
                cardType="Send To Therapist"
                count={sendToTherapistCards.length}
              >
                {sendToTherapistCards.length > 0 ? (
                  sendToTherapistCards.map((card, index) => (
                    <InfoCard
                      key={index}
                      age={card.age}
                      title={card.title}
                      email={card.email}
                      phone={card.phone}
                      id={card.id}
                      name={card.name}
                      status="Send to Therapist"
                    />
                  ))
                ) : (
                  <p className="text-gray-700 font-bold m-2">
                    No Send To Therapist cards available.
                  </p>
                )}
              </ColumnWarper>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
