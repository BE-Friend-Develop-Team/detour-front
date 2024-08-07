import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get("code");
        console.log("code: " + code);

        const kakaoLogin = async (code) => {
            try {
                const res = await axios.get(`http://localhost:8081/api/users/login/oauth2/code/kakao?code=${code}`);
                const NICKNAME = res.data.data;

                localStorage.setItem("nickname", NICKNAME);
                localStorage.setItem("token", res.headers.get('Authorization'));
                console.log("nickname:", NICKNAME);
                console.log("token", res.headers.get('Authorization'));

                navigate("/", { replace: true });
            } catch (err) {
                console.log("소셜 로그인 에러", err);
                navigate("/login", { replace: true });
            }
        };

        if (code) {
            kakaoLogin(code);
        }
    }, [navigate]);

    return null;
}