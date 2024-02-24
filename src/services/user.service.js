import axios from "axios";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
    return data;
  } catch (e) {
    return e;
  }
};

export const updateUser = async (user) => {
  try {
    const newUser = {
      ...user,
      isFollowing: !user.isFollowing,
      followers: user.isFollowing
        ? Number(user.followers) - 1
        : Number(user.followers) + 1,
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      newUser
    );
    return data;
  } catch (e) {
    return e;
  }
};
