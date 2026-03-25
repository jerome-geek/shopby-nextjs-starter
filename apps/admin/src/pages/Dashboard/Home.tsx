import PageMeta from "../../components/common/PageMeta";

// ───────────────────────────────────────────────
// 통계 카드 아이콘 컴포넌트
// ───────────────────────────────────────────────

/** 총 레시피 - 파란 배경 / 문서 아이콘 */
function RecipeIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#2b7fff] shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 4C5 2.89543 5.89543 2 7 2H17C18.1046 2 19 2.89543 19 4V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4ZM8 7C8 6.44772 8.44772 6 9 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H9C8.44772 8 8 7.55228 8 7ZM9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9ZM8 15C8 14.4477 8.44772 14 9 14H12C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16H9C8.44772 16 8 15.5523 8 15Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

/** 총 컬렉션 - 초록 배경 / 그리드 아이콘 */
function CollectionIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#00c950] shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="white" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="white" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" />
      </svg>
    </div>
  );
}

/** 사용자 - 보라 배경 / 사람 두 명 아이콘 */
function UserIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#ad46ff] shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 4C7.34315 4 6 5.34315 6 7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4ZM4 7C4 4.23858 6.23858 2 9 2C11.7614 2 14 4.23858 14 7C14 9.76142 11.7614 12 9 12C6.23858 12 4 9.76142 4 7ZM15.0288 4.17071C15.2251 3.6466 15.8058 3.38157 16.3299 3.57789C18.164 4.26354 19.5 6.00605 19.5 8.07143C19.5 10.1368 18.164 11.8793 16.3299 12.565C15.8058 12.7613 15.2251 12.4963 15.0288 11.9722C14.8325 11.448 15.0975 10.8673 15.6216 10.671C16.7638 10.2514 17.5714 9.25898 17.5714 8.07143C17.5714 6.88388 16.7638 5.89146 15.6216 5.47186C15.0975 5.27554 14.8325 4.69482 15.0288 4.17071ZM3 17C3 15.3431 4.34315 14 6 14H12C13.6569 14 15 15.3431 15 17V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V17C13 16.4477 12.5523 16 12 16H6C5.44772 16 5 16.4477 5 17V19C5 19.5523 4.55228 20 4 20C3.44772 20 3 19.5523 3 19V17ZM16.9709 14.1707C17.1672 13.6466 17.7479 13.3816 18.272 13.5779C20.1061 14.2635 21.5 16.0061 21.5 18.0714V20C21.5 20.5523 21.0523 21 20.5 21C19.9477 21 19.5 20.5523 19.5 20V18.0714C19.5 16.8839 18.6924 15.8915 17.5502 15.4719C17.0261 15.2755 16.7611 14.6948 16.9709 14.1707Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

/** 이번 달 증가 - 오렌지 배경 / 트렌드 화살표 아이콘 */
function TrendIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#ff6900] shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0001 5C13.0001 4.44772 13.4478 4 14.0001 4H20.0001C20.5524 4 21.0001 4.44772 21.0001 5V11C21.0001 11.5523 20.5524 12 20.0001 12C19.4478 12 19.0001 11.5523 19.0001 11V7.41421L12.7072 13.7071C12.3167 14.0976 11.6835 14.0976 11.293 13.7071L8.00011 10.4142L3.70722 14.7071C3.31669 15.0976 2.68353 15.0976 2.293 14.7071C1.90248 14.3166 1.90248 13.6834 2.293 13.2929L7.29301 8.29289C7.68353 7.90237 8.31669 7.90237 8.70722 8.29289L12.0001 11.5858L17.5859 6H14.0001C13.4478 6 13.0001 5.55228 13.0001 5Z"
          fill="white"
        />
        <path
          d="M3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
          fill="white"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// ───────────────────────────────────────────────
// 통계 카드 컴포넌트
// ───────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-6 py-6 flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-normal leading-5 text-[#4a5565]">{label}</span>
        <span className="text-[30px] font-bold leading-9 tracking-[0.4px] text-[#101828]">
          {value}
        </span>
      </div>
      {icon}
    </div>
  );
}

// ───────────────────────────────────────────────
// 최근 활동 아이템
// ───────────────────────────────────────────────
interface ActivityItemProps {
  action: string;
  user: string;
  time: string;
  isLast?: boolean;
}

function ActivityItem({ action, user, time, isLast = false }: ActivityItemProps) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        !isLast ? "border-b border-[#f3f4f6]" : ""
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium leading-5 text-[#101828]">{action}</span>
        <span className="text-xs font-normal leading-4 text-[#6a7282]">{user}</span>
      </div>
      <span className="text-xs font-normal leading-4 text-[#99a1af] whitespace-nowrap">{time}</span>
    </div>
  );
}

// ───────────────────────────────────────────────
// 메인 페이지
// ───────────────────────────────────────────────
export default function Home() {
  const stats: StatCardProps[] = [
    { label: "총 레시피", value: "1,234", icon: <RecipeIcon /> },
    { label: "총 컬렉션", value: "567", icon: <CollectionIcon /> },
    { label: "사용자", value: "8,901", icon: <UserIcon /> },
    { label: "이번 달 증가", value: "+12%", icon: <TrendIcon /> },
  ];

  const activities: ActivityItemProps[] = [
    { action: "새 레시피 추가", user: "user123", time: "5분 전" },
    { action: "컬렉션 수정", user: "user456", time: "15분 전" },
    { action: "레시피 그룹 생성", user: "admin", time: "1시간 전" },
    { action: "사용자 컬렉션 승인", user: "admin", time: "2시간 전", isLast: true },
  ];

  return (
    <>
      <PageMeta
        title="대시보드 | JollyPot 관리자"
        description="JollyPot 관리자 대시보드"
      />
      <div className="flex flex-col gap-6 pt-6 px-6">
        {/* 페이지 헤더 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold leading-8 tracking-[0.07px] text-[#101828]">
            대시보드
          </h2>
          <p className="text-base font-normal leading-6 tracking-[-0.31px] text-[#6a7282]">
            JollyPot 관리자 페이지에 오신 것을 환영합니다
          </p>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* 최근 활동 카드 */}
        <div className="bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold leading-7 tracking-[-0.44px] text-[#101828] mb-4">
            최근 활동
          </h3>
          <div className="flex flex-col">
            {activities.map((activity) => (
              <ActivityItem key={activity.action} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
