import React, { useState, useRef } from 'react'
import SSIDGenerator from '../util/SSIDGenerator'
import MessageBox from './messagebox';
import '../css/taskpane.css'
import TextBox from './TextBox';

export default function TaskPane({ paneKey, onClose }) {

    const [subTask, setSubTask] = useState([]);
    // const [finishButton, setFinishButton] = useState(null); // Initialize with null
    const [message, setMessage] = useState(false);
    const [subTaskContent, setSubtaskContent] = useState('')
    const titleText = useRef();

    function handleSubtaskInput(subTaskContent, subTaskKey) {
        const updatedSubtask = subTask.map(st => {
            if (st.key === subTaskKey) {
                return {
                    ...st,
                    content: subTaskContent
                }
            }
            return st
        })
        setSubTask(updatedSubtask)
    }

    const closeSubTask = (k) => {
        const updatedSubTask = subTask.map(st => {
            if (st.key === k) {
                return { ...st, isOpen: false };
            }
            return st;
        });
        setSubTask(updatedSubTask);
    }

    const addSubTask = () => {
        let ssid = SSIDGenerator.generateSSID();
        console.log(ssid);
        const newSubTask = {
            isOpen: true,
            isEditing: true,
            content: '',
            key: ssid
        }

        setSubTask((prevSubTasks) => [...prevSubTasks, newSubTask]);
    }

    // Check if there are open subtasks to show the finish button
    const hasOpenSubtasks = subTask.some(t => t.isOpen);

    const [isMsgOpen, setIsMsgOpen] = useState(false)

    function finishButtonValidation(paneKey, titleText) {
        if (titleText.current.value === '') {
            console.log("Title cannot be left empty.");
            setMessage("Title cannot be left empty.")
            setIsMsgOpen(true)
        } else {
            const updatedSubtasks = subTask.map(st => {
                return {
                    ...st,
                    isEditing: false
                }
            })

            setSubTask(updatedSubtasks)
        }
    }


    // const taskPaneKey = SSIDGenerator.generateSSID();

    return (
        <>
            <MessageBox message={message} isMsgOpen={isMsgOpen} setIsMsgOpen={setIsMsgOpen} />
            <div className='task-pane' paneKey={paneKey}>
                <div>
                    {/* <h2>Task title</h2> */}

                    <button className='close-button-pane' onClick={() => onClose(paneKey)}>Close</button>
                    {/* <div className='task-pane-input'>
                        <input type='text' ref={titleText} required></input>
                        <i className='input-label'>Task Title</i>
                        <div className='input-back'></div>
                    </div> */}

                    <TextBox reference={titleText} placeholder={"Task Title"} />

                </div>
                <div className='subtasks'>
                    <h3>Subtasks</h3>
                    <i className='add-subtask fa-solid fa-plus' onClick={addSubTask}></i>
                    <ol>
                        {subTask.map(t => t.isOpen && (
                            <li className='sub-task' key={t.key}>

                                {
                                    t.isEditing ?
                                        (
                                            // <>
                                            //     <input type='text' value={t.content} onChange={e => handleSubtaskInput(e.target.value, t.key)}></input>
                                            //     <i id='close-subtask' className='fa-solid fa-close' onClick={() => closeSubTask(t.key)}></i>
                                            // </>
                                            <div className='relative flex align-middle'>
                                                <TextBox placeholder={"Subtask"} value={t.content} onChange={e => handleSubtaskInput(e.target.value, t.key)} closeSubTask={() => closeSubTask(t.key)} subTaskKey={t.key} closable={true} />
                                            </div>
                                        ) :
                                        (
                                            <p>{t.content}</p>
                                        )
                                }
                            </li>
                        ))}
                    </ol>
                    <div className='btn-finish'>
                        <button onClick={() => finishButtonValidation(paneKey, titleText)}>Finish</button>
                    </div>
                </div>
            </div>
        </>
    );
}

