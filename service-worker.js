// ChatGPT prompt: Force pwa to update after each start (see also ServiceWorker.js)

// Register service
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        // Check for updates every time the app starts
        registration.update();
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update found
                window.location.reload();
              }
            }
          };
        };
      }).catch(error => {
        console.error('Error during service worker registration:', error);
      });
    });
  }