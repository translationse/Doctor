// Admin Panel JavaScript

const ADMIN_PASSWORD = 'admin123'; // Change this in production
let currentData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    loadData();
    initEventListeners();
});

// Check Login Status
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminPanel();
    }
}

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        showToast('Login successful!', 'success');
    } else {
        showToast('Incorrect password!', 'error');
    }
});

// Show Admin Panel
function showAdminPanel() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    loadAllSections();
}

// Logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
}

// Toggle Password Visibility
function togglePassword() {
    const input = document.getElementById('admin-password');
    const icon = document.getElementById('password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Load Data
function loadData() {
    const stored = localStorage.getItem('dentalWebsiteData');
    currentData = stored ? JSON.parse(stored) : getDefaultData();
}

// Get Default Data
function getDefaultData() {
    return {
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
            mapUrl: ""
        },
        appearance: {
            primary: "#0891B2",
            secondary: "#0D9488",
            accent: "#EA580C"
        },
        services: [
            { id: 1, title: "Routine Check-ups", description: "Regular examinations and cleanings", icon: "fa-stethoscope" },
            { id: 2, title: "Dental Implants", description: "Permanent tooth replacement", icon: "fa-tooth" }
        ],
        reviews: [
            { id: 1, name: "John Doe", rating: 5, text: "Excellent service!" }
        ],
        social: [
            { id: 1, platform: "whatsapp", url: "https://wa.me/919999999999", visible: true }
        ],
        seo: {
            title: "Dental Clinic | Best Dentist",
            description: "Expert dental care with years of experience",
            keywords: "dentist, dental clinic",
            ogTitle: "",
            ogDescription: "",
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
}

// Save Data
function saveData() {
    localStorage.setItem('dentalWebsiteData', JSON.stringify(currentData));
    showToast('Changes saved successfully!');
}

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));
    
    // Show selected
    const selected = document.getElementById(`section-${sectionName}`);
    if (selected) {
        selected.classList.remove('hidden');
        selected.classList.add('animate-fadeIn');
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-primary/10', 'text-primary');
        btn.classList.add('text-gray-700');
    });
    
    event.target.closest('button')?.classList.add('bg-primary/10', 'text-primary');
    event.target.closest('button')?.classList.remove('text-gray-700');
    
    // Load section data
    if (sectionName === 'services') loadServices();
    if (sectionName === 'reviews') loadReviews();
    if (sectionName === 'social') loadSocial();
    if (sectionName === 'images') loadImages();
}

// Load All Sections
function loadAllSections() {
    loadGeneralSettings();
    loadAppearance();
    loadSEO();
    loadFormSettings();
    updateDashboard();
}

// Dashboard
function updateDashboard() {
    document.getElementById('dash-service-count').textContent = currentData.services.length;
    document.getElementById('dash-review-count').textContent = currentData.reviews.length;
    document.getElementById('dash-social-count').textContent = currentData.social.filter(s => s.visible).length;
}

// General Settings
function loadGeneralSettings() {
    const g = currentData.general;
    document.getElementById('setting-clinic-name').value = g.clinicName || '';
    document.getElementById('setting-doctor-name').value = g.doctorName || '';
    document.getElementById('setting-doctor-title').value = g.doctorTitle || '';
    document.getElementById('setting-experience').value = g.experience || '';
    document.getElementById('setting-address').value = g.address || '';
    document.getElementById('setting-phone').value = g.phone || '';
    document.getElementById('setting-whatsapp').value = g.whatsapp || '';
    document.getElementById('setting-email').value = g.email || '';
    document.getElementById('setting-timings').value = g.timings || '';
    document.getElementById('setting-bio').value = g.bio || '';
    document.getElementById('setting-map').value = g.mapUrl || '';
}

function saveGeneralSettings() {
    currentData.general = {
        clinicName: document.getElementById('setting-clinic-name').value,
        doctorName: document.getElementById('setting-doctor-name').value,
        doctorTitle: document.getElementById('setting-doctor-title').value,
        experience: document.getElementById('setting-experience').value,
        address: document.getElementById('setting-address').value,
        phone: document.getElementById('setting-phone').value,
        whatsapp: document.getElementById('setting-whatsapp').value,
        email: document.getElementById('setting-email').value,
        timings: document.getElementById('setting-timings').value,
        bio: document.getElementById('setting-bio').value,
        mapUrl: document.getElementById('setting-map').value
    };
    saveData();
}

// Appearance
function loadAppearance() {
    const a = currentData.appearance;
    document.getElementById('color-primary').value = a.primary;
    document.getElementById('color-primary-text').value = a.primary;
    document.getElementById('color-secondary').value = a.secondary;
    document.getElementById('color-secondary-text').value = a.secondary;
    document.getElementById('color-accent').value = a.accent;
    document.getElementById('color-accent-text').value = a.accent;
    updateColorPreview();
}

function updateColorPreview() {
    const primary = document.getElementById('color-primary').value;
    const secondary = document.getElementById('color-secondary').value;
    const accent = document.getElementById('color-accent').value;
    
    document.getElementById('preview-primary').style.backgroundColor = primary;
    document.getElementById('preview-secondary').style.backgroundColor = secondary;
    document.getElementById('preview-accent').style.backgroundColor = accent;
}

function saveAppearance() {
    currentData.appearance = {
        primary: document.getElementById('color-primary').value,
        secondary: document.getElementById('color-secondary').value,
        accent: document.getElementById('color-accent').value
    };
    saveData();
}

function applyPreset(preset) {
    const presets = {
        blue: { primary: '#0891B2', secondary: '#0D9488', accent: '#EA580C' },
        green: { primary: '#059669', secondary: '#10B981', accent: '#F59E0B' },
        purple: { primary: '#7C3AED', secondary: '#8B5CF6', accent: '#EC4899' },
        red: { primary: '#DC2626', secondary: '#EF4444', accent: '#F59E0B' },
        orange: { primary: '#EA580C', secondary: '#F97316', accent: '#0891B2' },
        teal: { primary: '#0D9488', secondary: '#14B8A6', accent: '#F59E0B' }
    };
    
    const colors = presets[preset];
    document.getElementById('color-primary').value = colors.primary;
    document.getElementById('color-primary-text').value = colors.primary;
    document.getElementById('color-secondary').value = colors.secondary;
    document.getElementById('color-secondary-text').value = colors.secondary;
    document.getElementById('color-accent').value = colors.accent;
    document.getElementById('color-accent-text').value = colors.accent;
    updateColorPreview();
}

// Services
function loadServices() {
    const list = document.getElementById('services-list');
    list.innerHTML = currentData.services.map((service, index) => `
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <i class="fas ${service.icon}"></i>
            </div>
            <div class="flex-1">
                <h4 class="font-semibold">${service.title}</h4>
                <p class="text-sm text-gray-600">${service.description}</p>
            </div>
            <button onclick="deleteService(${index})" class="w-10 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function addService() {
    const title = document.getElementById('new-service-title').value;
    const desc = document.getElementById('new-service-desc').value;
    const icon = document.getElementById('new-service-icon').value;
    
    if (!title || !desc) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    currentData.services.push({
        id: Date.now(),
        title,
        description: desc,
        icon
    });
    
    document.getElementById('new-service-title').value = '';
    document.getElementById('new-service-desc').value = '';
    
    saveData();
    loadServices();
    updateDashboard();
}

function deleteService(index) {
    if (confirm('Delete this service?')) {
        currentData.services.splice(index, 1);
        saveData();
        loadServices();
        updateDashboard();
    }
}

// Reviews
function loadReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = currentData.reviews.map((review, index) => `
        <div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-semibold">${review.name}</h4>
                    <div class="text-yellow-400 text-sm">
                        ${Array(parseInt(review.rating)).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                </div>
                <button onclick="deleteReview(${index})" class="w-8 h-8 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
            <p class="text-sm text-gray-600 italic">"${review.text}"</p>
        </div>
    `).join('');
}

function addReview() {
    const name = document.getElementById('new-review-name').value;
    const rating = document.getElementById('new-review-rating').value;
    const text = document.getElementById('new-review-text').value;
    
    if (!name || !text) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    currentData.reviews.push({
        id: Date.now(),
        name,
        rating: parseInt(rating),
        text
    });
    
    document.getElementById('new-review-name').value = '';
    document.getElementById('new-review-text').value = '';
    
    saveData();
    loadReviews();
    updateDashboard();
}

function deleteReview(index) {
    if (confirm('Delete this review?')) {
        currentData.reviews.splice(index, 1);
        saveData();
        loadReviews();
        updateDashboard();
    }
}

// Social Media
function loadSocial() {
    const list = document.getElementById('social-list');
    list.innerHTML = currentData.social.map((link, index) => `
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary capitalize">
                <i class="fab fa-${link.platform === 'custom' ? 'link' : link.platform}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold capitalize">${link.platform}</p>
                <p class="text-sm text-gray-600 truncate">${link.url}</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" ${link.visible ? 'checked' : ''} onchange="toggleSocialVisible(${index})" class="w-5 h-5 text-primary rounded">
                <span class="text-sm text-gray-600">Show</span>
            </label>
            <button onclick="deleteSocial(${index})" class="w-8 h-8 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                <i class="fas fa-trash text-sm"></i>
            </button>
        </div>
    `).join('');
}

function addSocial() {
    const platform = document.getElementById('new-social-platform').value;
    const url = document.getElementById('new-social-url').value;
    const visible = document.getElementById('new-social-visible').checked;
    
    if (!url) {
        showToast('Please enter URL', 'error');
        return;
    }
    
    currentData.social.push({
        id: Date.now(),
        platform,
        url,
        visible
    });
    
    document.getElementById('new-social-url').value = '';
    
    saveData();
    loadSocial();
    updateDashboard();
}

function toggleSocialVisible(index) {
    currentData.social[index].visible = !currentData.social[index].visible;
    saveData();
    loadSocial();
    updateDashboard();
}

function deleteSocial(index) {
    if (confirm('Delete this social link?')) {
        currentData.social.splice(index, 1);
        saveData();
        loadSocial();
        updateDashboard();
    }
}

// SEO
function loadSEO() {
    const s = currentData.seo;
    document.getElementById('seo-title').value = s.title || '';
    document.getElementById('seo-description').value = s.description || '';
    document.getElementById('seo-keywords').value = s.keywords || '';
    document.getElementById('seo-og-title').value = s.ogTitle || '';
    document.getElementById('seo-og-description').value = s.ogDescription || '';
    document.getElementById('seo-og-image').value = s.ogImage || '';
}

function saveSEO() {
    currentData.seo = {
        title: document.getElementById('seo-title').value,
        description: document.getElementById('seo-description').value,
        keywords: document.getElementById('seo-keywords').value,
        ogTitle: document.getElementById('seo-og-title').value,
        ogDescription: document.getElementById('seo-og-description').value,
        ogImage: document.getElementById('seo-og-image').value
    };
    saveData();
}

// Form Settings
function loadFormSettings() {
    const f = currentData.formspree;
    document.getElementById('formspree-id').value = f.id || '';
    document.getElementById('form-name-required').checked = f.nameRequired;
    document.getElementById('form-phone-required').checked = f.phoneRequired;
    document.getElementById('form-service-dropdown').checked = f.serviceDropdown;
}

function saveFormSettings() {
    currentData.formspree = {
        id: document.getElementById('formspree-id').value,
        nameRequired: document.getElementById('form-name-required').checked,
        phoneRequired: document.getElementById('form-phone-required').checked,
        serviceDropdown: document.getElementById('form-service-dropdown').checked
    };
    saveData();
}

// Images
function loadImages() {
    const types = ['logo', 'favicon', 'hero', 'doctor'];
    types.forEach(type => {
        const img = currentData.images[type];
        const preview = document.getElementById(`preview-${type}`);
        const placeholder = document.getElementById(`placeholder-${type}`);
        
        if (img) {
            preview.src = img;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
        } else {
            preview.classList.add('hidden');
            placeholder.classList.remove('hidden');
        }
    });
}

function handleImageUpload(type, input) {
    const file = input.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
        showToast('Image too large! Max 2MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        currentData.images[type] = e.target.result;
        saveData();
        loadImages();
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded!`);
    };
    reader.readAsDataURL(file);
}

function removeImage(type) {
    currentData.images[type] = '';
    saveData();
    loadImages();
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`);
}

// Export/Import
function exportData() {
    const dataStr = JSON.stringify(currentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dental-website-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
}

function importData() {
    document.getElementById('import-file').click();
}

function handleImport(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            currentData = data;
            saveData();
            loadAllSections();
            showToast('Data imported successfully!');
        } catch (err) {
            showToast('Invalid file format!', 'error');
        }
    };
    reader.readAsText(file);
}

function resetData() {
    if (confirm('WARNING: This will reset ALL data to default. Continue?')) {
        currentData = getDefaultData();
        saveData();
        loadAllSections();
        showToast('Data reset to default');
    }
}

// Mobile Sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('mobile-sidebar');
    sidebar.classList.toggle('hidden');
}

// Toast Notification
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event Listeners
function initEventListeners() {
    // Color inputs sync
    ['primary', 'secondary', 'accent'].forE
