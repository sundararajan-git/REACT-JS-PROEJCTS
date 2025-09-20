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

const SignupPage = () => {
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
            <CardDescription>Welcome</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="confirm password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer text-white"
                  >
                    Signup
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already you have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Login
                  </a>
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
export default SignupPage;
