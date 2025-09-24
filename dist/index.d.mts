interface EntrixConfig {
    baseUrl: string;
    tokenStorage?: "cookie" | "localStorage";
}

interface FormData {
    name: string;
    email: string;
    password: string;
}
interface LoginFormData {
    email: string;
    password: string;
}
declare const configureEntrix: (options: EntrixConfig) => void;
declare const loginGoogle: () => void;
declare const loginGithub: () => void;
declare const getMe: () => Promise<any>;
declare function loginWithEmail(formData: LoginFormData): Promise<any>;
declare function registerWithEmail(formData: FormData): Promise<any>;
declare const logout: () => Promise<void>;

export { configureEntrix, getMe, loginGithub, loginGoogle, loginWithEmail, logout, registerWithEmail };
