#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Geoloniaの住所データから市区町村データを抽出してJSONを生成
"""

import csv
import json
from collections import defaultdict

# 既存の都道府県データを読み込んで都道府県コードとprefIdのマッピングを作成
with open('data/prefectures.json', 'r', encoding='utf-8') as f:
    prefectures = json.load(f)

# 都道府県名からprefIdへのマッピング
pref_name_to_id = {pref['name']: pref['id'] for pref in prefectures}

# 市区町村ごとにデータを集約
cities_dict = defaultdict(lambda: {
    'coords': [],
    'pref_code': None,
    'pref_name': None,
    'city_code': None,
    'city_name': None
})

print("CSVファイルを読み込み中...")
with open('latest.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        pref_code = row['都道府県コード']
        pref_name = row['都道府県名']
        city_code = row['市区町村コード']
        city_name = row['市区町村名']
        # 緯度経度が空の場合はスキップ
        if not row['緯度'] or not row['経度']:
            continue

        try:
            lat = float(row['緯度'])
            lng = float(row['経度'])
        except ValueError:
            continue

        # 市区町村コードをキーとして集約
        key = city_code
        cities_dict[key]['pref_code'] = pref_code
        cities_dict[key]['pref_name'] = pref_name
        cities_dict[key]['city_code'] = city_code
        cities_dict[key]['city_name'] = city_name
        cities_dict[key]['coords'].append((lat, lng))

print(f"総市区町村数: {len(cities_dict)}")

# 各市区町村の代表座標を計算（平均値）
cities_list = []
city_id = 1

for city_code, city_data in sorted(cities_dict.items()):
    # 緯度経度の平均を計算
    avg_lat = sum(coord[0] for coord in city_data['coords']) / len(city_data['coords'])
    avg_lng = sum(coord[1] for coord in city_data['coords']) / len(city_data['coords'])

    # 都道府県IDを取得
    pref_name = city_data['pref_name']
    pref_id = pref_name_to_id.get(pref_name)

    if pref_id is None:
        print(f"警告: {pref_name} が見つかりません")
        continue

    city_entry = {
        "id": city_id,
        "prefId": pref_id,
        "name": city_data['city_name'],
        "lat": round(avg_lat, 6),
        "lng": round(avg_lng, 6),
        "description": ""
    }

    cities_list.append(city_entry)
    city_id += 1

print(f"生成された市区町村データ: {len(cities_list)}件")

# JSONファイルに保存
with open('data/cities.json', 'w', encoding='utf-8') as f:
    json.dump(cities_list, f, ensure_ascii=False, indent=2)

print("data/cities.json を生成しました")

# 都道府県ごとの件数を表示
from collections import Counter
pref_counts = Counter(city['prefId'] for city in cities_list)
print("\n都道府県ごとの市区町村数:")
for pref in sorted(prefectures, key=lambda x: x['id']):
    count = pref_counts.get(pref['id'], 0)
    print(f"  {pref['name']}: {count}件")

print(f"\n合計: {len(cities_list)}件の市区町村データを生成しました")
