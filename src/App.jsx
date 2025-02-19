import { useState } from "react";
import "./App.css";

const App = () => {
  const data = [
    {
      id: 1,
      title: "The first task tittle",
      description: "lorem lorem lorem loremloremlorem",
      status: false,
    },
    {
      id: 2,
      title: "The  tittle",
      description:
        "lorem lorem lorem  loremloremlo loremloremloremlorem lorem ",
      status: true,
    },
    {
      id: 3,
      title: "The first task",
      description: "lorem lorem lorem loremloremlorem",
      status: false,
    },
  ];
  //Hooks
  const [tasks, setTasks] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titles, setTitle] = useState("");
  const [descriptions, setDescription] = useState("");
  const [isModalOpenE, setIsModalOpenE] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all");
  //////////////////////////////////////////////////

  //functions

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function checked(task) {
    let newData = tasks.map((elem) => {
      if (elem.id == task.id) {
        return {
          ...elem,
          status: !elem.status,
        };
      }
      return elem;
    });
    setTasks(newData);
  }
  function addForm(event) {
    event.preventDefault();
    let newTask = {
      id: Date.now(),
      title: titles,
      description: descriptions,
      status: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  }
  function editTaskF(task) {
    setEditTask(task);
    setIsModalOpenE(true);
  }
  function editForm(event) {
    event.preventDefault();
    const updateTasks = tasks.map((task) =>
      task.id == editTask.id
        ? {
            ...task,
            title: editTask.title,
            description: editTask.description,
          }
        : task
    );
    setTasks(updateTasks);
    setEditTask({});
    setIsModalOpenE(false);
  }
  const filteredData = tasks
    .filter((el) =>
      JSON.stringify(el).toLowerCase().includes(search.toLowerCase())
    )
    .filter((el) =>
      select === "all" ? true : el.status == (select == "active")
    );
  return (
    <>
      <section className="flex w-[90%] m-auto items-start flex-col lg:flex-row">
        <aside className="lg:w-[300px]  z-2 lg:bg-transparent bg-white fixed w-[100%]">
          <h1 className="lg:text-[64px] text-[40px] text-[#808080] font-bold">
            TODO
          </h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 rounded-2xl border-[gray] lg:w-auto w-[90%] py-[5px] px-[10px] text-[18px] font-bold"
            placeholder="search..."
          />{" "}
          <br />
          <div className="flex items-center lg:flex-row flex-row-reverse lg:justify-start justify-between lg:mx-0 mx-[50px] gap-[30px]">
            <select
              name=""
              className="text-[18px] border-[gray] py-[10px] px-[15px] rounded-2xl my-[20px] font-bold border-2"
              id=""
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <span
              className="text-[60px] mr-[100px] font-bold cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              +
            </span>
          </div>
          <div className="lg:flex hidden gap-[20px] items-center ">
            <div className="bg-[#B7B1DD] w-[30px] h-[30px] rounded-4xl"></div>
            <p className="text-[30px] text-[#808080] font-bold">work</p>
          </div>
          <div className="lg:flex hidden gap-[20px] items-center mt-[30px]">
            <div className="bg-[#81DCF0] w-[30px] h-[30px] rounded-4xl"></div>
            <p className="text-[30px] text-[#808080] font-bold">study</p>
          </div>
          <div className="lg:flex hidden gap-[20px] items-center mt-[30px]">
            <div className="bg-[#F8ABAB] w-[30px] h-[30px] rounded-4xl"></div>
            <p className="text-[30px] text-[#808080] font-bold">
              entertainment
            </p>
          </div>
          <div className="lg:flex hidden gap-[20px] items-center mt-[30px]">
            <div className="bg-[#90F3D0] w-[30px] h-[30px] rounded-4xl"></div>
            <p className="text-[30px] text-[#808080] font-bold">family</p>
          </div>
        </aside>
        <aside className="w-[80%] m-auto lg:mt-0 mt-[220px] lg:ml-[300px] relative py-[30px] flex gap-[60px] flex-wrap">
          {filteredData.length === 0 ? (
            <h1 className="text-[70px] text-[red] font-bold lg:top-[200px] text-center lg:left-[30%]  absolute">
              NOT FOUND
            </h1>
          ) : (
            filteredData.map((task) => (
              <div
                className="w-[358px] h-[187px] bg-[#FFF9DE] p-[10px]"
                key={task.id}
              >
                <h1 className="text-[20px] font-bold text-black">
                  {task.title}
                </h1>
                <p className="text-[#595959] text-[15px] font-bold">
                  {task.description}
                </p>
                <div className="flex gap-[10px] justify-between">
                  <div className="flex gap-[10px] py-[20px] items-center">
                    <i
                      class="bi bi-pencil-fill text-[gray] cursor-pointer text-[20px] font-bold"
                      onClick={() => editTaskF(task)}
                    ></i>
                    <i
                      class="bi bi-trash-fill text-[red] cursor-pointer text-[20px] font-bold"
                      onClick={() => deleteTask(task.id)}
                    ></i>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <input
                      type="checkbox"
                      checked={task.status}
                      onChange={() => checked(task)}
                      className="cursor-pointer"
                    />
                    <span
                      className={
                        task.status
                          ? "text-[18px] text-[green]"
                          : "text-[18px] text-[red]"
                      }
                    >
                      {task.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </aside>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg py-[23px] w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Task</h2>
              <button
                className="cursor-pointer font-bold text-[18px]"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
            </div>
            <form onSubmit={addForm}>
              <p className="text-[16px] ">Title</p>
              <input
                type="text"
                value={titles}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border-1  border-[gray] rounded-lg p-2 w-full mb-4"
              />
              <p className="text-[16px] ">Description</p>
              <textarea
                value={descriptions}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border-1 border-[gray] rounded-lg p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 mx-[20px] bg-white text-[#2196F3] border-2 cursor-pointer px-4 py-2 rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      {isModalOpenE && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg py-[23px] w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Task</h2>
              <button
                className="cursor-pointer font-bold text-[18px]"
                onClick={() => setIsModalOpenE(false)}
              >
                X
              </button>
            </div>
            <form onSubmit={editForm}>
              <p className="text-[16px] ">Title</p>
              <input
                type="text"
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                placeholder="Title"
                className="border-1  border-[gray] rounded-lg p-2 w-full mb-4"
              />
              <p className="text-[16px] ">Description</p>
              <textarea
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
                placeholder="Description"
                className="border-1 border-[gray] rounded-lg p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsModalOpenE(false)}
                className="mt-4 mx-[20px] bg-white text-[#2196F3] border-2 cursor-pointer px-4 py-2 rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
