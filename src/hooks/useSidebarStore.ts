import { Company, ProspectingCompanyFragment } from '@app/apollo/types';
import { create } from 'zustand';

type State = {
  isOpen: boolean;
  focusedCompany?: ProspectingCompanyFragment;
  focusedSource?: string;
  open: (focusedCompany: ProspectingCompanyFragment | Company, focusedSource: string) => void;
  close: () => void;
};

const useSidebarStore = create<State>((set) => ({
  isOpen: false,
  focusedCompany: undefined,
  focusedSource: undefined,
  open: (focusedCompany, focusedSource) => set({ isOpen: true, focusedCompany, focusedSource }),
  close: () => set({ isOpen: false }),
}));

export default useSidebarStore;
