"use client";
import { useEffect, useState } from "react";

function usePwaInstall() {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event); // Save the event for later use
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const showInstallPrompt = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt(); // Show the native install prompt
      installPromptEvent.userChoice.then(() => {
        setInstallPromptEvent(null); // Clear event after user action
      });
    }
  };

  return { showInstallPrompt, isPromptAvailable: !!installPromptEvent };
}

export default function Home() {
  const { showInstallPrompt, isPromptAvailable } = usePwaInstall();
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (isPromptAvailable) setShowBanner(true);

    // Check if the user is on an iOS device
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIos(isIosDevice);
  }, [isPromptAvailable]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the PWA App</h1>

      {/* Show prompt button for supported browsers */}
      {showBanner && !isIos && (
        <div className="p-4 rounded shadow-md text-center">
          <p className="mb-2">Install our app for the best experience!</p>
          <button
            onClick={() => {
              showInstallPrompt();
              setShowBanner(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Install Now
          </button>
        </div>
      )}

      {/* Custom iOS install banner */}
      {isIos && (
        <div className="p-4 rounded shadow-md text-center">
          <p className="mb-2">
            To install this app, please use Safari and tap "Add to Home Screen".
          </p>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// function usePwaInstall() {
//   const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event: any) => {
//       event.preventDefault();
//       setInstallPromptEvent(event); // Save the event for later use
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const showInstallPrompt = () => {
//     if (installPromptEvent) {
//       installPromptEvent.prompt(); // Show the native install prompt
//       installPromptEvent.userChoice.then(() => {
//         setInstallPromptEvent(null); // Clear event after user action
//       });
//     }
//   };

//   return { showInstallPrompt, isPromptAvailable: !!installPromptEvent };
// }

// export default function Home() {
//   const { showInstallPrompt, isPromptAvailable } = usePwaInstall();
//   const [showBanner, setShowBanner] = useState(false);

//   useEffect(() => {
//     if (isPromptAvailable) setShowBanner(true);
//   }, [isPromptAvailable]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">Welcome to the PWA App</h1>

//       {showBanner && (
//         <div className="p-4 rounded shadow-md text-center">
//           <p className="mb-2">Install our app for the best experience!</p>
//           <button
//             onClick={() => {
//               showInstallPrompt();
//               setShowBanner(false);
//             }}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Install Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
