"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createRef, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { changeProfilePictureSchema } from "./validations/profileValidations";
import { getUserImageUrlPath } from "@/lib/utils";
import toast from "react-hot-toast";
import { handleChangeProfilePictureForm } from "@/handlers/user.handlers";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ChangeProfilePictureForm({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ChangeProfilePictureSchema>({
    resolver: zodResolver(changeProfilePictureSchema),
  });
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(
    user.imageUrl || "",
  );

  async function onSubmitChangeProfilePicture(
    data: ChangeProfilePictureSchema,
  ) {
    const formData = new FormData();

    formData.append("image", data.profileImage[0]);

    try {
      const newImageUrl = await handleChangeProfilePictureForm(formData);

      if (newImageUrl) {
        toast.success("Profile picture saved successfully!");

        // Update local state immediately
        setCurrentImageUrl(newImageUrl);

        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            imageUrl: newImageUrl,
          },
        });

        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      <div className="profilePicture">
        <Image
          width="0"
          height="0"
          style={{ width: "90%" }}
          src={getUserImageUrlPath(currentImageUrl)}
          alt="Profile Picture"
          key={currentImageUrl}
        />
        <span>{user.username}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmitChangeProfilePicture)}>
        <div className="formImage">
          <Input
            displayName="Change Picture"
            accept="image/*"
            type="file"
            {...register("profileImage")}
            errorMessage={errors.profileImage?.message}
          />
          <Button name="Submit" />
        </div>
      </form>
    </>
  );
}
