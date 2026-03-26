export type LanguageSettingsProps = {
  language: string;
  targetLanguage: string;
  onLanguageChange: (value: string) => void;
  onTargetLanguageChange: (value: string) => void;
}