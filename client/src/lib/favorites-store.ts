import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Set<number>;
  userId: number;
  addToFavorites: (productId: number) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  loadUserFavorites: (userId: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<number>(),
      userId: 1, // Default user ID for demo

      addToFavorites: async (productId: number) => {
        try {
          const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: get().userId,
              productId,
            }),
          });

          if (response.ok) {
            set((state) => {
              const newFavorites = new Set(state.favorites);
              newFavorites.add(productId);
              return { favorites: newFavorites };
            });
          }
        } catch (error) {
          console.error('Failed to add to favorites:', error);
        }
      },

      removeFromFavorites: async (productId: number) => {
        try {
          const response = await fetch(`/api/favorites/${get().userId}/${productId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            set((state) => {
              const newFavorites = new Set(state.favorites);
              newFavorites.delete(productId);
              return { favorites: newFavorites };
            });
          }
        } catch (error) {
          console.error('Failed to remove from favorites:', error);
        }
      },

      isFavorite: (productId: number) => {
        return get().favorites.has(productId);
      },

      loadUserFavorites: async (userId: number) => {
        try {
          const response = await fetch(`/api/favorites/${userId}`);
          if (response.ok) {
            const favorites = await response.json();
            const productIds = favorites.map((fav: any) => fav.productId);
            set({ 
              favorites: new Set(productIds),
              userId 
            });
          }
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      },
    }),
    {
      name: 'favorites-store',
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              favorites: new Set(state.favorites || []),
            },
          };
        },
        setItem: (name, value) => {
          const { state } = value;
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                favorites: Array.from(state.favorites),
              },
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);