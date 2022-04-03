import React, { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import markerImg from '../assets/marker.png';
import { StyledEngineProvider } from '@mui/material/styles';

import Search from './Search';
import Comm from './Comm';
import RightSide from '../components/Sidebar';

import '../styles/Map.css';
import '../styles/Location.css'
import { Fab } from '@mui/material';

import axios from 'axios';


const { kakao } = window;

// 초기 시작 위치 : 서울시
var mapCenter = new kakao.maps.LatLng(37.56690518860781, 126.97808628226417);
const options = {
  center: mapCenter,
  level: 8
}

const locationSeoulGu = [
  {latlng: new kakao.maps.LatLng(37.59491732, 126.9773213), name: "종로구"},
  {latlng: new kakao.maps.LatLng(37.56014356, 126.9959681), name: "중구"},
  {latlng: new kakao.maps.LatLng(37.53138497, 126.979907), name: "용산구"},
  {latlng: new kakao.maps.LatLng(37.55102969, 127.0410585), name: "성동구"},
  {latlng: new kakao.maps.LatLng(37.54670608, 127.0857435	), name: "광진구"},
  {latlng: new kakao.maps.LatLng(37.58195655, 127.0548481), name: "동대문구"},
  {latlng: new kakao.maps.LatLng(37.59780259, 127.0928803), name: "중랑구"},
  {latlng: new kakao.maps.LatLng(37.6057019, 127.0175795), name: "성북구"},
  {latlng: new kakao.maps.LatLng(37.64347391, 127.011189), name: "강북구"},
  {latlng: new kakao.maps.LatLng(37.66910208, 127.0323688), name: "도봉구"},
  {latlng: new kakao.maps.LatLng(37.65251105, 127.0750347), name: "노원구"},
  {latlng: new kakao.maps.LatLng(37.61921128, 126.9270229), name: "은평구"},
  {latlng: new kakao.maps.LatLng(37.57778531, 126.9390631), name: "서대문구"},
  {latlng: new kakao.maps.LatLng(37.55931349, 126.90827), name: "마포구"},
  {latlng: new kakao.maps.LatLng(37.52478941, 126.8554777), name: "양천구"},
  {latlng: new kakao.maps.LatLng(37.56123543, 126.822807), name: "강서구"},
  {latlng: new kakao.maps.LatLng(37.49440543, 126.8563006), name: "구로구"},
  {latlng: new kakao.maps.LatLng(37.46056756, 126.9008202), name: "금천구"},
  {latlng: new kakao.maps.LatLng(37.52230829, 126.9101695), name: "영등포구"},
  {latlng: new kakao.maps.LatLng(37.49887688, 126.9516415), name: "동작구"},
  {latlng: new kakao.maps.LatLng(37.46737569, 126.9453372), name: "관악구"},
  {latlng: new kakao.maps.LatLng(37.47329547, 127.0312203), name: "서초구"},
  {latlng: new kakao.maps.LatLng(37.49664389, 127.0629852), name: "강남구"},
  {latlng: new kakao.maps.LatLng(37.50561924, 127.115295), name: "송파구"},
  {latlng: new kakao.maps.LatLng(37.55045024, 127.1470118), name: "강동구"},
];

// [0] 에는 구에 대한 정보 (이름, 2차원 영역좌표, 유동인구, 매출 )
// [1] 부터는 해당 구에 존재하는 동에 대한 정보 (이름, 중심 좌표, 2차원 영역 좌표)
const testGangbuk = [
{
  name : '강북구',  // 구 이름
  area : [[127.00456669928377,37.685079809932695],[127.00552944076941,37.68486524210563],[127.00866351452713,37.68444952141505],[127.0124440453933,37.652183699689495],[127.04259884914923,37.63045140883515],[127.04973665620547,37.62426629764204],[127.0497051421607,37.6242480116188],[127.04935721171294,37.6240516224937],[127.04928585549708,37.62401082801155],[127.04924142349843,37.623985222127374],[127.04919803439607,37.62396075103935],[127.04852504483249,37.623576131523144],[127.04822617458555,37.62340703719239],[127.04790640954319,37.62322471492216],[127.04750768358487,37.622989490014604],[127.04743756304615,37.62294700008334],[127.04689895984963,37.6226222970845],[127.04686761675994,37.622603442614974],[127.04666450762,37.62243937096895],[127.04656004063781,37.62235466471928],[127.04652762652059,37.62232510692628],[127.04632307661466,37.62211712147273],[127.04630272038209,37.62209656883751],[127.04612718923744,37.62192139472005],[127.04608064032381,37.62187507490702],[127.04592033017944,37.62165524215832],[127.04588065245423,37.621600918976405],[127.04575170161671,37.62142668180501],[127.04570564123979,37.62136278353638],[127.04562201115762,37.621207395760834],[127.04559265336418,37.621153753365526],[127.04521378705036,37.62044733662481],[127.04504919417691,37.62013825312257],[127.04470511327746,37.61949305241152],[127.04467889674763,37.61944350808388],[127.04457174389962,37.61932557285603],[127.04453083960054,37.61928138567468],[127.04409643116806,37.61880684365606],[127.0440452471034,37.61875055083345],[127.04402259067056,37.61872578203305],[127.04395865588683,37.61865513213506],[127.0439474922587,37.6186433152854],[127.04392377580642,37.61862670972966],[127.04377539164442,37.61852145635508],[127.04373166404268,37.618490505304685],[127.04359003403657,37.61839032179864],[127.04356946771797,37.61837572423448],[127.04353054471152,37.618348105024594],[127.04334799810255,37.61821894223057],[127.04325133138025,37.61815055599109],[127.04320883913859,37.61812016291598],[127.04313801896839,37.61806978706031],[127.04302825347514,37.617991557537316],[127.04277170519121,37.61781032515078],[127.04269220611047,37.617754032615636],[127.04257712733103,37.617672146540855],[127.04249374226994,37.61761361178073],[127.04239653297091,37.61754437810023],[127.04212175496356,37.61734795105526],[127.04183405545108,37.617131814320615],[127.04152724155374,37.61692159379124],[127.0414272226217,37.616868974341074],[127.04138566184474,37.61684085976883],[127.04134436413199,37.61681747524199],[127.04127284114051,37.61676133221561],[127.041171034101,37.61668943216064],[127.04116023664555,37.61668324604999],[127.04096780791564,37.616571246538676],[127.04062695964568,37.61624700688506],[127.0405233761909,37.616154402313455],[127.04001525615276,37.61577165227352],[127.04000195276993,37.61571563361864],[127.03990101342387,37.61558587117589],[127.0399002942193,37.61557488845209],[127.03989405414582,37.615488171064705],[127.03987916550128,37.615432702507064],[127.03966914892258,37.61518134282824],[127.03964081451763,37.6151447451256],[127.0396153216279,37.615127589669065],[127.03958982874072,37.6151104161873],[127.03820943342183,37.614016440663846],[127.03822091822236,37.61399364226878],[127.03819525601416,37.613976189230826],[127.03815046859171,37.61394494810271],[127.03790934023377,37.61376791682065],[127.0378519397169,37.61362829142324],[127.03782111845237,37.61357536825892],[127.03745713388098,37.612917483995545],[127.03742739501638,37.61290031133283],[127.03735622705432,37.6128383904953],[127.03734151993548,37.612825763201315],[127.03732205400537,37.612809118972265],[127.03731108651321,37.61280078822109],[127.03730682642784,37.612797582019226],[127.0372956779401,37.612789701812176],[127.03727921584503,37.61277816522979],[127.03727336977947,37.612774220702526],[127.03708377864508,37.612641671544644],[127.03678035795532,37.61242636495889],[127.03676601687833,37.612421017412935],[127.0361761591313,37.61235841171026],[127.03609598648332,37.612340694900766],[127.0361116000938,37.61242825671203],[127.03604877757385,37.61243278001582],[127.03600311271705,37.61241054813533],[127.03533466919625,37.61195574590311],[127.03351832096891,37.61077624573932],[127.03196175304595,37.60989397466831],[127.0317647880775,37.609801638629435],[127.0302592121429,37.60897371514489],[127.0302501876814,37.608978501556365],[127.0303134597902,37.61058758567321],[127.03031416892364,37.61060560513483],[127.03034469788639,37.611297380423466],[127.03034398827901,37.61130751664001],[127.02684145802169,37.612676406465454],[127.02683561423449,37.61267753394586],[127.02682835470843,37.61267866172962],[127.02456460385932,37.61214134764753],[127.02447982240983,37.61207971000694],[127.0234421625137,37.61173358802872],[127.02329154960275,37.611684908845056],[127.02257617980884,37.61140067083131],[127.02250378806197,37.611368302445086],[127.02249707191545,37.611368303639004],[127.02219782476139,37.611371167510555],[127.02213571735837,37.611381314418956],[127.02067197748505,37.612511445932185],[127.0206659638747,37.61251314075302],[127.02065940669317,37.612515114965966],[127.0204322049696,37.61258694179425],[127.02039628200403,37.61259793050902],[127.01854514683215,37.61385564865526],[127.01853947246192,37.6138556494737],[127.01781826197866,37.61437859967905],[127.01781755119458,37.61439126757237],[127.01777686497151,37.61443125872776],[127.01653445220454,37.61494216249539],[127.01652117755347,37.614940758652985],[127.01094918201996,37.61628689639997],[127.01093767448135,37.616288023544904],[127.01011516011185,37.616892869695945],[127.01013853266441,37.616943827464354],[127.00816685846083,37.619319165068866],[127.00803235772581,37.61939265652918],[127.00794935525421,37.619407302011574],[127.00794422439719,37.61941012235964],[127.00786638893231,37.619847660654855],[127.00786373946737,37.61986004927681],[127.00759349019982,37.62001914057828],[127.00757101939291,37.620043918690804],[127.00724860721401,37.620786405569255],[127.00721020005791,37.62082807776068],[127.00757679865328,37.621470845769785],[127.00758228321119,37.6214975955867],[127.00558297060526,37.623847833347114],[127.00556509553847,37.62384586081553],[126.99651665178031,37.629067287449914],[126.99649982759698,37.629089802198116],[126.99604100854972,37.62934656076568],[126.99137997811071,37.63260498377816],[126.99136741359557,37.632610334509145],[126.98993374172927,37.63279856096716],[126.98992736260514,37.6328044707584],[126.98591770163266,37.635788777910605],[126.9853777477391,37.63597003607466],[126.9844140702289,37.636269760213786],[126.98446134688953,37.63654765013691],[126.99219757789712,37.679626923004186],[127.00456669928377,37.685079809932695]],
  movePeople : 500000,  // 유동 인구
  money : 41241204214125125,  // 매출
},
{
  name : '우이동',
  latlng: new kakao.maps.LatLng(37.66035273, 127.000323),
  area : [[127.00866351452713,37.68444952141505],[127.00864309423294,37.683946952337074],[127.00841947921626,37.68323519891596],[127.00869996371456,37.6822277798673],[127.00903469330933,37.68164072250559],[127.0088999587801,37.680594478553836],[127.00941654430962,37.67957184295949],[127.01142368078551,37.67918821118842],[127.01213305292329,37.6790977730849],[127.01238805533457,37.67870301634992],[127.01278123056298,37.678399748576226],[127.01331074193048,37.67782954414724],[127.0134762434142,37.677185612202614],[127.01375387073983,37.67659151012958],[127.01398099742292,37.675883097399485],[127.01390614415018,37.675239757392845],[127.01436267300896,37.674816810418655],[127.01457290408152,37.67478469472739],[127.01484522406645,37.67433924179211],[127.01511706689062,37.67415423222196],[127.01622132559777,37.67393251473056],[127.0166575313267,37.67294786826982],[127.01717901624663,37.67248126779399],[127.01739732975327,37.672169276973186],[127.01730394361817,37.671913350305864],[127.01795137236441,37.670789307850995],[127.01824835361039,37.67068761839654],[127.01869841627088,37.67086239643968],[127.01874492237316,37.67051748837645],[127.01849458128302,37.670155730124584],[127.01853730792332,37.669538278417214],[127.01836561522839,37.66920043829539],[127.0184059292305,37.668887903103794],[127.01758050690242,37.66829703424857],[127.01745525865586,37.668121082219386],[127.01663082440895,37.66790833584722],[127.0162234112022,37.667496471499156],[127.01637374602058,37.66737031644687],[127.01578766865019,37.66703365010783],[127.01574860856014,37.66654516522911],[127.01547013292809,37.66607640412326],[127.01537422946599,37.66555441855151],[127.01576355948453,37.66506869350752],[127.01564852780572,37.66450785139183],[127.01533215589198,37.664075421581146],[127.01533900902542,37.663749376472374],[127.01556527225883,37.6634376759581],[127.01595128991342,37.66329290597813],[127.01597987345919,37.6627680853099],[127.0166525170971,37.66220714478456],[127.01694311257397,37.66223070437492],[127.01649957628204,37.661662075124106],[127.0158807895681,37.661323160630104],[127.01533573204429,37.661355606719],[127.01489519796056,37.66162312961002],[127.01465912232007,37.66148237896354],[127.01457004458692,37.66045865714504],[127.01433679254795,37.66023653854157],[127.01426482091387,37.65980210561528],[127.01402194600801,37.65921762457369],[127.01379702675484,37.65794812125217],[127.01346482328765,37.65678111400266],[127.01300837706572,37.65477621110159],[127.01290752790595,37.654162710961785],[127.01266430829769,37.65342816017312],[127.0124440453933,37.65218369968953],[127.01271270980813,37.65147894956723],[127.0129050686908,37.65074688855651],[127.013140512242,37.65048839372594],[127.01367788281127,37.65049509689645],[127.01399566115265,37.65025320582681],[127.01430159768405,37.65028604067414],[127.0145378914414,37.64980583084263],[127.01509340509921,37.64928342398452],[127.0149633013151,37.649120128094424],[127.01399920787723,37.649169544404785],[127.01384187135525,37.6492420624635],[127.0130281865917,37.64927264266053],[127.0124394874362,37.64922548747662],[127.01137390299473,37.64933519399154],[127.01015352760207,37.650035365760786],[127.009839406545,37.64994889465949],[127.00950934175485,37.65017082777856],[127.00905311135172,37.64997138177093],[127.00835827442111,37.65013495116874],[127.00800271469318,37.65043121202988],[127.00759441743443,37.65020716111184],[127.00645281575694,37.649365946291425],[127.00612545951817,37.64953095521392],[127.00492647344562,37.64953883439989],[127.00437915095623,37.64925720389729],[127.003783650748,37.64932751996032],[127.00304813325194,37.649185231652474],[127.00242005106588,37.64897802267703],[127.00107353706714,37.649205882036455],[126.99916950451916,37.649467232520756],[126.99876191707123,37.649294236340985],[126.9981669972811,37.64968830772618],[126.99748740604417,37.65041888762477],[126.99642340153905,37.649886640120684],[126.99585609912862,37.64898221476118],[126.99543563199322,37.64846890786113],[126.99490057653286,37.64835022051812],[126.99436759841765,37.64785609417857],[126.99382309545253,37.647111132889464],[126.99294992815096,37.64603746943083],[126.9924094570124,37.645904174532646],[126.99197746010283,37.645495187215396],[126.99161824148723,37.64486294245334],[126.99062375483172,37.64396953654857],[126.98979719819998,37.64315344273777],[126.989146310304,37.642365742350876],[126.98855247026209,37.641788530790194],[126.98797412512566,37.6416007022055],[126.9860774075886,37.642106782179866],[126.98522409651089,37.641636043097705],[126.98495609323129,37.641464247106725],[126.98425676979198,37.64164490975649],[126.98383069885097,37.64214883500716],[126.983874324907,37.642560182785175],[126.98369062384191,37.643039366591616],[126.98324715955933,37.643683497076424],[126.98418990900514,37.64442807123353],[126.98419340288967,37.644603482812265],[126.98464293237556,37.64533755562803],[126.9851058254136,37.64572841943736],[126.98492887455092,37.646066828309266],[126.9846785067921,37.64696325481499],[126.98460293957434,37.64761251484857],[126.9839806540433,37.648182011935155],[126.98388370646816,37.648600671929735],[126.98401951460978,37.649317526653164],[126.98393693006936,37.64961005213857],[126.98249528992301,37.65054036518172],[126.9822982184273,37.6512540769904],[126.9818735134505,37.65168843897247],[126.9816764558138,37.6523162869429],[126.98104778818517,37.652712608642325],[126.98043147764702,37.653787182971016],[126.97994407898825,37.654815053752436],[126.97965811208874,37.65603864194429],[126.98119336118287,37.65648771010476],[126.98285678643859,37.65644969358682],[126.98300998981281,37.65700353777313],[126.9837415700962,37.65732940672059],[126.9843352076833,37.65773380701134],[126.98461681645749,37.65822853623368],[126.98602052160858,37.65894331926581],[126.98654402836377,37.65948509766664],[126.98727674413276,37.66060014390849],[126.98728371849253,37.66117029016198],[126.98736526702832,37.661618255149136],[126.98775075727946,37.66273240900101],[126.98780195097312,37.66359369166712],[126.98826825660075,37.664391106549886],[126.98945314492184,37.664530037749444],[126.98999717126229,37.66449940494576],[126.99123850327308,37.66499364949576],[126.99222451888318,37.665231642408706],[126.99274903836123,37.665532661782436],[126.99312299923791,37.66605637970489],[126.99401724796753,37.66678312839973],[126.99412914797136,37.667030065550136],[126.99356058893045,37.667804018468495],[126.99383039647799,37.66862279547606],[126.99435735559736,37.669566876966115],[126.99435059945351,37.66981098603386],[126.99380243007889,37.67019724343759],[126.99407385389905,37.672761085465226],[126.99354343481804,37.67410294101644],[126.9937958123678,37.6742262827553],[126.9939813583256,37.67490708725879],[126.99380969398962,37.67525226538854],[126.99319947905806,37.67571988236475],[126.99307221955837,37.67658255367986],[126.99326664704199,37.67700151922418],[126.99311979070391,37.67722533681468],[126.99324725738464,37.677660632612195],[126.99292441689506,37.67882173633097],[126.99243321267369,37.679148301569064],[126.99219757914794,37.67962692410412],[126.99243313814,37.67975926767514],[126.99351428665956,37.68005695519509],[126.9940757506186,37.680324184003894],[126.99415561249342,37.68056885675619],[126.99473228129939,37.68124406085341],[126.99550331154882,37.6815062311302],[126.99585293163197,37.681869447912376],[126.99673750164357,37.682389229663514],[126.99697076850157,37.68264573673698],[126.99702652687611,37.68311424360101],[126.99731116979103,37.68346620013352],[126.9994323493715,37.68390688548695],[127.00051075499498,37.68397390439782],[127.00103844431582,37.68427207539764],[127.00168676072839,37.684344153909706],[127.00188463236914,37.684080340266064],[127.00190057010127,37.68372276261146],[127.00223978564689,37.683593255874435],[127.00274302640005,37.68395391929037],[127.00323777345807,37.683948561421396],[127.00358355197802,37.68423883949962],[127.00377682778209,37.68482446670677],[127.00452648901313,37.68508882132206],[127.00552500937722,37.684863558435836],[127.00605076859696,37.68505386005127],[127.00651096663594,37.684871116194],[127.00706716874038,37.684764668637],[127.00766215931236,37.684468156457065],[127.00866351452713,37.68444952141505]],
},
{
  name : '수유동',
  latlng: new kakao.maps.LatLng(37.62384586634685, 127.00556509545568),
  area : [[127.00786939319015,37.62400850883583],[127.0073295733502,37.62413242134973],[127.00571414036766,37.62398157571725],[127.00556509545568,37.62384586634685],[127.00518297776388,37.624002991665314],[127.00487995564274,37.62382364265098],[127.00456155852582,37.624079313284724],[127.00388650382821,37.62422629655315],[127.0035166064689,37.62492822055834],[127.00297694696573,37.6252722945121],[127.00213444159728,37.62542940569448],[127.00176150699653,37.625644795193345],[127.00069792071366,37.62569631958508],[127.00020373964038,37.62581485696724],[126.99984868413972,37.62603980900571],[126.99926722783314,37.62619296582664],[126.99848609496648,37.62707900739155],[126.9978948933793,37.62753821078545],[126.99756351709065,37.628056542426826],[126.99677758172395,37.628662421842634],[126.99650390592583,37.62908699684936],[126.9960410084656,37.62934656629766],[126.99538884694222,37.63024639579225],[126.9947446794005,37.63051890661766],[126.99424265254109,37.63085927546746],[126.99410243432841,37.63112026221958],[126.99369279717881,37.631467121512316],[126.99184202521016,37.63228152281593],[126.99136741351082,37.6326103400415],[126.9899337416443,37.63279856649956],[126.9898474260671,37.63345176724386],[126.98940019572557,37.634036231747615],[126.98873692415772,37.63394155904594],[126.9885721451074,37.633792312065154],[126.98817903628968,37.634488841485194],[126.987429269723,37.63496261471074],[126.98632527193378,37.63548137793145],[126.98591770154717,37.635788783443374],[126.98420081699533,37.63634067284075],[126.9847443827023,37.63664821938535],[126.985084303546,37.637314423198916],[126.9849599304113,37.6378071323265],[126.98523355478156,37.63806592209938],[126.98519225133943,37.638302981694466],[126.98539382565194,37.638590195981635],[126.98540751740704,37.639087987862275],[126.98567623041191,37.64004446574996],[126.98613253763594,37.640428008956846],[126.98565713865472,37.64074018868108],[126.98526788251147,37.64135026830043],[126.98522409651089,37.641636043097705],[126.9860774075886,37.642106782179866],[126.98797412512566,37.6416007022055],[126.98855247026209,37.641788530790194],[126.989146310304,37.642365742350876],[126.98979719819998,37.64315344273777],[126.99062375483172,37.64396953654857],[126.99161824148723,37.64486294245334],[126.99197746010283,37.645495187215396],[126.9924094570124,37.645904174532646],[126.99294992815096,37.64603746943083],[126.99382309545253,37.647111132889464],[126.99436759841765,37.64785609417857],[126.99490057653286,37.64835022051812],[126.99543563199322,37.64846890786113],[126.99585609912862,37.64898221476118],[126.99642340153905,37.649886640120684],[126.99748740604417,37.65041888762477],[126.9981669972811,37.64968830772618],[126.99876191707123,37.649294236340985],[126.99916950451916,37.649467232520756],[127.00107353706714,37.649205882036455],[127.00242005106588,37.64897802267703],[127.00304813325194,37.649185231652474],[127.003783650748,37.64932751996032],[127.00437915095623,37.64925720389729],[127.00492647344562,37.64953883439989],[127.00612545951817,37.64953095521392],[127.00645281575694,37.649365946291425],[127.00759441743443,37.65020716111184],[127.00800271469318,37.65043121202988],[127.00835827442111,37.65013495116874],[127.00905311135172,37.64997138177093],[127.00950934175485,37.65017082777856],[127.009839406545,37.64994889465949],[127.01015352760207,37.650035365760786],[127.01137390299473,37.64933519399154],[127.0124394874362,37.64922548747662],[127.0130281865917,37.64927264266053],[127.01384187135525,37.6492420624635],[127.01399920787723,37.649169544404785],[127.0149633013151,37.649120128094424],[127.01509340509921,37.64928342398452],[127.01646495877948,37.64885444235406],[127.01769825349405,37.64857638269572],[127.01909861438615,37.64880649883988],[127.02017038410536,37.649083096054255],[127.02112999886502,37.64899988851421],[127.02176657777491,37.6486323450195],[127.02214233180453,37.648161808333334],[127.02266489864652,37.647847212153174],[127.02468223683869,37.64734313370801],[127.0250849957183,37.64670927130405],[127.0258868790744,37.645721133900864],[127.02741064975028,37.64503325627835],[127.02807707707737,37.6446338584598],[127.03085649842932,37.64286954391562],[127.02361997869113,37.636114917743406],[127.02328179922748,37.63589931353279],[127.02299099698469,37.6354325431339],[127.0230764536117,37.63468471583179],[127.02326711500471,37.63472860352649],[127.02342408641624,37.63335458283839],[127.02344527246338,37.63316424724761],[127.02433426138093,37.63090628080439],[127.02289612903007,37.630542221348385],[127.02268773711437,37.630375577857116],[127.02205506226271,37.630227307467145],[127.02126894791917,37.6301339651045],[127.01802030366827,37.6293190782526],[127.01779800297686,37.62934445033799],[127.01784287820108,37.62869960784585],[127.01667749699763,37.62830509845018],[127.01617971706716,37.62805429273282],[127.01580447524094,37.6276192962005],[127.01578585455768,37.62709454594867],[127.0152606667309,37.62687777860788],[127.01419407133379,37.626935614709154],[127.01354943221006,37.62691203147668],[127.01241427347398,37.62655438989176],[127.01215580216335,37.626236430838],[127.01139182310217,37.625906513524164],[127.01140169190968,37.62558075457864],[127.01096805349118,37.62560979262066],[127.01018394367661,37.62546174978848],[127.00995292970539,37.62521569100548],[127.00886437654955,37.62502881051966],[127.00786939319015,37.62400850883583]],
}
]

const guMarkers = [];
let dongMarkers = [];


// [임시] 영역 정보를 담을 전역 변수들
const BASE = 'http://127.0.0.1:8000/api/v1';

let area = [];


const Map=(props)=>{
    //분석하기 클릭하면 
    const [open, setOpen] = React.useState(false);
    const [dongData, setDongData] = React.useState();
    const getOpenfromsearch = (isopen, data) =>{
      setOpen(isopen);
      setDongData(data);
    }
    const getOpen = (isopen) =>{
      setOpen(isopen);
    } 
    // 1. 지도를 담을 영역의 DOM 레퍼런스
    const container = useRef(null);

    // 2. 검색 키워드를 관리하는 훅
    const [searchKeyword, setSearchKeyword] = useState("");
  
    // 3. 행정 구역 보기 토글 버튼
    var [displayDivision, setdisplayDivision] = useState(0);

    // 4. 오른쪽 사이드바로 넘겨줄 주소 정보
    const [nowLocation, setNowLocation] = useState();

    // 5. 구역 가져오기
    const getGuDongArea = (name) => {
      // area = [];
      // axios.get(`${BASE}/${name}`)
      // .then((res) => {
      //   if(res.status === 200) {
      //     const x = res.data.dongInfo[0];
      //     console.log(res.data.guInfo)
      //     area.push(x);
      //     for(var i=0; i<res.data.dongInfo.length; i++) {
      //       const y = res.data.dongInfo[i];
      //       area.push(y);
      //     }
      //     console.log("#1 test", area);
      //   }
      // });
    }

    useEffect(()=>{
      // + 기능 1. 지도 생성 및 화면 표시
        // 1.1 지도 생성 및 객체 리턴
      

      var map = new window.kakao.maps.Map(container.current, options);
      
      // #2. 지도에 시군구동 이미지 마커 띄우기
      var imageSrc = markerImg; 

      for(var i=0; i<locationSeoulGu.length; i++) {

        var imageSize = new kakao.maps.Size(60, 60);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var guName = locationSeoulGu[i].name
        
        
        var marker = new kakao.maps.Marker({
          position: locationSeoulGu[i].latlng,
          title : locationSeoulGu[i].name,
          image : markerImage,
          opacity : 0.8,  // 투명도
        });
        guMarkers.push(marker);
        marker.setMap(map);

        // #2.1 마커 커스텀하기 => 정확히는 그냥 오버레이 덮어씌우기
        var content = guName;

        var position = locationSeoulGu[i].latlng;

        var customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          position: position,
          content: content,
          yAnchor: 1.85,
          xAnchor : 0.45,
        });

        // #2.2 개별 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', moveAndDisplayGuArea(marker, locationSeoulGu[i].latlng, locationSeoulGu[i].name));
      }
      // #2.3 줌인 & 마커 위치로 지도 이동
      function moveAndDisplayGuArea(customOverlay, loca, guName) {
        return function() {
          var moveLatLon = loca;
          map.setLevel(7); 
          map.panTo(moveLatLon);
          // setSelectGu(guName);  
          area = [];
          axios.get(`${BASE}/${guName}`)
          .then((res) => {
            if(res.status === 200) {
              const x = res.data.guInfo[0];
              console.log(res.data.guInfo)
              area.push(x);
              for(var i=0; i<res.data.dongInfo.length; i++) {
                const y = res.data.dongInfo[i];
                area.push(y);
              }
              console.log("#1 test", area);
            }
            // [Todo] #2.4 BackEnd로 요청보내기 (testGangbuk 형태로 데이터 받아온다.)        
          // if(getGuDongArea(guName)) console.log("#test 3 : ", area);
          // else console.log("false");
          console.log("#test3", area)
          // #2.5 구 영역 그리기
          let path = [];
          let points = [];
          let polygons = [];
          dongMarkers = [];
          
          for(var i=0; i<area[0].guXYPoint.length; i++) {
            let point = {};
            point.x = area[0].guXYPoint[i][1];
            point.y = area[0].guXYPoint[i][0];
            points.push(point);
            path.push(new kakao.maps.LatLng(point.x, point.y));
          }

          let polygon = new kakao.maps.Polygon({
            map : map,
            path: path,
            strokeWeight: 2, // 선의 두께입니다
            strokeColor: '#004c80', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'longdash', // 선의 스타일입니다
            fillColor: '#fff', // 채우기 색깔입니다
            fillOpacity: 0.3, // 채우기 불투명도 입니다
          });
          polygons.push(polygon);
          
          // #2.5.1 영역에 효과 추가하기
          const customOverlay = new kakao.maps.CustomOverlay({});
    
          kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
            polygon.setOptions({ fillColor: '#09f' });
              
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });
                
            // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
            // 커스텀 오버레이를 지도에서 제거합니다
          kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
          });

          // # 2.6 다각형 클릭 시, 줌인 & 동 마커 표시
          kakao.maps.event.addListener(polygon, 'click', function () {
            map.setLevel(6);
            var imageSrc = markerImg; 

            for(var i=1; i<testGangbuk.length; i++) {

              var imageSize = new kakao.maps.Size(30, 30);
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                  
              var marker = new kakao.maps.Marker({
                position: testGangbuk[i].latlng,
                title : testGangbuk[i].name,
                image : markerImage,
              });
              dongMarkers.push(marker);
              marker.setMap(map);
              kakao.maps.event.addListener(marker, 'click', moveAndDisplayDongArea(marker, testGangbuk[i].latlng, testGangbuk[i].name));
                  
              // #2.6.1 동 마커에는 인포윈도우가 필요할듯.
              var content = testGangbuk[i].name;
  
              var position = testGangbuk[i].latlng;
  
              var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                position: position,
                content: content,
                yAnchor: 2.5,
              });
            }
            
            // #2.7 줌인 & 마커 위치로 지도 이동
            function moveAndDisplayDongArea(marker, loca, dongName) {
              // console.log(loca.La, loca.Ma);
              return function() {
                var moveLatLon = loca;
                map.setLevel(5);
                map.panTo(moveLatLon);
                // setSelectDong(dongName);
                
                // [Todo] #2.8 BackEnd로 요청보내기 (선택한 동에 해당하는 상권 영역을 받아온다.)
          
                // #2.9 상권 영역 그리기
              }
            }
          });
          });
        }
      }

        

    // #3. 검색 시 해당 위치로 이동한다.
    console.log("Map : ", searchKeyword, "로 변경되었음.")

    // #3.1 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();

    // #3.2 키워드로 장소를 검색
    ps.keywordSearch(searchKeyword, placesSearchCB);

    // #3.3 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 3.4 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    // #4. 현재 보고있는 곳의 주소 표현하기

    // #4.1 주소-좌표 변환 객체를 생성합니다.
    var geocoder = new kakao.maps.services.Geocoder();

    // #4.2 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // #4.3 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });
    
    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    // #4.4 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
          var infoDiv = document.getElementById('centerAddr');

          for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                  infoDiv.innerHTML = result[i].address_name;
                  // setNowLocation(result[i].address_name);
                  break;
              }
          }
      }    
    }

},)
  
      return (
          <div className='Map'>
            <div className='map_wrap'>
              <div 
                  // id="map" 
                  style={{width:"100vw", height:"90vh"}}
                  ref = {container}
              > 
              </div>
              <StyledEngineProvider injectFirst>
                <Search setSearchKeyword={setSearchKeyword}/>
                <Comm open={open} getOpen={getOpenfromsearch} />
                <RightSide open={open} dongData={dongData} getOpen={getOpen}/>
              </StyledEngineProvider >
            </div>

            <Fab id="centerAddr" className='Location' variant="extended" />
            
          </div>
      )
}
export default Map;