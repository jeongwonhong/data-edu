/**
 * 생성형 AI 활용 데이터 관리 실무 - 6시간 표준 교안 콘텐츠 (v2.0)
 * 
 * [절대 규칙]
 * - 모든 교육 내용(이론, 프롬프트, 데이터, 정상 결과, 바꿔보기, 미션 등)은 본 파일에 정의됩니다.
 * - 데이터(DATA_A~H)는 원본에서 단 한 글자도 변경하지 않고 그대로 수록합니다.
 * - 도구 체계: "구글 시트"는 배제하고 "엑셀 / 한셀" 중심으로 동작합니다.
 * - 기본 실습 방식: 데이터를 붙여넣지 않고 표 구조와 가상 샘플 3행만 주는 "방법 묻기"입니다.
 */

// ==========================================
// 1. 도구 및 외부 링크 설정
// ==========================================
export const LINKS = {
  chatgpt: { name: "ChatGPT 무료", url: "https://chatgpt.com" },
  gemini:  { name: "Gemini (한도 시 대체)",  url: "https://gemini.google.com" },
  claude:  { name: "Claude (한도 시 대체)",  url: "https://claude.ai" },
  sheet:   { name: "엑셀·한셀", url: "#" }
};

export const TOOLS = {
  ai: "ChatGPT 무료 (Gemini·Claude: 한도 시 대체)",
  sheet: "엑셀·한셀",
  memo: "메모장"
};

export type HancellMenuKey = "붙여넣기" | "찾기·바꾸기" | "중복 제거" | "정렬·필터" | "차트 넣기";

// ==========================================
// 2. 고정 데이터 원본 (구분자: |, 공란은 비워둠)
// ==========================================

/** [데이터 A] B형 발전기 2월 정비 기록 */
export const DATA_A = `접수일자|장비명|고장증상|조치내용|소요일수
2025-02-03|B형 발전기|출력 저하|연료필터 교체|3
2025-02-10|B형 발전기|과열|냉각팬 교체|4
2025-02-14|B형 발전기|출력 저하|연료필터 교체|2
2025-02-21|B형 발전기|시동 불량|배터리 교체|1
2025-02-26|B형 발전기|출력 저하|연료필터 교체|3`;

/** [데이터 B] 정비 접수 메모 (줄글) */
export const DATA_B = `- 3/24 09:10 가상2대대 A형 수송차량 시동 늦게 걸림. 추운 날 더 심함. 운전병 말로는 지난주부터
- 3/24 10:30 가상1대대 B형 발전기 출력 떨어짐 또 접수됨. 이번 달만 세 번째라고 함
- 3/24 13:00 가상3대대 C형 견인장비 유압 새는 것 같다고 전화. 사진 아직 못 받음
- 3/24 14:20 D형 유압장비 작동 느림. 소속 미기재
- 3/24 15:40 가상1대대 A형 수송차량 브레이크 소리. 급하다고 함. 담당자 미정`;

/** [데이터 C] 정비이력 대장 — 원본 (20행, 오류 포함) */
export const DATA_C = `번호|접수일자|장비명|소속|고장증상|조치내용|교체부품|소요일수|정비담당|비고
1|2025-03-03|A형 수송차량|가상1대대|시동 불량|배터리 교체|PT-0001|2|정비사A|
2|25.3.4|B형 발전기|가상2대대|출력 저하|연료필터 교체|PT-0005|3일|정비사B|
3|2025-03-05|A형수송차량|가상1대대|브레이크 소음|브레이크 패드 교체|PT-0002|3|정비사A|
4|3월 6일|C형 견인장비|가상3대대|유압 누유|유압호스 교체|PT-0007|4|정비사C|
5|2025-03-07|B형 발전기|가상1대대|출력 저하|연료필터 교체|PT-0005|삼일|정비사B|
6|2025-03-10|D형 유압장비|가상2대대|작동 지연|유압 펌프 교체||5|정비사D|
7|25.3.11|A형 수송 차량|가상2대대|시동 불량|시동모터 교체|PT-0003|3.0|정비사A|
8|2025-03-12|C형 견인장비|가상3대대|와이어 마모|와이어 교체|PT-0008|2일|정비사C|
8|2025-03-12|C형 견인장비|가상3대대|와이어 마모|와이어 교체|PT-0008|2일|정비사C|
9|3월 14일|B형 발전기|가상2대대|출력 저하|연료필터 교체|PT-0005|3|정비사B|
10|2025-03-17|A형 차량|가상3대대|타이어 마모|타이어 교체|PT-0004|1|정비사D|
11|2025-03-18|D형 유압장비|가상1대대|유압 누유|실링 교체|PT-0010||정비사D|
12|25.3.19|B형 발전기|가상3대대|과열|냉각팬 교체|PT-0006|4일|정비사B|
13|2025-03-20|A형 수송차량|가상1대대|시동 불량|배터리 교체|PT-0001|2일|정비사A|
13|2025-03-20|A형 수송차량|가상1대대|시동 불량|배터리 교체|PT-0001|2일|정비사A|
14|3월 21일|C형 견인장비|가상2대대|유압 누유|유압호스 교체|PT-0007|90|정비사C|부품 수급 대기
15|2025-03-24|B형 발전기|가상1대대|출력 저하|연료분사기 점검||2|정비사B|
16|2025-03-25|A형수송차량|가상2대대|브레이크 소음|브레이크 패드 교체|PT-0002|3|정비사A|
17|25.3.27|D형 유압장비|가상3대대|작동 지연|유압 펌프 교체|PT-0009|4|정비사D|
18|2025-03-28|A형 수송차량|가상3대대|시동 불량|배터리 교체|PT-0001|2|정비사A|`;

/** [정비이력 대장 정리본] (18행 - 내 결과와 비교하는 용도) */
export const DATA_C_CLEANED = `번호|접수일자|장비명|소속|고장증상|조치내용|교체부품|소요일수|정비담당|비고
1|2025-03-03|A형 수송차량|가상1대대|시동 불량|배터리 교체|PT-0001|2|정비사A|
2|2025-03-04|B형 발전기|가상2대대|출력 저하|연료필터 교체|PT-0005|3|정비사B|
3|2025-03-05|A형 수송차량|가상1대대|브레이크 소음|브레이크 패드 교체|PT-0002|3|정비사A|
4|2025-03-06|C형 견인장비|가상3대대|유압 누유|유압호스 교체|PT-0007|4|정비사C|
5|2025-03-07|B형 발전기|가상1대대|출력 저하|연료필터 교체|PT-0005|3|정비사B|
6|2025-03-10|D형 유압장비|가상2대대|작동 지연|유압 펌프 교체|확인필요|5|정비사D|교체부품 누락 확인 필요
7|2025-03-11|A형 수송차량|가상2대대|시동 불량|시동모터 교체|PT-0003|3|정비사A|
8|2025-03-12|C형 견인장비|가상3대대|와이어 마모|와이어 교체|PT-0008|2|정비사C|
9|2025-03-14|B형 발전기|가상2대대|출력 저하|연료필터 교체|PT-0005|3|정비사B|
10|2025-03-17|A형 수송차량|가상3대대|타이어 마모|타이어 교체|PT-0004|1|정비사D|
11|2025-03-18|D형 유압장비|가상1대대|유압 누유|실링 교체|PT-0010|확인필요|정비사D|소요일수 확인 필요
12|2025-03-19|B형 발전기|가상3대대|과열|냉각팬 교체|PT-0006|4|정비사B|
13|2025-03-20|A형 수송차량|가상1대대|시동 불량|배터리 교체|PT-0001|2|정비사A|
14|2025-03-21|C형 견인장비|가상2대대|유압 누유|유압호스 교체|PT-0007|90|정비사C|부품 수급 대기(이상값)
15|2025-03-24|B형 발전기|가상1대대|출력 저하|연료분사기 점검|해당없음|2|정비사B|점검으로 교체부품 없음
16|2025-03-25|A형 수송차량|가상2대대|브레이크 소음|브레이크 패드 교체|PT-0002|3|정비사A|
17|2025-03-27|D형 유압장비|가상3대대|작동 지연|유압 펌프 교체|PT-0009|4|정비사D|
18|2025-03-28|A형 수송차량|가상3대대|시동 불량|배터리 교체|PT-0001|2|정비사A|`;

export const DATA_D = DATA_C_CLEANED; // 하위 호환용

/** [데이터 E] 부품 재고 대장 (15행) */
export const DATA_E = `부품번호|부품명|보관위치|현재수량|안전재고|단가|비고
PT-0001|배터리|가상창고A-01|12|10|150,000|
PT-0002|브레이크 패드|가상창고A-02|4|8|85,000|
PT-0003|시동모터|가상창고A-03|3|2|420,000|
PT-0004|타이어|가상창고A-04|20|16|230,000|
PT-0005|연료필터|가상창고B-01|2|10|35,000|
PT-0006|냉각팬|가상창고B-02|5|4|180,000|
PT-0007|유압호스|가상창고C-01|1|6|60,000|
PT-0008|와이어|가상창고C-02|7|5|95,000|
PT-0009|유압 펌프(D형)|가상창고D-01|2|3|1,200,000|
PT-0010|실링 키트|가상창고D-02||10|25,000|수량 미기재
PT-0011|유압펌프(C형)|가상창고D-01|4|3|120만원|
PT-0012|엔진오일|가상창고E-01|30|20|12,000|
PT-0013|냉각수|가상창고E-02|6|10|8,000|
PT-0014|전조등 전구|가상창고E-03|9|6|15,000|
PT-0015|발전기 벨트|가상창고B-03|3|4|45,000|`;

/** [부품 재고 대장 정리본] (15행 - 내 결과와 비교하는 용도) */
export const DATA_E_CLEANED = `부품번호|부품명|보관위치|현재수량|안전재고|단가|비고
PT-0001|배터리|가상창고A-01|12|10|150000|
PT-0002|브레이크 패드|가상창고A-02|4|8|85000|안전재고 미만
PT-0003|시동모터|가상창고A-03|3|2|420000|
PT-0004|타이어|가상창고A-04|20|16|230000|
PT-0005|연료필터|가상창고B-01|2|10|35000|안전재고 미만
PT-0006|냉각팬|가상창고B-02|5|4|180000|
PT-0007|유압호스|가상창고C-01|1|6|60000|안전재고 미만
PT-0008|와이어|가상창고C-02|7|5|95000|
PT-0009|유압 펌프(D형)|가상창고D-01|2|3|1200000|안전재고 미만
PT-0010|실링 키트|가상창고D-02|확인필요|10|25000|현재수량 확인 필요
PT-0011|유압 펌프(C형)|가상창고D-01|4|3|1200000|
PT-0012|엔진오일|가상창고E-01|30|20|12000|
PT-0013|냉각수|가상창고E-02|6|10|8000|안전재고 미만
PT-0014|전조등 전구|가상창고E-03|9|6|15000|
PT-0015|발전기 벨트|가상창고B-03|3|4|45000|안전재고 미만`;

/** [데이터 F] 2025-06-09 가상 정비 회의 메모 전문 */
export const DATA_F = `[가상 정비 회의 메모] 2025-06-09 / 가상 정비회의 / 참석: 정비사A, 정비사B, 정비사C, 정비사D, 정비계획담당
- 3월 정비 기록 정리 결과를 공유함
- C형 견인장비 유압 호스 교체 건 90일 지연, 원인은 부품 수급 대기라고 함
- A형 수송차량 시동 불량이 4번 접수, 부품만 바꾸고 근본 원인은 아직 모름
- B형 발전기 출력 저하도 4번 접수, 연료 필터를 3번 교체했는데도 반복됨
- 유압 호스 재고 1개뿐, 연료 필터도 2개라서 걱정됨
- 부품 보충 요청은 이번 주 금요일까지 정리해서 올리기로 함 (담당 정비계획담당)
- 반복 고장 장비는 다음 회의 때 원인 분석 자료 가져오기 (담당 정비사B)
- 교육 미이수자에게 안내 보내야 함, 이번 주까지
- 정비 기록 표기가 사람마다 달라서 통일 기준 필요하다는 의견 나옴
- 다음 회의는 6월 23일 오후 2시 예정
- 기타: 공구 정리 상태 점검 필요`;

/** [데이터 G] 정비 교육 이수 현황 (12행) */
export const DATA_G = `이름|소속|교육과정|이수여부|이수일|마감일
정비사A|가상정비1과|유압장비 안전교육|이수|2025-03-10|2025-04-11
정비사B|가상정비1과|유압장비 안전교육|미이수||2025-04-11
정비사C|가상정비1과|유압장비 안전교육|이수|2025-03-12|2025-04-11
정비사D|가상정비2과|유압장비 안전교육|미이수||2025-04-11
정비사E|가상정비2과|유압장비 안전교육|이수|2025-03-05|2025-04-11
정비사F|가상정비2과|유압장비 안전교육|이수|2025-03-18|2025-04-11
정비사G|가상정비3과|유압장비 안전교육|미이수||2025-04-11
정비사H|가상정비3과|유압장비 안전교육|이수|2025-03-20|2025-04-11
정비사I|가상정비3과|유압장비 안전교육|이수|2025-03-21|2025-04-11
정비사J|가상정비1과|유압장비 안전교육|미이수||2025-04-11
정비사K|가상정비2과|유압장비 안전교육|이수|2025-03-25|2025-04-11
정비사L|가상정비3과|유압장비 안전교육|진행중||2025-04-11`;

/** [데이터 H] 장비 점검 기록 (10행) */
export const DATA_H = `번호|점검일|장비명|점검항목|결과|점검자
1|2025-04-01|B형 발전기|오일량|정상|정비사E
2|25.4.1|B형발전기|냉각수|부족|정비사E
3|4월 2일|C형 견인장비|와이어|정상|정비사F
4|2025-04-02|C형 견인 장비|유압|누유|정비사F
5|2025-04-03|D형 유압장비|유압|정상|정비사G
5|2025-04-03|D형 유압장비|유압|정상|정비사G
6|25.4.4|A형 수송차량|타이어|마모|
7|2025-04-04|A형 차량|배터리|양호|정비사H
8|4월 7일|B형 발전기|벨트|교체 필요|정비사E
9|2025-04-07|A형 수송차량|브레이크|정상|정비사H`;

// ==========================================
// 3. 방법 묻기 공통 틀 & 유틸리티
// ==========================================

/** 방법 묻기 프롬프트 공통 틀 (CONTENT에 한 번만 정의, 모든 STEP이 사용) */
export const METHOD_PROMPT_TEMPLATE = `나는 [도구]를 쓰는 정비 담당자이고 초보자야. XLOOKUP·FILTER·UNIQUE 같은 최신 함수는 쓸 수 없어. 예전부터 있던 함수와 메뉴로 알려줘. 아래는 가상의 표 구조와 샘플이야. 전체 데이터는 없어.
열: A 번호, B 접수일자, C 장비명, D 소속, E 고장증상, F 조치내용, G 교체부품, H 소요일수 (2행부터 데이터)
샘플:
1, 2025-03-03, A형 수송차량, 가상1대대, 시동 불량, 배터리 교체, PT-0001, 2
3, 2025-03-05, A형수송차량, 가상1대대, 브레이크 소음, 브레이크 패드 교체, PT-0002, 3
8, 2025-03-12, C형 견인장비, 가상3대대, 와이어 마모, 와이어 교체, PT-0008, 2일
하고 싶은 일: {하고 싶은 일}
함수나 메뉴 1가지, 입력 순서(클릭 순서), 결과가 맞는지 확인하는 방법을 알려줘.`;

/** 4교시 4번째 빈칸형 템플릿 (방법 묻기형) */
export const METHOD_TEMPLATE_4TH = `나는 [도구]를 쓰는 초보자야. 최신 함수는 쓸 수 없어. 아래는 가상의 표 구조와 샘플이야.
열: [열 구성]
샘플 3행: [가상 샘플]
하고 싶은 일: [하고 싶은 일]
함수나 메뉴 1가지, 입력 순서, 결과가 맞는지 확인하는 방법을 알려줘.`;

/** 3교시 가상 요약 수치 (가상 짧은 자료 배지, 4줄) */
export const DATA_SUMMARY_3RD = `[가상 3월 정비 요약] 정비 18건: A형 수송차량 7, B형 발전기 5, C형 견인장비 3, D형 유압장비 3
평균 소요일수: A 2.29일, B 3.00일, C 32.00일(90일 지연 1건 포함), D 4.50일
반복 고장: A형 수송차량 시동 불량 4건, B형 발전기 출력 저하 4건
안전재고 미만 6품목: 브레이크 패드 4/8, 연료필터 2/10, 유압호스 1/6, 유압 펌프(D형) 2/3, 냉각수 6/10, 발전기 벨트 3/4`;

/** 3교시 현업용 B 틀 프롬프트 */
export const B_FIELD_PROMPT = `개조식 월간 정비 현황 보고서의 틀을 만들어줘. 수치는 모두 [   ]로 비워 둬. 항목: 정비 건수, 장비별 평균 소요일수, 반복 고장, 부족 품목, 조치 계획.`;

// ==========================================
// 4. 가상 파일 및 실습 자료 목록
// ==========================================
export interface PracticeDataItem {
  id: string;
  code: string;
  name: string;
  size: string;
  sizeType: "행" | "줄";
  rowCount: number;
  usedIn: string;
  sessions: string[];
  filename: string;
  type: "csv" | "txt";
  rawText: string;
}

export const PRACTICE_DATA_ITEMS: PracticeDataItem[] = [
  {
    id: "data_a",
    code: "데이터 A",
    name: "B형 발전기 2월 정비 기록",
    size: "5행",
    sizeType: "행",
    rowCount: 5,
    usedIn: "1교시 실습 6",
    sessions: ["s1"],
    filename: "가상_B형발전기_2월.csv",
    type: "csv",
    rawText: DATA_A
  },
  {
    id: "data_b",
    code: "데이터 B",
    name: "정비 접수 메모 (글)",
    size: "5줄",
    sizeType: "줄",
    rowCount: 5,
    usedIn: "1교시 실습 7",
    sessions: ["s1"],
    filename: "가상_정비접수_메모.txt",
    type: "txt",
    rawText: DATA_B
  },
  {
    id: "data_c",
    code: "데이터 C",
    name: "정비이력 대장 원본 (오류 포함)",
    size: "20행",
    sizeType: "행",
    rowCount: 20,
    usedIn: "2교시 STEP 1~5·선택 도전·숫자 맞히기, 3교시 STEP 5 비교",
    sessions: ["s2", "s3"],
    filename: "가상_정비이력_대장.csv",
    type: "csv",
    rawText: DATA_C
  },
  {
    id: "data_d",
    code: "데이터 D",
    name: "정비이력 대장 정리본",
    size: "18행",
    sizeType: "행",
    rowCount: 18,
    usedIn: "2교시 STEP 6~8·정답 비교, 3교시 STEP 1·5, 4교시 실습 1·템플릿 1, 5교시 실습 2",
    sessions: ["s2", "s3", "s4", "s5"],
    filename: "가상_정비이력_정리본.csv",
    type: "csv",
    rawText: DATA_D
  },
  {
    id: "data_e",
    code: "데이터 E",
    name: "부품 재고 대장",
    size: "15행",
    sizeType: "행",
    rowCount: 15,
    usedIn: "2교시 선택 연습, 3교시 STEP 2, 4교시 템플릿 2",
    sessions: ["s2", "s3", "s4"],
    filename: "가상_부품재고_대장.csv",
    type: "csv",
    rawText: DATA_E
  },
  {
    id: "data_f",
    code: "데이터 F",
    name: "정비 회의 메모 (글)",
    size: "11줄",
    sizeType: "줄",
    rowCount: 11,
    usedIn: "1교시 실습 3·시연, 3교시 STEP 3, 4교시 템플릿 3, 5교시 실습 1·스피드런",
    sessions: ["s1", "s3", "s4", "s5"],
    filename: "가상_정비회의_메모.txt",
    type: "txt",
    rawText: DATA_F
  },
  {
    id: "data_g",
    code: "데이터 G",
    name: "정비 교육 이수 현황",
    size: "12행",
    sizeType: "행",
    rowCount: 12,
    usedIn: "3교시 STEP 7, 5교시 미션",
    sessions: ["s3", "s5"],
    filename: "가상_교육이수_현황.csv",
    type: "csv",
    rawText: DATA_G
  },
  {
    id: "data_h",
    code: "데이터 H",
    name: "장비 점검 기록",
    size: "10행",
    sizeType: "행",
    rowCount: 10,
    usedIn: "2교시 선택 연습·더 해보기, 4교시 미션",
    sessions: ["s2", "s4"],
    filename: "가상_점검이력.csv",
    type: "csv",
    rawText: DATA_H
  }
];

export const PRACTICE_DATA_MAP: { [id: string]: PracticeDataItem } = PRACTICE_DATA_ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as { [id: string]: PracticeDataItem });

export const SESSION_DATA_MAP: { [sessionId: string]: string[] } = {
  s1: ["data_a", "data_b", "data_f"],
  s2: ["data_c", "data_d", "data_e", "data_h"],
  s3: ["data_c", "data_d", "data_e", "data_f", "data_g"],
  s4: ["data_d", "data_e", "data_f", "data_h"],
  s5: ["data_d", "data_f", "data_g"],
  s6: ["data_c", "data_d", "data_e", "data_f", "data_g", "data_h"]
};

export interface VirtualFileItem {
  id: string;
  filename: string;
  title: string;
  rowCount: number;
  badge: string;
  isCleanedVersion?: boolean;
  rawText: string;
}

export const VIRTUAL_FILES: VirtualFileItem[] = [
  {
    id: "f_c",
    filename: "가상_정비이력_대장.csv",
    title: "가상 정비이력 대장 (DATA_C)",
    rowCount: 20,
    badge: "실습 원본",
    rawText: DATA_C
  },
  {
    id: "f_d",
    filename: "가상_정비이력_정리본.csv",
    title: "가상 정비이력 정리본 (DATA_D)",
    rowCount: 18,
    badge: "정답 비교용",
    isCleanedVersion: true,
    rawText: DATA_D
  },
  {
    id: "f_e",
    filename: "가상_부품재고_대장.csv",
    title: "가상 부품재고 대장 (DATA_E)",
    rowCount: 15,
    badge: "실습 원본",
    rawText: DATA_E
  },
  {
    id: "f_h",
    filename: "가상_점검이력.csv",
    title: "가상 점검이력 (DATA_H)",
    rowCount: 10,
    badge: "실습 원본",
    rawText: DATA_H
  },
  {
    id: "f_g",
    filename: "가상_교육이수_현황.csv",
    title: "가상 교육이수 현황 (DATA_G)",
    rowCount: 12,
    badge: "실습 원본",
    rawText: DATA_G
  }
];

export function toCsvString(pipeData: string): string {
  return pipeData
    .split("\n")
    .map(line => {
      const cols = line.split("|");
      return cols
        .map(cell => {
          const trimmed = cell.trim();
          if (trimmed.includes(",") || trimmed.includes('"') || trimmed.includes("\n")) {
            return `"${trimmed.replace(/"/g, '""')}"`;
          }
          return trimmed;
        })
        .join(",");
    })
    .join("\r\n");
}

export function downloadDataset(file: { filename: string; rawText: string; type?: string }) {
  const isCsv = file.filename.endsWith(".csv");
  const content = isCsv ? "\uFEFF" + toCsvString(file.rawText) : "\uFEFF" + file.rawText;
  const mimeType = isCsv ? "text/csv;charset=utf-8;" : "text/plain;charset=utf-8;";
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const downloadVirtualFile = downloadDataset;
export const downloadCsv = downloadDataset;

export async function copyTextFallback(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }
  document.body.removeChild(textArea);
  return success;
}

export function parseTableData(pipeData: string): { headers: string[]; rows: string[][] } {
  const lines = pipeData.trim().split("\n");
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split("|");
  const rows = lines.slice(1).map(line => line.split("|"));
  return { headers, rows };
}

// ==========================================
// 5. 함수 카드 "꼭 알아 둘 함수 8개"
// ==========================================
export interface FunctionCardItem {
  name: string;
  oneLineMeaning: string;
  exampleFormula: string;
  formulaDecomposition: string;
}

export const ESSENTIAL_FUNCTIONS: FunctionCardItem[] = [
  {
    name: "COUNTIF",
    oneLineMeaning: "지정한 범위에서 조건에 맞는 칸의 개수 세기",
    exampleFormula: '=COUNTIF($C$2:$C$19,"A형 수송차량")',
    formulaDecomposition: '범위($C$2:$C$19)에서 조건("A형 수송차량")과 일치하는 행을 셉니다. 결과: 7'
  },
  {
    name: "COUNTIFS",
    oneLineMeaning: "여러 조건을 동시에 만족하는 칸의 개수 세기 (AND 조건)",
    exampleFormula: '=COUNTIFS($C$2:$C$19,"B형 발전기",$E$2:$E$19,"출력 저하")',
    formulaDecomposition: '장비명 범위가 "B형 발전기"이면서 고장증상 범위가 "출력 저하"인 행을 셉니다. 결과: 4'
  },
  {
    name: "SUMIF",
    oneLineMeaning: "조건에 맞는 행의 지정된 열 숫자 합계 구하기",
    exampleFormula: '=SUMIF($C$2:$C$19,"A형 수송차량",$H$2:$H$19)',
    formulaDecomposition: '장비명이 "A형 수송차량"인 행들의 소요일수(H열) 합계를 계산합니다. 결과: 16'
  },
  {
    name: "AVERAGEIF",
    oneLineMeaning: "조건에 맞는 행의 지정된 열 숫자 평균 구하기",
    exampleFormula: '=AVERAGEIF($C$2:$C$19,"A형 수송차량",$H$2:$H$19)',
    formulaDecomposition: '장비명이 "A형 수송차량"인 행들의 소요일수 평균을 계산합니다. 결과: 2.29 (16 ÷ 7)'
  },
  {
    name: "IF",
    oneLineMeaning: "조건이 참일 때와 거짓일 때 서로 다른 값 표시하기",
    exampleFormula: '=IF(D2="","확인필요",IF(D2<E2,"부족","정상"))',
    formulaDecomposition: '현재수량(D2)이 빈칸이면 "확인필요", 안전재고(E2)보다 작으면 "부족", 그 외에는 "정상"을 출력합니다. (부품재고 기준)'
  },
  {
    name: "TRIM",
    oneLineMeaning: "텍스트 앞뒤의 불필요한 공백(띄어쓰기) 제거하기",
    exampleFormula: '=TRIM(C2)',
    formulaDecomposition: 'C2 셀 텍스트의 앞뒤 빈칸과 단어 사이의 중복 공백을 하나만 남기고 정리합니다.'
  },
  {
    name: "SUBSTITUTE",
    oneLineMeaning: "텍스트 안의 특정 글자를 다른 글자나 빈칸으로 바꾸기",
    exampleFormula: '=SUBSTITUTE(H2,"일","")',
    formulaDecomposition: 'H2 셀의 텍스트에서 "일" 글자를 찾아 지우고 순수한 숫자만 남깁니다. (예: 2일 → 2)'
  },
  {
    name: "VLOOKUP",
    oneLineMeaning: "다른 표의 첫 열에서 값을 찾아 같은 행의 다른 열 값 가져오기 (선택)",
    exampleFormula: '=VLOOKUP(G2,재고!A:B,2,FALSE)',
    formulaDecomposition: '정비이력의 교체부품(G2) 번호로 부품 재고 시트에서 해당 부품명을 정확히 찾아옵니다.'
  }
];

// ==========================================
// 6. 용어 풀이 (쉬운 말 사전)
// ==========================================
export interface GlossaryItem {
  id: string;
  term: string;
  shortTerm?: string;
  original: string;
  desc: string;
}

export const GLOSSARY: GlossaryItem[] = [
  {
    id: "g1",
    term: "AI가 모르는 것을 그럴듯하게 지어내는 현상 (환각)",
    shortTerm: "지어내기",
    original: "환각 (Hallucination)",
    desc: "AI가 사실을 몰라도 '모른다'고 하지 않고, 그럴듯한 문장과 가짜 근거를 지어내어 당당하게 답하는 현상입니다. 처음 한 번은 괄호로 병기하며, 이후에는 '지어내기'라고 부릅니다."
  },
  {
    id: "g2",
    term: "표기 통일",
    original: "정규화 (Normalization)",
    desc: "제각각으로 적힌 날짜(25.3.4, 3월 6일), 장비명(A형수송차량, A형 수송 차량) 등을 하나의 표준 형식으로 맞추는 작업입니다."
  },
  {
    id: "g3",
    term: "숫자 요약해서 보기",
    original: "분석 (Analysis)",
    desc: "수많은 데이터 행에서 장비별 고장 건수, 부품별 사용량, 평균 소요일수 등 핵심 숫자를 뽑아 요약하는 작업입니다."
  },
  {
    id: "g4",
    term: "표를 그래프로 바꾸기",
    original: "시각화 (Visualization)",
    desc: "복잡한 표나 숫자를 막대·꺾은선 등 한눈에 들어오는 시각적 그래프 차트로 바꾸는 작업입니다."
  },
  {
    id: "g5",
    term: "AI에게 하는 요청 문장 (프롬프트)",
    shortTerm: "요청 문장",
    original: "프롬프트 (Prompt)",
    desc: "원하는 결과물을 얻기 위해 AI에게 입력하는 구체적인 작업 지시문과 조건입니다."
  },
  {
    id: "g6",
    term: "맞는지 직접 확인하기",
    original: "검증 (Verification)",
    desc: "AI가 내놓은 답이나 숫자가 실제 원본 데이터와 일치하는지 함수(COUNTIF 등)나 사람의 눈으로 직접 대조 확인하는 작업입니다."
  }
];

// ==========================================
// 7. 1교시 구성 요소
// ==========================================
export const SESSION1_TIMELINE = [
  "09:00~09:20 원리와 한계: 설명 5분 → 실습 1 (3분) → 실습 2~5 거짓말 탐지기 (5분) → 잘 된 사례 공유 (4분) → 실습 3 가상자료 강사 시연 (3분)",
  "09:20~09:40 활용 방식·군 보안 유의 20분 / 09:40~09:55 맛보기 실습(실습 6, 7, 8) 15분 / 09:55~10:00 정리 5분"
];

/** [이론 0] 오프닝 퀴즈 : 사람이 썼을까, AI가 썼을까? */
export const SESSION1_THEORY0 = {
  title: "사람이 썼을까, AI가 썼을까?",
  desc: "아래 두 정비 기록 중 하나는 사람이, 하나는 AI가 작성했습니다. 어느 쪽이 AI일까요?",
  optionA: {
    label: "기록 A",
    text: "3/12 C형 견인장비 와이어 마모 확인. 교체함. 2일 걸림. 와이어 재고 7개 남아서 당분간 괜찮을 듯. 다음 점검 때 반대편도 볼 것."
  },
  optionB: {
    label: "기록 B",
    text: "3월 12일 C형 견인장비에서 와이어 마모가 확인되어 신속하게 교체 조치를 완료하였습니다. 본 조치는 장비의 안전성과 운용 지속성 확보에 크게 기여할 것으로 판단됩니다. 향후 정기 점검을 통해 유사 사례를 예방할 수 있도록 지속적인 관리가 필요합니다."
  },
  answer: {
    who: "B가 AI",
    explanation: "B가 AI. 문장은 매끄럽지만 구체적인 정보(재고, 다음 할 일)가 적고 '기여할 것으로 판단됩니다' 같은 일반적인 말이 많다"
  }
};

/** [이론 1] AI는 '다음 말 맞히기' 기계다 */
export const SESSION1_THEORY1 = {
  title: "AI는 '다음 말 맞히기' 기계다",
  blankQuestion: "엔진 시동 전에는 반드시 ○○을 확인한다.",
  probabilities: [
    { word: "오일량", percent: 40, color: "bg-sky-500" },
    { word: "연료", percent: 25, color: "bg-sky-400" },
    { word: "계기판", percent: 15, color: "bg-teal-400" },
    { word: "주변 안전", percent: 10, color: "bg-amber-400" },
    { word: "기타", percent: 10, color: "bg-slate-400" }
  ],
  explanation: "AI는 생각하는 뇌가 아니라, 지금까지 읽은 수많은 글을 토대로 '가장 그럴듯한 다음 단어'를 확률적으로 이어 붙이는 기계입니다."
};

/** [실습 1] 같은 질문, 다른 답 */
export const SESSION1_STEP1 = {
  stepNumber: "실습 1",
  title: "같은 질문, 다른 답",
  oneLineNotice: "답이 나오면 \"다시 생성\"을 2번 더 눌러 본다",
  prompt: "정비병에게 하는 짧은 격려 한마디를 써줘.",
  expectedOutcome: "매번 문장이 다르다 → 확률로 다음 말을 고르기 때문",
  modifyChallenge: {
    task: "'정비병' 대신 '야간 근무 중인 정비병'으로 바꾸고 \"군대식 존댓말 2문장\"을 조건으로 붙여 다시",
    checkPoint: "조건을 줄수록 답이 좁아진다"
  }
};

/** [실습 2~5] AI 거짓말 탐지기 4종 (환각·시점 한계·아첨·내부 정보 없음) */
export const SESSION1_LIE_DETECTOR = [
  {
    id: "lie_1",
    stepNumber: "실습 2",
    tag: "환각",
    title: "없는 무기체계 규정 묻기 (환각)",
    prompt: "국방규격 K-99 자주포 야전정비 지침서 제42조 3항의 핵심 내용을 요약해줘.",
    expectedOutcome: "K-99라는 무기체계 규격은 존재하지 않지만, 그럴듯한 42조 조항과 내용을 지어내서 자신 있게 답변함.",
    modifyChallenge: {
      task: "존재하지 않는 가상의 규격 번호(예: 육군 규정 제9999호)로 바꿔서 다시 질문",
      checkPoint: "없는 규격이라도 AI는 '모른다'고 하지 않고 조항을 지어냅니다."
    }
  },
  {
    id: "lie_2",
    stepNumber: "실습 3",
    tag: "시점 한계",
    title: "미래/가상 군수 계획 묻기 (시점 한계)",
    prompt: "2024년 3월 육군 군수사령부에서 발표한 '스마트 야전정비 혁신 5개년 계획'의 3대 중점과제를 알려줘.",
    expectedOutcome: "실제 없는 계획임에도 스마트 야전정비 3대 과제를 그럴듯하게 항목화하여 제시함.",
    modifyChallenge: {
      task: "발표 연도를 '2026년 5월' 미래 시점으로 바꾸어 질문",
      checkPoint: "학습 데이터 시점을 벗어난 미래 사건도 상상으로 메꿔냅니다."
    }
  },
  {
    id: "lie_3",
    stepNumber: "실습 4",
    tag: "아첨·지어내기",
    title: "전문 용어 섞어 유도하기 (아첨·지어내기)",
    prompt: "차륜형장갑차 K808의 냉각수 순환계통 긴급정비 절차 중 '블리딩 작업 4단계'를 군 표준 교범 기준으로 설명해줘.",
    expectedOutcome: "교범에 없는 절차라도 질문자가 원하는 단계 번호와 전문 용어에 맞춰 1~4단계를 완벽한 것처럼 창작함.",
    modifyChallenge: {
      task: "'블리딩 작업 5단계'로 단계를 늘려 다시 질문",
      checkPoint: "질문자가 제시한 형식에 맞춰 그럴듯한 단계를 즉석에서 만들어냅니다."
    }
  },
  {
    id: "lie_4",
    stepNumber: "실습 5",
    tag: "내부 정보 없음",
    title: "비공개 훈령 조항 묻기 (내부 정보 없음)",
    prompt: "국방부 훈령 제2891호 'AI 기반 야전 군수지원체계 운용 훈령' 제15조의 예외 규정을 찾아줘.",
    expectedOutcome: "비공개 혹은 가상의 훈령 조항 번호를 모른다고 하지 않고 법률 문체로 그럴듯하게 꾸며냄.",
    modifyChallenge: {
      task: "해당 훈령의 '부칙'을 알려달라고 추가 질문",
      checkPoint: "법률 부칙 문장 형식(~부터 시행한다)을 그대로 흉내 냅니다."
    }
  }
];

/** 1교시 실습 4~5 교체 : AI 참모 '척척이'의 수상한 일주일 데이터 */
export const CHUKCHUK_TUE_5LINES = `2025-03-03 | A형 수송차량 | 가상1대대 | 브레이크 소음 | 패드 교체 | 2일
2025-03-05 | B형 발전기 | 가상2대대 | 출력 저하 | 연료필터 교체 | 3일
2025-03-07 | C형 견인장비 | 가상1대대 | 와이어 마모 | 와이어 교체 | 2일
2025-03-10 | A형 수송차량 | 가상3대대 | 시동 불량 | 배터리 교체 | 1일
2025-03-12 | D형 통신장비 | 가상2대대 | 전원 불량 | 전원부 수리 | 4일`;

export const CHUKCHUK_WED_LOGS_60: string = (() => {
  const equips = ["A형 수송차량", "B형 발전기", "C형 견인장비", "D형 통신장비"];
  const otherFaults = ["시동 불량", "브레이크 소음", "와이어 마모", "전원 불량", "오일 누유"];
  const units = ["가상1대대", "가상2대대", "가상3대대"];
  // 정확히 13회 '출력 저하' 배치 (1-based 인덱스 기준 2, 5, 10, 14, 19, 23, 28, 32, 37, 41, 47, 52, 58)
  const targetIndices = new Set([1, 4, 9, 13, 18, 22, 27, 31, 36, 40, 46, 51, 57]);
  const lines: string[] = [];
  let otherPtr = 0;

  for (let i = 0; i < 60; i++) {
    const dayNum = String(Math.floor(i / 2) + 1).padStart(2, "0");
    const equip = equips[(i + Math.floor(i / 4)) % equips.length];
    const unit = units[(i * 2 + 1) % units.length];
    let fault: string;
    if (targetIndices.has(i)) {
      fault = "출력 저하";
    } else {
      fault = otherFaults[otherPtr % otherFaults.length];
      otherPtr++;
    }
    const seq = String(i + 1).padStart(2, "0");
    lines.push(`LOG-${seq} | 2025-03-${dayNum} | ${equip} | ${unit} | ${fault}`);
  }
  return lines.join("\n");
})();

export const CHUKCHUK_SAT_CASES = [
  {
    year: "2023",
    title: "미국 변호사 사건",
    desc: "AI가 만든 존재하지 않는 판례를 법원 서류에 인용 → 제재"
  },
  {
    year: "2024",
    title: "에어캐나다 사건",
    desc: "챗봇이 없는 환불 규정을 안내 → 법원이 항공사에 배상 판결"
  },
  {
    year: "2025",
    title: "딜로이트 사건",
    desc: "호주 정부 보고서에 존재하지 않는 참고문헌 → 용역비 일부 환불"
  }
];

export const CHUKCHUK_REDUCE_3LINES = [
  "자료에 없으면 [확인 필요]라고 써.",
  "근거가 된 행을 함께 보여 줘.",
  "확실하지 않으면 '추정'이라고 표시해."
];

export const SESSION1_LIE_FOLLOWUPS = [
  {
    title: "이어지는 질문 1 : 출처 요구",
    prompt: "출처 링크와 함께 알려줘. 그 링크가 실제로 열리는지 확인해 봐.",
    checkPoint: "AI는 모른다고 하지 않고, 그럴듯한 조항 번호·명칭을 지어내서 자신 있게 답합니다. 이것이 지어내기(환각)입니다."
  },
  {
    title: "이어지는 질문 2 : 사실 자백 유도",
    prompt: "방금 답한 내용이 실제 존재하는 규정인지, 아니면 당신이 만든 가상의 예시인지 사실대로 말해줘.",
    checkPoint: "스스로 지어냈다고 실토하는지, 여전히 진짜라고 우기는지 확인해 보세요."
  }
];

export const SESSION1_STEP2 = {
  stepNumber: "실습 2~5",
  title: "AI 거짓말 탐지기 4종 (환각·시점 한계·아첨·내부 정보 없음)",
  oneLineNotice: "4개 중 1개를 골라 복사해서 AI에 넣어 본다",
  amberCaution: "실제 부대 데이터나 진짜 보안 규정을 묻지 마세요. 가상의 상황으로만 실습합니다.",
  prompts: SESSION1_LIE_DETECTOR.map(item => ({ id: item.id, text: item.prompt })),
  retryCard: SESSION1_LIE_FOLLOWUPS[0],
  followUp: SESSION1_LIE_FOLLOWUPS[1]
};

export const SESSION1_CASE_SHARE = {
  title: "잘 된 사례 공유 (4분)",
  oneLineNotice: "자원자가 화면을 보여 주는 방식으로, 지어내기(환각) 답변을 받았거나 AI가 스스로 '모른다'고 답한 화면을 함께 확인합니다.",
  checklist: [
    "실존하지 않는 부서·문서 번호가 진짜처럼 들어갔는가?",
    "전문 용어가 자연스럽게 섞여 있어 진짜 규정처럼 보이는가?",
    "출처 링크를 요구했을 때 가짜 URL을 만들어냈는가?"
  ],
  badge: "설명용 예시입니다. 실제 AI의 답은 매번 다릅니다.",
  exampleA: {
    label: "예시 A: 자신 있게 지어낸 경우",
    question: "국방규격 K-99 야전정비 지침서 제42조 3항 요약해줘",
    summary: "제42조(냉각계통 정비) 3항에 따르면, 야전 정비반은 냉각수 누출 확인 시 즉시 2단계 압력 시험을 실시하고…",
    fact: "실제로는 K-99라는 자주포 규격 자체가 존재하지 않음"
  },
  exampleB: {
    label: "예시 B: 모른다고 답한 경우",
    question: "국방규격 K-99 야전정비 지침서 제42조 3항 요약해줘",
    summary: "해당 규격 번호는 국방표준종합정보시스템에 등록되어 있지 않거나 비공개 문서입니다. 정확한 규격 번호를 확인해 주세요.",
    fact: "검색 기능이 켜져 있거나 최신 모델일 때 가끔 발생"
  }
};

/** 실습 3 (강사 시연) : 자료를 주면 달라진다 (가상 짧은 자료) */
export const SESSION1_STEP3 = {
  stepNumber: "실습 3 (강사 시연)",
  title: "자료를 주면 달라진다 (가상 짧은 자료)",
  badge: "가상 짧은 자료",
  oneLineNotice: "데이터 F 회의 메모로 '메모에 없음' 확인. 요청 문장과 가상 정비 회의 메모를 프롬프트에 함께 넣어 [복사] 한 번으로 실행합니다.",
  prompt: `아래 메모만 근거로 답해줘. 메모에 없는 내용은 '메모에 없음'이라고 써줘.
질문: B형 발전기 출력 저하는 몇 번 접수되었나?

${DATA_F}`,
  expectedOutcome: "메모에 근거하여 '4번 접수됨'을 정확하게 답함. (정답: 4번)",
  checkPoint: "AI의 머릿속 지식을 믿지 말고, 우리가 준비한 자료를 주고 '여기서만 찾아라'라고 해야 안전합니다.",
  modifyChallenge: {
    task: "메모에 없는 내용(예: 'D형 유압장비 오일 교체 주기는?')을 질문으로 바꿔서 전송",
    checkPoint: "지어내지 않고 '메모에 없음'이라고 정확하게 거절하는지 확인"
  }
};

/** 실습 6 : 자료를 주고 계산시키기 (AI 3종 결과 비교) */
export const SESSION1_STEP6 = {
  stepNumber: "실습 6",
  title: "자료를 주고 계산시키기 (AI 3종 결과 비교)",
  oneLineNotice: "동일한 질문을 세 AI에 각각 넣어보고 답변의 형식, 문장 길이, 말투를 비교해 봅니다.",
  prompt: "군용 차량의 일일 점검 시 가장 중요한 3가지를 정비병 수준에 맞춰 설명해줘.",
  expectedOutcome: "세 모델 모두 핵심을 짚지만 Claude는 상세한 서술형, Gemini는 간결한 개조식, ChatGPT는 대화형 정리로 답변 구성과 뉘앙스가 다름",
  modifyChallenge: {
    task: "'~하십시오' 하십시오체로 3줄 요약 조건을 붙여서 다시 비교",
    checkPoint: "조건을 명확히 줄수록 세 모델의 답변 편차가 줄어듭니다."
  }
};

/** 실습 7 : 역할과 형식 정해 주기 */
export const SESSION1_STEP7 = {
  stepNumber: "실습 7",
  title: "역할과 형식 정해 주기",
  oneLineNotice: "역할과 형식을 구체적으로 지정했을 때 답변의 질이 어떻게 달라지는지 체감합니다.",
  prompt: "너는 20년 경력의 육군 정비반장이다. 초임 정비병에게 엔진 오일 점검의 중요성을 교육하려 한다. 개조식 3개 항목으로 친절하지만 엄격한 어투로 설명해줘.",
  expectedOutcome: "역할(정비반장), 대상(초임 정비병), 형식(개조식 3개), 어투(친절+엄격)가 반영된 현장감 높은 지침문 완성",
  modifyChallenge: {
    task: "역할을 '초임 정비병'으로 바꾸고 반장님께 엔진 오일 누유 의심 시 보고하는 문장으로 전환",
    checkPoint: "역할을 바꾸면 같은 주제라도 문장의 관점과 보고 양식이 완전히 바뀝니다."
  }
};

/** 강사 시연 카드: 파일 올리기도 가능합니다 */
export const SESSION1_DEMO_CARD = {
  title: "강사 시연 : 파일 올리기도 가능합니다",
  badge: "강사 PC 시연 5분",
  notice: "수강생은 따라 하지 않아도 됩니다. 기관이 승인하고 외부 유출 위험이 없는 환경에서만 활용 가능한 보조 방식입니다.",
  desc: "같은 정비 회의 메모 파일(가상_정비회의_메모.txt)을 ChatGPT에 첨부 파일로 올리고 질문하는 과정을 강사 화면으로 시연합니다.",
  comparison: "방법 묻기(기본): 데이터가 외부로 나가지 않음 / 파일 올리기(보조): 편리하지만 기관 승인 및 데이터 성격 검토 필수"
};

/** 1교시 마무리 3줄 */
export const SESSION1_WRAPUP_3LINES = [
  "① AI는 다음 말을 맞히는 기계",
  "② 그래서 그럴듯하게 틀린다",
  "③ 자료 주고, 사람이 확인하고, 실데이터는 넣지 않는다"
];

export const SESSION1_WRAPUP = {
  title: "오늘의 한 줄",
  mainLine: "AI는 틀려도 자신 있게 말합니다. 그래서 확인은 사람이 합니다.",
  summary: SESSION1_WRAPUP_3LINES
};

export const SESSION1_INSTRUCTOR_NOTES = [
  "오늘은 AI에게 데이터를 주지 않고 방법만 물어봅니다. 결과는 여러분의 엑셀·한셀이 계산합니다.",
  "수강생들이 \"진짜 있는 규정인 줄 알았다\"고 느끼게 하는 것이 1교시의 핵심",
  "K-99는 가상의 무기체계 (K-9 자주포를 연상시키지만 없는 번호)",
  "AI가 진짜처럼 답하면: \"이래서 AI 답을 그대로 쓰면 안 됩니다\"로 연결",
  "실습 3을 통해 \"자료를 주면 해결된다\"는 원리를 체감시키고 2교시 '방법 묻기'로 연결"
];

// ==========================================
// 8. 2교시 STEP 타입 및 상세 데이터 정의
// ==========================================
export interface NumericVerificationItem {
  label: string;
  targetNumber: number | string;
  unit?: string;
  hint?: string;
}

export interface MethodStepItem {
  id: string;
  stepNumber: string;
  title: string;
  targetTask: string; // 하고 싶은 일
  aiPrompt: string; // AI 직접 요청 문장
  attachedDataName: string; // 데이터 이름 (행 수)
  attachedDataText: string; // 복사 시 함께 붙을 가상 데이터
  excelClickPath: string; // 엑셀 클릭 순서
  hancellItemKey: HancellMenuKey; // 한셀 메뉴 키 (HANCELL_MENUS 대응)
  expectedResult: string; // 예상 결과
  managerInsight: string; // 관리자용 한 줄 보는 포인트
  troubleshooting: string; // 막혔을 때
  checkPoint?: string;
  isOptionalChallenge?: boolean; // 선택 도전
  numericVerification?: NumericVerificationItem;
}

export const SESSION2_METHOD_STEPS: MethodStepItem[] = [
  {
    id: "s2_step1",
    stepNumber: "STEP 1",
    title: "장비명 표기 불일치 진단",
    targetTask: "장비명 열에 표기가 다른 값이 섞여 있는지 찾아내는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 장비명 열에 띄어쓰기나 글자가 다르게 적힌 변형 표기가 섞여 있는지 찾아내고, 각각 몇 건인지 세어줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "C열 머리글 클릭 → 데이터 탭 → 필터(깔때기 모양) 클릭 → C1 셀 드롭다운 화살표 클릭하여 고유 목록 확인",
    hancellItemKey: "정렬·필터",
    expectedResult: "A형 수송차량(4건), A형수송차량(2건), A형 수송 차량(1건), A형 차량(1건) 등 4가지 변형 표기 확인 (번호 3, 7, 10, 16)",
    managerInsight: "표기만 달라도 건수가 4건 → 7건으로 바뀐다. 보고 숫자는 정리 후 숫자인지 확인",
    troubleshooting: "필터 화살표가 보이지 않으면 표의 첫 행 전체(A1:J1)를 선택하고 다시 필터를 켜세요.",
    checkPoint: "표기가 제각각이면 컴퓨터는 서로 다른 장비로 인식합니다.",
    numericVerification: {
      label: "원본 C열에서 'A형 수송차량' 정확 일치 건수 (COUNTIF)",
      targetNumber: 4,
      unit: "건"
    }
  },
  {
    id: "s2_step2",
    stepNumber: "STEP 2",
    title: "장비명 표기 통일",
    targetTask: "장비명 열의 띄어쓰기가 다른 값('A형수송차량', 'A형 수송 차량', 'A형 차량')을 'A형 수송차량' 한 가지로 통일하는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 띄어쓰기나 글자가 다른 장비명을 모두 'A형 수송차량'으로 통일하여 정리된 표로 출력해줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "C열 선택 → 홈 탭 → 찾기 및 선택 → 바꾸기 (단축키 Ctrl+H) → '찾을 내용'에 잘못된 표기 입력, '바꿀 내용'에 'A형 수송차량' 입력 후 [모두 바꾸기]",
    hancellItemKey: "찾기·바꾸기",
    expectedResult: "3, 7, 10, 16번 행의 장비명이 모두 'A형 수송차량'으로 통일되어 총 7건으로 집계 가능해짐",
    managerInsight: "표기가 정리되면 장비별 통계가 정확해집니다. 시스템 간 연동 시 표준 명칭 관리가 핵심입니다.",
    troubleshooting: "범위를 C열로 지정하지 않고 바꾸면 소속이나 조치내용의 글자까지 바뀔 수 있으니 반드시 C열을 먼저 선택하세요."
  },
  {
    id: "s2_step3",
    stepNumber: "STEP 3",
    title: "소요일수 숫자 통일",
    targetTask: "소요일수 열에 '2일', '3.0', '삼일'처럼 섞여 있는 값을 숫자로만 통일하는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 소요일수 열의 '2일', '3.0', '삼일' 등을 순수한 정수 숫자로 정리해줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "H열 선택 → Ctrl+H → 찾을 내용 '일', 바꿀 내용 비워두고 [모두 바꾸기] → '삼일'은 '3'으로 직접 수정 또는 바꾸기",
    hancellItemKey: "찾기·바꾸기",
    expectedResult: "H열이 문자 없는 순수 정수 숫자로 정리됨 (2, 5, 7, 8, 12, 13번 정리)",
    managerInsight: "텍스트가 섞인 숫자는 계산 프로그램에서 합계나 평균이 누락되므로 숫자 형식 통일이 필수입니다.",
    troubleshooting: "텍스트 형식으로 인식된 숫자는 셀 옆의 오류 표시(느낌표)를 누르고 '숫자로 변환'을 클릭하세요."
  },
  {
    id: "s2_step4",
    stepNumber: "STEP 4",
    title: "완전 중복 행 제거",
    targetTask: "완전히 같은 행(번호까지 같은 행)을 찾아 지우는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 번호와 모든 열이 완전히 동일하게 중복된 행을 찾아 제거하고, 남은 건수와 제거된 행 번호를 알려줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "표 전체 선택(Ctrl+A) → 데이터 탭 → '중복된 항목 제거' 클릭 → 모든 열 체크 확인 후 [확인]",
    hancellItemKey: "중복 제거",
    expectedResult: "중복 2개 행(8번 1건, 13번 1건)이 제거되어 원본 20행에서 18행으로 축소됨",
    managerInsight: "중복 데이터가 방치되면 전체 정비 실적이 과다 집계되어 부품 수급 계획과 예산 편성이 왜곡됩니다.",
    troubleshooting: "헤더 행(1행)이 함께 지워지지 않도록 '내 데이터에 머리글 표시'를 반드시 체크하세요.",
    numericVerification: {
      label: "제거된 중복 행 건수",
      targetNumber: 2,
      unit: "건"
    }
  },
  {
    id: "s2_step5",
    stepNumber: "STEP 5",
    title: "빈칸 찾기 및 표시",
    targetTask: "비어 있는 칸을 찾는 방법과, 빈칸을 임의로 채우지 않고 표시만 하는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 비어 있는 칸을 찾아내고, 임의로 채우지 말고 '확인필요' 또는 '해당없음'으로 명시해줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "G열(교체부품)과 H열(소요일수) 필터 드롭다운 클릭 → '(필드 값 없음)' 또는 '빈 셀'만 선택하여 해당 행 확인",
    hancellItemKey: "정렬·필터",
    expectedResult: "6번(교체부품 누락 → '확인필요'), 11번(소요일수 공란 → '확인필요'), 15번(점검이므로 부품 없음 → '해당없음')",
    managerInsight: "빈칸은 임의로 추정값을 넣지 않고 '확인필요'와 '해당없음'을 구분해 명시해야 후속 처리가 가능합니다.",
    troubleshooting: "빈칸을 마음대로 0이나 가짜 부품번호로 채우지 않고, 반드시 '확인필요' 또는 '해당없음'으로 상태를 명시합니다.",
    checkPoint: "교체부품 6번(누락)과 15번(점검이라 교체 없음)은 성격이 다릅니다."
  },
  {
    id: "s2_step_opt",
    stepNumber: "선택 도전",
    title: "날짜 형식 통일",
    targetTask: "접수일자가 '25.3.4', '3월 6일', '2025-03-03'처럼 섞여 있을 때 한 형식(YYYY-MM-DD)으로 통일하는 방법",
    aiPrompt: `아래 가상 정비이력 대장에서 제각각인 접수일자를 모두 YYYY-MM-DD 표준 형식으로 통일해줘.

[가상 데이터]
${DATA_C}`,
    attachedDataName: "가상 정비이력 대장 (20행)",
    attachedDataText: DATA_C,
    excelClickPath: "B열 선택 → 텍스트 나누기 또는 Ctrl+H로 '3월 6일' 등 수정 → 셀 서식(Ctrl+1) → 표시 형식 '날짜' → 'YYYY-MM-DD' 선택",
    hancellItemKey: "찾기·바꾸기",
    expectedResult: "모든 접수일자가 2025-03-03 표준 형식으로 일치됨. (막히면 가상_정비이력_정리본.csv와 비교)",
    managerInsight: "날짜 형식이 통일되어야 기간별 추이 분석이나 월별 결산 필터가 올바르게 작동합니다.",
    troubleshooting: "연도가 생략된 '3월 6일' 등은 현재 연도(2025년)가 올바르게 들어갔는지 확인하세요.",
    isOptionalChallenge: true
  },
  {
    id: "s2_step6",
    stepNumber: "STEP 6",
    title: "장비명별 정비 건수 집계",
    targetTask: "장비명별 정비 건수를 세는 방법",
    aiPrompt: `아래 정리된 가상 정비이력 대장을 근거로 장비명별 정비 건수를 세어 표로 요약해줘.

[가상 데이터]
${DATA_D}`,
    attachedDataName: "가상 정비이력 정리본 (18행)",
    attachedDataText: DATA_D,
    excelClickPath: "빈 셀(예: L2)에 =COUNTIF($C$2:$C$19, \"A형 수송차량\") 입력 후 B형, C형, D형으로 복사",
    hancellItemKey: "정렬·필터",
    expectedResult: "총 18건: A형 수송차량 7건, B형 발전기 5건, C형 견인장비 3건, D형 유압장비 3건",
    managerInsight: "정리 전 4건으로 보였던 A형 수송차량이 실제로는 가장 많은 7건(39%)을 차지함을 확인",
    troubleshooting: "수식 복사 시 장비명 범위가 밀리지 않도록 반드시 절대참조($C$2:$C$19)를 적용하세요.",
    numericVerification: {
      label: "A형 수송차량 건수 (COUNTIF)",
      targetNumber: 7,
      unit: "건"
    }
  },
  {
    id: "s2_step7",
    stepNumber: "STEP 7",
    title: "장비명별 평균 소요일수 및 이상값 영향",
    targetTask: "장비명별 평균 소요일수를 구하는 방법. 90일처럼 튀는 값이 평균에 미치는 영향을 확인하는 방법",
    aiPrompt: `아래 정리된 가상 정비이력 대장을 근거로 장비명별 평균 소요일수를 계산해줘. C형 견인장비의 90일 지연 건이 전체 평균에 미치는 영향도 함께 분석해줘.

[가상 데이터]
${DATA_D}`,
    attachedDataName: "가상 정비이력 정리본 (18행)",
    attachedDataText: DATA_D,
    excelClickPath: "빈 셀(예: M2)에 =AVERAGEIF($C$2:$C$19, \"A형 수송차량\", $H$2:$H$19) 입력. C형의 경우 90일을 뺀 평균도 별도 계산",
    hancellItemKey: "정렬·필터",
    expectedResult: "A형 2.29일, B형 3.00일, C형 32.00일(90일 지연 포함), D형 4.50일 / 전체 평균 8.00일(90일 제외 시 2.88일)",
    managerInsight: "평균 8.0일은 90일 1건 때문. 이상값을 빼면 2.9일",
    troubleshooting: "소요일수 열(H열)에 '확인필요' 글자가 들어있으면 AVERAGEIF가 자동으로 문자를 제외하고 계산합니다.",
    numericVerification: {
      label: "AVERAGEIF B형 발전기 평균 소요일수",
      targetNumber: 3,
      unit: "일"
    }
  },
  {
    id: "s2_step8",
    stepNumber: "STEP 8",
    title: "반복 고장 조합 발견",
    targetTask: "같은 장비명과 같은 고장증상이 3번 이상 반복되는 조합을 찾는 방법",
    aiPrompt: `아래 정리된 가상 정비이력 대장에서 동일한 장비명과 고장증상이 반복되는 조합을 찾아 순위별로 정렬해줘.

[가상 데이터]
${DATA_D}`,
    attachedDataName: "가상 정비이력 정리본 (18행)",
    attachedDataText: DATA_D,
    excelClickPath: "=COUNTIFS($C$2:$C$19, \"A형 수송차량\", $E$2:$E$19, \"시동 불량\") 수식 사용 또는 피벗 테이블의 행(장비명, 고장증상), 값(개수) 배치",
    hancellItemKey: "정렬·필터",
    expectedResult: "A형 수송차량 시동 불량 4건, B형 발전기 출력 저하 4건 확인",
    managerInsight: "다빈도 반복 고장 2종(시동 불량, 출력 저하)을 집중 관리 대상 핵심 과제로 도출",
    troubleshooting: "피벗 테이블을 삽입하면 수식을 일일이 쓰지 않고도 10초 만에 반복 고장 순위를 정렬할 수 있습니다.",
    numericVerification: {
      label: "COUNTIFS B형 출력 저하 건수",
      targetNumber: 4,
      unit: "건"
    }
  },
  {
    id: "s2_step9",
    stepNumber: "STEP 9",
    title: "장비명별 건수 막대그래프",
    targetTask: "장비명별 정비 건수를 막대그래프로 그리는 방법",
    aiPrompt: `장비명별 정비 건수(A형 7건, B형 5건, C형 3건, D형 3건, 총 18건)를 상급자 보고서에 넣을 수 있도록 텍스트 막대그래프나 표로 시각화해줘.`,
    attachedDataName: "정비 건수 요약 수치",
    attachedDataText: `[가상 3월 정비 건수 요약]\n총 18건: A형 수송차량 7, B형 발전기 5, C형 견인장비 3, D형 유압장비 3`,
    excelClickPath: "집계된 표(장비명과 건수 범위) 선택 → 삽입 탭 → 2차원 묶은 세로 막대형 차트 클릭 → 제목 입력",
    hancellItemKey: "차트 넣기",
    expectedResult: "A형(7), B형(5), C형(3), D형(3) 높이를 가진 직관적인 막대차트 생성",
    managerInsight: "상급자 보고 시 숫자 나열보다 막대 차트 형태가 부대별/장비별 편차를 즉각적으로 전달합니다.",
    troubleshooting: "차트에 엉뚱한 열이 들어가면 차트 영역 우클릭 → '데이터 선택'에서 범례 항목을 정리하세요."
  }
];

// ==========================================
// 9. 교시별 데이터 정의 (CONTENT)
// ==========================================
export const CONTENT = {
  header: {
    title: "생성형 AI 활용 데이터 관리 실무",
    warningBanner: "가상 데이터로만 실습합니다. 실제 정비이력·부품재고·장비 번호·부대 정보는 AI에 입력·업로드 금지",
    footerText: "가상 데이터 기반 교육 자료 · 표준 교안 v2.0 (엑셀·한셀 중심)"
  },
  HANCELL_MENUS: {
    "붙여넣기": "[강사 확인 후 입력]",
    "찾기·바꾸기": "[강사 확인 후 입력]",
    "중복 제거": "[강사 확인 후 입력]",
    "정렬·필터": "[강사 확인 후 입력]",
    "차트 넣기": "[강사 확인 후 입력]"
  } as Record<HancellMenuKey, string>,
  overview: {
    goal: "데이터 유출 없는 '방법 묻기' 방식으로 엑셀·한셀 실무를 가속화하고, 검증된 프롬프트로 업무 산출물을 완성한다",
    table: [
      { session: 1, time: "09:00~10:00", topic: "생성형 AI와 데이터 이해", content: "생성형 AI의 원리와 한계, 군 보안 유의사항, 가상 자료 기반 질문", practice: "AI 원리 체험, AI 3종 결과 비교, 보안 판단 연습", tools: "ChatGPT 무료" },
      { session: 2, time: "10:00~12:00", topic: "데이터 정리 및 분석 (방법 묻기)", content: "표기 통일, 오류 진단, 함수 및 피벗 분석, 시각화", practice: "방법 묻기 프롬프트 → 엑셀/한셀 직접 실행 → 정답 비교", tools: "ChatGPT 무료, 엑셀·한셀" },
      { session: 3, time: "13:00~14:00", topic: "데이터 기반 업무 산출물 작성", content: "A(가상 요약 수치 연습)와 B(현업용 빈칸 틀) 두 갈래 작성", practice: "정비 현황 보고서, 부품 보충 공문, 회의록", tools: "ChatGPT 무료, 엑셀·한셀" },
      { session: 4, time: "14:00~15:00", topic: "업무 유형별 템플릿 및 적용", content: "프롬프트 6요소 공식, 4대 빈칸 템플릿, 부서 적용 경로 확인", practice: "개인 업무 템플릿 완성, 6가지 배움 점검", tools: "ChatGPT 무료, 엑셀·한셀, 메모장" },
      { session: 5, time: "15:00~15:30", topic: "현장 점검표 및 실무 문서", content: "체크리스트, 개선 계획서, AI 결과 사후 검토 원칙", practice: "현장 체크리스트 생성, AI 자체 검토 요청", tools: "ChatGPT 무료, 엑셀·한셀" },
      { session: 6, time: "15:30~16:00", topic: "현업 적용 및 질의응답", content: "동료 간 템플릿 교환, 실무 적용 가이드라인, 최종 정리", practice: "템플릿 상호 검토, 질의응답", tools: "ChatGPT 무료, 엑셀·한셀, 메모장" }
    ],
    toolCards: [
      {
        name: "생성형 AI (ChatGPT 무료)",
        desc: "데이터를 입력하지 않고 함수와 메뉴 사용 '방법'만 묻는 용도로 활용합니다. Gemini·Claude는 한도에 걸리면 대체하여 사용합니다.",
        links: [
          { name: "ChatGPT 무료", url: LINKS.chatgpt.url },
          { name: "Gemini (한도 시 대체)", url: LINKS.gemini.url },
          { name: "Claude (한도 시 대체)", url: LINKS.claude.url }
        ]
      },
      {
        name: "엑셀·한셀",
        desc: "실제 데이터 계산과 정리는 본인의 엑셀 또는 한셀에서 직접 수행합니다. 외부망과 내부망 분리 환경에 완벽 대응합니다.",
        links: []
      },
      {
        name: "메모장",
        desc: "부서에서 재사용할 나만의 '방법 묻기형' 프롬프트 템플릿을 안전하게 저장합니다.",
        links: []
      }
    ],
    securityCard: {
      title: "보안 카드",
      mainText: "가상 데이터로만 실습합니다. 실제 정비이력·부품재고·장비 번호·부대 정보는 외부 AI에 입력 금지",
      subText: "실데이터를 일부 고쳐서 넣는 것도 금지. 처음부터 가상 데이터만.",
      threeSecCheck: [
        "① 가상 데이터인가",
        "② 실제 정보가 없는가",
        "③ 기관이 허용한 도구인가"
      ]
    },
    sheetGuideCard: {
      title: "엑셀·한셀 사용법 안내",
      toolDesc: "실제 데이터 계산과 정리는 본인의 엑셀 또는 한셀에서 직접 수행합니다.",
      items: [
        {
          name: "붙여넣기",
          excel: "Ctrl + V 또는 마우스 우클릭 후 '값만 붙여넣기'",
          hancellKey: "붙여넣기" as HancellMenuKey
        },
        {
          name: "찾기·바꾸기",
          excel: "Ctrl + H → 찾을 내용과 바꿀 내용 입력 후 [모두 바꾸기]",
          hancellKey: "찾기·바꾸기" as HancellMenuKey
        },
        {
          name: "중복 제거",
          excel: "데이터 탭 → [중복된 항목 제거] → 열 선택 후 [확인]",
          hancellKey: "중복 제거" as HancellMenuKey
        },
        {
          name: "정렬·필터",
          excel: "데이터 탭 → [필터] (단축키 Ctrl + Shift + L) → 열 머리글 드롭다운",
          hancellKey: "정렬·필터" as HancellMenuKey
        },
        {
          name: "차트 넣기",
          excel: "집계 표 선택 → 삽입 탭 → 2차원 묶은 세로 막대형 차트",
          hancellKey: "차트 넣기" as HancellMenuKey
        }
      ]
    }
  },
  workplaceAdoption: [
    { situation: "기관이 승인한 내부 AI가 있음", method: "내부 AI에서 오늘 템플릿 사용" },
    { situation: "내부 AI가 없음 (국방망 폐쇄망)", method: "방법만 가져가기 (제목만 주고 방법 받기): 외부 AI에서 함수·절차만 배우고 실제 데이터는 내부에서 처리" },
    { situation: "공통", method: "자료 반입·반출 규정은 담당 부서에 확인" }
  ],
  bottomCommonNotice: "오늘은 AI에게 데이터를 주지 않고 방법만 물어봅니다. 결과는 여러분의 엑셀·한셀이 직접 계산합니다."
};

/** 한셀 기본 메뉴 객체 (CONTENT.HANCELL_MENUS 참조) */
export const DEFAULT_HANCELL_MENUS = CONTENT.HANCELL_MENUS;

/** 각 교시 상단 '오늘의 한 줄' 카드 문구 */
export const SESSION_ONE_LINERS: { [sessionId: string]: string } = {
  s1: "AI는 틀려도 자신 있게 말합니다. 그래서 확인은 사람이 합니다.",
  s2: "AI에게 데이터를 주지 않고 방법만 묻습니다. 계산은 내 엑셀·한셀이 합니다.",
  s3: "A는 가상 요약 숫자로 빠르게 연습하고, B는 [   ] 빈칸 틀로 현업에 바로 씁니다.",
  s4: "좋은 질문이 좋은 틀을 만듭니다. 6요소 공식으로 나만의 템플릿을 저장합니다.",
  s5: "AI가 만든 문서는 AI에게 다시 검토시키고, 마지막 숫자는 사람이 직접 확인합니다.",
  s6: "동료와 템플릿을 나누고, 현업의 폐쇄망 규정에 맞춰 안전하게 적용합니다."
};

/** 4교시 실습 1 : 짧게 요청해 보기 (이론 전 선행 실습) */
export const SESSION4_STEP1_SHORT = {
  stepNumber: "실습 1",
  title: "짧게 요청해 보기 (체험)",
  oneLineNotice: "조건 없이 짧게 요청했을 때 AI가 어떤 답변을 내놓는지 먼저 체감합니다.",
  prompt: `정비 보고서 써줘

완성된 문서 말고, 참고용으로 아래 4가지만 줘.
① 목차와 각 항목에 들어갈 내용 한 줄 설명
② 항목별로 쓸 수 있는 핵심 문장 2~3개
③ 숫자가 들어갈 자리는 [숫자: 내부 자료에서]로 비워 두기
④ 결재자가 물어볼 만한 질문 3개`,
  expectedOutcome: "① 목차와 항목별 한 줄 설명 ② 항목별 핵심 문장 2~3개 ③ [숫자: 내부 자료에서]로 비워진 숫자 자리 ④ 결재자가 물어볼 질문 3개가 참고용 뼈대로 출력됨",
  modifyChallenge: {
    task: "뒤에 배울 '좋은 프롬프트 6요소(역할, 목적, 자료, 형식, 분량, 말투)'를 넣어 다시 질문해 보기",
    checkPoint: "구체적인 제약 조건을 줄수록 업무에 바로 쓸 수 있는 참고용 뼈대와 문장이 정확해집니다."
  }
};

/** 2~6교시 미션 및 참고 답안 인터페이스 및 데이터 */
export interface SessionMissionItem {
  sessionId: string;
  sessionNum: number;
  title: string;
  taskDesc: string;
  timeLimit: string;
  referenceAnswer: {
    prompt: string;
    keyResult: string;
    instructorPoint: string;
  };
}

export const SESSION_MISSIONS: { [sessionId: string]: SessionMissionItem } = {
  s2: {
    sessionId: "s2",
    sessionNum: 2,
    title: "2교시 미션 : 반복 고장 추출 및 막대그래프 완성",
    taskDesc: "정비이력 대장에서 동일 장비명과 고장증상이 3회 이상 반복되는 항목을 찾고 빈도수 막대그래프를 완성하세요.",
    timeLimit: "15분",
    referenceAnswer: {
      prompt: "나는 [도구]를 쓰고 있어. C열 장비명, E열 고장증상 조합 중 3회 이상 반복되는 고장을 찾고, 피벗 테이블로 빈도수를 정렬하여 막대그래프를 그리는 순서를 알려줘.",
      keyResult: "A형 수송차량-시동 불량(4건), B형 발전기-출력 저하(4건) 도출 및 묶은 세로 막대차트 생성",
      instructorPoint: "함수(COUNTIFS)보다 피벗 테이블을 권장하여 클릭 4번만으로 집계와 그래프가 완성되는 실무 효율성을 체감시키세요."
    }
  },
  s3: {
    sessionId: "s3",
    sessionNum: 3,
    title: "3교시 미션 : 3월 정비 현황 개조식 보고서 초안 완성",
    taskDesc: "가상 3월 정비 요약 데이터를 근거로 상급자 보고용 A4 1쪽 개조식 보고서 초안을 완성하세요.",
    timeLimit: "15분",
    referenceAnswer: {
      prompt: `너는 정비부대 보고서 작성 보조원이다. 아래 가상 정비 요약만 근거로 상급자 보고용 개조식 월간 정비 현황 보고서 초안을 작성해줘.
구성: 1. 개요 2. 장비별 현황(표) 3. 주요 특이사항(반복 고장, 장기 소요) 4. 조치 계획.
문체는 군 보고서체(~함, ~임)로 작성하고, 자료에 없는 숫자는 [확인 필요]로 표시해줘.

${DATA_SUMMARY_3RD}`,
      keyResult: "총 18건 실적, 반복 고장 2종(A형 시동 불량 4건, B형 출력 저하 4건), C형 90일 지연 특이사항 반영",
      instructorPoint: "숫자를 지어내지 않고 원본 요약 숫자를 정확히 인용했는지와, 규정 번호를 임의 창작하지 않고 [확인 필요]로 두었는지 확인하세요."
    }
  },
  s4: {
    sessionId: "s4",
    sessionNum: 4,
    title: "4교시 미션 : 나만의 현업 프롬프트 템플릿 완성",
    taskDesc: "내 실제 담당 업무 1가지를 선정하여 '방법 묻기형' 또는 '빈칸 틀형' 프롬프트 템플릿을 메모장에 완성하세요.",
    timeLimit: "15분",
    referenceAnswer: {
      prompt: `너는 [담당 업무] 정비 행정 보조원이다. [업무 목표]를 위한 양식 틀을 작성해줘.
조건:
1. 구성은 [항목1 / 항목2 / 항목3]
2. 실제 수치, 부대명, 장비 번호는 모두 [   ] 빈칸으로 비워둘 것
3. 관련 근거는 임의로 쓰지 말고 [관련 규정 확인]으로 표시할 것`,
      keyResult: "부서 복귀 후 즉시 복사하여 재사용 가능한 표준 빈칸 템플릿 완성",
      instructorPoint: "프롬프트 안에 실제 군 정보(부대명, 장비 일련번호, 실데이터)가 일체 포함되지 않았는지 보안 필터링을 철저히 확인하세요."
    }
  },
  s5: {
    sessionId: "s5",
    sessionNum: 5,
    title: "5교시 미션 : AI 자체 오류 검토(Self-Audit) 및 사람 검증",
    taskDesc: "작성된 정비 프로세스 개선 계획서에 대해 AI에게 오류 자체 진단을 시키고, 사람 검증 4대 항목을 대조하세요.",
    timeLimit: "10분",
    referenceAnswer: {
      prompt: "앞에서 만든 문서를 다시 읽고 ① 자료와 다른 숫자 ② 자료에 없는 내용 ③ 확인이 필요한 표현을 표(위치 / 내용 / 이유 / 수정안)로 자체 점검해줘.",
      keyResult: "AI가 스스로 작성한 문장 중 가상 데이터와 상충되거나 근거가 미흡한 항목을 찾아낸 표 생성",
      instructorPoint: "AI의 자체 검토 결과도 100% 믿지 말고, 수량·금액·일자·규정 4가지는 사람이 최종 확인하는 원칙을 확립시키세요."
    }
  },
  s6: {
    sessionId: "s6",
    sessionNum: 6,
    title: "6교시 미션 : 나의 업무 프롬프트 키트",
    taskDesc: "템플릿 만들기 도구로 3개를 만들고 [전체 받기]로 .txt 파일 1개에 저장",
    timeLimit: "10분",
    referenceAnswer: {
      prompt: "동료의 템플릿을 내 [도구] 환경에서 테스트: 가상 샘플 3행을 넣었을 때 의도한 함수와 메뉴 순서가 명확하게 출력되는가?",
      keyResult: "템플릿 만들기 도구로 3개 이상의 업무별 프롬프트를 제작하고 .txt 일괄 저장 완료",
      instructorPoint: "자원자 1~2명이 화면으로 템플릿을 보여 주는 방식으로 편안하게 진행하세요."
    }
  }
};

/** 각 교시 끝 '더 해보기 (빨리 끝난 분)' */
export const EXTRA_CHALLENGES: { [sessionId: string]: { title: string; desc: string; prompt?: string } } = {
  s1: {
    title: "더 해보기 (빨리 끝난 분) : 3대 AI 지어내기(환각) 비교",
    desc: "ChatGPT, Gemini, Claude에 각각 '국방규격 K-99 지침서 제42조 3항'을 넣고 모델별로 어떻게 답변을 구성하는지 비교해 보세요."
  },
  s2: {
    title: "더 해보기 (빨리 끝난 분) : 점검이력 이상 항목 추출",
    desc: "가상_점검이력.csv에서 결과가 '이상(부족, 누유, 마모, 교체 필요)'인 4건을 필터링하고 점검자별 이상 발견 현황을 집계해 보세요."
  },
  s3: {
    title: "더 해보기 (빨리 끝난 분) : 긴급 부품 보충 보고서 추가",
    desc: "안전재고 미만인 6개 품목 중 단가가 가장 높은 유압 펌프(120만원)에 대한 별도 긴급 조달 사유서를 작성해 보세요."
  },
  s4: {
    title: "더 해보기 (빨리 끝난 분) : 마크다운 표 출력 조건 추가",
    desc: "템플릿에 '결과를 엑셀에 바로 붙여넣을 수 있도록 탭 구분 텍스트 또는 마크다운 표로 출력해줘' 조건을 추가해 보세요."
  },
  s5: {
    title: "더 해보기 (빨리 끝난 분) : 점검표에 위험도 등급(상/중/하) 추가",
    desc: "현장 점검 체크리스트의 각 항목에 위험도(상·중·하) 열을 추가하고, '상' 등급 발견 시 즉시 가동 중단 지침을 포함해 보세요."
  },
  s6: {
    title: "더 해보기 (빨리 끝난 분) : 부서 보안 전송 가이드 정리",
    desc: "인터넷 PC에서 받은 함수와 양식을 부대 내부망으로 안전하게 반입하는 절차(망연계 규정 등)를 메모장에 3단계로 정리해 두세요."
  }
};

/** 6교시 오늘 배운 5가지 원칙 점검 */
export const SESSION6_LEARNING_FIVE = [
  "① AI는 다음 말을 맞히는 기계다 (모르는 것도 자신 있게 지어냄)",
  "② 실제 부대 데이터는 외부 AI에 입력하지 않고, 가상 샘플로 방법만 묻는다",
  "③ 대용량 계산과 정리는 본인의 엑셀·한셀에서 직접 수행한다",
  "④ 문서는 [   ] 빈칸 틀로 받고, 실제 숫자는 기관 내부에서 사람이 채운다",
  "⑤ 수량·날짜·장비명·규정 4가지는 사람이 원본과 직접 대조 확인한다"
];

export interface HallOfFameCase {
  id: string;
  badge: string;
  title: string;
  situation: string;
  question: string;
  options: [string, string, string];
  correctIndex: number;
  result: string;
  lesson: string;
}

export const AI_HALL_OF_FAME: HallOfFameCase[] = [
  {
    id: "hof_1",
    badge: "2023 · 한국",
    title: "세종대왕 맥북 던짐 사건",
    situation: "누군가 ChatGPT에 \"조선왕조실록에 기록된 세종대왕의 맥북프로 던짐 사건을 알려 줘\"라고 물었다.",
    question: "AI의 답은?",
    options: ["① \"그런 기록은 없습니다\"", "② 그럴듯한 사건 설명을 지어냈다", "③ 답변 거부"],
    correctIndex: 1,
    result: "세종대왕이 훈민정음 초고 작성 중 담당자에게 화가 나 맥북프로를 던졌다는 식의 이야기를 진지하게 지어냈고, 온라인에서 크게 화제가 됨.",
    lesson: "질문에 틀린 전제가 들어 있으면 AI는 그 전제에 맞춰 이야기를 만들어 낸다."
  },
  {
    id: "hof_2",
    badge: "2023 · 미국 법조",
    title: "존재하지 않는 판례 6건",
    situation: "미국 변호사가 항공사 상대 소송 서류를 ChatGPT로 작성, 판례를 인용해 법원에 제출했다. AI에게 \"이 판례 진짜야?\"라고 확인까지 했다.",
    question: "결과는?",
    options: ["① 승소", "② 판례가 가짜로 드러나 벌금", "③ 아무 일 없음"],
    correctIndex: 1,
    result: "인용 판례 6건이 모두 가짜. AI는 \"진짜\"라고 답했었음. 변호사들은 벌금 5,000달러 제재.",
    lesson: "AI에게 \"진짜야?\"라고 묻는 것은 검증이 아니다. 원문을 직접 확인해야 한다."
  },
  {
    id: "hof_3",
    badge: "2023 · 구글",
    title: "시연 한 번에 시가총액 급락",
    situation: "구글이 AI 챗봇 바드(Bard) 공개 광고에서 \"제임스웹 우주망원경이 태양계 밖 행성을 처음 촬영했다\"는 답을 보여 줬다.",
    question: "결과는?",
    options: ["① 칭찬받음", "② 틀린 사실로 밝혀져 주가 급락", "③ 광고 수상"],
    correctIndex: 1,
    result: "최초 촬영은 다른 망원경이었음. 발표 후 모회사 시가총액이 하루 만에 약 1,000억 달러 증발.",
    lesson: "공식 발표·보고 자료일수록 AI 문장을 그대로 쓰면 위험하다."
  },
  {
    id: "hof_4",
    badge: "2024 · 항공사",
    title: "챗봇이 만든 환불 규정",
    situation: "항공사 고객센터 챗봇이 실제로는 없는 \"사후 신청 가능한 유족 할인 환불\"을 안내했다. 고객이 소송하자 항공사는 \"챗봇은 별개의 존재라 우리 책임이 아니다\"라고 주장했다.",
    question: "판결은?",
    options: ["① 항공사 승", "② 고객 승, 항공사 배상", "③ 챗봇 개발사 책임"],
    correctIndex: 1,
    result: "재판부는 \"챗봇 안내도 회사 책임\"이라며 항공사에 배상 명령.",
    lesson: "AI가 만든 내용도 그것을 쓴 조직과 사람이 책임진다."
  },
  {
    id: "hof_5",
    badge: "2024 · 구글 검색",
    title: "피자에 접착제를?",
    situation: "구글 검색의 AI 요약에 \"피자 치즈가 자꾸 흘러내려요\"라고 검색했다.",
    question: "AI의 조언은?",
    options: ["① 치즈 양을 줄여라", "② 소스에 접착제를 섞어라", "③ 오븐 온도를 낮춰라"],
    correctIndex: 1,
    result: "인터넷 게시판의 농담 글을 진짜 정보로 받아들여 답함. 비슷한 시기 \"하루에 작은 돌 하나를 먹어라\"라는 답도 화제.",
    lesson: "AI는 농담과 사실을 구분하지 못할 때가 있다. 출처의 질을 따져야 한다."
  },
  {
    id: "hof_6",
    badge: "2025 · 신문",
    title: "존재하지 않는 여름 추천 도서",
    situation: "미국 한 신문이 \"올여름 읽을 책 15권\" 목록을 실었다. 작성자가 AI로 목록을 만들었다.",
    question: "결과는?",
    options: ["① 베스트셀러 목록", "② 상당수가 존재하지 않는 책", "③ 전부 절판된 책"],
    correctIndex: 1,
    result: "실존 유명 작가 이름에 가짜 책 제목과 줄거리를 붙인 것이 절반 이상. 신문사가 공개 사과.",
    lesson: "사람 이름·책 제목처럼 \"진짜 같아 보이는 고유명사\"가 가장 위험하다."
  },
  {
    id: "hof_7",
    badge: "2025 · 컨설팅",
    title: "정부 보고서 속 가짜 참고문헌",
    situation: "글로벌 컨설팅사가 호주 정부에 낸 수억 원대 용역 보고서. 작성 과정에 AI를 사용했다.",
    question: "결과는?",
    options: ["① 우수 보고서 선정", "② 가짜 인용·참고문헌이 발견돼 일부 환불", "③ 문제없음"],
    correctIndex: 1,
    result: "존재하지 않는 논문·인용문이 발견되어 보고서 수정, 용역비 일부 환불.",
    lesson: "보고서는 AI 초안을 참고만 하고, 근거·출처는 반드시 사람이 확인한다. (우리도 최종 문서는 내부 시스템에서 직접 작성)"
  },
  {
    id: "hof_8",
    badge: "2025 · IT기업",
    title: "고객지원 AI가 만든 가짜 정책",
    situation: "개발자 도구 회사의 고객지원 AI 상담원에게 \"왜 다른 컴퓨터에서 로그아웃되죠?\"라고 문의했다.",
    question: "AI의 답은?",
    options: ["① 버그라서 수정 중", "② \"1인 1기기 정책입니다\"라는 없는 규정을 지어냄", "③ 담당자 연결"],
    correctIndex: 1,
    result: "없는 정책에 사용자들이 반발해 구독 해지가 잇따랐고, 회사가 공식 사과.",
    lesson: "모르면 \"모른다\"고 하게 만드는 안전장치 문장이 필요하다."
  }
];
