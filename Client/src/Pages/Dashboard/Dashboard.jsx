import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Card from '../../Components/Card'
import { MdAdd } from "react-icons/md";
import AddEditNotes from '../../Components/AddEditNotes';
import Modal from "react-modal"

const Dashboard = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })
  return (
    <>
        <Navbar></Navbar>
        <div className='container mx-auto p-2'>
            <div className="grid grid-cols-3 gap-4 mt-8">
                <Card title="Project Complete"
                    date="11th  Aug 2024"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    tags="#project"
                    isPinned={true}
                    Edit={() => {}}
                    Delete={() => {}}
                    Pin={() => {}}>
                </Card>

                <Card title="Project Complete"
                    date="11th  Aug 2024"
                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    tags="#project"
                    isPinned={false}
                    Edit={() => {}}
                    Delete={() => {}}
                    Pin={() => {}}>
                </Card>
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
            
        <AddEditNotes onClose={() => {
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