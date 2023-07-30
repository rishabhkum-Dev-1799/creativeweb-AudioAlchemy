import { create } from 'zustand';

interface PlayerStore {
  // fields for the PlayerStores
  ids: string[];
  activeId?: string;
  setIds: (ids: string[]) => void;
  setActiveId: (id: string) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  // state management of the player store
  ids: [],
  activeId: undefined,
  setActiveId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));
export default usePlayer;
