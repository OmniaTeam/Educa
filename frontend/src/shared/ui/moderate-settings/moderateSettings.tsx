import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../index";
import { getInstitutes } from "../../../pages/application/institutesPage/api/index";

import './styles.scss';

interface Department {
    id: number;
    name: string;
}

export const ModerationSettings = () => {
    const dispatch = useAppDispatch();

    const [role, setRole] = useState<string>("");
    const [institute, setInstitute] = useState<string>("");
    const [department, setDepartment] = useState<string>("")
    const [departments, setDepartments] = useState<Department[]>([]);

    const institutes = useAppSelector((state) => state.institutes);

    useEffect(() => {
        dispatch(getInstitutes({})).unwrap();
    }, [dispatch]);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
        setInstitute("");
        setDepartments([]);
    };

    const handleInstituteChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedInstitute = event.target.value;
        setInstitute(selectedInstitute);
        setDepartments([]);

        try {
            const response = await fetch(`https://educa.theomnia.ru/api/department/get/institute/${selectedInstitute}`);
            if (response.ok) {
                const data: Department[] = await response.json();
                setDepartments(data);
            } else {
                console.error('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartment(event.target.value);
    };

    return (
        <div className="moderate-settings">
            <h2 className="moderate-settings--title">Настройка профиля</h2>
            <div className="moderate-settings--content">
                <select className="moderate-settings--selector" value={role} onChange={handleRoleChange}>
                    <option value="">Выберите роль</option>
                    <option value="student">Студент</option>
                    <option value="teacher">Преподаватель</option>
                </select>
                {(role === "student" || role === "teacher") && (
                    <select className="moderate-settings--selector" value={institute} onChange={handleInstituteChange}>
                        <option value="">Выберите институт</option>
                        {institutes.institutes.map((value: any, index) => 
                            <option key={index} value={value.id}>{value.name}</option>
                        )}
                    </select>
                )}
                {role === "student" && institute && (
                    <select className="moderate-settings--selector" value={department} onChange={handleDirectionChange}>
                        <option value="">Выберите кафедру</option>
                        {departments.map((value: Department, index: number) => 
                            <option key={index} value={value.id.toString()}>{value.name}</option>
                        )}
                    </select>
                )}
            </div>
        </div>
    );
};
