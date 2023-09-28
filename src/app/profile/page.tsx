import { getServerSession } from "next-auth";
import { ChangeUserInfoForm } from "./forms/changeUserInfoForm";
import { options } from "../api/auth/[...nextauth]/options";
import './profile.scss';
import { ChangePasswordForm } from "./forms/changePasswordForm";
import { handleUpdatePasswordForm, handleUpdateUserInfoForm } from "@/repositories/user.repository";

export default async function Profile() {
  const session = await getServerSession(options);
  const user = session?.user!

  return (
    <div className="profilePage">
      <div className="userCard">
        <div className="profilePicture">
          <img src={user.imageUrl} alt="Profile Picture" />
          {/* <span>{user.username}</span> */}
        </div>

        <ChangeUserInfoForm 
          user={user}
          handleUpdateUserInfoForm={handleUpdateUserInfoForm}
        />

        <ChangePasswordForm
          handleUpdatePasswordForm={handleUpdatePasswordForm}
          id={user.id}
        />
      </div>
    </div>
  )
}