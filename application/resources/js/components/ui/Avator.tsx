import React from "react";

interface AvatarProps {
  name: string;
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, image }) => {
  const fallback = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
    name
  )}`;

  return (
    <img loading="lazy"
      src={image || fallback}
      alt={name}
      className="w-12 h-12 rounded-full border"
    />
  );
};

export default Avatar;
