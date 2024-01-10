import { StateCreator } from "zustand";

export interface AuthSlice {
    isAuthenticated: boolean;
    user: null | {
        id: string;
        email: string;
        username: string;
    }
    setUser: (user: any) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: any) => {
        set({
            isAuthenticated: user ? true : false,
            user
        })
    }
});
