import { create } from 'zustand';

export const useContactStore = create((set) => ({
  searchInput: '',
  showFavouritesOnly: false,
  selectedContactId: null,
  currentPage: 1,

  setSearchInput: (value) => set({ searchInput: value }),
  setShowFavouritesOnly: (value) => set({ showFavouritesOnly: value }), // New function to set a specific value
  toggleFavourites: () => set((state) => ({ showFavouritesOnly: !state.showFavouritesOnly })), // Keep toggle functionality
  setSelectedContactId: (id) => set({ selectedContactId: id }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));