import { create } from "zustand";
type ModalType = {
  tedarikciModal: boolean;
  setTedarikciModalOpen: () => void;
};

export const useTedarikciModalData = create<ModalType>((set) => ({
  tedarikciModal: false,
  setTedarikciModalOpen: () =>
    set((state) => ({ ...state, tedarikciModal: !state.tedarikciModal })),
}));
