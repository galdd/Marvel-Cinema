import UsersService from "../../../../adapters/UsersService";
import { ResolverContext } from "../../../../graphql/types";

interface Args {
  password: string;
  email: string;
}

const signinResolver = async (
  obj: any,
  { password, email }: Args,
  context: ResolverContext
) => {
  console.log("Received args:", { password, email });
  
  try {
    const currentUser: any = await UsersService.signin({
      password,
      email,
    });

    console.log("Received user from Auth Service:", currentUser);

    context.res.cookie("accessToken", currentUser.user.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return currentUser;
  } catch (error) {
    console.error("Error in signinResolver:", error);
    throw new Error("Signin failed");
  }
};

export default signinResolver;