import React, { useState } from 'react';

const initialSchedules = [
    {
        id: 1,
        name: "Mon-Fri, Duration 40 hours/week",
        isDefault: true,
        workingHoursDay: "08:00", 
        effectiveFrom: "2023-01-01",
        type: "Duration based",
        totalHoursWeek: "40:00",
        days: [
            { day: "Monday", hours: "08:00" },
            { day: "Tuesday", hours: "08:00" },
            { day: "Wednesday", hours: "08:00" },
            { day: "Thursday", hours: "08:00" },
            { day: "Friday", hours: "08:00" },
        ]
    }
];

export default function WorkSchedule() {
    const [userRole, setUserRole] = useState('hr'); 
    const [schedules, setSchedules] = useState(initialSchedules);
    const [expandedId, setExpandedId] = useState(1); 
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleExpand = (id) => {
        if (editingId === id) return; 
        setExpandedId(expandedId === id ? null : id);
    };

    const handleEditClick = (e, schedule) => {
        e.stopPropagation();
        setEditingId(schedule.id);
        setFormData({ ...schedule });
    };

    const handleCancel = () => {
        if (editingId && !schedules.find(s => s.id === editingId && s.name !== "New Work Schedule")) {
            setSchedules(schedules.filter(s => s.id !== editingId));
        }
        setEditingId(null);
        setFormData(null);
    };

    const handleSave = () => {
        const updatedSchedules = schedules.map(s => s.id === editingId ? formData : s);
        setSchedules(updatedSchedules);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this schedule?")) {
            setSchedules(schedules.filter(s => s.id !== id));
            if (expandedId === id) setExpandedId(null);
        }
    };

    const handleCreateNew = () => {
        const newId = Date.now();
        const newSchedule = {
            id: newId,
            name: "New Work Schedule",
            isDefault: false,
            workingHoursDay: "08:00",
            effectiveFrom: new Date().toISOString().split('T')[0],
            type: "Duration based",
            totalHoursWeek: "40:00",
            days: [
                { day: "Monday", hours: "08:00" }, { day: "Tuesday", hours: "08:00" },
                { day: "Wednesday", hours: "08:00" }, { day: "Thursday", hours: "08:00" },
                { day: "Friday", hours: "08:00" },
            ]
        };
        setSchedules([newSchedule, ...schedules]);
        setExpandedId(newId);
        setEditingId(newId);
        setFormData(newSchedule);
    };

    const filteredSchedules = schedules.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex relative flex-col w-full p-8  bg-white dark:bg-slate-800 dark:text-slate-100">
            {/* ROLE TOGGLE */}
            <div className="flex justify-end">
                <button onClick={() => setUserRole(userRole === 'hr' ? 'employee' : 'hr')} className="text-[10px] opacity-20 uppercase font-bold dark:text-slate-400">
                    Switch Role: {userRole}
                </button>
            </div>

            {/* HEADER */}
            <div className="flex sticky z-50 bg-white dark:bg-slate-800 p-4 top-0 gap-2">
                <p className="text-xl flex-1 font-semibold">Work Schedule</p>
                <div className="flex items-center w-1/3 px-1.5 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 rounded-md">
                    <div className="flex text-xs w-full items-center justify-between px-2.5 py-2.5 h-full">
                        <input 
                            className="h-full rounded w-full outline-none bg-transparent" 
                            type="text" 
                            placeholder="Search job title" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img className="h-3.5 opacity-45 dark:invert" src="/svg/search-svgrepo-com.svg" alt="" />
                    </div>
                </div>

                {userRole === 'hr' && (
                    editingId ? (
                        <div className="flex gap-2">
                             <button onClick={handleCancel} className="flex bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-200 items-center px-5 py-3 rounded-md font-semibold text-xs transition-transform active:scale-95">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="flex bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 items-center gap-1.5 px-5 py-3 rounded-md transition-transform active:scale-95">
                                <img className="h-4 dark:invert" src="/svg/down-arrow-5-svgrepo-com.svg" alt="" />
                                <p className="text-xs font-semibold">Save</p>
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleCreateNew} className="flex bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 items-center px-5 py-3 rounded-md transition-transform active:scale-95">
                            <p className="text-xs font-semibold">+ New Schedule</p>
                        </button>
                    )
                )}
            </div>

            <hr className="opacity-5 dark:border-slate-700 dark:opacity-20"/>

            {/* LIST */}
            <div className="flex flex-col gap-2">
                {filteredSchedules.map((sched) => {
                    const isExpanded = expandedId === sched.id;
                    const isEditing = editingId === sched.id;

                    return (
                        <div key={sched.id} className="flex border border-gray-200 dark:border-slate-700 rounded-md flex-col overflow-hidden transition-all">
                            {/* TOP BAR */}
                            <div onClick={() => toggleExpand(sched.id)}className={`flex p-4 flex-1 gap-5 justify-between items-center ${!isExpanded && 'border-b border-gray-200 dark:border-slate-700'} cursor-pointer`}>
                                <div className="flex-1 flex gap-2 items-center">
                                    {isEditing ? (
                                        <input 
                                            className="text-sm font-semibold text-gray-800 dark:text-slate-100 border-b border-slate-300 dark:border-slate-600 outline-none bg-transparent"
                                            value={formData.name}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    ) : (
                                        <p className="text-sm font-semibold">{sched.name}</p>
                                    )}
                                    {sched.isDefault && <p className="px-3 rounded-md text-xs py-1 text-gray-500 dark:text-slate-300 font-semibold bg-gray-100 dark:bg-slate-700">Default</p>}
                                </div>
                                <div className="flex items-center">
                                    <img className={`h-6 transition-transform dark:invert ${isExpanded ? 'rotate-0' : 'rotate-180 opacity-35'}`} src="/svg/down-arrow-5-svgrepo-com.svg" alt="" />
                                </div>
                            </div>

                            {/* MIDDLE (Details) */}
                            {isExpanded && (
                                <div className="flex flex-1 gap-4 p-4 justify-between items-start border-t border-gray-100 dark:border-slate-700">
                                    <div className="w-1/3 flex flex-col gap-2">
                                        <p className="text-sm text-gray-400">Standard working hours/day</p>
                                        <p className="text-sm text-gray-400">Effective from</p>
                                        <p className="text-sm text-gray-400">Schedule type</p>
                                        <p className="text-sm text-gray-400">Standard working hours/week</p>
                                        <p className="text-sm text-gray-400">Daily working hours</p>
                                    </div>
                                    <div className="w-2/3 flex flex-col gap-2">
                                        {isEditing ? (
                                            <>
                                                <input type="time" className="text-sm font-semibold w-fit outline-none bg-transparent dark:text-slate-100" value={formData.workingHoursDay} onChange={(e) => setFormData({...formData, workingHoursDay: e.target.value})} />
                                                <input type="date" className="text-sm font-semibold w-fit outline-none bg-transparent dark:text-slate-100" value={formData.effectiveFrom} onChange={(e) => setFormData({...formData, effectiveFrom: e.target.value})} />
                                                <p className="text-sm font-semibold">Duration based</p>
                                                <input type="text" className="text-sm font-semibold w-24 outline-none border-b border-gray-100 dark:border-slate-600 bg-transparent" value={formData.totalHoursWeek} onChange={(e) => setFormData({...formData, totalHoursWeek: e.target.value})} />
                                                <div className="flex flex-col gap-2 mt-2">
                                                    {formData.days.map((d, i) => (
                                                        <div key={i} className="flex gap-2 items-center">
                                                            <p className="w-24 text-sm font-semibold">{d.day}</p>
                                                            <input type="time" className="text-sm text-gray-400 dark:text-slate-300 border border-gray-100 dark:border-slate-600 rounded px-1 bg-transparent" value={d.hours} onChange={(e) => {
                                                                const newDays = [...formData.days];
                                                                newDays[i].hours = e.target.value;
                                                                setFormData({...formData, days: newDays});
                                                            }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm font-semibold">{sched.workingHoursDay}</p>
                                                <p className="text-sm font-semibold">{sched.effectiveFrom}</p>
                                                <p className="text-sm font-semibold">{sched.type}</p>
                                                <p className="text-sm font-semibold">{sched.totalHoursWeek}</p>
                                                {sched.days.map((d, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <p className="w-24 text-sm font-semibold">{d.day}</p>
                                                        <p className="text-sm text-gray-400">{d.hours}</p>
                                                    </div>
                                                ))}
                                                
                                                {userRole === 'hr' && (
                                                    <div className="flex gap-2 mt-4">
                                                        <button 
                                                            onClick={(e) => handleEditClick(e, sched)}
                                                            className="text-xs font-bold text-slate-800 dark:text-slate-900 bg-gray-100 dark:bg-slate-100 w-fit px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                                        >
                                                            EDIT DETAILS
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(sched.id)}
                                                            className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 w-fit px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}