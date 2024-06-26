import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import Card from '../../Components/Card'
import { MdAdd } from "react-icons/md";
import AddEditNotes from '../../Components/AddEditNotes';
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import moment from 'moment';

const Dashboard = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState([])
    const navigate =useNavigate()

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

    useEffect(() => {
        getUserInfo()
        getAllNotes()
    }, [])
  return (
    <>
        <Navbar userInfo={userInfo}></Navbar>
        <div className='container mx-auto p-2'>
            <div className="grid grid-cols-3 gap-4 mt-8">
                {allNotes.map((item, index) => (
                <Card key={item._id} title={item.title}
                date={moment(item.createdOn).format('Do MMM YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                Edit={() => {}}
                Delete={() => {}}
                Pin={() => {}}>
            </Card>
                ))}
            </div>
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
            
        <AddEditNotes getAllNotes={getAllNotes} type={openAddEditModal.type} noteData={openAddEditModal.data} onClose={() => {
            setOpenAddEditModal({
                isShown: false,
                type: "add",
                data: null
            })
        }}></AddEditNotes>
        </Modal>
    </>
  )
}

export default Dashboard