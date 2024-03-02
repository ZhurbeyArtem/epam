export interface UserData {
  avatar: string,
  tweets: number,
  followers: number,
  isFollowing: boolean,
  id: number
}

export interface IUserGet{
  tweets: UserData[],
  maxPages: number,
}