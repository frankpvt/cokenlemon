import { useState } from "react";
import { motion } from "framer-motion";

const LockScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState("");

  const correctPassword = "0508";

  const handleNumberClick = (num) => {
    if (password.length < 4) {
      setPassword(password + num);
    }
  };

  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };

  const handleUnlock = () => {
    if (password === correctPassword) {
      onUnlock();
    } else {
      alert("Wrong password 💔");
      setPassword("");
    }
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-pink-200 via-rose-200 to-fuchsia-300 px-4">
      {/* Background Image */}
      <img
        src="/cokenlemon/images/background/background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Floating Hearts */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">💖</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-pulse">
        🎀
      </div>
      <div className="absolute top-32 right-20 text-2xl animate-bounce">✨</div>
      <div className="absolute bottom-32 left-16 text-3xl animate-pulse">
        💗
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm rounded-[40px] border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl p-8"
      >
        {/* Melody Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="/cokenlemon/images/stickers/mm.png"
            alt="melody"
            className="w-24 h-24 rounded-full "
          />
        </div>

        <h1 className="text-center text-white text-4xl font-black drop-shadow-lg">
          Secret Love Lock 💖
        </h1>

        <p className="text-center text-white/90 mt-2 mb-8 text-sm tracking-wide">
          Enter secret code
        </p>

        {/* Password Dots */}
        <div className="flex justify-center gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              animate={{ scale: index < password.length ? 1.2 : 1 }}
              className={`w-4 h-4 rounded-full border-2 border-white ${
                index < password.length ? "bg-pink-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((num, index) => {
            if (num === "") {
              return <div key={index}></div>;
            }

            return (
              <motion.button
                whileTap={{ scale: 0.9 }}
                key={index}
                onClick={() => {
                  if (num === "⌫") {
                    handleDelete();
                  } else {
                    handleNumberClick(num);
                  }
                }}
                className="h-16 rounded-2xl bg-white/25 hover:bg-white/40 text-white text-2xl font-bold shadow-lg backdrop-blur-md transition-all"
              >
                {num}
              </motion.button>
            );
          })}
        </div>

        {/* Unlock Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleUnlock}
          className="mt-8 w-full py-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow-xl"
        >
          Open My Melody World 🎀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LockScreen;
