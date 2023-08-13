import { create } from "zustand";

interface LgoinModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLgoinModal = create<LgoinModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useLgoinModal;
