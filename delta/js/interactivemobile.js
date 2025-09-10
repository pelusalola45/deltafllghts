 // Interactividad para la vista móvil
        document.addEventListener('DOMContentLoaded', function() {
            // Navigation tabs (móvil)
            const mobileNavTabs = document.querySelectorAll('.mobile-view .nav-tab');
            mobileNavTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    mobileNavTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Swap button (móvil)
            const mobileSwapBtn = document.querySelector('.mobile-view .swap-btn');
            if (mobileSwapBtn) {
                mobileSwapBtn.addEventListener('click', function() {
                    this.style.transform = 'rotate(180deg)';
                    setTimeout(() => {
                        this.style.transform = 'rotate(0deg)';
                    }, 300);
                });
            }

            // Bottom navigation (móvil)
            const mobileBottomNavItems = document.querySelectorAll('.mobile-view .bottom-nav-item');
            mobileBottomNavItems.forEach(item => {
                item.addEventListener('click', function() {
                    this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    setTimeout(() => {
                        this.style.backgroundColor = 'transparent';
                    }, 200);
                });
            });
            
            // Swap button (escritorio)
            const desktopSwapBtn = document.querySelector('.desktop-view .swap-button');
            if (desktopSwapBtn) {
                desktopSwapBtn.addEventListener('click', function() {
                    this.style.transform = 'rotate(180deg)';
                    setTimeout(() => {
                        this.style.transform = 'rotate(0deg)';
                    }, 300);
                });
            }
        });