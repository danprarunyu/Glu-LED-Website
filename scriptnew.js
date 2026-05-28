document.addEventListener("DOMContentLoaded", function () {

    /* ══════════════════════════════════════
       HAMBURGER
    ══════════════════════════════════════ */
    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    menuBtn.addEventListener('click', () => navList.classList.toggle('active'));
    document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => navList.classList.remove('active')));


    /* ══════════════════════════════════════
       FADE IN
    ══════════════════════════════════════ */
    const fadeObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));


    /* ══════════════════════════════════════
       STATS COUNTER
    ══════════════════════════════════════ */
    const statCards = document.querySelectorAll('.stat-card');
    const statObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.done) {
                e.target.dataset.done = '1';
                e.target.classList.add('animated');
                const rawTarget = e.target.dataset.target.trim();
                const target = parseInt(rawTarget.replace(/[^0-9]/g, ''), 10);
                if (isNaN(target)) return;
                const countEl = e.target.querySelector('.count');
                const unitEl  = e.target.querySelector('.unit');
                if (unitEl) unitEl.textContent = e.target.dataset.suffix || '';
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 60));
                const iv = setInterval(() => {
                    current = Math.min(current + step, target);
                    countEl.textContent = current.toLocaleString();
                    if (current >= target) clearInterval(iv);
                }, 25);
            }
        });
    }, { threshold: 0.3 });
    statCards.forEach(c => statObs.observe(c));


    /* ══════════════════════════════════════
       PORTFOLIO
       *** แก้ไขข้อมูลผลงานจริงตรงนี้ ***
    ══════════════════════════════════════ */
    const projects = [
        { name: ' โรงเรียนวินิตคึกษา',          cat: 'outdoor', size: '200 * 100', client: '### ลูกค้า', year: '2026', icon: '🏙️', image: './photos/1.png' },
        { name: ' โรบินสันลพบุรี',               cat: 'indoor',  size: '400 * 200', client: '### ลูกค้า', year: '2026', icon: '🏬',  image: './photos/2.png' },
        { name: ' งานเปิดตัว BMW รุ่นใหม่',      cat: 'outdoor', size: '600 * 200', client: '### ลูกค้า', year: '2026', icon: '🌴',  image: './photos/3.png' },
        { name: 'คริสจักต์ Bright Romance Pattaya', cat: 'retail', size: '800 * 200', client: '### ลูกค้า', year: '2026', icon: '🛒', image: './photos/4.png' },
        { name: 'คริสจักต์ Hope Lopburi',         cat: 'event',   size: '400 * 200', client: '### ลูกค้า', year: '2026', icon: '🎤',  image: './photos/5.png' },
        { name: 'คริสจักต์ Bright Romance BKK',   cat: 'indoor',  size: '500 * 200', client: '### ลูกค้า', year: '2026', icon: '🏨',  image: './photos/6.png' },
    ];
    const catLabel = { outdoor: 'Outdoor LED', indoor: 'Indoor LED', retail: 'Retail', event: 'Event' };

    function renderPortfolio(filter) {
        const grid    = document.getElementById('portfolio-grid');
        const countEl = document.getElementById('portfolio-count');
        grid.innerHTML = '';
        const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
        filtered.forEach(p => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.onclick = () => openModal(p);
            div.innerHTML = `
                <img class="portfolio-thumb" src="${p.image}" alt="${p.name}">
                <div class="portfolio-overlay">
                    <div class="p-cat">${catLabel[p.cat]}</div>
                    <div class="p-name">${p.name}</div>
                    <div class="p-size">${p.size}</div>
                </div>`;
            grid.appendChild(div);
        });
        countEl.textContent = `แสดง ${filtered.length} จาก ${projects.length} โครงการ`;
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });

    renderPortfolio('all');


    /* ══════════════════════════════════════
       INTERACTIVE MAP
       *** แก้ไขข้อมูลพื้นที่จริงตรงนี้ ***
    ══════════════════════════════════════ */
    const locations = [
        { id: 0, name: 'กรุงเทพมหานคร', desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: true  },
        { id: 1, name: 'เชียงใหม่',      desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: false },
        { id: 2, name: 'ภูเก็ต',         desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: false },
        { id: 3, name: 'ขอนแก่น',        desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: false },
        { id: 4, name: 'พัทยา',          desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: false },
        { id: 5, name: 'หาดใหญ่',        desc: '### พื้นที่/ย่านที่ให้บริการ', screens: '###', active: false },
    ];

    function renderLocList() {
        const ul = document.getElementById('loc-list');
        ul.innerHTML = '';
        locations.forEach(loc => {
            const li = document.createElement('li');
            li.className = 'loc-item' + (loc.active ? ' active' : '');
            li.dataset.id = loc.id;
            li.onclick = () => selectLoc(loc.id);
            li.innerHTML = `
                <div class="loc-dot-sm" style="background:${loc.active ? '#00e5ff' : 'rgba(0,229,255,0.4)'};"></div>
                <div>
                    <div class="loc-name">${loc.name}</div>
                    <div class="loc-desc">${loc.desc}</div>
                    <span class="loc-tag" style="background:${loc.active ? 'rgba(0,229,255,0.1)' : '#111'};color:${loc.active ? '#00e5ff' : '#555'};border:1px solid ${loc.active ? 'rgba(0,229,255,0.3)' : '#222'};">
                        ${loc.screens} จอ
                    </span>
                </div>`;
            ul.appendChild(li);
        });
    }

    window.selectLoc = function (id) {
        locations.forEach(l => l.active = l.id === id);
        renderLocList();
        const item = document.querySelector(`.loc-item[data-id="${id}"]`);
        if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        document.querySelectorAll('.map-pin').forEach(pin => {
            const pid = parseInt(pin.dataset.id);
            const circles = pin.querySelectorAll('circle');
            if (pid === id) {
                circles[0].setAttribute('opacity', '0.15');
                circles[1].setAttribute('fill', '#00e5ff');
                circles[1].setAttribute('opacity', '1');
            } else {
                circles[0].setAttribute('opacity', '0');
                circles[1].setAttribute('fill', '#00e5ff');
                circles[1].setAttribute('opacity', '0.4');
            }
        });
    };

    renderLocList();


    /* ══════════════════════════════════════
       SLIDER
    ══════════════════════════════════════ */
    const track    = document.getElementById('slider-track');
    const wrapper  = document.getElementById('slider-wrapper');
    const btnPrev  = document.getElementById('slider-prev');
    const btnNext  = document.getElementById('slider-next');
    const dotsWrap = document.getElementById('slider-dots');

    if (track && wrapper && btnPrev && btnNext && dotsWrap) {

        const slides = track.querySelectorAll('.slide');
        const total  = slides.length;

        let currentIndex  = 0;
        let slidesVisible = calcVisible();
        let maxIndex      = calcMax();

        /* จำนวน slide ที่แสดงพร้อมกัน */
        function calcVisible() {
            const w = wrapper.offsetWidth;
            if (w < 580)  return 1;
            if (w < 1024) return 2;
            return 3;
        }

        function calcMax() {
            return Math.max(0, total - slidesVisible);
        }

        /* ความกว้าง slide 1 ช่อง รวม gap */
        function slideWidth() {
            if (!slides[0]) return 0;
            const style = window.getComputedStyle(slides[0]);
            return slides[0].offsetWidth
                + parseFloat(style.marginRight || 0)
                + parseFloat(style.marginLeft  || 0);
        }

        /* ปรับ min-width ของ slide ตาม breakpoint */
        function updateSlideSize() {
            slidesVisible = calcVisible();
            maxIndex      = calcMax();
            const gap = 12;
            slides.forEach(s => {
                s.style.minWidth    = `calc(${100 / slidesVisible}% - ${gap * (slidesVisible - 1) / slidesVisible}px)`;
                s.style.marginRight = `${gap}px`;
            });
            currentIndex = Math.min(currentIndex, maxIndex);
            goTo(currentIndex, false);
            buildDots();
        }

        /* เลื่อนไปยัง index ที่ต้องการ */
        function goTo(idx, animate = true) {
            currentIndex = Math.max(0, Math.min(idx, maxIndex));
            const offset = slideWidth() * currentIndex;
            if (!animate) {
                track.style.transition = 'none';
                track.style.transform  = `translateX(-${offset}px)`;
                requestAnimationFrame(() => { track.style.transition = ''; });
            } else {
                track.style.transform = `translateX(-${offset}px)`;
            }
            updateUI();
        }

        /* อัปเดต UI หลังเลื่อน */
        function updateUI() {
            btnPrev.classList.toggle('disabled', currentIndex <= 0);
            btnNext.classList.toggle('disabled', currentIndex >= maxIndex);
            document.querySelectorAll('.slider-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
            const counter = document.getElementById('slider-counter');
            if (counter) counter.textContent = `${currentIndex + 1} / ${maxIndex + 1}`;
        }

        /* สร้าง dot indicators */
        function buildDots() {
            dotsWrap.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const btn = document.createElement('button');
                btn.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
                btn.setAttribute('aria-label', `ไปยัง slide ที่ ${i + 1}`);
                btn.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(btn);
            }
        }

        /* ปุ่มเลื่อน */
        btnPrev.addEventListener('click', () => goTo(currentIndex - 1));
        btnNext.addEventListener('click', () => goTo(currentIndex + 1));

        /* Keyboard ← → */
        wrapper.setAttribute('tabindex', '0');
        wrapper.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
        });

        /* Drag / Swipe */
        let dragStartX   = 0;
        let dragStartIdx = 0;
        let isDragging   = false;
        let hasMoved     = false;

        function onDragStart(x) {
            isDragging   = true;
            hasMoved     = false;
            dragStartX   = x;
            dragStartIdx = currentIndex;
            track.classList.add('dragging');
        }
        function onDragMove(x) {
            if (!isDragging) return;
            const diff = x - dragStartX;
            if (Math.abs(diff) > 4) hasMoved = true;
            const offset = slideWidth() * currentIndex - diff;
            track.style.transform = `translateX(-${offset}px)`;
        }
        function onDragEnd(x) {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove('dragging');
            const diff      = x - dragStartX;
            const threshold = slideWidth() * 0.18;
            if      (diff < -threshold) goTo(dragStartIdx + 1);
            else if (diff >  threshold) goTo(dragStartIdx - 1);
            else                        goTo(dragStartIdx);
        }

        track.addEventListener('mousedown', e => onDragStart(e.clientX));
        window.addEventListener('mousemove', e => { if (isDragging) onDragMove(e.clientX); });
        window.addEventListener('mouseup',   e => onDragEnd(e.clientX));

        track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX),       { passive: true });
        track.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),        { passive: true });
        track.addEventListener('touchend',   e => onDragEnd(e.changedTouches[0].clientX));

        track.addEventListener('click', e => { if (hasMoved) e.stopPropagation(); }, true);

        /* Auto-play ทุก 5 วินาที หยุดเมื่อ hover */
        let autoTimer;
        function startAuto() {
            autoTimer = setInterval(() => {
                goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
            }, 5000);
        }
        function stopAuto() { clearInterval(autoTimer); }

        wrapper.addEventListener('mouseenter', stopAuto);
        wrapper.addEventListener('mouseleave', startAuto);
        wrapper.addEventListener('touchstart', stopAuto, { passive: true });

        /* Resize — debounce 150ms */
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateSlideSize, 150);
        });

        /* Init */
        updateSlideSize();
        startAuto();
    }

}); /* end DOMContentLoaded */


/* ══════════════════════════════════════
   MODAL — อยู่นอก DOMContentLoaded
   เพราะ HTML เรียก openModal() / closeModal() แบบ inline
══════════════════════════════════════ */
function openModal(p) {
    const catLabel = { outdoor: 'Outdoor LED', indoor: 'Indoor LED', retail: 'Retail', event: 'Event' };
    document.getElementById('modal-title').textContent = p.name;
    document.getElementById('modal-thumb').innerHTML = `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">`;
    document.getElementById('modal-meta').innerHTML = `
        <div class="modal-meta-item"><label>ประเภท</label><span>${catLabel[p.cat]}</span></div>
        <div class="modal-meta-item"><label>ขนาดจอ</label><span>${p.size}</span></div>
        <div class="modal-meta-item"><label>ลูกค้า</label><span>${p.client}</span></div>
        <div class="modal-meta-item"><label>ปี</label><span>${p.year}</span></div>`;
    document.getElementById('modal').classList.add('open');
}

function closeModal(e) {
    if (e.target.id === 'modal') document.getElementById('modal').classList.remove('open');
}








/* ════════════════════════════════════════
   products.js — glu. LED Products Section
   วาง <script src="products.js"></script> ก่อน </body>
   โหลดหลัง scriptnew.js
   ════════════════════════════════════════ */

(function () {

    /* ══════════════════════════════════════
       ข้อมูลสินค้า
       *** แก้ไขข้อมูลสินค้าจริงตรงนี้ ***

       แต่ละ object ประกอบด้วย:
         id       — ตัวเลขไม่ซ้ำกัน (ใช้ใน key lookup)
         name     — ชื่อรุ่นสินค้า
         type     — ประเภท: 'outdoor' | 'indoor' | 'rental' | 'creative'
         image    — path รูปสินค้า (เว้นว่างไว้ก่อน)
         pitch    — Pixel Pitch เช่น 'P3', 'P4', 'P6'
         price    — ราคาแสดงบนการ์ด เช่น 'ติดต่อสอบถาม' หรือ 'ราคา 120,000 บาท'
         priceTag — ราคาแสดงใน modal (เหมือน price หรือแยกก็ได้)
         short    — คำอธิบายสั้นบนการ์ด (1 บรรทัด)
         desc     — คำอธิบายยาวใน modal
         specs    — array ของ { label, value } สเปคสินค้า
    ══════════════════════════════════════ */
    var PRODUCTS = [
        {
            id: 1,
            name: 'Outdoor P6 Series',
            type: 'outdoor',
            image: 'slidept/YKM-004.jpg',
            pitch: 'P6',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'จอ LED กลางแจ้งทนแดดทนฝน IP65 ความสว่างสูงพิเศษ',
            desc: 'เหมาะสำหรับป้ายโฆษณาภายนอกอาคาร ห้างสรรพสินค้า และพื้นที่เปิดโล่ง ด้วยความสว่างสูงถึง 6,500 nits ชัดเจนแม้กลางแดดจัด',
            specs: [
                { label: 'Pixel Pitch', value: 'P6' },
                { label: 'ความสว่าง', value: '6,500 nits' },
                { label: 'IP Rating', value: 'IP65' },
                { label: 'Refresh Rate', value: '3,840 Hz' },
                { label: 'Viewing Angle', value: '140° / 140°' },
                { label: 'Cabinet Size', value: '960×960 mm' },
            ]
        },
        {
            id: 2,
            name: 'Outdoor P4 Pro',
            type: 'outdoor',
            image: 'slidept/YKM-013.jpg',
            pitch: 'P4',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'ความละเอียดสูง Pixel Pitch 4mm เห็นชัดในระยะใกล้',
            desc: 'เหมาะกับป้าย Roadside ที่ต้องการความคมชัดสูงในระยะดูใกล้ ทนทานต่อสภาพอากาศทุกประเภท',
            specs: [
                { label: 'Pixel Pitch', value: 'P4' },
                { label: 'ความสว่าง', value: '5,500 nits' },
                { label: 'IP Rating', value: 'IP65' },
                { label: 'Refresh Rate', value: '3,840 Hz' },
                { label: 'Viewing Angle', value: '140° / 140°' },
                { label: 'Cabinet Size', value: '640×640 mm' },
            ]
        },
        {
            id: 3,
            name: 'Indoor P2.5 Display',
            type: 'indoor',
            image: 'slidept/YKM-016.jpg',
            pitch: 'P2.5',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'จอ LED ในร่ม ความละเอียดสูง เหมาะกับห้องประชุมและห้างฯ',
            desc: 'คมชัดระดับ Fine Pitch เหมาะสำหรับพื้นที่ภายในอาคาร ห้างสรรพสินค้า ล็อบบี้โรงแรม และห้องประชุมใหญ่',
            specs: [
                { label: 'Pixel Pitch', value: 'P2.5' },
                { label: 'ความสว่าง', value: '1,200 nits' },
                { label: 'IP Rating', value: 'IP43' },
                { label: 'Refresh Rate', value: '3,840 Hz' },
                { label: 'Viewing Angle', value: '160° / 160°' },
                { label: 'Cabinet Size', value: '500×500 mm' },
            ]
        },
        {
            id: 4,
            name: 'Indoor P3 Standard',
            type: 'indoor',
            image: 'slidept/YKM-003.jpg',
            pitch: 'P3',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'ประหยัดงบ คุณภาพดี สำหรับงานในร่มทั่วไป',
            desc: 'ตัวเลือกที่คุ้มค่าที่สุดสำหรับงาน Indoor ทั่วไป ติดตั้งง่าย บำรุงรักษาสะดวก เหมาะกับร้านค้า อาคารสำนักงาน',
            specs: [
                { label: 'Pixel Pitch', value: 'P3' },
                { label: 'ความสว่าง', value: '1,000 nits' },
                { label: 'IP Rating', value: 'IP43' },
                { label: 'Refresh Rate', value: '1,920 Hz' },
                { label: 'Viewing Angle', value: '160° / 160°' },
                { label: 'Cabinet Size', value: '576×576 mm' },
            ]
        },
        {
            id: 5,
            name: 'Rental P3.9 Stage',
            type: 'rental',
            image: 'slidept/YKM-015.jpg',
            pitch: 'P3.9',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'จอเช่าสำหรับงาน Event และ Concert ถอดประกอบเร็ว',
            desc: 'ออกแบบมาสำหรับงาน Event Concert และ Show ถอดประกอบง่าย น้ำหนักเบา โครงอะลูมิเนียม รองรับ curve ได้',
            specs: [
                { label: 'Pixel Pitch', value: 'P3.9' },
                { label: 'ความสว่าง', value: '4,500 nits' },
                { label: 'IP Rating', value: 'IP43' },
                { label: 'Refresh Rate', value: '3,840 Hz' },
                { label: 'น้ำหนัก/Cabinet', value: '7.5 kg' },
                { label: 'Cabinet Size', value: '500×500 mm' },
            ]
        },
        {
            id: 6,
            name: 'Creative Curve LED',
            type: 'creative',
            image: 'slidept/YKM-014.jpg',
            pitch: 'P4',
            price: '100,000 bath/module',
            priceTag: '100,000 bath/module',
            short: 'จอโค้ง 3D Illusion สร้างประสบการณ์ภาพที่ไม่เหมือนใคร',
            desc: 'นวัตกรรมจอโค้งที่รองรับมุมโค้งสูงสุด 30° เหมาะกับสถาปัตยกรรมพิเศษ มุมตึก หรืองาน Brand Activation ที่ต้องการความ WOW',
            specs: [
                { label: 'Pixel Pitch', value: 'P4' },
                { label: 'ความสว่าง', value: '5,000 nits' },
                { label: 'IP Rating', value: 'IP54' },
                { label: 'มุมโค้งสูงสุด', value: '30°' },
                { label: 'Refresh Rate', value: '3,840 Hz' },
                { label: 'รูปแบบพิเศษ', value: 'Customized' },
            ]
        },
    ];

    /* map ชื่อ type → label ที่แสดงผล */
    var TYPE_LABEL = {
        outdoor:  'Outdoor LED',
        indoor:   'Indoor LED',
        rental:   'Rental LED',
        creative: 'Creative LED',
    };


    /* ══════════════════════════════════════
       อ้างอิง Element — ตรวจสอบทุกตัวก่อนใช้
    ══════════════════════════════════════ */
    var grid        = document.getElementById('products-grid');
    var modal       = document.getElementById('product-modal');
    var pmodal_close  = document.getElementById('pmodal-close');
    var pmodal_close2 = document.getElementById('pmodal-close2');
    var pmodal_title  = document.getElementById('pmodal-title');
    var pmodal_badge  = document.getElementById('pmodal-badge');
    var pmodal_img    = document.getElementById('pmodal-img');
    var pmodal_price  = document.getElementById('pmodal-price');
    var pmodal_specs  = document.getElementById('pmodal-specs');
    var pmodal_desc   = document.getElementById('pmodal-desc');
    var pmodal_cta    = document.getElementById('pmodal-cta');

    /* guard: หาก HTML ไม่มี element ที่ต้องการ จะหยุดทันทีโดยไม่ error ส่วนอื่น */
    if (!grid || !modal) {
        console.warn('[products.js] ไม่พบ #products-grid หรือ #product-modal ใน HTML');
        return;
    }


    /* ══════════════════════════════════════
       Render การ์ดสินค้า
    ══════════════════════════════════════ */
    function renderProducts(filter) {
        grid.innerHTML = '';

        var list = filter === 'all'
            ? PRODUCTS
            : PRODUCTS.filter(function (p) { return p.type === filter; });

        if (list.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'products-empty';
            empty.textContent = 'ไม่มีสินค้าในประเภทนี้';
            grid.appendChild(empty);
            return;
        }

        list.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'ดูรายละเอียด ' + p.name);

            card.innerHTML =
                '<div class="product-card-img-wrap">' +
                    '<img class="product-card-img" src="' + (p.image || '') + '" alt="' + escHtml(p.name) + '">' +
                    '<span class="product-type-badge">' + escHtml(TYPE_LABEL[p.type] || p.type) + '</span>' +
                '</div>' +
                '<div class="product-card-body">' +
                    '<div class="product-card-name">' + escHtml(p.name) + '</div>' +
                    '<div class="product-card-short">' + escHtml(p.short) + '</div>' +
                    '<div class="product-card-footer">' +
                        '<span class="product-card-pitch">Pixel Pitch ' + escHtml(p.pitch) + '</span>' +
                        '<span class="product-card-price">' + escHtml(p.price) + '</span>' +
                    '</div>' +
                '</div>';

            /* click — เปิด modal */
            card.addEventListener('click', function () { openProductModal(p); });

            /* keyboard — Enter / Space เพื่อ accessibility */
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProductModal(p);
                }
            });

            grid.appendChild(card);
        });
    }


    /* ══════════════════════════════════════
       เปิด Modal สินค้า
    ══════════════════════════════════════ */
    function openProductModal(p) {
        /* ตรวจ element ทุกตัวก่อน set */
        if (!pmodal_title || !pmodal_badge || !pmodal_img ||
            !pmodal_price || !pmodal_specs || !pmodal_desc) {
            console.warn('[products.js] modal element ขาดหายไป');
            return;
        }

        pmodal_title.textContent = p.name;
        pmodal_badge.textContent = TYPE_LABEL[p.type] || p.type;
        pmodal_desc.textContent  = p.desc;
        pmodal_price.textContent = p.priceTag;

        /* รูปสินค้า */
        pmodal_img.src = p.image || '';
        pmodal_img.alt = p.name;
        pmodal_img.style.display = p.image ? 'block' : 'none';

        /* สเปค */
        pmodal_specs.innerHTML = '';
        if (Array.isArray(p.specs)) {
            p.specs.forEach(function (s) {
                var item = document.createElement('div');
                item.className = 'pmodal-spec-item';
                item.innerHTML =
                    '<span class="pmodal-spec-label">' + escHtml(s.label) + '</span>' +
                    '<span class="pmodal-spec-value">' + escHtml(s.value) + '</span>';
                pmodal_specs.appendChild(item);
            });
        }

        /* ปุ่ม CTA — เลื่อนไป #contact และปิด modal */

         if (pmodal_cta) {
            pmodal_cta.href = 'https://www.facebook.com/glu.led';
            pmodal_cta.onclick = function () { closeProductModal(); };
        } 

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; /* ล็อก scroll body */
    }


    /* ══════════════════════════════════════
       ปิด Modal สินค้า
    ══════════════════════════════════════ */
    function closeProductModal() {
        modal.classList.remove('open');
        document.body.style.overflow = ''; /* คืน scroll body */
    }


    /* ── ปุ่มปิด ── */
    if (pmodal_close)  pmodal_close.addEventListener('click',  closeProductModal);
    if (pmodal_close2) pmodal_close2.addEventListener('click', closeProductModal);

    /* ── คลิก overlay ด้านนอกกล่อง → ปิด ── */
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeProductModal();
    });

    /* ── กด Escape → ปิด ── */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeProductModal();
        }
    });


    /* ══════════════════════════════════════
       Filter buttons
       ใช้ data-pfilter เพื่อไม่ชนกับ data-filter ของ portfolio
    ══════════════════════════════════════ */
    var filterBtns = document.querySelectorAll('[data-pfilter]');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            renderProducts(btn.getAttribute('data-pfilter'));
        });
    });


    /* ══════════════════════════════════════
       Utility: escape HTML เพื่อป้องกัน XSS
    ══════════════════════════════════════ */
    function escHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }


    /* ══════════════════════════════════════
       Init — render ทั้งหมดตั้งแต่เริ่ม
    ══════════════════════════════════════ */
    renderProducts('all');

})();