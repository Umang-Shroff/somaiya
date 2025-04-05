import { useState } from 'react'

const defaultAvatars = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a',
  'https://images.unsplash.com/photo-1645830166230-187caf791b90',
  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1569913486515-b74bf7751574',
  'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a',
  'https://images.unsplash.com/photo-1645830166230-187caf791b90',
  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'https://images.unsplash.com/photo-1569913486515-b74bf7751574',
]

function AvatarCarousel({
  avatarSize = 48,
  avatarSpacing = 8,
  avatars = defaultAvatars,
}) {
  const middleIndex = Math.floor(avatars.length / 2) // Find the middle index of the avatars array

  return (
    <div
      className="relative flex h-full w-full gap-2"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        minHeight: `${avatarSize}px`,
        maxWidth: `${(avatarSize + avatarSpacing) * 5}px`,
      }}
    >
      {avatars.map((avatar, index) => {
        // Calculate left position so that the middle item is centered
        const placement = index - middleIndex
        const left = placement * (avatarSize + avatarSpacing)

        return (
          <img
            key={index}
            className="absolute m-0 flex-none rounded-full object-cover"
            src={avatar}
            alt={`Avatar ${index + 1}`}
            width={avatarSize}
            height={avatarSize}
            style={{
              width: avatarSize,
              height: avatarSize,
              top: '50%',
              left: `calc(50% + ${left}px)`, // Center the carousel by adding left offset
              transform: `translate(-50%, -50%)`,
              zIndex: 0,
              opacity: 1,
              scale: 1,
              transformOrigin: 'top left',
              transition: 'left 0.5s, opacity 0.5s, scale 0.5s',
            }}
          />
        )
      })}
    </div>
  )
}

const Testimonial = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-white px-6 py-16">
      {/* Title Section */}
      <h2 className="text-4xl mt-6 font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
        People who love our work
      </h2>

    
      {/* Avatar Carousel Section */}
      <div className="relative w-full pt-6 flex justify-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-black via-transparent to-transparent opacity-50"></div>
        <AvatarCarousel />
      </div>

      {/* Optional Text Section for extra engagement */}
      <p className="text-xl mt-6 text-center opacity-75" style={{ fontFamily: "Playfair Display, serif" }}>
        Join the community of passionate creators who trust us with their projects. Stay inspired!
      </p>
    </div>
  )
}

export default Testimonial
