import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Card from '../../Components/Card'
import { MdAdd } from "react-icons/md";
import AddEditNotes from '../../Components/AddEditNotes';
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import moment from 'moment';
import Toast from '../../Components/Toast.jsx';
import Empty from '../../Components/Empty.jsx';
import imageO from '../../../public/images/add-note-svgrepo-com.svg'

const Dashboard = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        type: "add",
        message: ""
    })
    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState([])
    const navigate =useNavigate()

    const handleEdit = (noteData) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: noteData,
    })
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: "",
        })
    }

    const showToastMessage= (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type
        })
    }

    //getuser info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401){
                localStorage.clear();
                navigate("/login")
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/notes");
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.")
        }
    }

    const deleteNote = async (data) => {
        const noteId = data._id
        try {
            const response = await axiosInstance.delete("/note/delete/" + noteId);
      
          if (response.data && !response.data.error) {
            showToastMessage("Message deleted successfully", "delete")
            getAllNotes()
          }
          } catch (error) {
            if (error.response && error.response.data && error.response.data.message){
                console.log("An unexpected error occurred. Please try again.")
            }
          }
    }

    useEffect(() => {
        getUserInfo()
        getAllNotes()
    }, [])
  return (
    <>
        <Navbar userInfo={userInfo}></Navbar>
        <div className='container mx-auto p-2'>
            {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
                {allNotes.map((item, index) => (
                <Card key={item._id} title={item.title}
                date={moment(item.createdOn).format('Do MMM YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                Edit={() =>handleEdit(item)}
                Delete={() => {deleteNote(item)}}
                Pin={() => {}}>
            </Card>
                ))}
            </div> : <Empty imgSrc={imageO} message={`Start writing your first note! Click the 'Add' button to note down your thoughts, ideas, and reminders. Let's get started!`}/>}
        </div>
        <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 ' onClick={() => {
            setOpenAddEditModal({
                isShown: true,
                type: "add",
                data: null
            })
        }}>
            <MdAdd size={30} className=' text-white'></MdAdd>
        </button>

        <Modal isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
            },
        }}
        contentLable=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
            
        <AddEditNotes showToastMessage={showToastMessage} getAllNotes={getAllNotes} type={openAddEditModal.type} noteData={openAddEditModal.data} onClose={() => {
            setOpenAddEditModal({
                isShown: false,
                type: "add",
                data: null
            })
        }}></AddEditNotes>
        </Modal>

        <Toast isShown={showToastMsg.isShown} message={showToastMsg.message} type={showToastMsg.type} onClose={handleCloseToast}></Toast>
    </>
  )
}

export default Dashboard