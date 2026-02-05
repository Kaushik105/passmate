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
  const [visibleItems, setVisibleItems] = useState({});
  const defaultKey = import.meta.env.VITE_ENCRYPTION_KEY;

  const toggleVisibility = (id) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
    <div className="sm:w-4/5 w-[95%] max-w-[1200px] mx-auto py-10 min-h-[80vh]">
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

      <div className="heading text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-4xl font-black text-violet-900 tracking-tighter">
            Pass<span className="text-violet-500">Mate</span>
          </h1>
        </div>
        <p className="text-violet-700 font-medium text-lg">Your Secure Personal Password Manager</p>
      </div>

      <div className="bg-white/50 backdrop-blur-sm border border-violet-100 rounded-3xl p-8 shadow-xl shadow-violet-100/50 mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="font-semibold text-violet-900 px-1 text-sm">
              Website URL
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={form.url}
              placeholder="https://example.com"
              className="bg-white border border-violet-200 outline-none w-full px-5 py-3 rounded-2xl transition-all focus:ring-2 focus:ring-violet-400 focus:border-transparent"
              name="url"
              id="url"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="font-semibold text-violet-900 px-1 text-sm">
                Username or Email
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={form.username}
                placeholder="johndoe@email.com"
                className="bg-white border border-violet-200 outline-none px-5 py-3 rounded-2xl transition-all focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                name="username"
                id="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-violet-900 px-1 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  ref={passref}
                  type="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="••••••••"
                  className="bg-white border border-violet-200 outline-none w-full px-5 py-3 rounded-2xl transition-all focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                  name="password"
                  id="password"
                />
                <img
                  ref={ref}
                  className="absolute top-1/2 -translate-y-1/2 right-4 w-6 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                  src="/eye.svg"
                  onClick={showPass}
                  alt="toggle visibility"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={savepass}
              className="px-8 py-3 cursor-pointer flex items-center gap-2 font-bold text-white rounded-2xl bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all shadow-lg shadow-violet-200"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              ></lord-icon>
              {editing ? 'Update Password' : 'Save Password'}
            </button>

            {editing && (
              <button
                onClick={() => {
                  setEditing(false);
                  setForm({ url: "", username: "", password: "", id: "" });
                }}
                className="px-8 py-3 font-bold text-violet-700 rounded-2xl bg-violet-100 hover:bg-violet-200 active:scale-95 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8 px-2">
        <h2 className="font-bold text-2xl text-violet-900">Your Vault</h2>
        <div className="h-[2px] flex-grow bg-violet-100 rounded-full"></div>
        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-bold">
          {passwordArr.length}
        </span>
      </div>

      <div className="space-y-4">
        {passwordArr.length === 0 ? (
          <div className="bg-white/30 border-2 border-dashed border-violet-200 rounded-3xl p-12 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/msetyssy.json"
              trigger="loop"
              delay="2000"
              colors="primary:#7c3aed"
              style={{ width: "64px", height: "64px" }}
            ></lord-icon>
            <p className="mt-4 text-violet-400 font-medium text-lg">Your vault is empty. Start by adding a password above!</p>
          </div>
        ) : (
          passwordArr.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col md:flex-row gap-4 bg-white border border-violet-50 p-4 md:p-6 justify-between items-start md:items-center rounded-2xl hover:shadow-xl hover:shadow-violet-100 hover:border-violet-200 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-[85%]">
                <div
                  className="flex flex-col cursor-pointer group/item min-w-[30%] max-w-full md:max-w-[30%]"
                  onClick={() => copyText(item.url)}
                >
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-1">Website</span>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-zinc-800 truncate">{item.url}</p>
                    <lord-icon
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "16px", height: "16px" }}
                    ></lord-icon>
                  </div>
                </div>

                <div
                  className="flex flex-col cursor-pointer group/item min-w-[30%] max-w-full md:max-w-[30%]"
                  onClick={() => copyText(item.username)}
                >
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-1">User / Email</span>
                  <div className="flex items-center gap-2">
                    <p className="text-zinc-600 truncate">
                      {visibleItems[item.id] ? item.username : "••••••••"}
                    </p>
                    <lord-icon
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "16px", height: "16px" }}
                    ></lord-icon>
                  </div>
                </div>

                <div
                  className="flex flex-col cursor-pointer group/item min-w-[30%] max-w-full md:max-w-[30%]"
                  onClick={() => copyText(item.password)}
                >
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider mb-1">Password</span>
                  <div className="flex items-center gap-2">
                    <p className="text-zinc-600 font-mono">
                      {visibleItems[item.id] ? item.password : "••••••••"}
                    </p>
                    <lord-icon
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "16px", height: "16px" }}
                    ></lord-icon>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-row gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-violet-100 justify-end items-center">
                <button
                  onClick={() => toggleVisibility(item.id)}
                  className="p-2 rounded-xl hover:bg-violet-50 transition-colors"
                  title="Toggle Visibility"
                >
                  <img
                    className="w-5 opacity-60 hover:opacity-100"
                    src={visibleItems[item.id] ? "/eyecross.svg" : "/eye.svg"}
                    alt="visibility"
                  />
                </button>
                <button
                  onClick={() => editPass(item.id)}
                  className="p-2 rounded-xl hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/gwlusjdu.json"
                    trigger="hover"
                    style={{ width: "22px", height: "22px" }}
                  ></lord-icon>
                </button>
                <button
                  onClick={() => deletePass(item.id)}
                  className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    style={{ width: "22px", height: "22px" }}
                  ></lord-icon>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;