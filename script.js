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
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Replace with your actual WhatsApp group link
            const whatsappUrl = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
            window.open(whatsappUrl, '_blank');
        });
    }

    // Add click animation to all buttons
    document.querySelectorAll('button, a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.feature-card, .floating-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header scroll animation - Logo vai para o centro e botão fica ao lado
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header-container');
    const logo = document.querySelector('.logo');
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    let isScrolled = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adiciona classe scrolled quando scroll > 100px
        if (currentScroll > 100 && !isScrolled) {
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScroll <= 100 && isScrolled) {
            header.classList.remove('scrolled');
            isScrolled = false;
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Animação de entrada dos elementos quando a página carrega
    const animateOnLoad = () => {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-buttons');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animação dos cards flutuantes
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 1000 + (index * 200));
        });
    };

    // Executar animação de entrada
    animateOnLoad();

    // Parallax effect para o hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.5;
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate * 0.3}px)`;
            }
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate * 0.1}px)`;
            }
        }
    }, { passive: true });

    // Animação dos números das estatísticas
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const finalNumber = target.includes('+') ? target.replace('+', '') : target;
            
            if (finalNumber !== '--') {
                let current = 0;
                const increment = parseInt(finalNumber) / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= parseInt(finalNumber)) {
                        current = parseInt(finalNumber);
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                }, 30);
            }
        });
    };

    // Observar seção de estatísticas para animar
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Efeito de hover nos cards de features
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth reveal para elementos quando entram na viewport
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    // Adicionar classe para elementos que devem ser revelados
    document.querySelectorAll('.feature-card, .section-title').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });
});

