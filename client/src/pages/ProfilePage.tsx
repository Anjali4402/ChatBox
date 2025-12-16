import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import assets from "../assets/assets";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState("");

  console.log(authUser);

  const [userDetails, setUserDetails] = useState({
    fullName: authUser?.fullName,
    bio: authUser?.bio,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("submit data");
    console.log(userDetails);
    console.log(selectedImg);

    // if not uploaded the image
    if (!selectedImg) {
      await updateProfile({
        fullName: userDetails?.fullName,
        bio: userDetails?.bio,
      });
      navigate("/");
      return;
    }

    // First convert image to base64 then use.
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: userDetails?.fullName,
        bio: userDetails.bio,
      });

      navigate("/");
    };
  };

  const handleUpload = (e) => {
    setSelectedImg(e?.target?.files[0]);
  };

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <Card className="w-full max-w-2xl border-2 bg-white/8 text-white border-gray-500 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-[5rem]">
          <form onSubmit={handleSubmit} className=" col-span-2 space-y-4">
            <div className="flex  items-center gap-4">
              <img
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : assets?.avatar_icon
                }
                alt=""
                className="h-10 w-10 rounded-full"
              />

              <input
                type="file"
                accept="image/*"
                id="image"
                hidden
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
              <label htmlFor="image" className="cursor-pointer">
                Upload profile image
              </label>
            </div>

            <div className="flex flex-col gap-6">
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
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="bio">User Bio</Label>
                <textarea
                  id="bio"
                  // type="bio"
                  value={userDetails?.bio}
                  name="bio"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Bio"
                  required
                  className="border p-2 rounded-md"
                  rows={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-violet-700 hover:bg-violet-600 gap-2 cursor-pointer "
            >
              Save
            </Button>
          </form>

          <img
            // src={assets?.logo_icon}
            src={
              authUser?.profilePic ? authUser?.profilePic : assets?.logo_icon
            }
            alt="logo"
            className="max-h-32 rounded-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
