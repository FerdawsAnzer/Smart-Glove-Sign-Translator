import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
  { code: "tr", label: "TR", flag: "🇹🇷" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        background: "rgba(255,255,255,0.95)",
        padding: "5px",
        borderRadius: "16px",
        border: "1px solid rgba(99,102,241,0.15)",
        boxShadow: "0 4px 20px rgba(99,102,241,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      {LANGUAGES.map((lang) => {
        const isActive = i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            title={lang.code.toUpperCase()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "7px 14px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              minWidth: "52px",
              transition: "all 0.2s ease",
              background: isActive
                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                : "transparent",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              boxShadow: isActive
                ? "0 4px 12px rgba(99,102,241,0.35)"
                : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            <span style={{ fontSize: "20px", lineHeight: "1" }}>
              {lang.flag}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                color: isActive ? "white" : "#6366f1",
              }}
            >
              {lang.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}