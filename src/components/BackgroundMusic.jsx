import { useEffect, useRef, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Autoplay blocked");
      }
    };

    playMusic();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop autoPlay>
        <source src="/cokenlemon/music/song.mp3" type="audio/mp3" />
      </audio>

      <button
        onClick={toggleMusic}
        className="
          fixed
          top-5
          right-5
          z-[999]
          w-14
          h-14
          rounded-full
          bg-pink-300/30
          backdrop-blur-xl
          border
          border-white/30
          text-2xl
          shadow-xl
          hover:scale-110
          transition-all
        "
      >
        {playing ? "🎵" : "🔇"}
      </button>
    </>
  );
};

export default BackgroundMusic;
