from asyncio.windows_events import NULL
import os
import django
import json
from pandas.io.json import json_normalize
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Odiya.settings')
django.setup()

from commercial_area.models import SeoulGuDong, CommercialArea, CommercialAreaRevenue, CommercialAreaPeople, CommercialAreaBackground, CommercialAreaNumber
import pandas as pd
import json
# from pandas.io.json import json_normalize

# df = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')    
# ### SeoulGuDong Model
# res = []
# check = []
# instances = []
# for i in range(len(df)):
#     dongCode = df.iloc[i]['행정동_코드']
#     code = df.iloc[i]['상권_코드']
#     guName = df.iloc[i]['시군구명']
#     dongName = df.iloc[i]['행정동명']
#     if code in res: continue
#     if dongName in check: continue
#     res.append(code)
#     check.append(dongName)
#     instances.append(SeoulGuDong(dongCode=dongCode, guName=guName, dongName=dongName))
# SeoulGuDong.objects.bulk_create(instances)


df = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')
# 구의 중심좌표를 구하기 위함
df_gu = pd.read_csv('../Data/XY_point/gu.csv')
res = []
gu_center_point = []
for i in range(len(df)):
    code = df.iloc[i]['상권_코드']
    res.append(code)
    for j in range(len(df_gu)):
        if df.iloc[i]['시군구명'] == df_gu.iloc[j]['시군구명']:
            guCenterXPoint = df_gu.iloc[j]['X']# 구 중심의 x좌표
            guCenterYPoint = df_gu.iloc[j]['Y']# 구 중심의 y좌표
            gu_center_point.append([guCenterXPoint, guCenterYPoint])

# # 구의 경계좌표를 구하기 위함
df_gu2 = pd.read_json('../Data/XY_point/seoul_sigungu.json', orient='index')
gu_point_array = []
for i in range(len(df_gu2[0]['features'])):
    if df_gu2[0]['features'][i]['properties']['SIG_CD'][0] == '1':
        gu_point = str(df_gu2[0]['features'][i]['geometry']['coordinates'][0])
        gu_point = gu_point[1:]
        gu_point = gu_point[:-1]
        gu_name = df_gu2[0]['features'][i]['properties']['SIG_KOR_NM']
        gu_point_array.append((gu_name, gu_point))

# 동의 중심좌표를 구하기 위함
df_dong = pd.read_csv('../Data/XY_point/dong.csv', encoding='CP949')
dong_center_point = []
for i in range(len(df)):
    for j in range(len(df_dong)):
        # 강남구에도 신사동이 있고 관악구에도 신사동(신림동)이 있다
        if df.iloc[i]['행정동명'] == df_dong.iloc[j]['읍면동명'] and df.iloc[i]['시군구명'] == df_dong.iloc[j]['시군구명']:
            dongCenterXPoint = df_dong.iloc[j]['X'] # 동 중심의 x좌표
            dongCenterYPoint = df_dong.iloc[j]['Y'] # 동 중심의 y좌표
            dong_center_point.append([dongCenterXPoint, dongCenterYPoint])


# 동의 경계좌표를 구하기 위함
df_dong2 = pd.read_json('../Data/XY_point/seoul_sigungudong.json', orient='index')
dong_point_array = []
for i in range(len(df_dong2[0]['features'])):
    dong_point = str(df_dong2[0]['features'][i]['geometry']['coordinates'][0])
    dong_point = dong_point[1:-1]
    dong_point_array.append([df_dong2[0]['features'][i]['properties']['adm_nm'], dong_point])


## 지역 테이블 만들기
df = pd.read_csv('../Data/commercialAreaData/상권-행정동.csv', encoding='CP949')
# 구의 중심좌표를 구하기 위함
df_gu = pd.read_csv('../Data/XY_point/gu.csv')
gu_center_point = []
for i in range(len(df)):
    for j in range(len(df_gu)):
        if df.iloc[i]['시군구명'] == df_gu.iloc[j]['시군구명']:
            guCenterXPoint = df_gu.iloc[j]['X']# 구 중심의 x좌표
            guCenterYPoint = df_gu.iloc[j]['Y']# 구 중심의 y좌표
            gu_center_point.append([guCenterXPoint, guCenterYPoint])

# # 구의 경계좌표를 구하기 위함
df_gu2 = pd.read_json('../Data/XY_point/seoul_sigungu.json', orient='index')
gu_point_array = []
for i in range(len(df_gu2[0]['features'])):
    if df_gu2[0]['features'][i]['properties']['SIG_CD'][0] == '1':
        gu_point = str(df_gu2[0]['features'][i]['geometry']['coordinates'][0])
        gu_point = gu_point[1:]
        gu_point = gu_point[:-1]
        gu_name = df_gu2[0]['features'][i]['properties']['SIG_KOR_NM']
        gu_point_array.append((gu_name, gu_point))

# 동의 중심좌표를 구하기 위함
df_dong = pd.read_csv('../Data/XY_point/dong.csv', encoding='CP949')
dong_center_point = []
for i in range(len(df)):
    for j in range(len(df_dong)):
        # 강남구에도 신사동이 있고 관악구에도 신사동(신림동)이 있다
        if df.iloc[i]['행정동명'] == df_dong.iloc[j]['읍면동명'] and df.iloc[i]['시군구명'] == df_dong.iloc[j]['시군구명']:
            dongCenterXPoint = df_dong.iloc[j]['X'] # 동 중심의 x좌표
            dongCenterYPoint = df_dong.iloc[j]['Y'] # 동 중심의 y좌표
            dong_center_point.append([dongCenterXPoint, dongCenterYPoint])


# 동의 경계좌표를 구하기 위함
df_dong2 = pd.read_json('../Data/XY_point/seoul_sigungudong.json', orient='index')
dong_point_array = []
for i in range(len(df_dong2[0]['features'])):
    dong_point = str(df_dong2[0]['features'][i]['geometry']['coordinates'][0])
    dong_point = dong_point[1:-1]
    dong_point_array.append([df_dong2[0]['features'][i]['properties']['adm_nm'], dong_point])


### SeoulGuDong Model
instances = []
check = []
for i in range(len(df)):
    dongCode = df.iloc[i]['행정동_코드']
    guName = df.iloc[i]['시군구명']
    guCenterXPoint = gu_center_point[i][0] # 구 중심의 x좌표
    guCenterYPoint = gu_center_point[i][1] # 구 중심의 y좌표
    for j in gu_point_array:
        if j[0] == guName:
            guXYPoint = j[1] # 구 경계의 xy좌표
            break
    # print(dongCode, guName, guCenterXPoint, guCenterYPoint, guXYPoint)
    dongName = df.iloc[i]['행정동명']
    dongCenterXPoint = dong_center_point[i][0] # 동 중심의 x좌표
    dongCenterYPoint = dong_center_point[i][1]# 동 중심의 y좌표
    for k in dong_point_array:
        if k[0][6:] == guName + ' ' + dongName:
            dongXYPoint = k[1] # 동 경계의 xy좌표
            break
    # print(dongName + guName, dongXYPoint)
    if dongCode in check: continue
    check.append(dongCode)
    # print(dongCode, guName, (guCenterXPoint, guCenterYPoint), guXYPoint, dongName, (dongCenterXPoint, dongCenterYPoint), dongXYPoint)
    instances.append(SeoulGuDong(dongCode=dongCode, guName=guName, guCenterXPoint=guCenterXPoint, guCenterYPoint=guCenterYPoint, guXYPoint=guXYPoint, dongName=dongName, 
                                 dongCenterXPoint=dongCenterXPoint, dongCenterYPoint=dongCenterYPoint, dongXYPoint=dongXYPoint))
SeoulGuDong.objects.bulk_create(instances)


### dataFrame
df1 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-추정매출).csv', encoding='CP949')
df1 = df1.loc[(df1['기준_분기_코드'] == 3) & (df1['서비스_업종_코드_명'] == '커피-음료')]
df2 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-점포).csv', encoding='CP949')
df2 = df2.loc[(df2['기준_년_코드'] == 2021) &(df2['기준_분기_코드'] == 3) & (df2['서비스_업종_코드_명'] == '커피-음료')]
df3 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-생활인구).csv', encoding='CP949')
df3 = df3.loc[(df3['기준 년코드'] == 2021) &(df3['기준_분기_코드'] == 3)]
df4 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권-상권변화지표).csv', encoding='CP949')
df4 = df4.loc[(df4['기준_년_코드'] == 2021) & (df4['기준_분기_코드'] == 3)]
df5 = pd.read_csv('../Data/commercialAreaData/서울시 우리마을가게 상권분석서비스(상권배후지-소득소비).csv', encoding='CP949')
df5 = df5.loc[(df5['기준 년 코드'] == 2021) & (df4['기준_분기_코드'] == 3)]

### CommercialArea Model
instances=  []
for i in range(len(res)):
    code = res[i]
    dongCode = df.loc[df['상권_코드'] == code]['행정동_코드'].values[0]
    temp_df = df4.loc[df4['상권_코드'] == code]
    if temp_df.empty:
        continue
    commercialAreaCode = temp_df['상권_코드'].values[0]
    commercialAreaName = temp_df['상권_코드_명'].values[0]
    commercialAreaChange = temp_df['상권_변화_지표_명'].values[0]
    with open("../Data/XY_point/seoul_sanggwon.json", "r", encoding="utf8") as f:
        contents = f.read()
        json_data = json.loads(contents)
        commercialAreaXYPoint = NULL
        for i in range(len(json_data['features'])):
            name = str(json_data['features'][i]['properties']['TRDAR_CD_N'])
            if name == commercialAreaName:
                commercialAreaXYPoint = str(json_data['features'][i]['geometry']['coordinates'][0])[1:-1]
                break
    seoulGuDong = SeoulGuDong.objects.get(dongCode=dongCode)

    instances.append(CommercialArea(seoulGuDong=seoulGuDong, commercialAreaCode=commercialAreaCode, commercialAreaName=commercialAreaName, commercialAreaChange=commercialAreaChange, commercialAreaXYPoint=commercialAreaXYPoint))
CommercialArea.objects.bulk_create(instances)

### CommercialAreaRevenue Model
### 상권-추정매출
instances = []
for i in range(len(res)):
    code = res[i]
    temp_df = df1.loc[df1['상권_코드'] == code]
    if temp_df.empty:
        continue
    quaterRevenue = temp_df['분기당_매출_금액'].values[0]
    if temp_df['분기당_매출_건수'].values[0] == 0:
        perRevenue = 0
    else:
        perRevenue = temp_df['분기당_매출_금액'].values[0] / temp_df['분기당_매출_건수'].values[0]
    maleRevenue = temp_df['남성_매출_금액'].values[0]
    femaleRevenue = temp_df['여성_매출_금액'].values[0]
    
    lst = list(temp_df.iloc[0, 27:33].values)
    idx = lst.index(max(lst))
    if idx == 0: ageGroup = '10대'
    elif idx == 1: ageGroup = '20대'
    elif idx == 2: ageGroup = '30대'
    elif idx == 3: ageGroup = '40대'
    elif idx == 4: ageGroup = '50대'
    elif idx == 5: ageGroup = '60대 이상'
    
    lst = list(temp_df.iloc[0, 19:25].values)
    idx = lst.index(max(lst))
    if idx == 0: timeGroup = '0~6시'
    elif idx == 1: timeGroup = '6~11시'
    elif idx == 2: timeGroup = '11~14시'
    elif idx == 3: timeGroup = '14~17시'
    elif idx == 4: timeGroup = '17~21시'
    elif idx == 5: timeGroup = '21~24시'
    
    commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
    instances.append(CommercialAreaRevenue(commercialArea=commercialArea, quaterRevenue=quaterRevenue, perRevenue=perRevenue, maleRevenue=maleRevenue, femaleRevenue=femaleRevenue, ageGroup=ageGroup, timeGroup=timeGroup))
CommercialAreaRevenue.objects.bulk_create(instances)
    
    
### CommercialAreaNumber Model    
### 상권-점포
instances = []
for i in range(len(res)):
    code = res[i]
    temp_df = df2.loc[df2['상권_코드'] == code]
    if temp_df.empty:
        continue
    numberStore = temp_df['점포_수'].values[0]
    numberSimilarStore = temp_df['유사_업종_점포_수'].values[0]
    openingStore = temp_df['개업_점포_수'].values[0]
    closureStore = temp_df['폐업_점포_수'].values[0]
    openingRate = temp_df['개업_율'].values[0]
    closureRate = temp_df['폐업_률'].values[0]
    commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
    instances.append(CommercialAreaNumber(commercialArea=commercialArea, numberStore=numberStore, numberSimilarStore=numberSimilarStore, openingStore=openingStore, closureStore=closureStore, openingRate=openingRate, closureRate=closureRate))
CommercialAreaNumber.objects.bulk_create(instances)
    
### CommercialAreaPeople Model
### 상권-생활인구
instances = []
for i in range(len(res)):
    code = res[i] 
    temp_df = df3.loc[df3['상권_코드'] == code]
    if temp_df.empty:
        continue
    likePeople = temp_df['총_생활인구_수'].values[0]
    maleLikePeople = temp_df['남성_생활인구_수'].values[0]
    femaleLikePeople = temp_df['여성_생활인구_수'].values[0]
    likePeopleAge10 = temp_df['연령대_10_생활인구_수'].values[0]
    likePeopleAge20 = temp_df['연령대_20_생활인구_수'].values[0]
    likePeopleAge30 = temp_df['연령대_30_생활인구_수'].values[0]
    likePeopleAge40 = temp_df['연령대_40_생활인구_수'].values[0]
    likePeopleAge50 = temp_df['연령대_50_생활인구_수'].values[0]
    likePeopleAge60 = temp_df['연령대_60_이상_생활인구_수'].values[0]
    commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
    instances.append(CommercialAreaPeople(commercialArea=commercialArea, likePeople=likePeople, maleLikePeople=maleLikePeople, femaleLikePeople=femaleLikePeople, likePeopleAge10=likePeopleAge10, likePeopleAge20=likePeopleAge20, likePeopleAge30=likePeopleAge30, likePeopleAge40=likePeopleAge40, likePeopleAge50=likePeopleAge50, likePeopleAge60=likePeopleAge60))
CommercialAreaPeople.objects.bulk_create(instances)

### CommercialAreaBackground Model
### 상권배후지-소득소비
instances = []
for i in range(len(res)):
    code = res[i] 
    temp_df = df5.loc[df5['상권_코드'] == code]
    if temp_df.empty:
        continue
    avgIncome = temp_df['월_평균_소득_금액'].values[0]
    gradeIncome = temp_df['소득_구간_코드'].values[0]
    commercialArea = CommercialArea.objects.get(commercialAreaCode=code)
    instances.append(CommercialAreaBackground(commercialArea=commercialArea, avgIncome=avgIncome, gradeIncome=gradeIncome))
CommercialAreaBackground.objects.bulk_create(instances)
