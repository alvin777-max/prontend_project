'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AcademicCapIcon,
  DashboardIcon,
  StudentsIcon,
  UserPlusIcon,
  ChartIcon,
  SettingsIcon,
} from './Icons';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: '대시보드', icon: DashboardIcon },
    { href: '/students', label: '학생 목록', icon: StudentsIcon },
    { href: '/students/new', label: '학생 추가', icon: UserPlusIcon },
    { href: '/analytics', label: '성적 차트', icon: ChartIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <AcademicCapIcon size={24} />
        </div>
        <span className="sidebar-logo-text">학생 관리 시스템</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === '/students' && pathname.startsWith('/students/') && pathname !== '/students/new');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="sidebar-link-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-footer-btn" title="설정">
          <SettingsIcon size={20} />
          <span>설정</span>
        </button>
      </div>
    </aside>
  );
}
