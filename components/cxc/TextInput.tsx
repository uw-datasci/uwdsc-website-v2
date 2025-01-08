import React from 'react';

interface TextInputProps {
    placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-[#332F39] text-white border border-white rounded-sm font-jersey tracking-wider font-thin focus:outline-none focus:ring-2 focus:ring-white"
        />
    );
};

export default TextInput;