// ============================================
//  HOME PAGE — Slider + Featured Items
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Hero Slider ----
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let current = 0;
    const total = document.querySelectorAll('.slide').length;
    let autoTimer;
    let progressEl;

    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        resetProgress();
    }

    function resetProgress() {
        if (progressEl) progressEl.remove();
        progressEl = document.createElement('div');
        progressEl.className = 'slider-progress';
        document.getElementById('heroSlider').appendChild(progressEl);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 6000);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.idx); startAuto(); }));

    goTo(0);
    startAuto();

    // ---- Featured Products (3 items) ----
    const prodContainer = document.getElementById('homeFeaturedProducts');
    if (prodContainer) {
        const featured = [PRODUCTS[0], PRODUCTS[3], PRODUCTS[6]]; // RTX5090, Ryzen 9950X, Samsung SSD
        prodContainer.innerHTML = featured.map(p => buildProductCard(p)).join('');
        initAddToCartButtons();
    }

    // ---- Featured Games (3 items) ----
    const gamesContainer = document.getElementById('homeFeaturedGames');
    if (gamesContainer) {
        const featured = [GAMES[0], GAMES[1], GAMES[2]]; // Wukong, Astro Bot, BG3
        gamesContainer.innerHTML = featured.map(g => buildProductCard(g)).join('');
        initAddToCartButtons();
    }

});