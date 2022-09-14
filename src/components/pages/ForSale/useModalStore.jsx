import create from "zustand";

export const useModalStore = create((set) => ({
    ToggleModal: "none",

    setToggleModal: (Val) => {
        set((state) => ({
            ToggleModal: (state.ToggleModal = Val),
        }));
    },

    modalData: null,
    setModalData: (data) => {
        set((state) => ({ modalData: (state.modalData = data) }));
    },
}));