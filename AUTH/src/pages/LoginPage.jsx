import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiAuthy } from "react-icons/si";
import { ModeToggle } from "../components/mode-toggle";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { validateForm } from "../lib/common";

const LoginPage = () => {
  const navigate = useNavigate();
  const signInBtnHandler = async (e) => {
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

      if (formJson.email !== email || formJson.password !== password) {
        return toast.error("User not found !");
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
    <div className="min-h-svh flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6">
        <div className="absolute top-0 right-0 p-4">
          <ModeToggle />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl flex items-center justify-center gap-3 font-semibold">
              <SiAuthy className="text-primary" />
              AUTH .
            </CardTitle>
            <CardDescription>Welcome back</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={signInBtnHandler} noValidate>
              <div className="grid gap-6">
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
                        className="ml-auto text-sm underline-offset-4 text-muted-foreground"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder="password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer text-white "
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    className="underline underline-offset-4 cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 w-3/4 mx-auto">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
