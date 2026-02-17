// PABLOR Portfolio App - Gestión de galería, carrito y pagos

const APP = {
    data: null,
    cart: [],
    currentFilter: 'all',
    
    // Inicializar app
    async init() {
        try {
            const response = await fetch('/data.json');
            this.data = await response.json();
            
            // Cargar carrito desde localStorage
            const saved = localStorage.getItem('pablor_cart');
            this.cart = saved ? JSON.parse(saved) : [];
            
            // Track visitantes
            this.trackVisit();
            
            // Renderizar
            this.renderGallery();
            this.updateCartUI();
            this.updateStats();
            
            // Event listeners
            this.setupEventListeners();
        } catch (e) {
            console.error('Error loading data:', e);
        }
    },
    
    // Track visits
    trackVisit() {
        const visits = localStorage.getItem('pablor_visits') || 0;
        localStorage.setItem('pablor_visits', parseInt(visits) + 1);
        localStorage.setItem('pablor_last_visit', new Date().toISOString());
    },
    
    // Renderizar galería
    renderGallery() {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        
        // Limpiar excepto el cartel "Próximamente"
        const works = this.filterWorks();
        let html = '';
        
        works.forEach(work => {
            html += this.createWorkCard(work);
        });
        
        // Agregar cartel próximamente
        html += `
            <div class="art-card opacity-40 border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:transform-none">
                <svg class="w-12 h-12 text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span class="text-xs tracking-[0.3em] uppercase text-white/50">Próximamente</span>
                <p class="text-xs text-white/30 mt-2 text-center px-4">Nuevas obras en proceso</p>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    // Crear tarjeta de obra
    createWorkCard(work) {
        const hasBadgeColor = work.category === 'urbano' ? 'BLOR' : work.category.toUpperCase();
        const badgeClass = work.category === 'urbano' ? 'bg-[#ff6b35] text-white' : 
                          work.category === 'digital' ? 'bg-[var(--neon-blue)] text-[var(--deep-navy)]' :
                          'bg-[var(--electric-purple)] text-white';
        
        return `
            <div class="art-card ${work.category}" onclick="APP.openLightbox('${work.image}', '${work.title}', '${work.description}')">
                <div class="art-card-badge ${badgeClass}">${hasBadgeColor}</div>
                <picture>
                    <source srcset="${work.imageWebp}" type="image/webp">
                    <img src="${work.image}" alt="${work.title}" loading="lazy" width="400" height="400" class="w-full h-full object-cover">
                </picture>
                <div class="p-4">
                    <h3 class="font-bold text-white mb-1">${work.title}</h3>
                    <p class="text-xs text-gray-400">${work.location}, ${work.date}</p>
                    ${work.price > 0 ? `<p class="text-[#ff6b35] font-bold mt-2">$${work.price.toLocaleString()}</p>` : ''}
                </div>
            </div>
        `;
    },
    
    // Filtrar obras
    filterWorks() {
        if (this.currentFilter === 'all') {
            return this.data.works.sort((a, b) => a.order - b.order);
        }
        return this.data.works
            .filter(w => w.category === this.currentFilter)
            .sort((a, b) => a.order - b.order);
    },
    
    // Lightbox
    openLightbox(image, title, description) {
        const lightbox = document.getElementById('lightbox');
        document.getElementById('lightbox-image').src = image;
        document.getElementById('lightbox-title').textContent = title;
        document.getElementById('lightbox-description').textContent = description;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    },
    
    // Filtro de galería
    filterGallery(category) {
        this.currentFilter = category;
        
        // Actualizar botones
        document.querySelectorAll('[onclick*="filterGallery"]').forEach(btn => {
            btn.classList.remove('bg-[var(--neon-blue)]', 'text-[var(--deep-navy)]', 'active');
            btn.classList.add('bg-white/5', 'text-white');
        });
        event.target.classList.add('bg-[var(--neon-blue)]', 'text-[var(--deep-navy)]', 'active');
        
        this.renderGallery();
    },
    
    // Carrito
    addToCart(productId, quantity = 1) {
        const product = this.data.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }
        
        this.saveCart();
        this.updateCartUI();
        alert(`✓ ${product.title} agregado al carrito`);
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    },
    
    saveCart() {
        localStorage.setItem('pablor_cart', JSON.stringify(this.cart));
    },
    
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) cartCount.textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => {
                const price = item.currency === 'ETH' ? 0 : (item.price || 0);
                return sum + (price * item.quantity);
            }, 0);
            cartTotal.textContent = `$${total.toLocaleString()}`;
        }
        
        // Renderizar items del carrito
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div>
                        <h4 class="font-bold">${item.title}</h4>
                        <p class="text-sm text-gray-400">x${item.quantity}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-[#ff6b35]">${item.currency === 'ETH' ? item.price + ' ETH' : '$' + (item.price * item.quantity).toLocaleString()}</p>
                        <button onclick="APP.removeFromCart('${item.id}')" class="text-red-500 text-xs hover:text-red-400">
                            Eliminar
                        </button>
                    </div>
                </div>
            `).join('');
        }
    },
    
    // Checkout Stripe
    async checkout() {
        if (this.cart.length === 0) {
            alert('Agrega productos al carrito primero');
            return;
        }
        
        // Calcular total (solo productos en COP)
        const total = this.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity || 0);
        }, 0);
        
        if (total === 0) {
            alert('Los productos en criptomonedas no pueden pagarse aquí. Contacta para OpenSea.');
            return;
        }
        
        // Aquí iría la integración real con Stripe
        // Por ahora, mostrar mensaje
        alert(`Total a pagar: $${total.toLocaleString()} COP\n\nIntegración Stripe disponible pronto. Contacta para más detalles.`);
    },
    
    // Estadísticas
    updateStats() {
        const visitas = localStorage.getItem('pablor_visits') || 0;
        const statsEl = document.getElementById('stats-visits');
        if (statsEl) statsEl.textContent = visitas;
    },
    
    // Event listeners
    setupEventListeners() {
        // Cerrar lightbox
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.add('hidden');
                    lightbox.classList.remove('flex');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Compartir en redes
        window.shareOnSocial = function(platform) {
            const url = window.location.href;
            const title = 'Descubre el arte de PABLOR/BLOR - Muralismo & Arte Digital';
            const links = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                whatsapp: `https://wa.me/?text=${title} ${url}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
            };
            window.open(links[platform], '_blank', 'width=600,height=400');
        };
    }
};

// Cargar app cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    APP.init();
});

// Función global para lightbox (compatible con HTML existente)
function openLightbox(image, title, description) {
    APP.openLightbox(image, title, description);
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.getElementById('lightbox').classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function filterGallery(category) {
    APP.filterGallery(category);
}

// Funciones de carrito
function addToCart(productId) {
    APP.addToCart(productId);
}

function checkout() {
    APP.checkout();
}

// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cerrar menú al hacer click en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});
