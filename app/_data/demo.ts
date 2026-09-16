// 아래 데이터는 전부 데모용으로 지어낸 예시입니다. 실제 사내 자료가 아닙니다.

export type ErrorCode = {
  device: string;
  code: string;
  level: "오류" | "경고" | "안내";
  title: string;
  cause: string;
  action: string;
};

export const ERROR_CODES: ErrorCode[] = [
  {
    device: "POTENZA",
    code: "E101",
    level: "오류",
    title: "핸드피스 인식 불가",
    cause: "핸드피스 커넥터 접촉 불량 또는 케이블 단선",
    action: "전원을 끄고 커넥터를 다시 체결한 뒤 재부팅. 반복되면 케이블 교체.",
  },
  {
    device: "POTENZA",
    code: "E205",
    level: "오류",
    title: "RF 출력 이상",
    cause: "출력 보드 이상 또는 니들 팁 접촉 불량",
    action: "팁을 새 제품으로 교체 후 재측정. 동일하면 출력 보드 점검 필요.",
  },
  {
    device: "POTENZA",
    code: "W301",
    level: "경고",
    title: "냉각수 부족",
    cause: "냉각수 잔량이 최소 기준 미만",
    action: "전용 냉각수를 MAX 선까지 보충하고 5분간 순환시킨 뒤 사용.",
  },
  {
    device: "POTENZA",
    code: "N010",
    level: "안내",
    title: "팁 사용 횟수 임박",
    cause: "니들 팁 권장 사용 횟수의 90% 도달",
    action: "예비 팁을 준비하세요. 잔여 횟수 소진 시 시술이 중단됩니다.",
  },
  {
    device: "Linear Z",
    code: "E110",
    level: "오류",
    title: "본체-핸드피스 통신 오류",
    cause: "통신 케이블 불량 또는 제어 보드 접점 문제",
    action: "케이블을 분리 후 재연결. 지속되면 제어 보드 점검.",
  },
  {
    device: "Linear Z",
    code: "E220",
    level: "오류",
    title: "초음파 출력 미달",
    cause: "트랜스듀서 노후 또는 매질 접촉 불량",
    action: "젤 도포 상태를 확인하고 재측정. 출력 미달 지속 시 트랜스듀서 교체.",
  },
  {
    device: "Linear Z",
    code: "W305",
    level: "경고",
    title: "내부 온도 상승",
    cause: "흡기구 막힘 또는 장시간 연속 사용",
    action: "흡기 필터를 청소하고 10분간 대기 후 재가동.",
  },
  {
    device: "DENSITY",
    code: "N103",
    level: "안내",
    title: "카트리지 잔여량 부족",
    cause: "카트리지 잔여 샷 수 500 미만",
    action: "신규 카트리지를 준비하세요. 시술 중 교체는 권장하지 않습니다.",
  },
  {
    device: "DENSITY",
    code: "E312",
    level: "오류",
    title: "카트리지 인증 실패",
    cause: "비정품 카트리지이거나 인증 칩 손상",
    action: "정품 여부를 확인하고 재장착. 정품인데 반복되면 인증 리더 점검.",
  },
  {
    device: "DENSITY",
    code: "E401",
    level: "오류",
    title: "모터 구동 이상",
    cause: "구동부 이물질 또는 모터 드라이버 고장",
    action: "구동부 이물질을 제거하고 재시도. 소음이 동반되면 모터 교체 검토.",
  },
  {
    device: "TRI-BEAM Premium",
    code: "E150",
    level: "오류",
    title: "레이저 발진 실패",
    cause: "플래시램프 수명 초과 또는 전원부 이상",
    action: "램프 사용 시간을 확인하고 기준 초과 시 교체.",
  },
  {
    device: "TRI-BEAM Premium",
    code: "W210",
    level: "경고",
    title: "냉각팬 회전수 저하",
    cause: "팬 베어링 마모 또는 먼지 누적",
    action: "팬 주변을 청소하고 회전수를 재확인. 개선되지 않으면 팬 교체.",
  },
  {
    device: "TRI-BEAM Premium",
    code: "E520",
    level: "오류",
    title: "셔터 동작 불량",
    cause: "셔터 솔레노이드 고착",
    action: "셔터 동작음을 확인하고 고착 시 솔레노이드 교체.",
  },
  {
    device: "Cellec V",
    code: "E130",
    level: "오류",
    title: "진공 압력 미달",
    cause: "석션 호스 누설 또는 필터 막힘",
    action: "호스 체결 상태와 필터를 점검하고 필요 시 교체.",
  },
  {
    device: "Cellec V",
    code: "W240",
    level: "경고",
    title: "필터 교체 주기 도래",
    cause: "필터 사용 시간 기준 초과",
    action: "필터를 교체하고 설정에서 사용 시간을 초기화하세요.",
  },
  {
    device: "D'LIV",
    code: "E160",
    level: "오류",
    title: "전극 접촉 불량",
    cause: "전극 패드 노후 또는 피부 접촉면 오염",
    action: "패드를 교체하고 접촉면을 세척한 뒤 재시도.",
  },
  {
    device: "D'LIV",
    code: "E330",
    level: "오류",
    title: "출력 채널 불균형",
    cause: "채널별 출력 편차가 허용 범위 초과",
    action: "출력 캘리브레이션을 수행. 개선되지 않으면 출력 보드 점검.",
  },
  {
    device: "D'LIV",
    code: "N020",
    level: "안내",
    title: "정기 점검 시기",
    cause: "마지막 점검 후 12개월 경과",
    action: "정기 점검을 신청하세요.",
  },
];

export type StockItem = {
  device: string;
  name: string;
  code: string;
  qty: number;
  location: string;
  serial?: string;
};

export const STOCK_ITEMS: StockItem[] = [
  { device: "POTENZA", name: "니들 팁 (16핀)", code: "PTZ-TIP-16", qty: 24, location: "본사 A-01" },
  { device: "POTENZA", name: "니들 팁 (25핀)", code: "PTZ-TIP-25", qty: 8, location: "본사 A-02" },
  { device: "POTENZA", name: "핸드피스 조립품", code: "PTZ-HP-001", qty: 2, location: "본사 B-11", serial: "PTZHP-24-0071" },
  { device: "POTENZA", name: "냉각수 (1L)", code: "PTZ-CLN-1L", qty: 15, location: "본사 C-03" },
  { device: "Linear Z", name: "트랜스듀서 4.5mm", code: "LNZ-TRD-45", qty: 5, location: "본사 A-07" },
  { device: "Linear Z", name: "트랜스듀서 3.0mm", code: "LNZ-TRD-30", qty: 3, location: "본사 A-07" },
  { device: "Linear Z", name: "통신 케이블", code: "LNZ-CBL-01", qty: 11, location: "본사 B-02" },
  { device: "DENSITY", name: "카트리지 (300샷)", code: "DEN-CTG-300", qty: 18, location: "본사 A-12" },
  { device: "DENSITY", name: "카트리지 (500샷)", code: "DEN-CTG-500", qty: 6, location: "본사 A-12" },
  { device: "DENSITY", name: "구동 모터", code: "DEN-MTR-01", qty: 1, location: "본사 B-20", serial: "DENMT-23-0119" },
  { device: "TRI-BEAM Premium", name: "플래시램프", code: "TRB-LMP-01", qty: 4, location: "본사 A-15" },
  { device: "TRI-BEAM Premium", name: "냉각팬", code: "TRB-FAN-02", qty: 7, location: "본사 B-05" },
  { device: "TRI-BEAM Premium", name: "셔터 솔레노이드", code: "TRB-SOL-01", qty: 2, location: "본사 B-06" },
  { device: "Cellec V", name: "석션 호스", code: "CLV-HOS-01", qty: 13, location: "본사 C-08" },
  { device: "Cellec V", name: "흡입 필터", code: "CLV-FLT-01", qty: 30, location: "본사 C-09" },
  { device: "D'LIV", name: "전극 패드 (10매)", code: "DLV-PAD-10", qty: 22, location: "본사 A-20" },
  { device: "D'LIV", name: "출력 보드", code: "DLV-BRD-01", qty: 1, location: "본사 B-18", serial: "DLVBD-24-0033" },
  { device: "D'LIV", name: "전원 어댑터", code: "DLV-ADP-01", qty: 9, location: "본사 C-01" },
  { device: "공통", name: "장비 이동용 캐리어", code: "COM-CAR-01", qty: 4, location: "물류창고 1F" },
  { device: "공통", name: "점검용 테스터", code: "COM-TST-01", qty: 6, location: "본사 B-01" },
];

export type PartsExchange = {
  id: string;
  date: string;
  requester: string;
  company: string;
  partName: string;
  qty: string;
  tracking: string | null;
  status: "접수" | "발송완료" | "수령확인";
};

export const PARTS_EXCHANGES: PartsExchange[] = [
  { id: "PE-0051", date: "2026-09-12", requester: "박간호", company: "한빛병원", partName: "니들 팁 (16핀)", qty: "2개", tracking: "1234-5678-9012", status: "수령확인" },
  { id: "PE-0052", date: "2026-09-13", requester: "이수진", company: "서울정형외과", partName: "흡입 필터", qty: "5개", tracking: "1234-5678-9034", status: "발송완료" },
  { id: "PE-0053", date: "2026-09-14", requester: "최지우", company: "대구연합의원", partName: "전극 패드 (10매)", qty: "1박스", tracking: null, status: "접수" },
  { id: "PE-0054", date: "2026-09-14", requester: "김현수", company: "강남미로의원", partName: "카트리지 (300샷)", qty: "3개", tracking: null, status: "접수" },
  { id: "PE-0055", date: "2026-09-15", requester: "김경일", company: "제이시스피부과", partName: "냉각수 (1L)", qty: "2개", tracking: "1234-5678-9077", status: "발송완료" },
];

export type FieldIssue = {
  id: string;
  date: string;
  product: string;
  group: string;
  hospital: string;
  defect: string;
  detail: string;
  engineer: string;
  status: "접수" | "분석중" | "조치완료";
};

export const FIELD_ISSUES: FieldIssue[] = [
  { id: "FI-2401", date: "2026-08-28", product: "POTENZA", group: "H/P", hospital: "한빛병원", defect: "동작불량", detail: "핸드피스 간헐적 미인식", engineer: "박엔지니어", status: "조치완료" },
  { id: "FI-2402", date: "2026-08-30", product: "DENSITY", group: "CTG", hospital: "강남미로의원", defect: "인증오류", detail: "카트리지 인증 실패 반복", engineer: "이엔지니어", status: "조치완료" },
  { id: "FI-2403", date: "2026-09-02", product: "Linear Z", group: "Device", hospital: "부산365의원", defect: "출력이상", detail: "초음파 출력 기준치 미달", engineer: "박엔지니어", status: "분석중" },
  { id: "FI-2404", date: "2026-09-03", product: "TRI-BEAM Premium", group: "Device", hospital: "대전우리의원", defect: "발진불량", detail: "레이저 발진 실패, 램프 교체 후 재발", engineer: "최엔지니어", status: "분석중" },
  { id: "FI-2405", date: "2026-09-05", product: "POTENZA", group: "TIP", hospital: "서울정형외과", defect: "소모품불량", detail: "신품 팁 개봉 시 핀 휨 발견", engineer: "이엔지니어", status: "조치완료" },
  { id: "FI-2406", date: "2026-09-07", product: "Cellec V", group: "Device", hospital: "광주미앤의원", defect: "누설", detail: "석션 호스 연결부 진공 누설", engineer: "김엔지니어", status: "조치완료" },
  { id: "FI-2407", date: "2026-09-09", product: "D'LIV", group: "Etc", hospital: "인천서구의원", defect: "출력이상", detail: "채널별 출력 편차 12% 발생", engineer: "최엔지니어", status: "분석중" },
  { id: "FI-2408", date: "2026-09-10", product: "DENSITY", group: "Device", hospital: "수원팜의원", defect: "동작불량", detail: "구동 모터 소음 및 정지", engineer: "박엔지니어", status: "접수" },
  { id: "FI-2409", date: "2026-09-11", product: "POTENZA", group: "Device", hospital: "울산바른의원", defect: "냉각불량", detail: "냉각수 순환 불량으로 경고 반복", engineer: "김엔지니어", status: "분석중" },
  { id: "FI-2410", date: "2026-09-12", product: "Linear Z", group: "H/P", hospital: "제주연합의원", defect: "통신오류", detail: "본체-핸드피스 통신 끊김", engineer: "이엔지니어", status: "접수" },
  { id: "FI-2411", date: "2026-09-13", product: "TRI-BEAM Premium", group: "Etc", hospital: "청주밝은의원", defect: "소음", detail: "냉각팬 회전 소음 증가", engineer: "최엔지니어", status: "접수" },
  { id: "FI-2412", date: "2026-09-14", product: "Cellec V", group: "CTG", hospital: "천안제일의원", defect: "소모품불량", detail: "필터 조기 막힘 현상", engineer: "김엔지니어", status: "접수" },
];

export type EngineerKpi = {
  name: string;
  visits: number;
  completed: number;
  avgHours: number;
};

export const ENGINEER_KPI: EngineerKpi[] = [
  { name: "박엔지니어", visits: 38, completed: 36, avgHours: 2.4 },
  { name: "이엔지니어", visits: 31, completed: 30, avgHours: 2.1 },
  { name: "최엔지니어", visits: 27, completed: 24, avgHours: 3.2 },
  { name: "김엔지니어", visits: 22, completed: 21, avgHours: 2.8 },
];

export type OutputSpec = {
  device: string;
  item: string;
  min: number;
  max: number;
  unit: string;
};

export const OUTPUT_SPECS: OutputSpec[] = [
  { device: "POTENZA", item: "RF 출력", min: 45, max: 55, unit: "W" },
  { device: "Linear Z", item: "초음파 출력", min: 18, max: 22, unit: "W" },
  { device: "DENSITY", item: "샷 에너지", min: 0.8, max: 1.2, unit: "J" },
  { device: "TRI-BEAM Premium", item: "레이저 출력", min: 900, max: 1100, unit: "mJ" },
  { device: "Cellec V", item: "진공 압력", min: 60, max: 80, unit: "kPa" },
  { device: "D'LIV", item: "채널 출력", min: 9, max: 11, unit: "mA" },
];
