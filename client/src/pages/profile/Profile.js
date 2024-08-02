import React from "react";
import { useNavigate } from "react-router-dom";
import GetProfile from "./GetProfile";

const Profile = () => {
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate("/mytrip");
    };

    return (
        <>
            <GetProfile onViewAllClick={handleViewAllClick} />
        </>
    );
};

export default Profile;
