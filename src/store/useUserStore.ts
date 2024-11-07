import { AuthMeService } from "@/Services/Auth.Services";
import { create } from "zustand";

export interface IUser {
  id: number;
  email: string;
  username: string;
  groups: { id: number; name: string }[];
}

export interface IUserStore {
  user?: IUser;
}

interface IUserService extends IUserStore {
  get: () => void;
}

const userStore = create<IUserStore>(() => ({}));

function useUserStore(): IUserService {
  const { user } = userStore();

  return {
    user,
    get: async () => {
      const response = await AuthMeService();
      if (response.success) {
        const data = response.data as IUser;
        userStore.setState({
          user: data,
        });
      }
    },
  };
}

export { useUserStore };
