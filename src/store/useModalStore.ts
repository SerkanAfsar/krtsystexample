import { create } from "zustand";
type ModalType = {
  tedarikciModal: boolean;
  musteriModalData: boolean;
  setTedarikciModalOpen: () => void;
  setMusteriModalData: () => void;
};

export const useTedarikciModalData = create<ModalType>((set) => ({
  tedarikciModal: false,
  musteriModalData: false,
  setTedarikciModalOpen: () =>
    set((state) => ({ ...state, tedarikciModal: !state.tedarikciModal })),
  setMusteriModalData: () =>
    set((state) => ({ ...state, musteriModalData: !state.musteriModalData })),
}));
