import assets from "../assets/assets";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LoginPage = () => {
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState("");

  const [currentState, setCurrentState] = useState('login')

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    bio : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit data");
    console.log(userDetails);
  };

  const clearDetails = () => {
    setUserDetails({
      fullName : "",
      email : "",
      password : ""
    })
  }

  const handleTabChange = () => {
    clearDetails();
      setCurrentState(
                  currentState === 'signup' ? "login" : "signup"
                );
  }

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center gap-[10rem]">
      <img src={assets?.logo_big} alt="logo" className="max-h-56" />

      <Card className="w-full max-w-sm border-2 bg-white/8 text-white border-gray-500 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {
                currentState == 'signup' &&
                <div className="grid gap-2">
                <Label htmlFor="fullName">FullName</Label>
                <Input
                  id="fullName"
                  type="fullName"
                  value={userDetails?.fullName}
                  name="fullName"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter FullName"
                  required
                />
              </div>
              }
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={userDetails?.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={userDetails?.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              {
                currentState == "signup" &&
                <div className="grid gap-2">
                <Label htmlFor="bio">User Bio</Label>
                <Input
                  id="bio"
                  type="bio"
                  value={userDetails?.bio}
                  name="bio"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Bio"
                  required
                />
              </div>
              }
            </div>

            <div className="flex  justify-end mt-6">
            <p
              className="inline-block text-sm  font-semibold cursor-pointer"
              onClick={handleTabChange}
              // onClick={() => {
                // setCurrentState(
                //   currentState === 'signup' ? "login" : "signup"
                // )
              // }}
            >
              {currentState === 'signup' ? "Login" : "Sign up"}
            </p>
          </div>

          <Button
            type="submit"
            // className="bg-green-300  w-full"
            className="w-full mt-4 bg-blue-700 hover:bg-blue-600 gap-2 cursor-pointer "
            // disabled={ !userDetails?.fullName || !userDetails?.email || !userDetails?.password}
          >
            {currentState === 'Signup' ? "Sign up" : "Login"}
          </Button>
          </form>
          
        </CardContent>
        {/* <CardFooter className="flex-col"> */}
        {/* </CardFooter> */}
      </Card>
    </div>
  );
};

export default LoginPage;
