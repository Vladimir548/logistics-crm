import { create } from 'zustand';

interface IComboboxSearch {
    search: string | null;
    getSearch: (val: string) => void;

}

export const useComboboxSearch = create<IComboboxSearch>()((set) => ({
    search: null,
    getSearch: (val) => set(() => ({ search: val })),

}));
