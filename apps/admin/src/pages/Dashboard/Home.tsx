import PageMeta from "../../components/common/PageMeta";
import { ReactComponent as DocumentIcon } from "@/icons/document.svg?react";
import { ReactComponent as GridViewFillIcon } from "@/icons/grid-view-fill.svg?react";
import { ReactComponent as UsersFillIcon } from "@/icons/users-fill.svg?react";
import { ReactComponent as TrendUpIcon } from "@/icons/trend-up.svg?react";

// ───────────────────────────────────────────────
// 통계 카드 아이콘 컴포넌트
// ───────────────────────────────────────────────

/** 총 레시피 - 파란 배경 / 문서 아이콘 */
const RecipeIcon = () => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#2b7fff] shrink-0">
      <DocumentIcon className="w-6 h-6 text-white" />
    </div>
  );
}

/** 총 컬렉션 - 초록 배경 / 그리드 아이콘 */
const CollectionIcon = () => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#00c950] shrink-0">
      <GridViewFillIcon className="w-6 h-6 text-white" />
    </div>
  );
}

/** 사용자 - 보라 배경 / 사람 두 명 아이콘 */
const UserIcon = () => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#ad46ff] shrink-0">
      <UsersFillIcon className="w-6 h-6 text-white" />
    </div>
  );
}

/** 이번 달 증가 - 오렌지 배경 / 트렌드 화살표 아이콘 */
const TrendIcon = () => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-[10px] bg-[#ff6900] shrink-0">
      <TrendUpIcon className="w-6 h-6 text-white" />
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

const StatCard = ({ label, value, icon }: StatCardProps) => {
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

const ActivityItem = ({ action, user, time, isLast = false }: ActivityItemProps) => {
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
const Home = () => {
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

export default Home;
