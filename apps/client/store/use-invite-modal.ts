import { create } from "zustand";

const defaultValues = { emails: [], currentTeamId: "" };

interface IInviteModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (currentTeamId: string) => void;
  onClose: () => void;
}

export const useInviteModal = create<IInviteModal>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
  onOpen: (currentTeamId) =>
    set({ isOpen: true, initialValues: { ...defaultValues, currentTeamId } }),
  initialValues: defaultValues,
}));
