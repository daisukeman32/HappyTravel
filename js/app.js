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
    budget: 50000,
    nights: 1,
    transport: ['train'],
    mode: 'normal'
};

let currentQuestion = 0;
const totalQuestions = 5;

let mainMap = null;
let resultMap = null;

// ======================
// 効果音
// ======================
const sounds = {
    button: new Audio('se/決定ボタンを押す26.mp3'),
    rouletteSpin: new Audio('se/電子ルーレット回転中.mp3'),
    rouletteSlow: new Audio('se/電子ルーレットが徐々に止まる.mp3'),
    rouletteBlink: new Audio('se/電子ルーレットの出目が点滅.mp3')
};

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

    // Q2: 予算
    setupOptionButtons('.budget-options .option-btn', (value) => {
        playSound('button');
        if (value === 'custom') {
            document.getElementById('custom-budget').classList.remove('hidden');
            document.getElementById('q2-next').classList.remove('hidden');
        } else {
            document.getElementById('custom-budget').classList.add('hidden');
            appSettings.budget = parseInt(value);
            setTimeout(() => goToQuestion(3), 300);
        }
    });

    document.getElementById('q2-next').addEventListener('click', () => {
        playSound('button');
        const customBudget = parseInt(document.getElementById('budget-input').value);
        if (customBudget && customBudget >= 10000) {
            appSettings.budget = customBudget;
            goToQuestion(3);
        } else {
            alert('10,000円以上の金額を入力してください');
        }
    });

    // Q3: 宿泊日数
    setupOptionButtons('.nights-options .option-btn', (value) => {
        playSound('button');
        appSettings.nights = parseInt(value);
        setTimeout(() => goToQuestion(4), 300);
    });

    // Q4: 交通手段
    document.getElementById('q4-next').addEventListener('click', () => {
        playSound('button');
        const checked = document.querySelectorAll('input[name="transport"]:checked');
        if (checked.length === 0) {
            alert('交通手段を1つ以上選択してください');
            return;
        }
        appSettings.transport = Array.from(checked).map(cb => cb.value);
        goToQuestion(5);
    });

    // Q5: モード
    setupOptionButtons('.mode-options .option-btn', (value) => {
        playSound('button');
        appSettings.mode = value;
        setTimeout(() => startRoulette(), 500);
    });

    // 結果画面
    document.getElementById('retry-btn').addEventListener('click', () => {
        playSound('button');
        retryJourney();
    });
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

    const eligibleCities = cities.filter(c => c.prefId === selectedPrefecture.id);
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

        const travelCost = estimateTravelCost(distance, appSettings.transport);
        const travelTime = estimateTravelTime(distance, appSettings.transport);

        if (appSettings.mode === 'normal') {
            if (travelCost > appSettings.budget * 0.6) return false;
            if (appSettings.nights === 0 && travelTime > 5) return false;
            if (appSettings.nights === 1 && travelTime > 6) return false;
        } else if (appSettings.mode === 'mystery') {
            if (travelCost > appSettings.budget * 0.6) return false;
        } else if (appSettings.mode === 'extreme') {
            if (travelCost > appSettings.budget * 0.6) return false;
            if (distance < 200) return false;
        }

        return true;
    });
}

// ======================
// 都道府県ルーレット
// ======================
async function runPrefectureRoulette(eligiblePrefectures) {
    const rouletteItem = document.getElementById('roulette-item');
    const iterations = 30;
    const baseDelay = 50;

    // ルーレット開始音
    playSound('rouletteSpin');

    for (let i = 0; i < iterations; i++) {
        const randomPref = eligiblePrefectures[Math.floor(Math.random() * eligiblePrefectures.length)];
        rouletteItem.textContent = randomPref.name;
        rouletteItem.classList.add('highlight');

        if (mainMap) {
            mainMap.setView([randomPref.lat, randomPref.lng], 6);
        }

        const delay = baseDelay + (i * 15);
        await sleep(delay);
        rouletteItem.classList.remove('highlight');

        // 終盤で減速音を再生
        if (i === iterations - 5) {
            playSound('rouletteSlow');
        }
    }

    let finalSelection;
    if (appSettings.mode === 'extreme') {
        const sortedByDistance = eligiblePrefectures.sort((a, b) => {
            const distA = calculateDistance(departureCity.lat, departureCity.lng, a.lat, a.lng);
            const distB = calculateDistance(departureCity.lat, departureCity.lng, b.lat, b.lng);
            return distB - distA;
        });
        const topCount = Math.ceil(sortedByDistance.length * 0.3);
        finalSelection = sortedByDistance[Math.floor(Math.random() * topCount)];
    } else {
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
    const iterations = 20;
    const baseDelay = 50;

    // ルーレット開始音
    playSound('rouletteSpin');

    for (let i = 0; i < iterations; i++) {
        const randomCity = eligibleCities[Math.floor(Math.random() * eligibleCities.length)];
        rouletteItem.textContent = randomCity.name;
        rouletteItem.classList.add('highlight');

        if (mainMap) {
            mainMap.setView([randomCity.lat, randomCity.lng], 10);
        }

        const delay = baseDelay + (i * 10);
        await sleep(delay);
        rouletteItem.classList.remove('highlight');

        // 終盤で減速音を再生
        if (i === iterations - 5) {
            playSound('rouletteSlow');
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

    initializeResultMap();
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
// もう一度回す
// ======================
async function retryJourney() {
    showScreen('roulette-screen');
    document.getElementById('prefecture-roulette').classList.remove('hidden');
    document.getElementById('city-roulette').classList.add('hidden');

    initializeMainMap();
    await startRoulette();
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
