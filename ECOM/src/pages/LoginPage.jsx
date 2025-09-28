import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { LiaShopware } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../lib/common";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const logInBtnHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formJson = Object.fromEntries(formData);
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!validateForm(e.target)) {
        return toast.error("Invalid inputs");
      }

      const auth = JSON.parse(localStorage.getItem("auth"));
      const { email, password } = auth ?? {};

      if (formJson.email !== email) {
        return toast.error("User not found !");
      }

      if (formJson.password !== password) {
        return toast.error("Password is incorrect !");
      }

      auth.isLogin = true;
      localStorage.setItem("auth", JSON.stringify(auth));

      navigate("/");
      toast.success("Login successfully");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md">
              <LiaShopware className="size-8" />
            </div>
            Ecom.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="flex flex-col gap-6"
              onSubmit={logInBtnHandler}
              noValidate
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full hover:cursor-pointer">
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <Button variant="outline" className="w-full ">
                  <FcGoogle />
                  Login with Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <span
                  className="underline underline-offset-4 hover:cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://i.pinimg.com/736x/ad/01/e1/ad01e1c13e50d78f64d215353cee5b49.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default LoginPage;
