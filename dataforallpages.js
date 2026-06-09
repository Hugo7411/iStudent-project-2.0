// ============================================
//  NEXUS TECH — Product & Game Data
// ============================================

const PRODUCTS = [
    {
        id: 'p01',
        category: 'Graphics Card',
        name: 'NVIDIA GeForce RTX 5090',
        desc: '32GB GDDR7, 21,760 CUDA cores. The fastest GPU ever made for consumers.',
        price: 1999.99,
        emoji: '🎮',
        badge: 'New'
    },
    {
        id: 'p02',
        category: 'Graphics Card',
        name: 'AMD Radeon RX 9070 XT',
        desc: '16GB GDDR6, RDNA 4 architecture. Outstanding 4K gaming performance.',
        price: 599.99,
        emoji: '🔴',
        badge: 'New'
    },
    {
        id: 'p03',
        category: 'Processor',
        name: 'Intel Core Ultra 9 285K',
        desc: '24 cores (8P+16E), 5.7GHz boost. Arrow Lake flagship processor.',
        price: 589.99,
        emoji: '⚡',
        badge: null
    },
    {
        id: 'p04',
        category: 'Processor',
        name: 'AMD Ryzen 9 9950X',
        desc: '16 cores, 32 threads, 5.7GHz boost. Zen 5 architecture powerhouse.',
        price: 649.99,
        emoji: '🔥',
        badge: 'Hot'
    },
    {
        id: 'p05',
        category: 'Motherboard',
        name: 'ASUS ROG Maximus Z890 Apex',
        desc: 'LGA1851, DDR5-9000+, PCIe 5.0 x16. Built for extreme overclocking.',
        price: 799.99,
        emoji: '🛠️',
        badge: null
    },
    {
        id: 'p06',
        category: 'Memory',
        name: 'G.Skill Trident Z5 RGB DDR5-7200',
        desc: '32GB (2x16GB) DDR5-7200 CL34. The fastest gaming RAM available.',
        price: 189.99,
        emoji: '💾',
        badge: null
    },
    {
        id: 'p07',
        category: 'Storage',
        name: 'Samsung 990 Pro 4TB NVMe',
        desc: 'PCIe 4.0, 7,450 MB/s read. Massive capacity meets extreme speed.',
        price: 299.99,
        emoji: '💿',
        badge: null
    },
    {
        id: 'p08',
        category: 'Cooling',
        name: 'Corsair iCUE H170i Elite 420mm',
        desc: '420mm AIO liquid cooler. Three 140mm fans, iCUE RGB control.',
        price: 249.99,
        emoji: '❄️',
        badge: null
    },
    {
        id: 'p09',
        category: 'Power Supply',
        name: 'Seasonic PRIME TX-1300W',
        desc: '1300W, 80+ Titanium, fully modular. Built for RTX 5090 builds.',
        price: 319.99,
        emoji: '🔌',
        badge: null
    },
    {
        id: 'p10',
        category: 'Case',
        name: 'Lian Li O11 Dynamic EVO XL',
        desc: 'Full-tower, dual-chamber, 14 fan slots. The ultimate showcase case.',
        price: 219.99,
        emoji: '🖥️',
        badge: 'Popular'
    }
];

const GAMES = [
    {
        id: 'g01',
        category: 'GOTY 2025',
        name: 'Black Myth: Wukong',
        desc: 'An action RPG based on Chinese mythology. Stunning visuals and brutal combat.',
        price: 59.99,
        emoji: '🐒',
        badge: 'GOTY 2025'
    },
    {
        id: 'g02',
        category: 'GOTY 2024',
        name: 'Astro Bot',
        desc: 'A love letter to PlayStation history. Joyful platforming perfected.',
        price: 59.99,
        emoji: '🤖',
        badge: 'GOTY 2024'
    },
    {
        id: 'g03',
        category: 'GOTY 2023',
        name: 'Baldur\'s Gate 3',
        desc: 'The definitive RPG of a generation. Choices that truly matter.',
        price: 59.99,
        emoji: '⚔️',
        badge: 'GOTY 2023'
    },
    {
        id: 'g04',
        category: 'GOTY 2022',
        name: 'Elden Ring',
        desc: 'FromSoftware\'s open-world masterpiece. Unrelenting, beautiful, unforgettable.',
        price: 59.99,
        emoji: '💀',
        badge: 'GOTY 2022'
    },
    {
        id: 'g05',
        category: 'GOTY 2021',
        name: 'It Takes Two',
        desc: 'The best co-op game ever made. Hazelight\'s genre-defying adventure.',
        price: 39.99,
        emoji: '🤝',
        badge: 'GOTY 2021'
    },
    {
        id: 'g06',
        category: 'GOTY 2020',
        name: 'The Last of Us Part II',
        desc: 'A harrowing, unflinching story told through flawless gameplay.',
        price: 39.99,
        emoji: '🌿',
        badge: 'GOTY 2020'
    },
    {
        id: 'g07',
        category: 'GOTY 2019',
        name: 'Death Stranding',
        desc: 'Hideo Kojima\'s post-apocalyptic delivery epic. Unlike anything else.',
        price: 29.99,
        emoji: '📦',
        badge: 'GOTY 2019'
    },
    {
        id: 'g08',
        category: 'GOTY 2018',
        name: 'God of War (2018)',
        desc: 'Kratos and Atreus journey through Norse mythology. A masterpiece.',
        price: 29.99,
        emoji: '🪓',
        badge: 'GOTY 2018'
    },
    {
        id: 'g09',
        category: 'GOTY 2017',
        name: 'The Legend of Zelda: BotW',
        desc: 'Nintendo redefined open-world adventure. Freedom and wonder at every turn.',
        price: 59.99,
        emoji: '🗡️',
        badge: 'GOTY 2017'
    },
    {
        id: 'g10',
        category: 'GOTY 2016',
        name: 'Overwatch',
        desc: 'Blizzard\'s hero shooter changed multiplayer gaming forever.',
        price: 19.99,
        emoji: '🎯',
        badge: 'GOTY 2016'
    }
];

// Card builder utility
function buildProductCard(item, pathPrefix = '') {
    const badgeHtml = item.badge
        ? `<span class="product-badge">${item.badge}</span>`
        : '';
    return `
    <div class="product-card">
      <div class="product-card-image">
        <div class="product-emoji">${item.emoji}</div>
        ${badgeHtml}
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${item.category}</span>
        <div class="product-card-name">${item.name}</div>
        <div class="product-card-desc">${item.desc}</div>
      </div>
      <div class="product-card-footer">
        <span class="product-price">R${(item.price * 18.5).toFixed(2)}</span>
        <button class="btn btn-primary" data-add-cart
          data-id="${item.id}"
          data-name="${item.name}"
          data-price="${(item.price * 18.5).toFixed(2)}"
          data-category="${item.category}"
          data-emoji="${item.emoji}">
          + Add to Cart
        </button>
      </div>
    </div>
  `;
}