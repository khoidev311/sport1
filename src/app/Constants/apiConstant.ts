import { Key } from "react";

export const LANGUAGE_API_PATH = {
  LANGUAGES: "languages",
  LANGUAGE: "language",
  LANGUAGE_ID: "language/:id",
};

export const ROLE_API_PATH = {
  ROLES: "api/roles",
  ROLES_ID: (id: Key) => `api/roles/${id}`,
};

export const USER_API_PATH = {
  USERS: "api/users",
  USERS_ID: (id: Key) => `api/users/${id}`,
};

export const LEAGUE_API_PATH = {
  LEAGUES: "api/leagues",
  LEAGUES_ID: (id: Key) => `api/leagues/${id}`,
};

export const TEAM_API_PATH = {
  TEAMS: "api/teams",
  TEAMS_ID: (id: Key) => `api/teams/${id}`,
};

export const FIXTURE_API_PATH = {
  FIXTURES: "api/fixtures",
  FIXTURES_ID: (id: Key) => `api/fixtures/${id}`,
  FIXTURES_BY_LEAGUE_ID: (id: Key) => `api/fixtures/league/${id}`,
};

export const RANK_API_PATH = {
  RANKS: "api/ranks",
  RANKS_ID: (id: Key) => `api/ranks/${id}`,
  RANKS_BY_LEAGUE_ID: (id: Key) => `api/ranks/league/${id}`,
};

export const SCORE_API_PATH = {
  SCORES: "api/scores",
  SCORES_ID: (id: Key) => `api/scores/${id}`,
  SCORES_BY_LEAGUE_ID: (id: Key) => `api/scores/league/${id}`,
};

export const CONFIG_API_PATH = {
  CONFIGS: "api/configs",
};

export const AUTH_API_PATH = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  FORGET_PASSWORD: "auth/forget-password",
  RESET_PASSWORD: "auth/reset-password",
  REFRESH_TOKEN: "v1/access-token",
  ME: "auth/me",
};

export const COMMON_API_PATH = {
  UPLOAD_IMAGE: "v1/upload",
};
