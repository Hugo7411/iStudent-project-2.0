// ============================================
//  NEXUS TECH — Shared JS (cart, bg, utils)
// ============================================

// ---- Cart Storage ----
const Cart = {
    get() {
        try { return JSON.parse(localStorage.getItem('nexus_cart')) || []; }
        catch { return []; }
    },
    save(items) {
        localStorage.setItem('nexus_cart', JSON.stringify(items));
        Cart.updateBadge();
    },
    add(product) {
        const items = Cart.get();
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            items.push({ ...product, qty: 1 });
        }
        Cart.save(items);
        showToast(`${product.name} added to cart`);
        Cart.animateBadge();
    },
    remove(id) {
        const items = Cart.get().filter(i => i.id !== id);
        Cart.save(items);
    },
    updateQty(id, qty) {
        const items = Cart.get();
        const item = items.find(i => i.id === id);
        if (item) {
            item.qty = qty;
            if (item.qty <= 0) return Cart.remove(id);
        }
        Cart.save(items);
    },
    total() {
        return Cart.get().reduce((s, i) => s + i.price * i.qty, 0);
    },
    count() {
        return Cart.get().reduce((s, i) => s + i.qty, 0);
    },
    updateBadge() {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            const c = Cart.count();
            badge.textContent = c;
            badge.style.display = c > 0 ? 'flex' : 'none';
        }
    },
    animateBadge() {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.classList.remove('bump');
            void badge.offsetWidth;
            badge.classList.add('bump');
        }
    }
};

// ---- Toast ----
function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = type === 'success' ? 'var(--success)' : 'var(--accent)';
    toast.innerHTML = `<span style="margin-right:8px">${type === 'success' ? '✓' : 'ℹ'}</span>${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('out');
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}

// ---- Add to Cart Button ----
function initAddToCartButtons() {
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price),
                category: btn.dataset.category || '',
                emoji: btn.dataset.emoji || '📦'
            };
            Cart.add(product);
            const orig = btn.innerHTML;
            btn.classList.add('btn-added');
            btn.innerHTML = '✓ Added';
            setTimeout(() => {
                btn.classList.remove('btn-added');
                btn.innerHTML = orig;
            }, 1500);
        });
    });
}

// ---- Background Particle Effect ----
function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const NUM_PARTICLES = 70;
    const particles = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            hue: Math.random() < 0.6 ? 214 : 262 // blue or purple
        });
    }

    const MAX_DIST = 130;

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const opacity = (1 - dist / MAX_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(${particles[i].hue}, 70%, 65%, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
            if (p.y < -10) p.y = H + 10;
            if (p.y > H + 10) p.y = -10;
        });

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });
}

// ---- Nav Active State ----
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href').split('/').pop();
        a.classList.toggle('active', href === path);
    });
}

// ---- On DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    Cart.updateBadge();
    setActiveNav();
    initAddToCartButtons();
});