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