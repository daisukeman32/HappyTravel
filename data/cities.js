// 市区町村データ
const CITIES_DATA = [
  {
    "id": 1,
    "prefId": 1,
    "name": "札幌市",
    "lat": 43.064615,
    "lng": 141.346807,
    "description": "北海道の中心都市"
  },
  {
    "id": 2,
    "prefId": 1,
    "name": "函館市",
    "lat": 41.768793,
    "lng": 140.729007,
    "description": "歴史的港町、夜景が有名"
  },
  {
    "id": 3,
    "prefId": 1,
    "name": "小樽市",
    "lat": 43.190812,
    "lng": 140.994751,
    "description": "運河と歴史的建造物の街"
  },
  {
    "id": 4,
    "prefId": 1,
    "name": "旭川市",
    "lat": 43.770621,
    "lng": 142.365094,
    "description": "旭山動物園で有名"
  },
  {
    "id": 5,
    "prefId": 1,
    "name": "釧路市",
    "lat": 42.984919,
    "lng": 144.381426,
    "description": "釧路湿原の玄関口"
  },
  {
    "id": 6,
    "prefId": 2,
    "name": "青森市",
    "lat": 40.824308,
    "lng": 140.739998,
    "description": "ねぶた祭りで有名"
  },
  {
    "id": 7,
    "prefId": 2,
    "name": "弘前市",
    "lat": 40.603256,
    "lng": 140.463886,
    "description": "弘前城と桜の名所"
  },
  {
    "id": 8,
    "prefId": 2,
    "name": "八戸市",
    "lat": 40.512500,
    "lng": 141.488056,
    "description": "港町、海産物が豊富"
  },
  {
    "id": 9,
    "prefId": 3,
    "name": "盛岡市",
    "lat": 39.703619,
    "lng": 141.152684,
    "description": "わんこそば発祥の地"
  },
  {
    "id": 10,
    "prefId": 3,
    "name": "平泉町",
    "lat": 38.987086,
    "lng": 141.113497,
    "description": "世界遺産、中尊寺金色堂"
  },
  {
    "id": 11,
    "prefId": 4,
    "name": "仙台市",
    "lat": 38.268837,
    "lng": 140.872103,
    "description": "杜の都、牛タンが有名"
  },
  {
    "id": 12,
    "prefId": 4,
    "name": "松島町",
    "lat": 38.374722,
    "lng": 141.063611,
    "description": "日本三景の一つ"
  },
  {
    "id": 13,
    "prefId": 5,
    "name": "秋田市",
    "lat": 39.718614,
    "lng": 140.102364,
    "description": "竿燈まつりで有名"
  },
  {
    "id": 14,
    "prefId": 5,
    "name": "角館町",
    "lat": 39.594444,
    "lng": 140.553056,
    "description": "武家屋敷と桜の名所"
  },
  {
    "id": 15,
    "prefId": 6,
    "name": "山形市",
    "lat": 38.240436,
    "lng": 140.363633,
    "description": "温泉と蔵王が有名"
  },
  {
    "id": 16,
    "prefId": 6,
    "name": "鶴岡市",
    "lat": 38.727778,
    "lng": 139.826389,
    "description": "出羽三山の玄関口"
  },
  {
    "id": 17,
    "prefId": 7,
    "name": "福島市",
    "lat": 37.750299,
    "lng": 140.467551,
    "description": "果物の産地"
  },
  {
    "id": 18,
    "prefId": 7,
    "name": "会津若松市",
    "lat": 37.495556,
    "lng": 139.929722,
    "description": "鶴ヶ城と歴史の街"
  },
  {
    "id": 19,
    "prefId": 7,
    "name": "いわき市",
    "lat": 37.048611,
    "lng": 140.888889,
    "description": "温暖な気候、海水浴場"
  },
  {
    "id": 20,
    "prefId": 8,
    "name": "水戸市",
    "lat": 36.341811,
    "lng": 140.446793,
    "description": "偕楽園と梅の名所"
  },
  {
    "id": 21,
    "prefId": 8,
    "name": "つくば市",
    "lat": 36.083889,
    "lng": 140.076389,
    "description": "科学技術の街"
  },
  {
    "id": 22,
    "prefId": 9,
    "name": "宇都宮市",
    "lat": 36.565725,
    "lng": 139.883565,
    "description": "餃子の街"
  },
  {
    "id": 23,
    "prefId": 9,
    "name": "日光市",
    "lat": 36.719722,
    "lng": 139.698889,
    "description": "世界遺産、東照宮"
  },
  {
    "id": 24,
    "prefId": 10,
    "name": "前橋市",
    "lat": 36.390668,
    "lng": 139.060406,
    "description": "絹の街"
  },
  {
    "id": 25,
    "prefId": 10,
    "name": "草津町",
    "lat": 36.623333,
    "lng": 138.597778,
    "description": "日本三名泉の一つ"
  },
  {
    "id": 26,
    "prefId": 11,
    "name": "さいたま市",
    "lat": 35.856999,
    "lng": 139.648849,
    "description": "埼玉県の中心都市"
  },
  {
    "id": 27,
    "prefId": 11,
    "name": "川越市",
    "lat": 35.925278,
    "lng": 139.485556,
    "description": "小江戸、蔵造りの街並み"
  },
  {
    "id": 28,
    "prefId": 12,
    "name": "千葉市",
    "lat": 35.605057,
    "lng": 140.123306,
    "description": "千葉県の中心都市"
  },
  {
    "id": 29,
    "prefId": 12,
    "name": "成田市",
    "lat": 35.776944,
    "lng": 140.318611,
    "description": "成田空港と成田山新勝寺"
  },
  {
    "id": 30,
    "prefId": 12,
    "name": "館山市",
    "lat": 34.996111,
    "lng": 139.869444,
    "description": "海水浴とリゾート"
  },
  {
    "id": 31,
    "prefId": 13,
    "name": "東京23区",
    "lat": 35.689487,
    "lng": 139.691706,
    "description": "日本の首都"
  },
  {
    "id": 32,
    "prefId": 13,
    "name": "八王子市",
    "lat": 35.655556,
    "lng": 139.323889,
    "description": "都心へのアクセスが良い"
  },
  {
    "id": 33,
    "prefId": 13,
    "name": "小笠原村",
    "lat": 27.094444,
    "lng": 142.191667,
    "description": "世界遺産の島々"
  },
  {
    "id": 34,
    "prefId": 14,
    "name": "横浜市",
    "lat": 35.447507,
    "lng": 139.642345,
    "description": "港町、中華街"
  },
  {
    "id": 35,
    "prefId": 14,
    "name": "鎌倉市",
    "lat": 35.319167,
    "lng": 139.546389,
    "description": "歴史と寺社の街"
  },
  {
    "id": 36,
    "prefId": 14,
    "name": "箱根町",
    "lat": 35.232500,
    "lng": 139.107222,
    "description": "温泉リゾート"
  },
  {
    "id": 37,
    "prefId": 15,
    "name": "新潟市",
    "lat": 37.902418,
    "lng": 139.023221,
    "description": "米どころ、日本海側最大都市"
  },
  {
    "id": 38,
    "prefId": 15,
    "name": "佐渡市",
    "lat": 38.018333,
    "lng": 138.367778,
    "description": "金山と伝統芸能の島"
  },
  {
    "id": 39,
    "prefId": 16,
    "name": "富山市",
    "lat": 36.695291,
    "lng": 137.211338,
    "description": "立山連峰の玄関口"
  },
  {
    "id": 40,
    "prefId": 16,
    "name": "高岡市",
    "lat": 36.751944,
    "lng": 137.023056,
    "description": "銅器と漆器の街"
  },
  {
    "id": 41,
    "prefId": 17,
    "name": "金沢市",
    "lat": 36.594682,
    "lng": 136.625573,
    "description": "兼六園、金箔の街"
  },
  {
    "id": 42,
    "prefId": 17,
    "name": "輪島市",
    "lat": 37.390278,
    "lng": 136.899444,
    "description": "輪島塗の産地"
  },
  {
    "id": 43,
    "prefId": 18,
    "name": "福井市",
    "lat": 36.065219,
    "lng": 136.221640,
    "description": "恐竜の化石が有名"
  },
  {
    "id": 44,
    "prefId": 18,
    "name": "敦賀市",
    "lat": 35.644722,
    "lng": 136.076111,
    "description": "日本海の港町"
  },
  {
    "id": 45,
    "prefId": 19,
    "name": "甲府市",
    "lat": 35.664158,
    "lng": 138.568449,
    "description": "ぶどうとワインの産地"
  },
  {
    "id": 46,
    "prefId": 19,
    "name": "富士吉田市",
    "lat": 35.486667,
    "lng": 138.810000,
    "description": "富士山の麓"
  },
  {
    "id": 47,
    "prefId": 20,
    "name": "長野市",
    "lat": 36.651299,
    "lng": 138.181239,
    "description": "善光寺の門前町"
  },
  {
    "id": 48,
    "prefId": 20,
    "name": "松本市",
    "lat": 36.238333,
    "lng": 137.972222,
    "description": "国宝松本城"
  },
  {
    "id": 49,
    "prefId": 20,
    "name": "軽井沢町",
    "lat": 36.356944,
    "lng": 138.632778,
    "description": "高原リゾート"
  },
  {
    "id": 50,
    "prefId": 21,
    "name": "岐阜市",
    "lat": 35.391227,
    "lng": 136.722291,
    "description": "長良川の鵜飼い"
  },
  {
    "id": 51,
    "prefId": 21,
    "name": "高山市",
    "lat": 36.146111,
    "lng": 137.251389,
    "description": "飛騨高山、古い街並み"
  },
  {
    "id": 52,
    "prefId": 21,
    "name": "白川村",
    "lat": 36.256944,
    "lng": 136.906389,
    "description": "世界遺産、合掌造り"
  },
  {
    "id": 53,
    "prefId": 22,
    "name": "静岡市",
    "lat": 34.976987,
    "lng": 138.383084,
    "description": "富士山とお茶の産地"
  },
  {
    "id": 54,
    "prefId": 22,
    "name": "浜松市",
    "lat": 34.710833,
    "lng": 137.726111,
    "description": "うなぎとピアノの街"
  },
  {
    "id": 55,
    "prefId": 22,
    "name": "熱海市",
    "lat": 35.095833,
    "lng": 139.071389,
    "description": "温泉リゾート"
  },
  {
    "id": 56,
    "prefId": 23,
    "name": "名古屋市",
    "lat": 35.180188,
    "lng": 136.906565,
    "description": "中部地方最大の都市"
  },
  {
    "id": 57,
    "prefId": 23,
    "name": "犬山市",
    "lat": 35.378056,
    "lng": 136.941389,
    "description": "国宝犬山城"
  },
  {
    "id": 58,
    "prefId": 24,
    "name": "津市",
    "lat": 34.730283,
    "lng": 136.508588,
    "description": "三重県の県庁所在地"
  },
  {
    "id": 59,
    "prefId": 24,
    "name": "伊勢市",
    "lat": 34.490278,
    "lng": 136.710556,
    "description": "伊勢神宮"
  },
  {
    "id": 60,
    "prefId": 24,
    "name": "鳥羽市",
    "lat": 34.478889,
    "lng": 136.844167,
    "description": "真珠と海女の街"
  },
  {
    "id": 61,
    "prefId": 25,
    "name": "大津市",
    "lat": 35.004531,
    "lng": 135.868585,
    "description": "琵琶湖の湖畔"
  },
  {
    "id": 62,
    "prefId": 25,
    "name": "彦根市",
    "lat": 35.274444,
    "lng": 136.251389,
    "description": "国宝彦根城"
  },
  {
    "id": 63,
    "prefId": 26,
    "name": "京都市",
    "lat": 35.021247,
    "lng": 135.755597,
    "description": "古都、寺社仏閣"
  },
  {
    "id": 64,
    "prefId": 26,
    "name": "宇治市",
    "lat": 34.884167,
    "lng": 135.799722,
    "description": "宇治茶と平等院"
  },
  {
    "id": 65,
    "prefId": 26,
    "name": "天橋立",
    "lat": 35.564722,
    "lng": 135.192500,
    "description": "日本三景の一つ"
  },
  {
    "id": 66,
    "prefId": 27,
    "name": "大阪市",
    "lat": 34.686297,
    "lng": 135.519661,
    "description": "西日本の中心、食の街"
  },
  {
    "id": 67,
    "prefId": 27,
    "name": "堺市",
    "lat": 34.573333,
    "lng": 135.482778,
    "description": "古墳群と刃物の街"
  },
  {
    "id": 68,
    "prefId": 28,
    "name": "神戸市",
    "lat": 34.691269,
    "lng": 135.183071,
    "description": "港町、異国情緒"
  },
  {
    "id": 69,
    "prefId": 28,
    "name": "姫路市",
    "lat": 34.815556,
    "lng": 134.685278,
    "description": "世界遺産姫路城"
  },
  {
    "id": 70,
    "prefId": 28,
    "name": "城崎温泉",
    "lat": 35.630833,
    "lng": 134.804722,
    "description": "外湯巡りの温泉街"
  },
  {
    "id": 71,
    "prefId": 29,
    "name": "奈良市",
    "lat": 34.685334,
    "lng": 135.832745,
    "description": "古都、東大寺と鹿"
  },
  {
    "id": 72,
    "prefId": 29,
    "name": "吉野町",
    "lat": 34.392500,
    "lng": 135.857778,
    "description": "桜の名所"
  },
  {
    "id": 73,
    "prefId": 30,
    "name": "和歌山市",
    "lat": 34.225987,
    "lng": 135.167509,
    "description": "和歌山城とラーメン"
  },
  {
    "id": 74,
    "prefId": 30,
    "name": "白浜町",
    "lat": 33.681111,
    "lng": 135.339722,
    "description": "白浜温泉とアドベンチャーワールド"
  },
  {
    "id": 75,
    "prefId": 30,
    "name": "高野町",
    "lat": 34.213889,
    "lng": 135.580556,
    "description": "高野山、世界遺産"
  },
  {
    "id": 76,
    "prefId": 31,
    "name": "鳥取市",
    "lat": 35.503891,
    "lng": 134.238258,
    "description": "鳥取砂丘"
  },
  {
    "id": 77,
    "prefId": 31,
    "name": "米子市",
    "lat": 35.428056,
    "lng": 133.330556,
    "description": "大山の麓"
  },
  {
    "id": 78,
    "prefId": 32,
    "name": "松江市",
    "lat": 35.472295,
    "lng": 133.050510,
    "description": "松江城と宍道湖"
  },
  {
    "id": 79,
    "prefId": 32,
    "name": "出雲市",
    "lat": 35.368889,
    "lng": 132.755000,
    "description": "出雲大社"
  },
  {
    "id": 80,
    "prefId": 33,
    "name": "岡山市",
    "lat": 34.661751,
    "lng": 133.934406,
    "description": "後楽園と桃太郎"
  },
  {
    "id": 81,
    "prefId": 33,
    "name": "倉敷市",
    "lat": 34.595556,
    "lng": 133.772222,
    "description": "美観地区、白壁の街並み"
  },
  {
    "id": 82,
    "prefId": 34,
    "name": "広島市",
    "lat": 34.396033,
    "lng": 132.459595,
    "description": "平和記念公園、お好み焼き"
  },
  {
    "id": 83,
    "prefId": 34,
    "name": "尾道市",
    "lat": 34.408889,
    "lng": 133.204722,
    "description": "坂の街、映画のロケ地"
  },
  {
    "id": 84,
    "prefId": 34,
    "name": "宮島",
    "lat": 34.295833,
    "lng": 132.319722,
    "description": "厳島神社、世界遺産"
  },
  {
    "id": 85,
    "prefId": 35,
    "name": "山口市",
    "lat": 34.185956,
    "lng": 131.470649,
    "description": "山口県の県庁所在地"
  },
  {
    "id": 86,
    "prefId": 35,
    "name": "下関市",
    "lat": 33.956111,
    "lng": 130.941389,
    "description": "ふぐの街"
  },
  {
    "id": 87,
    "prefId": 35,
    "name": "萩市",
    "lat": 34.406111,
    "lng": 131.401389,
    "description": "歴史的な城下町"
  },
  {
    "id": 88,
    "prefId": 36,
    "name": "徳島市",
    "lat": 34.065718,
    "lng": 134.559296,
    "description": "阿波踊り"
  },
  {
    "id": 89,
    "prefId": 36,
    "name": "鳴門市",
    "lat": 34.176111,
    "lng": 134.609722,
    "description": "鳴門の渦潮"
  },
  {
    "id": 90,
    "prefId": 37,
    "name": "高松市",
    "lat": 34.340149,
    "lng": 134.043444,
    "description": "栗林公園、うどん県"
  },
  {
    "id": 91,
    "prefId": 37,
    "name": "琴平町",
    "lat": 34.185833,
    "lng": 133.819722,
    "description": "金刀比羅宮"
  },
  {
    "id": 92,
    "prefId": 38,
    "name": "松山市",
    "lat": 33.841624,
    "lng": 132.765681,
    "description": "道後温泉、松山城"
  },
  {
    "id": 93,
    "prefId": 38,
    "name": "今治市",
    "lat": 34.065833,
    "lng": 132.998056,
    "description": "しまなみ海道の起点"
  },
  {
    "id": 94,
    "prefId": 39,
    "name": "高知市",
    "lat": 33.559706,
    "lng": 133.531079,
    "description": "坂本龍馬、カツオのたたき"
  },
  {
    "id": 95,
    "prefId": 39,
    "name": "四万十市",
    "lat": 32.995000,
    "lng": 132.932778,
    "description": "四万十川、最後の清流"
  },
  {
    "id": 96,
    "prefId": 40,
    "name": "福岡市",
    "lat": 33.606576,
    "lng": 130.418297,
    "description": "九州最大の都市、明太子"
  },
  {
    "id": 97,
    "prefId": 40,
    "name": "太宰府市",
    "lat": 33.513611,
    "lng": 130.523333,
    "description": "太宰府天満宮"
  },
  {
    "id": 98,
    "prefId": 40,
    "name": "北九州市",
    "lat": 33.883333,
    "lng": 130.876111,
    "description": "門司港レトロ"
  },
  {
    "id": 99,
    "prefId": 41,
    "name": "佐賀市",
    "lat": 33.249442,
    "lng": 130.299794,
    "description": "有田焼、佐賀牛"
  },
  {
    "id": 100,
    "prefId": 41,
    "name": "唐津市",
    "lat": 33.449444,
    "lng": 129.968889,
    "description": "唐津城と虹の松原"
  },
  {
    "id": 101,
    "prefId": 42,
    "name": "長崎市",
    "lat": 32.744839,
    "lng": 129.873756,
    "description": "異国情緒、夜景、ちゃんぽん"
  },
  {
    "id": 102,
    "prefId": 42,
    "name": "佐世保市",
    "lat": 33.159444,
    "lng": 129.723889,
    "description": "ハウステンボス、軍港の街"
  },
  {
    "id": 103,
    "prefId": 42,
    "name": "五島市",
    "lat": 32.693889,
    "lng": 128.841111,
    "description": "五島列島、教会群"
  },
  {
    "id": 104,
    "prefId": 43,
    "name": "熊本市",
    "lat": 32.789827,
    "lng": 130.741667,
    "description": "熊本城、馬刺し"
  },
  {
    "id": 105,
    "prefId": 43,
    "name": "阿蘇市",
    "lat": 32.951389,
    "lng": 131.121667,
    "description": "阿蘇山、カルデラ"
  },
  {
    "id": 106,
    "prefId": 43,
    "name": "天草市",
    "lat": 32.458889,
    "lng": 130.193056,
    "description": "天草四郎、イルカウォッチング"
  },
  {
    "id": 107,
    "prefId": 44,
    "name": "大分市",
    "lat": 33.238172,
    "lng": 131.612619,
    "description": "温泉県、とり天"
  },
  {
    "id": 108,
    "prefId": 44,
    "name": "別府市",
    "lat": 33.284444,
    "lng": 131.491389,
    "description": "温泉の街、地獄めぐり"
  },
  {
    "id": 109,
    "prefId": 44,
    "name": "由布市",
    "lat": 33.180556,
    "lng": 131.427778,
    "description": "由布院温泉"
  },
  {
    "id": 110,
    "prefId": 45,
    "name": "宮崎市",
    "lat": 31.911096,
    "lng": 131.423855,
    "description": "日南海岸、マンゴー"
  },
  {
    "id": 111,
    "prefId": 45,
    "name": "高千穂町",
    "lat": 32.714167,
    "lng": 131.303611,
    "description": "高千穂峡、神話の里"
  },
  {
    "id": 112,
    "prefId": 46,
    "name": "鹿児島市",
    "lat": 31.560146,
    "lng": 130.557978,
    "description": "桜島、黒豚"
  },
  {
    "id": 113,
    "prefId": 46,
    "name": "指宿市",
    "lat": 31.251389,
    "lng": 130.633333,
    "description": "砂むし温泉"
  },
  {
    "id": 114,
    "prefId": 46,
    "name": "屋久島",
    "lat": 30.334722,
    "lng": 130.529167,
    "description": "世界遺産、屋久杉"
  },
  {
    "id": 115,
    "prefId": 47,
    "name": "那覇市",
    "lat": 26.212401,
    "lng": 127.680932,
    "description": "沖縄県庁所在地、首里城"
  },
  {
    "id": 116,
    "prefId": 47,
    "name": "石垣市",
    "lat": 24.340556,
    "lng": 124.155556,
    "description": "石垣島、八重山諸島の玄関"
  },
  {
    "id": 117,
    "prefId": 47,
    "name": "宮古島市",
    "lat": 24.805417,
    "lng": 125.281111,
    "description": "宮古島、美しいビーチ"
  },
  {
    "id": 118,
    "prefId": 47,
    "name": "名護市",
    "lat": 26.591944,
    "lng": 127.977222,
    "description": "沖縄美ら海水族館"
  }
];
