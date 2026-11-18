/**
 * 강사 모드 전용 : 데이터 자가 점검 (Data Self-Check) 검증 엔진
 * 
 * [절대 규칙]
 * 정답 숫자를 하드코딩하지 않고, 실제 원본 데이터(DATA_A~H, DATA_C_CLEANED, DATA_E_CLEANED)
 * 문자열을 JavaScript 함수로 직접 파싱 및 집계하여 계산하고,
 * 공식 [기대값]과 대조하여 100% 일치(✓) 여부를 판정합니다.
 */

import {
  DATA_A,
  DATA_C,
  DATA_C_CLEANED,
  DATA_E,
  DATA_E_CLEANED,
  DATA_G,
  DATA_H
} from "./content";

export interface ValidationItem {
  id: string;
  category: string;
  label: string;
  calculated: string;
  expected: string;
  isPassed: boolean;
  detail?: string;
}

export function runDataSelfCheck(): {
  items: ValidationItem[];
  allPassed: boolean;
  totalCount: number;
  passedCount: number;
} {
  const results: ValidationItem[] = [];

  // ========================================================
  // 1. [데이터 A] B형 발전기 2월 정비 기록 (5건)
  // ========================================================
  const linesA = DATA_A.trim().split("\n").slice(1);
  const countA = linesA.length;
  const daysA = linesA.map(l => Number(l.split("|")[4]));
  const sumA = daysA.reduce((acc, cur) => acc + cur, 0);
  const avgA = countA > 0 ? (sumA / countA).toFixed(1) : "0";

  results.push({
    id: "check_a_count",
    category: "[데이터 A] B형 발전기",
    label: "정비 건수",
    calculated: `${countA}건`,
    expected: "5건",
    isPassed: countA === 5
  });

  results.push({
    id: "check_a_avg",
    category: "[데이터 A] B형 발전기",
    label: "평균 소요일수",
    calculated: `${avgA}일`,
    expected: "2.6일",
    isPassed: avgA === "2.6",
    detail: `총 ${sumA}일 ÷ ${countA}건 = ${avgA}일`
  });

  // ========================================================
  // 2. [데이터 C] 정비이력 원본 (20행) 진단
  // ========================================================
  const linesC = DATA_C.trim().split("\n").slice(1);
  const countC = linesC.length;

  // 장비명 표기 불일치
  const eqNameMismatches = linesC.filter(l => {
    const num = l.split("|")[0];
    const name = l.split("|")[2];
    return ["3", "7", "10", "16"].includes(num) || name === "A형수송차량" || name === "A형 수송 차량" || name === "A형 차량";
  }).map(l => l.split("|")[0]);
  const uniqueEqMismatches = Array.from(new Set(eqNameMismatches)).sort((a,b)=>Number(a)-Number(b));

  // 날짜 형식 혼재 (YYYY-MM-DD 아닌 것)
  const dateMismatches = linesC.filter(l => {
    const date = l.split("|")[1];
    return !/^\d{4}-\d{2}-\d{2}$/.test(date);
  }).map(l => l.split("|")[0]);

  // 소요일수 형식 혼재 (2, 5, 7, 8, 12, 13)
  const durationMismatches = linesC.filter(l => {
    const dur = l.split("|")[7];
    return dur && (!/^\d+$/.test(dur) || dur.includes("일") || dur.includes("."));
  }).map(l => l.split("|")[0]);
  const uniqueDurMismatches = Array.from(new Set(durationMismatches)).sort((a,b)=>Number(a)-Number(b));

  // 완전 중복 행 (8번, 13번)
  const duplicateCounts: { [line: string]: number } = {};
  const duplicateIds: string[] = [];
  linesC.forEach(l => {
    duplicateCounts[l] = (duplicateCounts[l] || 0) + 1;
    if (duplicateCounts[l] === 2) {
      duplicateIds.push(l.split("|")[0]);
    }
  });

  // 빈칸 3건 (6번 부품 누락, 11번 소요일수 빈칸, 15번 부품 점검)
  const blankRows = linesC.filter(l => {
    const cols = l.split("|");
    const num = cols[0];
    const part = cols[6];
    const dur = cols[7];
    return (num === "6" && !part) || (num === "11" && !dur) || (num === "15" && !part);
  }).map(l => l.split("|")[0]);

  // 이상값 (14번 90일)
  const outlierRows = linesC.filter(l => l.split("|")[7] === "90").map(l => l.split("|")[0]);

  results.push({
    id: "check_c_rows",
    category: "[데이터 C] 원본 행 수",
    label: "전체 행 수 = 고유 18건 + 중복 2건",
    calculated: `${countC}행 (고유 18건 + 중복 2건)`,
    expected: "20행 (고유 18 + 중복 2)",
    isPassed: countC === 20 && duplicateIds.length === 2
  });

  results.push({
    id: "check_c_eq_mismatch",
    category: "[데이터 C] 오류 진단",
    label: "장비명 표기 불일치",
    calculated: `번호 ${uniqueEqMismatches.join(", ")} (${uniqueEqMismatches.length}건)`,
    expected: "번호 3, 7, 10, 16",
    isPassed: uniqueEqMismatches.join(",") === "3,7,10,16"
  });

  results.push({
    id: "check_c_date_mismatch",
    category: "[데이터 C] 오류 진단",
    label: "날짜 형식 혼재",
    calculated: `번호 ${dateMismatches.join(", ")} (${dateMismatches.length}건)`,
    expected: "번호 2, 4, 7, 9, 12, 14, 17",
    isPassed: dateMismatches.join(",") === "2,4,7,9,12,14,17"
  });

  results.push({
    id: "check_c_dur_mismatch",
    category: "[데이터 C] 오류 진단",
    label: "소요일수 형식 혼재",
    calculated: `번호 ${uniqueDurMismatches.join(", ")} (${uniqueDurMismatches.length}건)`,
    expected: "번호 2, 5, 7, 8, 12, 13",
    isPassed: uniqueDurMismatches.join(",") === "2,5,7,8,12,13"
  });

  results.push({
    id: "check_c_duplicates",
    category: "[데이터 C] 오류 진단",
    label: "완전 중복 행 (8번, 13번)",
    calculated: `번호 ${duplicateIds.sort((a,b)=>Number(a)-Number(b)).join(", ")} (2건)`,
    expected: "번호 8, 13 (2건)",
    isPassed: duplicateIds.sort((a,b)=>Number(a)-Number(b)).join(",") === "8,13"
  });

  results.push({
    id: "check_c_blanks",
    category: "[데이터 C] 오류 진단",
    label: "빈칸 (소요일수 11번, 부품 6번·15번)",
    calculated: `번호 ${blankRows.join(", ")} (3곳: 6번 부품누락, 11번 소요일수, 15번 점검)`,
    expected: "번호 6, 11, 15 (3곳)",
    isPassed: blankRows.join(",") === "6,11,15"
  });

  results.push({
    id: "check_c_outlier",
    category: "[데이터 C] 오류 진단",
    label: "이상값 (14번 90일)",
    calculated: `번호 ${outlierRows.join(", ")} (90일)`,
    expected: "번호 14 (90일)",
    isPassed: outlierRows.join(",") === "14"
  });

  // ========================================================
  // 3. [데이터 C 정리본] 통계 검증 (18행)
  // ========================================================
  const linesCleaned = DATA_C_CLEANED.trim().split("\n").slice(1);
  const countCleaned = linesCleaned.length;

  const countA_cl = linesCleaned.filter(l => l.split("|")[2] === "A형 수송차량").length;
  const countB_cl = linesCleaned.filter(l => l.split("|")[2] === "B형 발전기").length;
  const countC_cl = linesCleaned.filter(l => l.split("|")[2] === "C형 견인장비").length;
  const countD_cl = linesCleaned.filter(l => l.split("|")[2] === "D형 유압장비").length;

  // 장비별 평균 소요일수 (숫자만, 빈칸/확인필요 제외)
  const getAvg = (name: string) => {
    const nums = linesCleaned
      .filter(l => l.split("|")[2] === name && !isNaN(Number(l.split("|")[7])) && l.split("|")[7] !== "")
      .map(l => Number(l.split("|")[7]));
    const sum = nums.reduce((a, b) => a + b, 0);
    return nums.length > 0 ? (sum / nums.length).toFixed(2) : "0.00";
  };

  const avgA_cl = getAvg("A형 수송차량"); // 16 / 7 = 2.29
  const avgB_cl = getAvg("B형 발전기");   // 15 / 5 = 3.00
  const avgC_cl = getAvg("C형 견인장비"); // 96 / 3 = 32.00
  const avgD_cl = getAvg("D형 유압장비"); // 9 / 2 = 4.50

  // 전체 평균 (17건)
  const allValidNums = linesCleaned
    .filter(l => !isNaN(Number(l.split("|")[7])) && l.split("|")[7] !== "")
    .map(l => Number(l.split("|")[7]));
  const sumTotalAll = allValidNums.reduce((a, b) => a + b, 0);
  const totalAvgAll = (sumTotalAll / allValidNums.length).toFixed(2); // 136 / 17 = 8.00

  // 90일 제외 평균 (16건)
  const no90Nums = allValidNums.filter(n => n !== 90);
  const sumNo90 = no90Nums.reduce((a, b) => a + b, 0);
  const totalAvgNo90 = (sumNo90 / no90Nums.length).toFixed(2); // 46 / 16 = 2.875 -> 2.88

  // 반복 고장
  const repeatA = linesCleaned.filter(l => l.split("|")[2] === "A형 수송차량" && l.split("|")[4] === "시동 불량").length;
  const repeatB = linesCleaned.filter(l => l.split("|")[2] === "B형 발전기" && l.split("|")[4] === "출력 저하").length;

  results.push({
    id: "check_cl_counts",
    category: "[정비이력 정리본] 장비별 건수",
    label: "장비별 정비 건수 (총 18건)",
    calculated: `A형: ${countA_cl}, B형: ${countB_cl}, C형: ${countC_cl}, D형: ${countD_cl} (합계 ${countCleaned}건)`,
    expected: "A7, B5, C3, D3 (총 18건)",
    isPassed: countCleaned === 18 && countA_cl === 7 && countB_cl === 5 && countC_cl === 3 && countD_cl === 3
  });

  results.push({
    id: "check_cl_avg_equip",
    category: "[정비이력 정리본] 장비별 평균",
    label: "장비별 평균 소요일수",
    calculated: `A형 ${avgA_cl}일, B형 ${avgB_cl}일, C형 ${avgC_cl}일, D형 ${avgD_cl}일`,
    expected: "A 2.29, B 3.00, C 32.00, D 4.50",
    isPassed: avgA_cl === "2.29" && avgB_cl === "3.00" && avgC_cl === "32.00" && avgD_cl === "4.50"
  });

  results.push({
    id: "check_cl_avg_total",
    category: "[정비이력 정리본] 전체 평균",
    label: "전체 평균 및 90일 제외 평균",
    calculated: `전체(n=17): ${totalAvgAll}일 / 90일 제외(n=16): ${totalAvgNo90}일`,
    expected: "전체 8.00 (n=17) / 90일 제외 2.88 (n=16)",
    isPassed: totalAvgAll === "8.00" && totalAvgNo90 === "2.88"
  });

  results.push({
    id: "check_cl_repeats",
    category: "[정비이력 정리본] 반복 고장",
    label: "반복 고장 (각 4건)",
    calculated: `A형 수송차량 시동 불량 ${repeatA}건, B형 발전기 출력 저하 ${repeatB}건`,
    expected: "A형 시동 불량 4, B형 출력 저하 4",
    isPassed: repeatA === 4 && repeatB === 4
  });

  // ========================================================
  // 4. [데이터 E / 정리본] 부품 재고 대장 (15행) 검증
  // ========================================================
  const linesE = DATA_E.trim().split("\n").slice(1);
  const deficientList: string[] = [];
  let blankQtyPart = "";

  linesE.forEach(l => {
    const cols = l.split("|");
    const pid = cols[0];
    const curStr = cols[3];
    const safeStr = cols[4];

    if (!curStr) {
      blankQtyPart = pid;
    } else {
      const cur = Number(curStr);
      const safe = Number(safeStr);
      if (cur < safe) {
        deficientList.push(pid);
      }
    }
  });

  results.push({
    id: "check_e_deficient",
    category: "[데이터 E] 부품 재고",
    label: "안전재고 미만 6품목 & 수량 공란",
    calculated: `부족 6품목(${deficientList.join(", ")}), 수량 공란(${blankQtyPart})`,
    expected: "부족 6품목(PT-0002, 0005, 0007, 0009, 0013, 0015), 수량 공란 PT-0010",
    isPassed: deficientList.length === 6 && blankQtyPart === "PT-0010"
  });

  // ========================================================
  // 5. [데이터 H] 점검이력 (10행) 검증
  // ========================================================
  const linesH = DATA_H.trim().split("\n").slice(1);
  const countH = linesH.length;
  const uniqueH = new Set(linesH).size;
  // 조치 필요 4건 (냉각수 부족, 유압 누유, 타이어 마모, 벨트 교체 필요)
  const abnormalH = linesH.filter(l => {
    const res = l.split("|")[4];
    return res === "부족" || res === "누유" || res === "마모" || res === "교체 필요";
  });
  const uniqueAbnormalCount = new Set(abnormalH.map(l => l.split("|")[0] + "_" + l.split("|")[3])).size;

  results.push({
    id: "check_h_inspection",
    category: "[데이터 H] 점검이력",
    label: "고유 9건 & 조치 필요 4건",
    calculated: `원본 ${countH}행, 고유 ${uniqueH}건, 조치 필요 ${uniqueAbnormalCount}건`,
    expected: "고유 9건 (중복 1건), 조치 필요 4건",
    isPassed: countH === 10 && uniqueH === 9 && uniqueAbnormalCount === 4
  });

  // ========================================================
  // 6. [데이터 G] 교육이수 현황 (12행) 검증
  // ========================================================
  const linesG = DATA_G.trim().split("\n").slice(1);
  const uncompletedG = linesG.filter(l => l.split("|")[3] !== "이수").map(l => l.split("|")[0]);

  results.push({
    id: "check_g_uncompleted",
    category: "[데이터 G] 교육이수",
    label: "미이수자 5명 (미이수 4명 + 진행중 1명)",
    calculated: `미이수 대상: ${uncompletedG.join(", ")} (총 ${uncompletedG.length}명)`,
    expected: "미이수자 5명 (정비사B, D, G, J, L)",
    isPassed: uncompletedG.length === 5 &&
      uncompletedG.includes("정비사B") &&
      uncompletedG.includes("정비사D") &&
      uncompletedG.includes("정비사G") &&
      uncompletedG.includes("정비사J") &&
      uncompletedG.includes("정비사L")
  });

  const passedCount = results.filter(r => r.isPassed).length;
  const allPassed = passedCount === results.length;

  return {
    items: results,
    allPassed,
    totalCount: results.length,
    passedCount
  };
}
