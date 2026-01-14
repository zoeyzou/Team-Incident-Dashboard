// features/ui/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "incidentForm" | null;

interface ModalState {
  type: ModalType;
  title: string;
  props: Record<string, unknown>;
}

const initialState: ModalState = {
  type: null,
  title: "",
  props: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        type: ModalType;
        props?: Record<string, unknown>;
      }>,
    ) {
      state.type = action.payload.type;
      state.props = action.payload.props || {};
    },
    closeModal(state) {
      state.type = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
