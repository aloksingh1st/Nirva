interface EntrixConfig {
    baseUrl: string;
    tokenStorage?: "cookie" | "localStorage";
}

declare const configureEntrix: (options: EntrixConfig) => void;
declare const loginGoogle: () => void;
declare const loginGithub: () => void;
declare const getMe: () => Promise<any>;
declare const logout: () => Promise<void>;

export { configureEntrix, getMe, loginGithub, loginGoogle, logout };
