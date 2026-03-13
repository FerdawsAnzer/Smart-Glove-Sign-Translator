import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  RefreshCw,
  Settings,
  Moon,
  LogOut,
} from "lucide-react";
import Logo from "@/assets/Logo.png";
type Props = {
  onLogout: () => void;
};

type NavItem = {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
};

const topNavItems: NavItem[] = [
  { to: "/dashboard", icon: Home, label: "Dashboard", end: true },
  { to: "/learning", icon: BookOpen, label: "Learning" },
  { to: "/history", icon: RefreshCw, label: "History" },
];

const bottomNavItems: NavItem[] = [
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function SideBar({ onLogout }: Props) {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: expanded ? "220px" : "68px",
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: expanded
          ? "4px 0 20px rgba(0,0,0,0.08)"
          : "2px 0 8px rgba(0,0,0,0.04)",
        position: "relative",
        zIndex: 40,
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e2e8f0",
          flexShrink: 0,
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: expanded ? "60px" : "60px",
            height: expanded ? "60px" : "60px",
            objectFit: "contain",
            transition: "width 0.25s ease, height 0.25s ease",
          }}
        />
      </div>

      {/* ── Top nav ── */}
      <nav style={{ flex: 1, padding: "12px 8px 0 8px" }}>
        {topNavItems.map((item) => (
          <NavItem key={item.to} item={item} expanded={expanded} />
        ))}
      </nav>

      {/* ── Bottom nav ── */}
      <nav
        style={{
          padding: "8px 8px 8px 8px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        {bottomNavItems.map((item) => (
          <NavItem key={item.to} item={item} expanded={expanded} />
        ))}

        {/* Logout button */}
        <div
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: expanded ? "flex-start" : "center",
            gap: expanded ? "10px" : "0",
            padding: "9px 12px",
            borderRadius: "10px",
            color: "#64748b",
            fontSize: "14px",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          <LogOut size={18} />
          {expanded && <span>Logout</span>}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div
        style={{
          padding: "6px 0 10px",
          textAlign: "center",
          fontSize: "10px",
          color: "#cbd5e1",
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        {expanded ? "© 2026 SignBridge" : "©"}
      </div>
    </aside>
  );
}

function NavItem({ item, expanded }: { item: NavItem; expanded: boolean }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      style={{ textDecoration: "none", display: "block", marginBottom: "4px" }}
      title={!expanded ? item.label : undefined}
    >
      {({ isActive }: { isActive: boolean }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: expanded ? "flex-start" : "center",
            gap: expanded ? "10px" : "0",
            padding: "9px 12px",
            borderRadius: "10px",
            background: isActive ? "#0E64D2" : "transparent",
            color: isActive ? "#fff" : "#64748b",
            fontWeight: isActive ? 600 : 400,
            fontSize: "14px",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = "#EFF6FF";
              el.style.color = "#0E64D2";
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              const el = e.currentTarget as HTMLDivElement;
              el.style.background = "transparent";
              el.style.color = "#64748b";
            }
          }}
        >
          <Icon size={18} style={{ flexShrink: 0, minWidth: "18px" }} />
          <span
            style={{
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : "0",
              overflow: "hidden",
              transition: "opacity 0.2s ease",
              pointerEvents: "none",
            }}
          >
            {item.label}
          </span>
        </div>
      )}
    </NavLink>
  );
}
