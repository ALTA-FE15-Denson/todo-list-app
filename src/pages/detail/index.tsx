import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Detail from '../../component/Detail';

const index = () => {

  const {id} = useParams<{id: string}>()
  const [data, setData] = useState<any>([]); 

  const getData = () => {
    axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_DATA_API}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataDetail = data.find((item: any) => item.id === id)

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
       <nav className="bg-red-500 border-gray-200 fixed z-50 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img
              src="../../../public/to-do-list.png"
              className="h-4 lg:h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl lg:text-2xl font-semibold whitespace-nowrap text-white">
              To Do List App
            </span>
          </a>
        </div>
      </nav>
      <section className='pt-20 lg:pt-28'>
        <Detail 
          id={dataDetail?.id}
          content={dataDetail?.content}
          date={dataDetail?.due_string}
          description={dataDetail?.description}
        />
      </section>
    </>
  )
}

export default index