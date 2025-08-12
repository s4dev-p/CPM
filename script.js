document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // WhatsApp button functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Replace with your actual WhatsApp group link
            const whatsappUrl = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
            window.open(whatsappUrl, '_blank');
        });
    }

    // Enhanced button animations
    document.querySelectorAll('.primary-btn, .inscription-btn, .whatsapp-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Advanced Intersection Observer para animações
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Preparar elementos para animação
    document.querySelectorAll('.feature-card, .floating-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });

    // CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Header scroll animation - Completamente transparente quando scroll
    const header = document.querySelector('.header');
    let isScrolled = false;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 150 && !isScrolled) {
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScroll <= 150 && isScrolled) {
            header.classList.remove('scrolled');
            isScrolled = false;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Animação de entrada para elementos do hero
    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .hero-badge, .hero-stats, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });

    // Animação sofisticada para cards flutuantes
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.9) rotate(-2deg)';
        card.style.transition = `all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.8 + index * 0.3}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        }, 300);
    });

    // Efeito parallax para cards flutuantes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.01 * (index % 2 === 0 ? 1 : -1);
            el.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    }, { passive: true });

    // Animação de números das estatísticas
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalText = stat.textContent;
            const hasPlus = finalText.includes('+');
            const number = parseInt(finalText.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }, 20);
            }
        });
    };

    // Observer para animação de números
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Hover effects avançados para feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Smooth reveal para section title
    const sectionTitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sectionTitleObserver.observe(title);
    });

    // Efeito de cursor customizado para elementos interativos
    const addCursorEffect = () => {
        document.querySelectorAll('.primary-btn, .inscription-btn, .whatsapp-btn, .feature-card, .floating-card').forEach(el => {
            el.style.cursor = 'pointer';
        });
    };

    addCursorEffect();

    // Performance optimization - debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reajustar animações se necessário
            addCursorEffect();
        }, 250);
    });
});

