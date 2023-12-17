import React, { useState, useCallback, useEffect } from 'react';
import {Profile_URL} from "../pages/api/constants";
import { useRouter } from 'next/router';

const UpdateAvatar = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const apiUrl = Profile_URL;
    const user = localStorage.getItem("user_name") || '';
    const token = localStorage.getItem("token") || '';
  
    const checkImageUrl = useCallback((url:string) => {
        const image = new Image();
        image.onload = () => {
            console.log('Image loaded');
            setIsValid(true);
        };
        image.onerror = () => {
            console.log('Image failed to load');
            setIsValid(false);
        };
        image.src = url;
    }, []);
    useEffect(() => {
        if (imageUrl) {
            checkImageUrl(imageUrl);
        }
    }, [imageUrl, checkImageUrl]);

    const updateAvatar = async (url: string) => {
        if (!user || !token) {
            console.error('User name or token is missing');
            return;
        }
    
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/${user}/media`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ avatar: url }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update avatar');
            }
    
            const data = await response.json();
            const updatedProfile = JSON.parse(localStorage.getItem("profile") || '{}');
            updatedProfile.avatar = data.avatar;
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            setLoading(false);
            setImageUrl('');
            router.push('/profile');
        } catch (error) {
            setLoading(false);
            console.error('Update Avatar Error:', error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted", { isValid, imageUrl });
        if (isValid && imageUrl) {
            updateAvatar(imageUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-row gap-4 w-full max-w-md max-h-[48px]">
            <input
                id="imgURLInput"
                type="text"
                className="input"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => {
                    setImageUrl(e.target.value);
                    checkImageUrl(e.target.value);
                }}
            />
            <button id="uploadBTN" className="btn w-full border-b-2 border-accent/70 text-white/30 text-sm" disabled={!isValid || loading}>
                {loading ? 'Updating...' : 'Add Profile Pic'}
            </button>
        </form>
    );
};

export default UpdateAvatar;
