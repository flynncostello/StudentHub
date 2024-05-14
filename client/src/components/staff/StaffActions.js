import React, { useEffect, useState } from 'react';
import HubNavbar from '../hub/HubNavbar';
import userAPI from '../../api/user';
import './StaffActions.css';

const StaffActions = () => {
    const [students, setStudents] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const allStudents = await userAPI.getAllStudents();
                console.log("ALL STUDENTS: ", allStudents)
                const studentsObj = allStudents.reduce((obj, student) => {
                    return {...obj, [student.id]: student};
                }, {});
                setStudents(studentsObj);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
    
        fetchStudents();
    }, []);

    const handleMuteStudent = async (studentId) => {
        try {
            setStudents(prevStudents => {
                return {
                    ...prevStudents,
                    [studentId]: {
                        ...prevStudents[studentId],
                        is_muted: true
                    }
                };
            });
            await userAPI.setUsersMutedState(studentId, true);
        } catch (error) {
            console.error('Error muting user:', error);
        }
    };

    const handleUnmuteStudent = async (studentId) => {
        try {
            setStudents(prevStudents => {
                return {
                    ...prevStudents,
                    [studentId]: {
                        ...prevStudents[studentId],
                        is_muted: false
                    }
                };
            });
            await userAPI.setUsersMutedState(studentId, false);
        } catch (error) {
            console.error('Error unmuting user:', error);
        }
    };

    return (
        <div className='staff-actions-page-container'>
            <HubNavbar />
            <div className='mute-students-container'>
                <h1>Mute Students</h1>
                {Object.values(students).map(student => (
                    <div key={student.id}>
                        <span>{student.username}</span>
                        {student.is_muted 
                            ? <button className='unmute-button' onClick={() => handleUnmuteStudent(student.id)}>Unmute</button>
                            : <button className='mute-button' onClick={() => handleMuteStudent(student.id)}>Mute</button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffActions;