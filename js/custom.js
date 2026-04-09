document.addEventListener('DOMContentLoaded', () => {

    // ── 화면 크기에 맞게 자동 축소
    function scaleWrap() {
        const wrap = document.querySelector('.Wrap');
        const designWidth = 1920;
        const designHeight = 1080;
        const scaleX = window.innerWidth / designWidth;
        const scaleY = window.innerHeight / designHeight;
        const scale = Math.min(scaleX, scaleY);
        wrap.style.transform = `scale(${scale})`;
        wrap.style.transformOrigin = 'top left';
        wrap.style.width = `${designWidth}px`;
        wrap.style.height = `${designHeight}px`;
        document.body.style.width = `${designWidth * scale}px`;
        document.body.style.height = `${designHeight * scale}px`;
    }
    scaleWrap();
    window.addEventListener('resize', scaleWrap);


    // ── 실시간 시계
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;

        const months = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];
        document.getElementById('date').textContent = `${months[now.getMonth()]} ${now.getDate()}Day`;

        const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        document.getElementById('weekday').textContent = weekdays[now.getDay()];
    }
    updateClock();
    setInterval(updateClock, 1000);


    // ── Contact 열기
    document.querySelector('.contact-btn').addEventListener('click', () => {
        document.getElementById('contactOverlay').classList.add('active');
    });

    // ── Contact 닫기 (바깥 클릭)
    document.getElementById('contactOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            const overlay = e.currentTarget;
            overlay.classList.remove('active');
            overlay.classList.add('closing');
            setTimeout(() => overlay.classList.remove('closing'), 250);
        }
    });

    // ── About Me 열기
    document.querySelector('.Profile-img').addEventListener('click', () => {
        document.getElementById('aboutmeOverlay').classList.add('active');
    });

    // ── About Me 닫기 (바깥 클릭)
    document.getElementById('aboutmeOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            const overlay = e.currentTarget;
            overlay.classList.remove('active');
            overlay.classList.add('closing');
            setTimeout(() => overlay.classList.remove('closing'), 350);
        }
    });


    // ── 탭 전환
    const TABS = ['home', 'web', 'app', 'illust', 'more'];

    function switchTab(tab) {

        // 홈 아이콘 이미지 교체
        const homeIcon = document.getElementById('home-icon');
        if (homeIcon) {
            homeIcon.src = (tab === 'home')
                ? 'images/홈 icon.png'
                : 'images/homeicon.png';
        }

        // 탭 뷰 show / hide
        TABS.forEach(t => {
            const view = document.getElementById('view-' + t);
            if (view) {
                view.style.display = (t === tab) ? 'flex' : 'none';
            }
        });

        // nav-item active 상태
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-tab') === tab);
        });

        // 홈 버튼 active 상태
        const homeBtn = document.querySelector('.nav-home');
        if (homeBtn) {
            homeBtn.classList.toggle('active', tab === 'home');
        }

        // 스크롤 초기화
        const contentArea = document.getElementById('content-area');
        if (contentArea) contentArea.scrollTop = 0;
    }

    // nav-item (Web, App 등) 클릭
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(item.getAttribute('data-tab'));
        });
    });

    // 홈 버튼 클릭
    const navHome = document.querySelector('.nav-home');
    if (navHome) {
        navHome.addEventListener('click', () => switchTab('home'));
    }

    // 초기 상태: home
    switchTab('home');

});