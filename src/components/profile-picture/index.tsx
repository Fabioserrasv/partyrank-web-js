"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserImageUrlPath } from "@/lib/utils";
import { onProfilePictureRefresh } from "./signal";

type ProfilePictureProps = {
  userId: number;
  imageUrl?: string | null;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
};

export function ProfilePicture({
  userId,
  imageUrl,
  width = 0,
  height = 0,
  style,
  className,
  alt = "Profile Picture",
}: ProfilePictureProps) {
  const [cacheBuster, setCacheBuster] = useState(0);

  useEffect(() => {
    return onProfilePictureRefresh(userId, () => setCacheBuster(Date.now()));
  }, [userId]);

  const baseSrc = getUserImageUrlPath(imageUrl);
  const src = cacheBuster ? `${baseSrc}?t=${cacheBuster}` : baseSrc;

  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt={alt}
      key={cacheBuster}
      style={style}
      className={className}
    />
  );
}
