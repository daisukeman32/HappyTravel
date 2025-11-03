/**
 * Happy Travel - 幸運の旅先選出アプリ
 */

// ======================
// グローバル変数
// ======================
let prefectures = [];
let cities = [];
let selectedPrefecture = null;
let selectedCity = null;
let departurePref = null;
let departureCity = null;

let appSettings = {
    maxDistance: 'any',  // 100, 300, 600, 'any'
    transport: ['train'],
    environment: 'any',
    mode: 'normal'
};

let currentQuestion = 0;
const totalQuestions = 4;

let mainMap = null;
let resultMap = null;

// ======================
// 効果音
// ======================
const sounds = {
    button: new Audio('se/決定ボタンを押す7.mp3'),
    cursorMove: new Audio('se/カーソル移動12.mp3'),
    rouletteSpin: new Audio('se/電子ルーレット回転中.mp3'),
    rouletteSlow: new Audio('se/電子ルーレットが徐々に止まる.mp3'),
    rouletteBlink: new Audio('se/電子ルーレットの出目が点滅.mp3')
};

// 音量設定
sounds.button.volume = 0.3; // 決定ボタンの音量を下げる

// ルーレット回転音のシームレスループ設定
sounds.rouletteSpin.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play().catch(e => console.log('ループ再生エラー:', e));
});

// 音声再生ヘルパー関数
function playSound(soundName) {
    try {
        if (sounds[soundName]) {
            sounds[soundName].currentTime = 0; // 再生位置をリセット
            sounds[soundName].play().catch(e => console.log('音声再生エラー:', e));
        }
    } catch (e) {
        console.log('音声再生エラー:', e);
    }
}

// 音声停止ヘルパー関数
function stopSound(soundName) {
    try {
        if (sounds[soundName]) {
            sounds[soundName].pause();
            sounds[soundName].currentTime = 0;
        }
    } catch (e) {
        console.log('音声停止エラー:', e);
    }
}

// ======================
// 初期化
// ======================
document.addEventListener('DOMContentLoaded', () => {
    console.log('アプリケーション初期化中...');

    // データ読み込み（同期的に実行）
    loadData();

    // UI初期化
    initializeUI();

    // イベントリスナー設定
    setupEventListeners();

    console.log('初期化完了');
});

// ======================
// データ読み込み
// ======================
function loadData() {
    // データはdata/prefectures.jsとdata/cities.jsから読み込まれます
    // グローバル変数 PREFECTURES_DATA と CITIES_DATA を使用
    prefectures = PREFECTURES_DATA;
    cities = CITIES_DATA;
    console.log(`データ読み込み完了: 都道府県${prefectures.length}件、市区町村${cities.length}件`);
}

// ======================
// UI初期化
// ======================
function initializeUI() {
    // 都道府県セレクトボックスの初期化
    const prefSelect = document.getElementById('departure-pref');
    prefectures.forEach(pref => {
        const option = document.createElement('option');
        option.value = pref.id;
        option.textContent = pref.name;
        prefSelect.appendChild(option);
    });
}

// ======================
// イベントリスナー設定
// ======================
function setupEventListeners() {
    // イントロ画面
    document.getElementById('start-questions-btn').addEventListener('click', startQuestions);

    // Q1: 都道府県選択
    document.getElementById('departure-pref').addEventListener('change', function() {
        const prefId = parseInt(this.value);
        if (prefId) {
            departurePref = prefectures.find(p => p.id === prefId);
            document.getElementById('q1-next').classList.remove('hidden');
        } else {
            document.getElementById('q1-next').classList.add('hidden');
        }
    });

    document.getElementById('q1-next').addEventListener('click', () => {
        playSound('button');
        // 市区町村セレクトボックスを更新
        const citySelect = document.getElementById('departure-city');
        citySelect.innerHTML = '<option value="">選択してください</option>';

        const departureCities = cities.filter(c => c.prefId === departurePref.id);
        departureCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });

        // Q1-2へ移動
        document.getElementById('q1').classList.add('hidden');
        document.getElementById('q1-2').classList.remove('hidden');
    });

    // Q1-2: 市区町村選択
    document.getElementById('departure-city').addEventListener('change', function() {
        playSound('cursorMove');
        const cityId = parseInt(this.value);
        if (cityId) {
            departureCity = cities.find(c => c.id === cityId);
            document.getElementById('q1-2-next').classList.remove('hidden');
        } else {
            document.getElementById('q1-2-next').classList.add('hidden');
        }
    });

    document.getElementById('q1-2-next').addEventListener('click', () => {
        playSound('button');
        console.log('出発地:', departurePref.name, departureCity.name);
        goToQuestion(2);
    });

    // Q2: 移動距離
    setupOptionButtons('.distance-options .option-btn', (value) => {
        playSound('button');
        appSettings.maxDistance = value;
        setTimeout(() => goToQuestion(3), 300);
    });

    // Q3: 交通手段
    // お任せチェックボックスの処理
    const transportAny = document.getElementById('transport-any');
    const transportCheckboxes = document.querySelectorAll('input[name="transport"]:not(#transport-any)');

    // お任せがチェックされたら全て選択
    transportAny.addEventListener('change', function() {
        if (this.checked) {
            transportCheckboxes.forEach(cb => {
                cb.checked = true;
            });
        } else {
            transportCheckboxes.forEach(cb => {
                cb.checked = false;
            });
        }
    });

    // 個別の交通手段チェックボックスの処理
    transportCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            // 全ての個別チェックボックスがチェックされているか確認
            const allChecked = Array.from(transportCheckboxes).every(checkbox => checkbox.checked);
            transportAny.checked = allChecked;
        });
    });

    document.getElementById('q3-next').addEventListener('click', () => {
        playSound('button');
        const checked = document.querySelectorAll('input[name="transport"]:not(#transport-any):checked');
        if (checked.length === 0) {
            alert('交通手段を1つ以上選択してください');
            return;
        }
        appSettings.transport = Array.from(checked).map(cb => cb.value);
        goToQuestion(4);
    });

    // Q4: モード
    setupOptionButtons('.mode-options .option-btn', (value) => {
        playSound('button');
        appSettings.mode = value;
        setTimeout(() => showDestinyScreen(), 500);
    });

    // 運命の質問画面
    document.getElementById('accept-destiny-btn').addEventListener('click', () => {
        playSound('button');
        setTimeout(() => startRoulette(), 300);
    });

    document.getElementById('reject-destiny-btn').addEventListener('click', () => {
        playSound('button');
        resetToIntro();
    });

    // 結果画面
    document.getElementById('reset-btn').addEventListener('click', () => {
        playSound('button');
        resetToIntro();
    });
    document.getElementById('share-btn').addEventListener('click', () => {
        playSound('button');
        shareResult();
    });
}

// ======================
// 選択肢ボタンの設定
// ======================
function setupOptionButtons(selector, callback) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');
            callback(this.dataset.value);
        });
    });
}

// ======================
// 質問開始
// ======================
function startQuestions() {
    playSound('button');
    showScreen('question-screen');
    goToQuestion(1);
}

// ======================
// 質問移動
// ======================
function goToQuestion(questionNumber) {
    currentQuestion = questionNumber;

    // プログレスバー更新
    const progress = (questionNumber / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `質問 ${questionNumber} / ${totalQuestions}`;

    // すべての質問を非表示
    document.querySelectorAll('.question').forEach(q => {
        q.classList.add('hidden');
    });

    // 指定の質問を表示
    const questionId = `q${questionNumber}`;
    const questionEl = document.getElementById(questionId);
    if (questionEl) {
        questionEl.classList.remove('hidden');
    }
}

// ======================
// 運命の質問画面を表示
// ======================
function showDestinyScreen() {
    showScreen('destiny-screen');
}

// ======================
// ルーレット開始
// ======================
async function startRoulette() {
    showScreen('roulette-screen');
    initializeMainMap();

    // フィルタリング
    const eligiblePrefectures = filterPrefectures();

    if (eligiblePrefectures.length === 0) {
        alert('条件に合う旅行先が見つかりませんでした。予算や日数を調整してください。');
        resetToIntro();
        return;
    }

    console.log(`条件に合う都道府県: ${eligiblePrefectures.length}件`);
    console.log('設定:', appSettings);

    // 都道府県ルーレット
    document.getElementById('roulette-title').textContent = '都道府県を選択中...';
    selectedPrefecture = await runPrefectureRoulette(eligiblePrefectures);

    await sleep(1000);

    // 市区町村ルーレット
    document.getElementById('roulette-title').textContent = '市区町村を選択中...';
    document.getElementById('prefecture-roulette').classList.add('hidden');
    document.getElementById('city-roulette').classList.remove('hidden');

    let eligibleCities = cities.filter(c => c.prefId === selectedPrefecture.id);

    // 環境タイプでフィルタリング
    if (appSettings.environment !== 'any') {
        const filtered = eligibleCities.filter(c => c.environment === appSettings.environment);
        // フィルタ後に候補が残っている場合のみ適用
        if (filtered.length > 0) {
            eligibleCities = filtered;
        }
    }

    selectedCity = await runCityRoulette(eligibleCities);

    await sleep(1000);
    showResult();
}

// ======================
// 地図初期化
// ======================
function initializeMainMap() {
    if (mainMap) {
        mainMap.remove();
    }

    mainMap = L.map('map').setView([36.5, 138], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(mainMap);

    if (departureCity) {
        L.marker([departureCity.lat, departureCity.lng])
            .addTo(mainMap)
            .bindPopup(`出発地: ${departureCity.name}`)
            .openPopup();
    }
}

// ======================
// 都道府県フィルタリング
// ======================
function filterPrefectures() {
    return prefectures.filter(pref => {
        if (pref.id === departurePref.id) return false;

        const distance = calculateDistance(
            departureCity.lat, departureCity.lng,
            pref.lat, pref.lng
        );

        // 距離によるフィルタリング
        if (appSettings.maxDistance !== 'any') {
            const maxDist = parseInt(appSettings.maxDistance);
            if (maxDist === 100 && distance > 100) return false;
            if (maxDist === 300 && (distance < 100 || distance > 300)) return false;
            if (maxDist === 600 && distance < 300) return false;
        }

        return true;
    });
}

// ======================
// 都道府県ルーレット
// ======================
async function runPrefectureRoulette(eligiblePrefectures) {
    const rouletteItem = document.getElementById('roulette-item');
    const iterations = 20;  // 30から20に短縮
    const baseDelay = 50;

    // 総所要時間を計算
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        totalTime += baseDelay + (i * 10);  // 15から10に短縮
    }
    const slowSoundTime = totalTime - 2000; // 最後の2秒前（3秒から2秒に変更）

    // ルーレット回転音を開始（ループ再生）
    playSound('rouletteSpin');

    let elapsedTime = 0;
    let slowSoundPlayed = false;

    for (let i = 0; i < iterations; i++) {
        const randomPref = eligiblePrefectures[Math.floor(Math.random() * eligiblePrefectures.length)];
        rouletteItem.textContent = randomPref.name;
        rouletteItem.classList.add('highlight');

        if (mainMap) {
            mainMap.setView([randomPref.lat, randomPref.lng], 6);
        }

        const delay = baseDelay + (i * 10);  // 15から10に短縮
        await sleep(delay);
        elapsedTime += delay;
        rouletteItem.classList.remove('highlight');

        // 最後の2秒前に減速音に切り替え
        if (!slowSoundPlayed && elapsedTime >= slowSoundTime) {
            stopSound('rouletteSpin'); // 回転音を停止
            playSound('rouletteSlow'); // 減速音を再生
            slowSoundPlayed = true;
        }
    }

    let finalSelection;
    if (appSettings.mode === 'mystery') {
        // ミステリーモードでは完全ランダム
        finalSelection = eligiblePrefectures[Math.floor(Math.random() * eligiblePrefectures.length)];
    } else {
        // リアルモードでも完全ランダム（距離制限は既にフィルタで適用済み）
        finalSelection = eligiblePrefectures[Math.floor(Math.random() * eligiblePrefectures.length)];
    }

    rouletteItem.textContent = finalSelection.name;
    rouletteItem.classList.add('highlight');

    // 確定時の点滅音
    playSound('rouletteBlink');

    if (mainMap) {
        mainMap.setView([finalSelection.lat, finalSelection.lng], 8);
    }

    return finalSelection;
}

// ======================
// 市区町村ルーレット
// ======================
async function runCityRoulette(eligibleCities) {
    const rouletteItem = document.getElementById('city-roulette-item');
    const iterations = 15;  // 20から15に短縮
    const baseDelay = 50;

    // 総所要時間を計算
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        totalTime += baseDelay + (i * 10);
    }
    const slowSoundTime = totalTime - 1500; // 最後の1.5秒前

    // ルーレット回転音を開始（ループ再生）
    playSound('rouletteSpin');

    let elapsedTime = 0;
    let slowSoundPlayed = false;

    for (let i = 0; i < iterations; i++) {
        const randomCity = eligibleCities[Math.floor(Math.random() * eligibleCities.length)];
        rouletteItem.textContent = randomCity.name;
        rouletteItem.classList.add('highlight');

        if (mainMap) {
            mainMap.setView([randomCity.lat, randomCity.lng], 10);
        }

        const delay = baseDelay + (i * 10);
        await sleep(delay);
        elapsedTime += delay;
        rouletteItem.classList.remove('highlight');

        // 最後の1.5秒前に減速音に切り替え
        if (!slowSoundPlayed && elapsedTime >= slowSoundTime) {
            stopSound('rouletteSpin'); // 回転音を停止
            playSound('rouletteSlow'); // 減速音を再生
            slowSoundPlayed = true;
        }
    }

    const finalSelection = eligibleCities[Math.floor(Math.random() * eligibleCities.length)];
    rouletteItem.textContent = finalSelection.name;
    rouletteItem.classList.add('highlight');

    // 確定時の点滅音
    playSound('rouletteBlink');

    if (mainMap) {
        mainMap.setView([finalSelection.lat, finalSelection.lng], 12);
    }

    return finalSelection;
}

// ======================
// 結果表示
// ======================
function showResult() {
    showScreen('result-screen');

    document.getElementById('result-prefecture').textContent = selectedPrefecture.name;
    document.getElementById('result-city').textContent = selectedCity.name;
    document.getElementById('result-description').textContent = selectedCity.description || '';
    document.getElementById('result-departure').textContent = `${departurePref.name} ${departureCity.name}`;

    const distance = calculateDistance(
        departureCity.lat, departureCity.lng,
        selectedCity.lat, selectedCity.lng
    );
    const cost = estimateTravelCost(distance, appSettings.transport);
    const time = estimateTravelTime(distance, appSettings.transport);

    document.getElementById('result-distance').textContent = `${Math.round(distance)}km`;
    document.getElementById('result-cost').textContent = `約${cost.toLocaleString()}円`;
    document.getElementById('result-time').textContent = `約${time.toFixed(1)}時間`;

    // アフィリエイトリンクを更新
    updateAffiliateLinks();

    initializeResultMap();
}

// ======================
// アフィリエイトリンク更新
// ======================
function updateAffiliateLinks() {
    const prefName = selectedPrefecture.name;
    const cityName = selectedCity.name;
    const searchQuery = `${prefName} ${cityName}`;

    // 楽天トラベル検索URL
    const rakutenUrl = `https://travel.rakuten.co.jp/HOTEL/SimpleSearch?f_teikei=&f_dai=&f_chu=&f_shou=&f_search_type=1&f_nen1=&f_tuki1=&f_hi1=&f_nen2=&f_tuki2=&f_hi2=&f_otona_su=2&f_s1=0&f_s2=0&f_y1=0&f_y2=0&f_y3=0&f_y4=0&f_camp_id=&f_flg=PLAN&f_keyword=${encodeURIComponent(searchQuery)}`;

    // じゃらん検索URL
    const jalanUrl = `https://www.jalan.net/uw/uwp1100/uww1101init.do?keyword=${encodeURIComponent(searchQuery)}&rootCd=04&stayYear=&stayMonth=&stayDay=&stayCount=1&dateUndecided=1&roomCount=1&adultNum=2&minPrice=0&maxPrice=999999`;

    // Booking.com検索URL
    const bookingUrl = `https://www.booking.com/searchresults.ja.html?ss=${encodeURIComponent(searchQuery)}`;

    // リンクを設定
    document.getElementById('rakuten-link').href = rakutenUrl;
    document.getElementById('jalan-link').href = jalanUrl;
    document.getElementById('booking-link').href = bookingUrl;
}

// ======================
// 結果地図初期化
// ======================
function initializeResultMap() {
    if (resultMap) {
        resultMap.remove();
    }

    resultMap = L.map('result-map').setView([selectedCity.lat, selectedCity.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(resultMap);

    L.marker([selectedCity.lat, selectedCity.lng])
        .addTo(resultMap)
        .bindPopup(`${selectedPrefecture.name} ${selectedCity.name}`)
        .openPopup();

    L.marker([departureCity.lat, departureCity.lng])
        .addTo(resultMap)
        .bindPopup(`出発地: ${departureCity.name}`);

    const route = L.polyline([
        [departureCity.lat, departureCity.lng],
        [selectedCity.lat, selectedCity.lng]
    ], {
        color: '#000000',
        weight: 2,
        opacity: 0.6
    }).addTo(resultMap);

    resultMap.fitBounds(route.getBounds(), { padding: [50, 50] });
}

// ======================
// 最初に戻る
// ======================
function resetToIntro() {
    showScreen('intro-screen');
    currentQuestion = 0;

    // リセット
    if (mainMap) {
        mainMap.remove();
        mainMap = null;
    }
    if (resultMap) {
        resultMap.remove();
        resultMap = null;
    }

    document.getElementById('departure-pref').value = '';
    document.getElementById('progress-fill').style.width = '0%';
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('q1-next').classList.add('hidden');
    document.getElementById('q1-2-next').classList.add('hidden');
}

// ======================
// 結果シェア
// ======================
function shareResult() {
    const shareText = `Happy Travelで${selectedPrefecture.name}${selectedCity.name}に決定！\n出発地: ${departurePref.name}${departureCity.name}\n\n#HappyTravel`;

    if (navigator.share) {
        navigator.share({
            title: 'Happy Travel',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('シェアキャンセル', err));
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('結果をクリップボードにコピーしました！');
        }).catch(err => {
            console.error('コピー失敗', err);
            alert(shareText);
        });
    }
}

// ======================
// ユーティリティ関数
// ======================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees) {
    return degrees * Math.PI / 180;
}

function estimateTravelCost(distance, transportMethods) {
    let minCost = Infinity;

    transportMethods.forEach(method => {
        let cost = 0;
        switch (method) {
            case 'train':
                cost = distance * 20;
                break;
            case 'airplane':
                if (distance < 500) cost = 15000;
                else if (distance < 1000) cost = 25000;
                else cost = 35000;
                break;
            case 'car':
                cost = distance * 15;
                break;
            case 'bus':
                cost = distance * 10;
                break;
        }
        cost *= 2;
        if (cost < minCost) minCost = cost;
    });

    return Math.round(minCost);
}

function estimateTravelTime(distance, transportMethods) {
    let minTime = Infinity;

    transportMethods.forEach(method => {
        let time = 0;
        switch (method) {
            case 'train':
                time = distance / 80;
                break;
            case 'airplane':
                time = (distance / 500) + 2;
                break;
            case 'car':
                time = distance / 60;
                break;
            case 'bus':
                time = distance / 50;
                break;
        }
        if (time < minTime) minTime = time;
    });

    return minTime;
}
