// Crear estrellas en el fondo
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Opacidad aleatoria
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Animación de parpadeo aleatoria
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Efecto de rotación aleatoria para las estrellas cada 5 segundos
function rotateStars() {
    setInterval(() => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const rotation = Math.random() * 360;
            star.style.transform = `rotate(${rotation}deg)`;
        });
    }, 5000);
}

// Función para redirigir a galeria.html
function redirectToGallery() {
    window.location.href = 'galeria.html';
}

// Función para manejar el carrusel (solo se ejecutará si existe en la página)
function setupCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Si no hay carrusel en la página, salir de la función
    if (slides.length === 0) return;
    
    let currentSlide = 0;

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Oculta todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Remueve la clase active de todos los dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Ajusta el índice si está fuera de rango
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // Muestra el slide actual
        slides[currentSlide].style.display = 'block';
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 10);
        
        // Activa el dot correspondiente
        dots[currentSlide].classList.add('active');
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        showSlide(currentSlide);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        showSlide(currentSlide);
    }

    // Event Listeners para los botones
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event Listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Inicializar el carrusel mostrando el primer slide
    showSlide(currentSlide);
}

// Manejar el envío del formulario (si existe en la página)
function setupMessageForm() {
    const messageForm = document.getElementById('messageForm');
    if (!messageForm) return;
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value;
        const recipientName = document.getElementById('recipientName').value;
        const messageText = document.getElementById('messageText').value;
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        const messageHeader = document.createElement('div');
        messageHeader.classList.add('message-header');
        
        const senderSpan = document.createElement('span');
        senderSpan.textContent = senderName;
        
        const recipientSpan = document.createElement('span');
        recipientSpan.textContent = `Para: ${recipientName}`;
        
        messageHeader.appendChild(senderSpan);
        messageHeader.appendChild(recipientSpan);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = messageText;
        
        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageContent);
        
        // Agregar al principio de la lista
        const messagesList = document.getElementById('messagesList');
        messagesList.insertBefore(messageDiv, messagesList.firstChild);
        
        // Mostrar mensaje de éxito
        alert(`¡Tu mensaje para ${recipientName} ha sido enviado al universo! ✨`);
        
        // Limpiar formulario
        document.getElementById('messageForm').reset();
        
        // Efecto visual
        const heartContainer = document.querySelector('.heart-container');
        if (heartContainer) {
            heartContainer.style.transform = 'scale(1.1)';
            setTimeout(() => {
                heartContainer.style.transform = 'scale(1)';
            }, 300);
        }
    });
}

// Configurar el botón de amor/pensamientos
function setupLoveButton() {
    const loveButton = document.getElementById('loveButton');
    if (!loveButton) return;
    
    loveButton.addEventListener('click', function() {
        // Redirigir a galeria.html
        redirectToGallery();
        
        // Efecto visual antes de redirigir
        this.innerHTML = '<i class="fas fa-heart"></i> Redirigiendo...';
        this.style.background = 'linear-gradient(45deg, var(--accent), var(--secondary))';
        
        // Pequeña pausa para mostrar el efecto
        setTimeout(() => {
            redirectToGallery();
        }, 500);
    });
}

// Configurar enlaces de navegación suave (si existen en la página)
function setupNavigationLinks() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Animaciones de cohetes, explosiones y corazones flotantes MEJORADA
function setupAnimations() {
    const rocketsContainer = document.querySelector('.rockets-container');
    const explosionsContainer = document.querySelector('.explosions-container');
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    
    if (!rocketsContainer || !explosionsContainer || !floatingHeartsContainer) return;
    
    // Colores para los corazones
    const heartColors = ['#ff3e6c', '#ffcc00', '#744d7c', '#ff6b9d', '#ff9966', '#ff3e6c', '#ffcc00'];
    
    // Diferentes tipos de animaciones disponibles
    const animationTypes = [
        'floatHeart1', 'floatHeart2', 'floatHeart3', 
        'floatHeartHorizontal', 'floatHeartDiagonal',
        'floatHeartZigzag', 'floatHeartWave', 'floatHeartCircular'
    ];
    
    // Crear corazones flotantes iniciales
    function createFloatingHearts(count = 25) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 300);
        }
    }
    
    // Crear un corazón flotante individual MEJORADO
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        
        // Tipo de animación aleatoria
        const animType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
        
        // Parámetros aleatorios
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() * 40 - 20);
        const startY = Math.random() * 100;
        const endY = startY + (Math.random() * 40 - 20);
        const duration = 8 + Math.random() * 15;
        const size = 16 + Math.random() * 24;
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        const opacity = 0.4 + Math.random() * 0.4;
        const delay = Math.random() * 5;
        
        // Configurar según el tipo de animación
        let cssText = `
            font-size: ${size}px;
            color: ${color};
            --opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            will-change: transform, opacity;
        `;
        
        switch(animType) {
            case 'floatHeart1':
            case 'floatHeart2':
            case 'floatHeart3':
                cssText += `
                    left: ${startX}vw;
                    --start-x: ${startX}vw;
                    --end-x: ${endX}vw;
                    animation-name: ${animType};
                `;
                break;
                
            case 'floatHeartHorizontal':
                cssText += `
                    top: ${startY}vh;
                    --start-y: ${startY}vh;
                    --end-y: ${endY}vh;
                    animation-name: ${animType};
                `;
                break;
                
            case 'floatHeartDiagonal':
                cssText += `
                    animation-name: ${animType};
                `;
                break;
                
            case 'floatHeartZigzag':
            case 'floatHeartWave':
                cssText += `
                    left: ${startX}vw;
                    --start-x: ${startX}vw;
                    animation-name: ${animType};
                `;
                break;
                
            case 'floatHeartCircular':
                cssText += `
                    left: ${startX}vw;
                    top: ${startY}vh;
                    animation-name: ${animType};
                `;
                break;
        }
        
        heart.style.cssText = cssText;
        heart.style.animationName = animType;
        
        floatingHeartsContainer.appendChild(heart);
        
        // Eliminar el corazón después de la animación y crear uno nuevo
        setTimeout(() => {
            if (heart.parentNode === floatingHeartsContainer) {
                floatingHeartsContainer.removeChild(heart);
                // Crear nuevo corazón después de un tiempo aleatorio
                setTimeout(createFloatingHeart, Math.random() * 5000);
            }
        }, (duration + delay) * 1000);
    }
    
    // Crear corazones en patrones especiales
    function createSpecialHeartPatterns() {
        // Patrón 1: Lluvia de corazones desde diferentes puntos
        function createHeartRain() {
            const rainCount = 8;
            for (let i = 0; i < rainCount; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('floating-heart');
                    heart.innerHTML = '❤️';
                    
                    const startX = Math.random() * 100;
                    const size = 20 + Math.random() * 20;
                    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
                    const duration = 4 + Math.random() * 4;
                    
                    heart.style.cssText = `
                        left: ${startX}vw;
                        font-size: ${size}px;
                        color: ${color};
                        animation-name: floatHeart1;
                        animation-duration: ${duration}s;
                        --start-x: ${startX}vw;
                        --end-x: ${startX + (Math.random() * 20 - 10)}vw;
                        --opacity: ${0.6 + Math.random() * 0.3};
                    `;
                    
                    floatingHeartsContainer.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode === floatingHeartsContainer) {
                            floatingHeartsContainer.removeChild(heart);
                        }
                    }, duration * 1000);
                }, i * 300);
            }
        }
        
        // Patrón 2: Corazones en espiral
        function createHeartSpiral() {
            const spiralCount = 12;
            const centerX = 50;
            const centerY = 50;
            
            for (let i = 0; i < spiralCount; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('floating-heart');
                    heart.innerHTML = '❤️';
                    
                    const angle = (i / spiralCount) * Math.PI * 2;
                    const radius = 30 + i * 5;
                    const startX = centerX + Math.cos(angle) * radius;
                    const startY = centerY + Math.sin(angle) * radius;
                    const size = 18 + Math.random() * 15;
                    const color = heartColors[i % heartColors.length];
                    
                    heart.style.cssText = `
                        left: ${startX}vw;
                        top: ${startY}vh;
                        font-size: ${size}px;
                        color: ${color};
                        animation-name: floatHeartCircular;
                        animation-duration: ${8 + i}s;
                        --opacity: ${0.7};
                    `;
                    
                    floatingHeartsContainer.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode === floatingHeartsContainer) {
                            floatingHeartsContainer.removeChild(heart);
                        }
                    }, (8 + i) * 1000);
                }, i * 200);
            }
        }
        
        // Ejecutar patrones periódicamente
        setInterval(createHeartRain, 8000);
        setInterval(createHeartSpiral, 12000);
    }
    
    // Crear un cohete
    function createRocket() {
        const rocket = document.createElement('div');
        rocket.classList.add('rocket');
        
        const rocketBody = document.createElement('div');
        rocketBody.classList.add('rocket-body');
        
        const rocketMain = document.createElement('div');
        rocketMain.classList.add('rocket-main');
        
        const rocketTop = document.createElement('div');
        rocketTop.classList.add('rocket-top');
        
        const rocketFlame = document.createElement('div');
        rocketFlame.classList.add('rocket-flame');
        
        rocketBody.appendChild(rocketMain);
        rocketBody.appendChild(rocketTop);
        rocketBody.appendChild(rocketFlame);
        rocket.appendChild(rocketBody);
        
        // Posición inicial aleatoria en la parte inferior
        const startX = 10 + Math.random() * 80;
        const duration = 3 + Math.random() * 2;
        const endX = 20 + Math.random() * 60;
        
        rocket.style.cssText = `
            left: ${startX}%;
            animation-name: rocketLaunch;
            animation-duration: ${duration}s;
            animation-fill-mode: forwards;
        `;
        
        // Definir animación del cohete
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rocketLaunch {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 1;
                }
                30% {
                    transform: translateY(-30vh) translateX(${(endX - startX) / 2}px);
                }
                60% {
                    transform: translateY(-60vh) translateX(${endX - startX}px);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${endX - startX}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        rocketsContainer.appendChild(rocket);
        
        // Crear explosión de corazones cuando el cohete llega a cierta altura
        setTimeout(() => {
            createHeartExplosion(startX + (endX - startX) * 0.6, 50 + Math.random() * 30);
        }, duration * 1000 * 0.6);
        
        // Eliminar el cohete después de la animación
        setTimeout(() => {
            if (rocket.parentNode === rocketsContainer) {
                rocketsContainer.removeChild(rocket);
            }
            document.head.removeChild(style);
        }, duration * 1000);
    }
    
    // Crear explosión de corazones en una posición específica
    function createHeartExplosion(x, y, heartCount = 12) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        
        explosion.style.cssText = `
            left: ${x}%;
            top: ${y}%;
        `;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = '❤️';
            
            // Valores aleatorios para la explosión
            const angle = (i / heartCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = Math.random() * 360;
            const size = 15 + Math.random() * 20;
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];
            
            heart.style.cssText = `
                --tx: ${tx}px;
                --ty: ${ty}px;
                --rot: ${rot}deg;
                font-size: ${size}px;
                color: ${color};
                animation-delay: ${Math.random() * 0.3}s;
            `;
            
            explosion.appendChild(heart);
        }
        
        explosionsContainer.appendChild(explosion);
        
        // Eliminar la explosión después de la animación
        setTimeout(() => {
            if (explosion.parentNode === explosionsContainer) {
                explosionsContainer.removeChild(explosion);
            }
        }, 2000);
    }
    
    // Crear explosión aleatoria en la página
    function createRandomExplosion() {
        const x = 10 + Math.random() * 80;
        const y = 20 + Math.random() * 60;
        const heartCount = 8 + Math.floor(Math.random() * 10);
        
        createHeartExplosion(x, y, heartCount);
    }
    
    // Iniciar todas las animaciones MEJORADO
    function startAnimations() {
        // Crear corazones flotantes iniciales
        createFloatingHearts(30);
        
        // Iniciar patrones especiales de corazones
        setTimeout(createSpecialHeartPatterns, 2000);
        
        // Crear cohetes en intervalos aleatorios
        function launchRandomRocket() {
            createRocket();
            const nextLaunch = 1000 + Math.random() * 4000;
            setTimeout(launchRandomRocket, nextLaunch);
        }
        
        // Iniciar lanzamiento de cohetes
        setTimeout(() => {
            launchRandomRocket();
        }, 1000);
        
        // Crear explosiones aleatorias
        function triggerRandomExplosion() {
            createRandomExplosion();
            const nextExplosion = 2000 + Math.random() * 5000;
            setTimeout(triggerRandomExplosion, nextExplosion);
        }
        
        // Iniciar explosiones aleatorias
        setTimeout(() => {
            triggerRandomExplosion();
        }, 3000);
    }
    
    // Pausar animaciones cuando el usuario está interactuando
    let animationsPaused = false;
    
    function pauseAnimations() {
        if (animationsPaused) return;
        animationsPaused = true;
        document.querySelectorAll('.rocket, .floating-heart, .heart-particle').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    function resumeAnimations() {
        if (!animationsPaused) return;
        animationsPaused = false;
        document.querySelectorAll('.rocket, .floating-heart, .heart-particle').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    // Pausar al hacer hover solo en elementos específicos
    const interactiveElements = document.querySelectorAll('.cta-button, .carousel-container, .message-form, nav a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', pauseAnimations);
        el.addEventListener('mouseleave', resumeAnimations);
    });
    
    // Iniciar animaciones
    startAnimations();
    
    // Limpiar animaciones al salir de la página
    window.addEventListener('beforeunload', () => {
        rocketsContainer.innerHTML = '';
        explosionsContainer.innerHTML = '';
        floatingHeartsContainer.innerHTML = '';
    });
}

// Optimización para animaciones MEJORADA
function optimizeAnimations() {
    // Reducir animaciones en dispositivos móviles
    if ('matchMedia' in window) {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMobileChange(e) {
            if (e.matches) {
                // Reducir número de corazones en móvil
                const hearts = document.querySelectorAll('.floating-heart');
                hearts.forEach((heart, index) => {
                    if (index > 12) heart.style.display = 'none';
                });
                
                // Ajustar tamaño en móvil
                document.querySelectorAll('.floating-heart').forEach(heart => {
                    const currentSize = parseInt(window.getComputedStyle(heart).fontSize);
                    if (currentSize > 20) {
                        heart.style.fontSize = '16px';
                    }
                });
            }
        }
        
        mediaQuery.addListener(handleMobileChange);
        handleMobileChange(mediaQuery);
    }
    
    // Usar requestAnimationFrame para mejor rendimiento
    let lastTime = 0;
    
    function animationLoop(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        // Aquí podrías añadir lógica de animación más avanzada si es necesario
        
        lastTime = timestamp;
        requestAnimationFrame(animationLoop);
    }
    
    // Iniciar el loop de animación
    requestAnimationFrame(animationLoop);
}

// Función para ajustar animaciones según el rendimiento del dispositivo
function adjustAnimationsForPerformance() {
    // Detectar si el dispositivo tiene limitaciones de rendimiento
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || 
                          (navigator.deviceMemory && navigator.deviceMemory <= 4);
    
    if (isLowEndDevice) {
        // Reducir animaciones en dispositivos de bajos recursos
        document.querySelectorAll('.floating-heart').forEach((heart, index) => {
            if (index > 8) heart.remove();
        });
        
        // Simplificar explosiones
        window.createHeartExplosion = function(x, y, heartCount = 8) {
            // Versión simplificada para dispositivos de bajos recursos
            const explosion = document.createElement('div');
            explosion.classList.add('explosion');
            explosion.style.cssText = `left: ${x}%; top: ${y}%;`;
            
            for (let i = 0; i < Math.min(heartCount, 6); i++) {
                const heart = document.createElement('div');
                heart.classList.add('heart-particle');
                heart.innerHTML = '❤️';
                heart.style.cssText = `
                    font-size: 16px;
                    color: #ff3e6c;
                    animation: heartExplosion 1s ease-out forwards;
                `;
                explosion.appendChild(heart);
            }
            
            document.querySelector('.explosions-container').appendChild(explosion);
            
            setTimeout(() => {
                if (explosion.parentNode) {
                    explosion.remove();
                }
            }, 1500);
        };
    }
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear estrellas
    createStars();
    
    // Rotar estrellas
    rotateStars();
    
    // Configurar el carrusel (si existe)
    setupCarousel();
    
    // Configurar formulario de mensajes (si existe)
    setupMessageForm();
    
    // Configurar el botón de pensamientos
    setupLoveButton();
    
    // Configurar enlaces de navegación
    setupNavigationLinks();
    
    // Añadir animaciones
    setupAnimations();
    
    // Optimizar animaciones
    optimizeAnimations();
    
    // Ajustar animaciones según rendimiento
    adjustAnimationsForPerformance();
    
    // Efecto especial para el corazón principal
    const heartContainer = document.querySelector('.heart-container');
    if (heartContainer) {
        setInterval(() => {
            heartContainer.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heartContainer.style.transform = 'scale(1)';
            }, 300);
        }, 5000);
    }
});

// Función para recargar animaciones si hay problemas de rendimiento
function reloadAnimationsIfNeeded() {
    // Verificar si las animaciones están funcionando
    setTimeout(() => {
        const hearts = document.querySelectorAll('.floating-heart');
        const rockets = document.querySelectorAll('.rocket');
        
        if (hearts.length === 0 && rockets.length === 0) {
            console.log('Reiniciando animaciones...');
            setupAnimations();
        }
    }, 10000);
}

// Llamar a la función de verificación
setTimeout(reloadAnimationsIfNeeded, 5000);