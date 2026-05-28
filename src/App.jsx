import { useState } from "react";

import LockScreen from "./components/LockScreen";
import LoveWorld from "./components/LoveWorld";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <BackgroundMusic />

      {!unlocked ? (
        <LockScreen onUnlock={() => setUnlocked(true)} />
      ) : (
        <LoveWorld />
      )}
    </>
  );
}

export default App;
