import React, { useState } from 'react';

interface Props {
    emailList: string[],
    setEmailList: any
}

const TextList = ({ emailList, setEmailList }: Props) => {
    const [inputText, setInputText] = useState('');

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' && inputText.trim() !== '') {
            setEmailList([...emailList, inputText]);
            setInputText('');
        }
    };

    const handleTextClick = (index: any) => {
        const newTextList = [...emailList];
        newTextList.splice(index, 1);
        setEmailList(newTextList);
    };

    return (
        <div className='w-full'>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Press Enter to add user"
                className='border-black border-[1px] p-2 w-full'
            />
            <div className='grid grid-cols-3 gap-1 my-2 overflow-x-scroll'>
                {emailList.map((text, index) => (
                    <div key={index} className='text-xs flex items-center justify-center bg-dark2 text-white rounded-full p-2 px-4 cursor-pointer hover:bg-red-800 duration-75' onClick={() => handleTextClick(index)}>{text}</div>
                ))}
            </div>
        </div>
    );
};

export default TextList;
