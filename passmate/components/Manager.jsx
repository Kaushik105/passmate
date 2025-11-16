import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword, decryptPassword } from "../src/utils/encryption";

const Main = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    url: "",
    username: "",
    password: "",
    id: "",
  });
  const passref = useRef();
  const ref = useRef();
  const [passwordArr, setPasswordArr] = useState([]);
  const defaultKey = import.meta.env.VITE_ENCRYPTION_KEY;

  useEffect(() => {
    loadPasswords();
  }, []);

  // Load passwords from localStorage
  const loadPasswords = () => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      try {
        const parsedData = JSON.parse(passwords);
        // Decrypt only the password field for each entry
        const decryptedPasswords = parsedData.map(item => ({
          ...item,
          password: decryptPassword(item.password, defaultKey)
        }));
        setPasswordArr(decryptedPasswords);
      } catch (e) {
        console.error("Failed to load passwords", e);
        setPasswordArr([]);
      }
    }
  };

  // Save passwords to localStorage
  const savePasswordsToStorage = (passwords) => {
    // Encrypt only the password field for each entry
    const encryptedPasswords = passwords.map(item => ({
      ...item,
      password: encryptPassword(item.password, defaultKey)
    }));

    localStorage.setItem("passwords", JSON.stringify(encryptedPasswords));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savepass = () => {
    if (!(form.url && form.username && form.password)) {
      toast.error("Form can't be blank");
      return;
    }

    let updatedPasswordArr = [...passwordArr];

    if (editing) {
      updatedPasswordArr = passwordArr.map((item) =>
        item.id === form.id ? { ...item, ...form } : item
      );
      setPasswordArr(updatedPasswordArr);
      savePasswordsToStorage(updatedPasswordArr);
      toast.success("Password updated successfully");
    } else {
      const newEntry = { ...form, id: uuidv4() };
      updatedPasswordArr = [...passwordArr, newEntry];
      setPasswordArr(updatedPasswordArr);
      savePasswordsToStorage(updatedPasswordArr);
      toast.success("Password saved successfully");
    }

    // Reset form
    setForm({
      url: "",
      username: "",
      password: "",
      id: "",
    });
    setEditing(false);
  };

  const showPass = () => {
    if (ref.current.src.includes("/eye.svg")) {
      passref.current.type = "text";
      ref.current.src = "/eyecross.svg";
    } else {
      passref.current.type = "password";
      ref.current.src = "/eye.svg";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPass = (id) => {
    const editForm = passwordArr.find((item) => item.id === id);
    if (editForm) {
      setForm(editForm);
      setEditing(true);
    }
  };

  const deletePass = (id) => {
    const newPasswordArr = passwordArr.filter((item) => item.id !== id);
    setPasswordArr(newPasswordArr);
    savePasswordsToStorage(newPasswordArr);
    toast.success("Password deleted successfully");
  };

  return (
    <div className=" sm:w-4/5 w-[95%] max-w-[1700px] mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="heading text-center font-medium text-2xl m-5">
        Your Personal Password Manager
      </div>

      <div className="flex flex-col gap-1.5">
        <span>
          {" "}
          <label htmlFor="url" className="font-medium p-2">
            Enter the website URL
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={form.url}
            className="bg-violet-200 outline-0 w-full px-4 py-1.5 rounded-2xl my-2"
            name="url"
            id="url"
          />
        </span>

        <span className=" sm:flex gap-5">
          <span className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="username" className="font-medium p-2">
              Username or email
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={form.username}
              className="bg-violet-200 outline-0 px-4 py-1.5 rounded-2xl "
              name="username"
              id="username"
            />
          </span>
          <span className="flex flex-col w-full sm:w-1/2">
            <label htmlFor="password" className="font-medium p-2">
              Password
            </label>
            <div className="passeye relative">
              <img
                ref={ref}
                className="absolute top-1 p-1 right-1.5 w-7 rounded-full active:bg-slate-300 "
                src="/eye.svg"
                onClick={showPass}
                alt=""
              />
            </div>
            <input
              ref={passref}
              type="password"
              onChange={handleChange}
              value={form.password}
              className="bg-violet-200 px-4 outline-0 py-1.5 rounded-2xl "
              name="password"
              id="password"
            />
          </span>
        </span>

        <div className="flex justify-center">
          <button
            onClick={savepass}
            type="submit"
            className="px-5 flex items-center gap-1 font-medium text-lg mx-auto my-5 py-2.5 rounded-3xl bg-violet-400 active:bg-violet-500"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            {editing ? 'Update Password' : 'Save Password'}
          </button>

          {editing && (
            <button
              onClick={() => {
                setEditing(false);
                setForm({
                  url: "",
                  username: "",
                  password: "",
                  id: "",
                });
              }}
              type="button"
              className="px-5 py-2.5 font-medium rounded-3xl bg-gray-400 active:bg-gray-500 ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="savedpasswords font-bold text-2xl">Your Passwords</div>
      <div className="table w-full overflow-y-auto mt-8">
        {passwordArr.length === 0 ? (
          <p className="font-medium text-center text-2xl">No Saved Passwords</p>
        ) : (
          passwordArr.map((item) => {
            return (
              <div key={item.id} className="tableitem flex flex-col min-[500px]:flex-row gap-2 bg-violet-100 p-5 justify-between my-3 rounded-xl">
                <span
                  className="flex justify-between min-[500px]:pr-8 min-[500px]:w-[30%] w-full cursor-pointer items-center"
                  onClick={() => {
                    copyText(item.url);
                  }}
                >
                  <p className="font-medium text-lg text-zinc-900 truncate max-w-[80%]">
                    {item.url}
                  </p>
                  <lord-icon
                    style={{
                      width: "25px",
                      height: "25px",
                      paddingTop: "3px",
                      paddingLeft: "3px",
                    }}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover"
                  ></lord-icon>
                </span>
                <span
                  className="flex justify-between min-[500px]:pr-8 min-[500px]:w-[30%] w-full cursor-pointer items-center"
                  onClick={() => {
                    copyText(item.username);
                  }}
                >
                  <p className="text-lg text-zinc-700 truncate max-w-[80%]">{item.username}</p>
                  <lord-icon
                    style={{
                      width: "25px",
                      height: "25px",
                      paddingTop: "3px",
                      paddingLeft: "3px",
                    }}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover"
                  ></lord-icon>
                </span>
                <span
                  className="flex justify-between min-[500px]:pr-8 min-[500px]:w-[30%] w-full cursor-pointer items-center"
                  onClick={() => {
                    copyText(item.password);
                  }}
                >
                  <p className="text-lg text-zinc-700 truncate max-w-[80%]">{item.password}</p>
                  <lord-icon
                    style={{
                      width: "25px",
                      height: "25px",
                      paddingTop: "3px",
                      paddingLeft: "3px",
                    }}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover"
                  ></lord-icon>
                </span>
                <div className="actions  min-[500px]:w-[18%] w-full flex justify-evenly items-center">
                  <lord-icon
                    onClick={() => {
                      editPass(item.id);
                    }}
                    className="cursor-pointer"
                    src="https://cdn.lordicon.com/gwlusjdu.json"
                    trigger="hover"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <lord-icon
                    onClick={() => {
                      deletePass(item.id);
                    }}
                    className="cursor-pointer"
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Main;