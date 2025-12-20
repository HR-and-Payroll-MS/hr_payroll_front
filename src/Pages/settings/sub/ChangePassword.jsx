import React, { useState } from 'react';

export default function ChangePassword() {
    // 1. State for form data
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // 2. State for toggling password visibility
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Password Validity Check Logic
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
    };

    // 4. Handle Submit to Backend
    const handleSave = async () => {
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (!validatePassword(newPassword)) {
            alert("Password must be 8+ chars, with Uppercase, Lowercase, Number, and Special Char.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        try {
            // Replace with your actual API endpoint
            console.log("Sending to backend:", { oldPassword, newPassword });
            alert("Password updated successfully (check console)");
        } catch (error) {
            console.error("Backend error:", error);
        }
    };

    return (
        <div className="flex flex-col dark:*:outline-slate-700 dark:*:text-slate-100 w-full p-8 gap-5">
            <p className="text-xl font-semibold">Change Password</p>
            <hr className="opacity-5" />
            
            <div id="left" className="flex flex-col flex-1 gap-5 w-full items-center">
                
                {/* Old Password */}
                <div className="flex-1 w-full flex flex-col gap-2 relative">
                    <p>Old Password <span className="text-red-500">*</span></p>
                    <input 
                        className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100 dark:border-slate-600" 
                        type={showPasswords.old ? "text" : "password"} 
                        name="oldPassword" 
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="*****************" 
                    />
                    <button 
                        onClick={() => setShowPasswords(s => ({...s, old: !s.old}))}
                        className="absolute right-3 top-10 text-[10px] opacity-50 uppercase font-bold"
                    >
                        {showPasswords.old ? "Hide" : "Show"}
                    </button>
                </div>

                {/* New Password */}
                <div className="flex-1 w-full flex flex-col gap-2 relative">
                    <p>New Password <span className="text-red-500">*</span></p>
                    <input 
                        className={`py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100 dark:border-slate-600 ${formData.newPassword && !validatePassword(formData.newPassword) ? 'border-red-400' : ''}`}
                        type={showPasswords.new ? "text" : "password"} 
                        name="newPassword" 
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="*****************" 
                    />
                    <button 
                        onClick={() => setShowPasswords(s => ({...s, new: !s.new}))}
                        className="absolute right-3 top-10 text-[10px] opacity-50 uppercase font-bold"
                    >
                        {showPasswords.new ? "Hide" : "Show"}
                    </button>
                    {formData.newPassword && !validatePassword(formData.newPassword) && (
                        <span className="text-[10px] text-red-400 italic">Weak password: 8+ chars, upper, lower, number, & symbol required.</span>
                    )}
                </div>

                {/* Confirm New Password */}
                <div className="flex-1 w-full flex flex-col gap-2 relative">
                    <p>Confirm New Password <span className="text-red-500">*</span></p>
                    <input 
                        className="py-1.5 px-3.5 placeholder:text-sm placeholder:font-semibold border rounded-md border-gray-100 dark:border-slate-600" 
                        type={showPasswords.confirm ? "text" : "password"} 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="*****************" 
                    />
                    <button 
                        onClick={() => setShowPasswords(s => ({...s, confirm: !s.confirm}))}
                        className="absolute right-3 top-10 text-[10px] opacity-50 uppercase font-bold"
                    >
                        {showPasswords.confirm ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div 
                onClick={handleSave}
                className="flex flex-1 dark:bg-slate-300 dark:*:text-slate-800 bg-slate-800 dark:border dark:border-slate-400 cursor-pointer text-white items-center w-fit justify-start gap-1.5 px-5 py-3 rounded-md active:scale-95 transition-transform"
            >
                <p className="text-xs font-bold">Save</p>
            </div>
        </div>
    );
}