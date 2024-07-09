import UsersService from "../../../../adapters/UsersService";

interface Args {
  password: string;
  email: string;
  isAdmin: boolean;
}

const updateUserResolver = async (
  obj: any,
  { password, email, isAdmin }: Args,
  context: any
) => {
  const userId = context.currentUser.user.id;
  return await UsersService.updateUser({ userId, password, email, isAdmin });
};

export default updateUserResolver;
