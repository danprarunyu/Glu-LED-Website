



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
            image: '',
            pitch: 'P6',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            image: '',
            pitch: 'P4',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            image: '',
            pitch: 'P2.5',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            image: '',
            pitch: 'P3',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            image: '',
            pitch: 'P3.9',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            image: '',
            pitch: 'P4',
            price: 'ติดต่อสอบถาม',
            priceTag: 'ติดต่อสอบถาม',
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
            pmodal_cta.href = '#contact';
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