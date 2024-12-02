import React, {useState} from "react";
import {BackupChoice, SantaChoice} from "@/components/UserControls";

function InlineSelect({options, onSelect}: {
    options: { text: string, value: SantaChoice | BackupChoice }[],
    onSelect: (value: string) => void
}) {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onSelect(newValue);
    };

    return (
        <select value={selectedValue} onChange={handleChange} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2">
            <option value={undefined}>--select an option---</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.text}

                </option>
            ))}
        </select>
    );
}

export default InlineSelect;