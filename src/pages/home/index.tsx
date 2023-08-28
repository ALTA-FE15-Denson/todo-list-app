import { useState, useEffect } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import axios from "axios";
import Card from "../../component/Card";
import Popup from "../../component/Popup";
import Swal from "sweetalert2";

const index = () => {
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState<string>("");
  const [showCreate, setShowCreate] = useState<boolean>(false);

  //Input data
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [due_string] = useState<string>("");
  const [due_lang] = useState<string>("EN");
  const [priority] = useState<number>(4);

  //Update data
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [updateContent, setUpdateContent] = useState<string>("");
  const [updateDescription, setUpdateDescription] = useState<string>("");
  const [updateDueString, setUpdateDueString] = useState<string>("");
  const [updateDueLang, setUpdateDueLang] = useState<string>("EN");
  const [updatePriority, setUpdatePriority] = useState<number>(4);

  const handleSubmit = () => {
    axios
      .post(
        "https://api.todoist.com/rest/v2/tasks",
        {
          content: content,
          description: description,
          due_string: due_string,
          due_lang: due_lang,
          priority: priority,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_DATA_API}`,
          },
        }
      )
      .then(() => {
        setShowCreate(false);
        Swal.fire({
          title: "Success",
          text: "Task Created",
          icon: "success",
          confirmButtonText: "Ok",
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateData = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${updateId}`,
        {
          content: updateContent,
          description: updateDescription,
          due_string: updateDueString,
          due_lang: updateDueLang,
          priority: updatePriority,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_DATA_API}`,
          },
        }
      )
      .then(() => {
        setPopupVisible(false);
        Swal.fire({
          title: "Success",
          text: "Task Updated",
          icon: "success",
          confirmButtonText: "Ok",
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_DATA_API}`,
            },
          })
          .then(() => {
            getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleCompleteTask = (id: string) => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${id}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_DATA_API}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Task Completed",
          icon: "success",
          confirmButtonText: "Ok",
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTime = () => {
    const date = new Date();
    // get hari, tanggal, bulan, tahun
    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
    setDate(day);
  };

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

  const getUpdateData = (id: string) => {
    const detailData = data.find((item: any) => item.id === id);

    setUpdateId(detailData.id);
    setUpdateContent(detailData.content);
    setUpdateDescription(detailData.description);
    setUpdateDueString(detailData.due_string);
    setUpdateDueLang(detailData.due_lang);
    setUpdatePriority(detailData.priority);

    setPopupVisible(true);
  };

  const handleCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleUpdate = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    getData();
    handleTime();
  }, []);

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
      <section className="relative pt-16">
        <div className="container mx-auto lg:px-52 flex flex-col justify-center">
          <div className="p-2 lg:p-5">
            <p className="font-bold text-[18px] lg:text-[25px]">
              Today{" "}
              <span className="text-[15px] font-normal text-gray-400">
                {date}
              </span>
            </p>
            <p className="py-2 text-center font-semibold text-[22px] lg:text-[30px]">
              All Task
            </p>
            {
            data &&
              data.map((item: any, index: number) => {
                return (
                  <Card
                    key={index}
                    id={item.id}
                    content={item.content}
                    date={item.date}
                    description={item.description}
                    onClick={() => getUpdateData(item.id)}
                    onRemove={() => handleRemove(item.id)}
                    onComplete={() => handleCompleteTask(item.id)}
                  />
                );
              })
              }
          </div>
        </div>
      </section>
      <section id="addTask" className="fixed bottom-2 right-2 lg:bottom-10 lg:right-10">
        <button
          onClick={() => handleCreate()}
          className="border-none rounded-full focus:border-none focus:outline-none transition ease-in-out transition ease-in-out bg-transparent hover:bg-red-500 p-5"
        >
          <img src={`../../../public/plus.png`} alt="" className="w-5 h-5 text-white" />
          <Popup show={showCreate} onClose={() => setShowCreate(!showCreate)}>
            <Input
              id="create"
              placeholder="Create Task"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Input
              id="description"
              placeholder="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button id="submit" label="Submit" onClick={() => handleSubmit()} />
          </Popup>
        </button>
      </section>
      {popupVisible && (
        <section id="addTask" className="absolute bottom-10 right-10">
          <button
            onClick={() => handleUpdate()}
            className="border-none focus:border-none focus:outline-none transition ease-in-out"
          >
            <img src="../../../public/plus.png" alt="" className="w-6 h-6" />
            <Popup
              show={popupVisible}
              onClose={() => setPopupVisible(!popupVisible)}
            >
              <Input
                id="create"
                placeholder="Create Task"
                type="text"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
              />
              <Input
                id="description"
                placeholder="Description"
                type="text"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
              <Button
                id="submit"
                label="Submit"
                onClick={() => handleUpdateData()}
              />
            </Popup>
          </button>
        </section>
      )}
    </>
  );
};

export default index;
