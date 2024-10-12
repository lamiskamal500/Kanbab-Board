import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Card {
  id: string; // Change id type to string if using UUID
  title: string;
  name: string;
  age: string;
  email: string;
  phone: string;
}

interface BoardState {
  unclaimed: Card[];
  firstContact: Card[];
  preparingWorkOffer: Card[];
  sendToTherapist: Card[];
}

const initialState: BoardState = {
  unclaimed: JSON.parse(localStorage.getItem("unclaimed") || "[]"),
  firstContact: JSON.parse(localStorage.getItem("firstContact") || "[]"),
  preparingWorkOffer: JSON.parse(
    localStorage.getItem("preparingWorkOffer") || "[]"
  ),
  sendToTherapist: JSON.parse(localStorage.getItem("sendToTherapist") || "[]"),
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCardUnclaimed: (state, action: PayloadAction<Omit<Card, "id">>) => {
      const newCard: Card = { id: uuidv4(), ...action.payload }; // Generate a unique ID
      state.unclaimed.push(newCard);
      localStorage.setItem("unclaimed", JSON.stringify(state.unclaimed));
    },
    setCardFirstContact: (state, action: PayloadAction<Omit<Card, "id">>) => {
      const newCard: Card = { id: uuidv4(), ...action.payload }; // Generate a unique ID
      state.firstContact.push(newCard);
      localStorage.setItem("firstContact", JSON.stringify(state.firstContact));
    },
    setCardPreparingWorkOffer: (
      state,
      action: PayloadAction<Omit<Card, "id">>
    ) => {
      const newCard: Card = { id: uuidv4(), ...action.payload }; // Generate a unique ID
      state.preparingWorkOffer.push(newCard);
      localStorage.setItem(
        "preparingWorkOffer",
        JSON.stringify(state.preparingWorkOffer)
      );
    },
    setCardSendToTherapist: (
      state,
      action: PayloadAction<Omit<Card, "id">>
    ) => {
      const newCard: Card = { id: uuidv4(), ...action.payload }; // Generate a unique ID
      state.sendToTherapist.push(newCard);
      localStorage.setItem(
        "sendToTherapist",
        JSON.stringify(state.sendToTherapist)
      );
    },
    removeCardUnclaimed: (state, action: PayloadAction<string>) => {
      state.unclaimed = state.unclaimed.filter(
        (card) => card.id !== action.payload
      );
      localStorage.setItem("unclaimed", JSON.stringify(state.unclaimed));
    },
    removeFirstContact: (state, action: PayloadAction<string>) => {
      state.firstContact = state.firstContact.filter(
        (card) => card.id !== action.payload
      );
      localStorage.setItem("firstContact", JSON.stringify(state.firstContact));
    },
    removePreparingWorkOffer: (state, action: PayloadAction<string>) => {
      state.preparingWorkOffer = state.preparingWorkOffer.filter(
        (card) => card.id !== action.payload
      );
      localStorage.setItem(
        "preparingWorkOffer",
        JSON.stringify(state.preparingWorkOffer)
      );
    },
    removeSendToTherapist: (state, action: PayloadAction<string>) => {
      state.sendToTherapist = state.sendToTherapist.filter(
        (card) => card.id !== action.payload
      );
      localStorage.setItem(
        "sendToTherapist",
        JSON.stringify(state.sendToTherapist)
      );
    },
    updateCardById: (
      state,
      action: PayloadAction<{ id: string; updatedCard: Partial<Card> }>
    ) => {
      const { id, updatedCard } = action.payload;

      const updateCard = (cards: Card[]) => {
        const index = cards.findIndex((card) => card.id === id);
        if (index !== -1) {
          cards[index] = { ...cards[index], ...updatedCard };
        }
      };

      updateCard(state.unclaimed);
      updateCard(state.firstContact);
      updateCard(state.preparingWorkOffer);
      updateCard(state.sendToTherapist);

      localStorage.setItem("unclaimed", JSON.stringify(state.unclaimed));
      localStorage.setItem("firstContact", JSON.stringify(state.firstContact));
      localStorage.setItem(
        "preparingWorkOffer",
        JSON.stringify(state.preparingWorkOffer)
      );
      localStorage.setItem(
        "sendToTherapist",
        JSON.stringify(state.sendToTherapist)
      );
    },
  },
});

export const {
  setCardUnclaimed,
  setCardFirstContact,
  setCardPreparingWorkOffer,
  setCardSendToTherapist,
  removeCardUnclaimed,
  removeFirstContact,
  removePreparingWorkOffer,
  removeSendToTherapist,
  updateCardById,
} = boardSlice.actions;
export default boardSlice.reducer;
