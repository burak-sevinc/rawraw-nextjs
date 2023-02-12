import React from "react";

export const MakeAvatarUrl = (
  name: string,
  avatarBgColor: string,
  avatarTextColor: string
): string => {
  return `https://ui-avatars.com/api/?name=${name}&length=2&bold=true&rounded=true&format=svg&background=${avatarBgColor}&color=${avatarTextColor}`;
};
