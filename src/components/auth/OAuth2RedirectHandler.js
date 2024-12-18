import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy token và username từ query parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const username = getUrlParameter('username');

        if (token) {
            localStorage.setItem("authToken", token);
            const decoded = jwtDecode(token);
            localStorage.setItem("userRoles", JSON.stringify(decoded.roles));
            localStorage.setItem("userId", decoded.id);
            navigate("/", { replace: true });  // Điều hướng về trang chủ
        } else {
            navigate("/login", { replace: true });  // Điều hướng về trang login
        }
    }, [location.search, navigate]); // Chạy lại khi URL thay đổi

    // Không cần render gì, vì chúng ta chỉ cần chuyển hướng
    return null;
};

export default OAuth2RedirectHandler;
