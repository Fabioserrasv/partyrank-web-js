import './profile.scss';
import { getServerSession } from "next-auth";
import { ChangeUserInfoForm } from "./forms/changeUserInfoForm";
import { options } from "../api/auth/[...nextauth]/options";
import { ChangePasswordForm } from "./forms/changePasswordForm";
import { handleGetUser, handleUpdatePasswordForm, handleUpdateUserInfoForm } from "@/handlers/user.handlers";
import { handleAnswerInvite } from "@/handlers/songset.handlers";
import { InvitesSection } from './invitesSection';
import { getUserImageUrlPath } from '@/lib/utils';
import ChangeProfilePictureForm from './forms/changeProfilePictureForm';

export default async function Profile() {
  const session = await getServerSession(options);
  const user = session?.user!

  const dbUser = await handleGetUser(user.id);

  return (
    <div className="profilePage">
      <div className="userCard">
        <ChangeProfilePictureForm
          user={user}
        />

        <ChangeUserInfoForm
          user={dbUser}
        />

        <ChangePasswordForm
          id={dbUser.id}
        />
      </div>
      <InvitesSection
        dbUser={dbUser}
      />

    </div>
  )
}