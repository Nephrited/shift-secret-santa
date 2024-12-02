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
        <select value={selectedValue} onChange={handleChange}>
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