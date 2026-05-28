import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { memories } from "../data/memories";

const stickers = [
  "/images/stickers/mm.png",
  "/images/stickers/mm1.png",
  "/images/stickers/mm2.png",
  "/images/stickers/mm3.png",
  "/images/stickers/mm4.png",
  "/images/stickers/mm5.png",
  "/images/stickers/mm6.png",
  "/images/stickers/mm7.png",
  "/images/stickers/mm8.png",
  "/images/stickers/mm9.png",
  "/images/stickers/mm10.png",
  "/images/stickers/mm11.png",
  "/images/stickers/mm12.png",
  "/images/stickers/mm13.png",
  "/images/stickers/mm14.png",
  "/images/stickers/mm15.png",
  "/images/stickers/mm16.png",
  "/images/stickers/mm17.png",
];

const LoveWorld = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [openedMemories, setOpenedMemories] = useState([]);
  const [showLetter, setShowLetter] = useState(false);
  const [hearts, setHearts] = useState([]);

  const totalMemories = memories.length;

  useEffect(() => {
    const generatedHearts = memories.map((memory) => ({
      ...memory,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 5,
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-pink-200 via-rose-200 to-fuchsia-300">
      {/* Background */}
      <img
        src="/images/background/bg.jpg"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Floating My Melody Stickers */}
      {stickers.map((sticker, index) => (
        <motion.img
          key={index}
          src={sticker}
          alt=""
          initial={{
            y: "110vh",
            x: `${Math.random() * 90}%`,
            rotate: 0,
          }}
          animate={{
            y: "-120vh",
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute w-16 md:w-24 opacity-60 pointer-events-none"
        />
      ))}

      {/* Progress Bar */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 w-[85%] max-w-sm">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-1 shadow-xl">
          <div
            className="h-4 rounded-full bg-pink-500 transition-[width] duration-500"
            style={{
              width: `${(openedMemories.length / totalMemories) * 100}%`,
            }}
          />
        </div>

        <p className="text-center text-white text-sm font-bold mt-2 drop-shadow-lg">
          {openedMemories.length} / {totalMemories} Memories Opened 💖
        </p>
      </div>

      {/* Floating Cute Items */}
      {hearts
        .filter((heart) => !openedMemories.includes(heart.id))
        .map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              y: "100vh",
              rotate: 0,
            }}
            animate={{
              y: "-120vh",
              rotate: 360,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}
            whileTap={{ scale: 1.3 }}
            onClick={() => {
              setSelectedMemory(heart);

              setOpenedMemories((prev) => {
                if (prev.includes(heart.id)) return prev;

                const updated = [...prev, heart.id];

                if (updated.length === totalMemories) {
                  setTimeout(() => {
                    setShowLetter(true);
                  }, 800);
                }

                return updated;
              });
            }}
            className="absolute cursor-pointer text-5xl z-30 drop-shadow-lg"
            style={{
              left: `${heart.left}%`,
            }}
          >
            {
              ["🎈", "🎀", "🌸", "🍭", "🧸", "🩷", "🍬", "✨"][
                Math.floor(Math.random() * 8)
              ]
            }
          </motion.div>
        ))}

      {/* Floating My Melody Stickers */}
      {stickers.map((sticker, index) => {
        const randomLeft = Math.random() * 100;

        return (
          <motion.img
            key={index}
            src={sticker}
            alt=""
            initial={{
              y: "110vh",
              rotate: 0,
            }}
            animate={{
              y: "-120vh",
              rotate: 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${randomLeft}%`,
            }}
            className="absolute w-16 md:w-24 opacity-60 pointer-events-none"
          />
        );
      })}

      {/* Popup */}
      {selectedMemory && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-3 right-4 text-2xl"
            >
              ✖
            </button>

            {/* IMAGE */}
            {selectedMemory.type === "image" && (
              <img
                src={selectedMemory.src}
                alt=""
                className="rounded-2xl w-full aspect-[9/16] object-cover"
              />
            )}

            {/* VIDEO */}
            {selectedMemory.type === "video" && (
              <video
                controls
                className="rounded-2xl w-full aspect-[9/16] object-cover"
              >
                <source src={selectedMemory.src} />
              </video>
            )}

            {/* VOICE */}
            {selectedMemory.type === "voice" && (
              <audio controls className="w-full mt-10">
                <source src={selectedMemory.src} />
              </audio>
            )}

            <p className="text-center text-pink-500 font-bold text-lg mt-5">
              {selectedMemory.caption}
            </p>
          </div>
        </div>
      )}
      {/* Final Love Letter */}
      {showLetter && (
        <div className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl border border-pink-200 text-center relative overflow-hidden"
          >
            {/* Melody Decoration */}
            <img
              src="/images/stickers/1.png"
              alt=""
              className="w-20 absolute -top-4 -left-4 rotate-[-20deg]"
            />

            <img
              src="/images/stickers/2.png"
              alt=""
              className="w-20 absolute -bottom-4 -right-4 rotate-[20deg]"
            />

            <h1 className="text-4xl font-black text-pink-500 mb-6">
              For You 💌
            </h1>

            <p className="text-gray-700 text-lg leading-8">
              Mari Radha i don't know how can i discrable you in my words but
              when you see in my eyes you can see how much i deeply in love you.
              <br />
              <br />
              Thank you for loving me through every distance, every late-night
              Ricky calls,every vlogs, snaps and every mood with all these
              responsibilities on your shoulder. You made every moment just a
              fairy tale for me.
              <br />
              <br />
              No matter how far we are, my heart always finds you.
              <br />
              <br />
              Mari jaan my love i love you endlessly bachhha💖
            </p>

            <button
              onClick={() => setShowLetter(false)}
              className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
            >
              Close 🎀
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoveWorld;
