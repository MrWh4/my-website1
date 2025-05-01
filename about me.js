// DOM elementlarini tanlash
const loader = document.querySelector('.loader');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');

// 3D fon uchun o'zgaruvchilar
let scene, camera, renderer, particles;

// Sahifa yuklanganda
window.addEventListener('load', () => {
    // Loader animatsiyasi
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 200);
    
    // Typed.js bilan yozish animatsiyasi
    const typed = new Typed('#typed', {
        strings: [
            'Frontend dasturchi',
            'Web dasturchi',
            'UI/UX dizayner',
            'Kreativ ishlab chiqaruvchi'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
    
    // 3D fon yaratish
    init3DBackground();
    
    // Skill progress barlarni animatsiyalash
    setTimeout(() => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 1000);
});

// Scroll hodisasi
window.addEventListener('scroll', () => {
    // Navbar stilini o'zgartirish
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Aktiv seksiyani aniqlash
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    // Navbar linkini aktiv qilish
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Burger menu
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Kontakt formasi
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form ma'lumotlarini olish
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Bu yerda form ma'lumotlarini yuborish logikasi bo'lishi kerak
        // Misol uchun: fetch API bilan backend'ga yuborish
        
        // Muvaffaqiyatli yuborilgandan so'ng
        alert(`Xabaringiz yuborildi!\nIsm: ${name}\nEmail: ${email}\nXabar: ${message}`);
        contactForm.reset();
    });
}

// 3D fon yaratish funksiyasi
function init3DBackground() {
    // Three.js ni ishga tushirish
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        antialias: true,
        alpha: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    camera.position.z = 30;
    
    // Zarrachalar yaratish
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Yorug'lik qo'shish
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff6584, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animatsiya
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Oyna o'lchamini o'zgartirish
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Mouse harakati bilan fon harakatlanishi
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        gsap.to(particles.rotation, {
            x: mouseY * 0.1,
            y: mouseX * 0.1,
            duration: 2
        });
    });
}

// Scroll animatsiyalari
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
