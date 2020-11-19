export interface UserModel {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;
}

export function getFirstDisplayName(user: UserModel) {
  if (!user) {
    return '';
  }
  if (user.displayName) {
    return user.displayName.split(' ')[0];
  }
  return user.email.split('@')[0];
}
