export interface AuthUser {
  id: string;
  name: string;
  provider: "google" | "facebook";
}
