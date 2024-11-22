import { useEffect } from 'react';

export const useNativeBehavior = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      // Previeni il comportamento di bounce su iOS
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      let startY = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const element = e.target as HTMLElement;
        const scrollable = element.closest('.scroll-container, .chat-list-container, .contacts-list-container, .users-list-container, .settings-container');
        
        if (!scrollable) {
          e.preventDefault();
          return;
        }

        const isAtTop = scrollable.scrollTop <= 0;
        const isAtBottom = scrollable.scrollHeight - scrollable.scrollTop === scrollable.clientHeight;
        const isScrollingDown = currentY < startY;
        const isScrollingUp = currentY > startY;

        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);
}; 