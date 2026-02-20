// Dental Website Main JavaScript
// Data Management with LocalStorage

const DEFAULT_DATA = {
    general: {
        clinicName: "Dental Clinic",
        doctorName: "Dr. Doctor Name",
        doctorTitle: "BDS, MDS",
        experience: "16",
        address: "Your Clinic Address, City",
        phone: "+91 99999 99999",
        whatsapp: "919999999999",
        email: "clinic@example.com",
        timings: "Mon-Sat: 10 AM - 8 PM",
        bio: "Our doctor combines extensive clinical expertise with genuine compassion to deliver exceptional dental care.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.44!2d72.84!3d19.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA5JzM2LjAiTiA3MsKwNTAnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
    },
    appearance: {
        primary: "#0891B2",
        secondary: "#0D9488",
        accent: "#EA580C"
    },
    services: [
        {
            id: 1,
            title: "Routine Check-ups",
            description: "Regular examinations, cleanings, and preventive care to maintain your oral health.",
            icon: "fa-stethoscope"
        },
        {
            id: 2,
            title: "Dental Implants",
            description: "Permanent tooth replacement solutions that look, feel, and function naturally.",
            icon: "fa-tooth"
        },
        {
            id: 3,
            title: "Cosmetic Dentistry",
            description: "Smile makeovers, veneers, whitening, and aesthetic enhancements.",
            icon: "fa-magic"
        },
        {
            id: 4,
            title: "Root Canal Treatment",
            description: "Painless single-sitting root canal treatment to save your natural teeth.",
            icon: "fa-procedures"
        }
    ],
    reviews: [
        {
            id: 1,
            name: "Rahul Sharma",
            rating: 5,
            text: "Excellent service! The doctor was very gentle and professional. Highly recommended!"
        },
        {
            id: 2,
            name: "Priya Patel",
            rating: 5,
            text: "Best dental clinic in the area. Modern equipment and caring staff."
        }
    ],
    social: [
        { id: 1, platform: "whatsapp", url: "https://wa.me/919999999999", visible: true },
        { id: 2, platform: "facebook", url: "#", visible: true },
        { id: 3, platform: "instagram", url: "#", visible: true }
    ],
    seo: {
        title: "Dental Clinic | Best Dentist in Your City",
        description: "Expert dental care with years of clinical excellence. Book your appointment today.",
        keywords: "dentist, dental clinic, dental care, implants, cosmetic dentistry",
        ogTitle: "Dental Clinic | Best Dentist",
        ogDescription: "Expert dental care with years of clinical excellence.",
        ogImage: ""
    },
    formspree: {
        id: "",
        nameRequired: true,
        phoneRequired: true,
        serviceDropdown: true
    },
    images: {
        logo: "",
        favicon: "",
        hero: "",
        doctor: ""
    }
};

// Initialize Data
function initData() {
    if (!localStorage.getItem('dentalWebsiteData')) {
        localStorage.setItem('dentalWebsiteData', JSON.stringify(DEFAULT_DATA));
    }
    return JSON.parse(localStorage.getItem('dentalWebsiteData'));
}

// Get Data
function getData() {
    return JSON.parse(localStorage.getItem('dentalWebsiteData')) || DEFAULT_DATA;
}

// Save Data
function saveData(data) {
    localStorage.setItem('dentalWebsiteData', JSON.stringify(data));
}

// Apply Colors
function applyColors(colors) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
}

// Render Services
function renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    
    grid.innerHTML = services.map(service => `
        <div class="service-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 scroll-reveal">
            <div class="service-icon w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl text-primary mb-6 transition-transform duration-300">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition">${service.title}</h3>
            <p class="text-gray-600 mb-4">${service.description}</p>
            <a href="https://wa.me/${getData().general.whatsapp}?text=Hi, I want to know about ${encodeURIComponent(service.title)}" 
               class="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Enquire Now <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// Render Reviews
function renderReviews(reviews) {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;
    
    grid.innerHTML = reviews.map(review => `
        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 scroll-reveal">
            <div class="flex items-center gap-1 mb-4 text-yellow-400">
                ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                ${Array(5 - review.rating).fill('<i class="far fa-star"></i>').join('')}
            </div>
            <p class="text-gray-600 mb-4 italic">"${review.text}"</p>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    ${review.name.charAt(0)}
                </div>
                <div>
                    <p class="font-semibold text-gray-800">${review.name}</p>
                    <p class="text-xs text-gray-500">Verified Patient</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Social Links
function renderSocial(socialLinks) {
    const container = document.getElementById('social-links');
    const footerContainer = document.getElementById('footer-social');
    
    const visibleLinks = socialLinks.filter(link => link.visible);
    
    const getIcon = (platform) => {
        const icons = {
            whatsapp: 'fab fa-whatsapp',
            facebook: 'fab fa-facebook-f',
            instagram: 'fab fa-instagram',
            linkedin: 'fab fa-linkedin-in',
            youtube: 'fab fa-youtube',
            twitter: 'fab fa-twitter',
            google: 'fab fa-google',
            justdial: 'fas fa-phone'
        };
        return icons[platform] || 'fas fa-link';
    };
    
    const getColor = (platform) => {
        const colors = {
            whatsapp: 'bg-green-500 hover:bg-green-600',
            facebook: 'bg-blue-600 hover:bg-blue-700',
            instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
            linkedin: 'bg-blue-700 hover:bg-blue-800',
            youtube: 'bg-red-600 hover:bg-red-700',
            twitter: 'bg-gray-800 hover:bg-gray-900',
            google: 'bg-red-500 hover:bg-red-600',
            justdial: 'bg-blue-500 hover:bg-blue-600'
        };
        return colors[platform] || 'bg-gray-600 hover:bg-gray-700';
    };
    
    const html = visibleLinks.map(link => `
        <a href="${link.url}" target="_blank" 
           class="social-icon w-12 h-12 ${getColor(link.platform)} rounded-full flex items-center justify-center text-white text-lg shadow-lg">
            <i class="${getIcon(link.platform)}"></i>
        </a>
    `).join('');
    
    if (container) container.innerHTML = html;
    if (footerContainer) footerContainer.innerHTML = html;
}

// Populate Service Select
function populateServiceSelect(services) {
    const select = document.getElementById('service-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select a Service</option>' + 
        services.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
}

// Update All Content
function updateContent() {
    const data = getData();
    
    // Apply colors
    applyColors(data.appearance);
    
    // Update text content
    const elements = {
        'clinic-name': data.general.clinicName,
        'footer-clinic-name': data.general.clinicName,
        'footer-copyright-name': data.general.clinicName,
        'doctor-title': data.general.doctorTitle,
        'footer-doctor-title': data.general.doctorTitle,
        'doctor-name': data.general.doctorName,
        'clinic-address': `<i class="fas fa-map-marker-alt mr-2"></i>${data.general.address}`,
        'contact-address': data.general.address,
        'footer-address': data.general.address,
        'top-phone': `<i class="fas fa-phone mr-2"></i>${data.general.phone}`,
        'contact-phone-number': data.general.phone,
        'contact-whatsapp-number': data.general.phone,
        'footer-phone': data.general.phone,
        'contact-email': data.general.email,
        'contact-timings': data.general.timings,
        'footer-timings': data.general.timings,
        'experience-badge': `<i class="fas fa-medal mr-2 text-yellow-400"></i>${data.general.experience} Years Experience`,
        'hero-badge': `${data.general.experience} Years of Clinical Excellence`,
        'exp-years': data.general.experience,
        'doctor-bio': data.general.bio,
        'footer-description': `Dedicated to providing exceptional dental care by ${data.general.doctorName}.`,
        'footer-year': new Date().getFullYear()
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = value;
    });
    
    // Update links
    const links = {
        'nav-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'mobile-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'hero-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'about-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'contact-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'float-whatsapp': `https://wa.me/${data.general.whatsapp}`,
        'hero-call': `tel:${data.general.phone}`,
        'mobile-call': `tel:${data.general.phone}`,
        'contact-call': `tel:${data.general.phone}`,
        'float-call': `tel:${data.general.phone}`,
        'top-phone': `tel:${data.general.phone}`
    };
    
    Object.entries(links).forEach(([id, url]) => {
        const el = document.getElementById(id);
        if (el) el.href = url;
    });
    
    // Update SEO
    document.title = data.seo.title;
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.content = data.seo.description;
    const metaKeywords = document.getElementById('meta-keywords');
    if (metaKeywords) metaKeywords.content = data.seo.keywords;
    
    // Update images
    if (data.images.logo) {
        const logoImg = document.getElementById('logo-img');
        const logoIcon = document.getElementById('logo-icon');
        if (logoImg) {
            logoImg.src = data.images.logo;
            logoImg.classList.remove('hidden');
            if (logoIcon) logoIcon.classList.add('hidden');
        }
    }
    
    if (data.images.favicon) {
        const favicon = document.getElementById('favicon-link');
        if (favicon) favicon.href = data.images.favicon;
    }
    
    if (data.images.hero) {
        const heroImg = document.getElementById('hero-image');
        if (heroImg) heroImg.src = data.images.hero;
    }
    
    if (data.images.doctor) {
        const doctorImg = document.getElementById('doctor-image');
        if (doctorImg) doctorImg.src = data.images.doctor;
    }
    
    // Update map
    const map = document.getElementById('clinic-map');
    if (map && data.general.mapUrl) map.src = data.general.mapUrl;
    
    // Render dynamic content
    renderServices(data.services);
    renderReviews(data.reviews);
    renderSocial(data.social);
    populateServiceSelect(data.services);
    
    // Setup Formspree
    setupFormspree(data.formspree);
}

// Setup Formspree
function setupFormspree(formspreeConfig) {
    const form = document.getElementById('appointment-form');
    if (!form || !formspreeConfig.id) return;
    
    form.action = `https://formspree.io/f/${formspreeConfig.id}`;
    form.method = 'POST';
    
    // Handle submit
    form.onsubmit = async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Sorry, there was an error. Please try again or contact us directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    };
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Scroll Reveal Observer
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateContent();
    initScrollReveal();
    initNavbar();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.getElementById('mobileMenu')?.classList.add('hidden');
            }
        });
    });
});
