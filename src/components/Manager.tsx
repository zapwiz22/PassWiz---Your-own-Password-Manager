import React from "react";
import { useState, useRef, useEffect } from "react";
import eyeIcon from "../assets/eye-svg.svg";
import hideIcon from "../assets/hide-svg.svg";
import addIcon from "../assets/plus.svg";
import copyIcon from "../assets/copy-svg.svg";
import { ToastContainer, toast } from "react-toastify";
import deleteIcon from "../assets/delete-svg.svg";
import editIcon from "../assets/edit-svg.svg";
import { v4 as uuidv4 } from "uuid";

interface PasswordEntry {
  site: string;
  username: string;
  password: string;
  id: string;
}

const Manager: React.FC = () => {
  const [form, setform] = useState<PasswordEntry>({
    site: "",
    username: "",
    password: "",
    id: "",
  });
  const [passwordArray, setpasswordArray] = useState<PasswordEntry[]>([]);
  const [showInputPassword, setShowInputPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  const passwordRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const toggleInputPasswordVisibility = () => {
    if (!passwordRef.current || !passRef.current) return;

    const shouldShow = !showInputPassword;
    setShowInputPassword(shouldShow);
    passwordRef.current.type = shouldShow ? "text" : "password";
    passRef.current.src = shouldShow ? hideIcon : eyeIcon;
    passRef.current.alt = shouldShow ? "Hide password" : "Show password";
  };

  const savePassword = (): void => {
    const validation = {
      site: form.site.trim(),
      username: form.username.trim(),
      password: form.password.trim(),
    };

    if (!validation.site) {
      alert("Website URL cannot be empty");
      return;
    }
    if (!validation.username) {
      alert("Username cannot be empty");
      return;
    }
    if (!validation.password) {
      alert("Password cannot be empty");
      return;
    }

    const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
    setpasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    setform({ site: "", username: "", password: "", id: "" });
    setShowInputPassword(false);
    if (passwordRef.current) {
      passwordRef.current.type = "password";
    }
    toast("Password Saved!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = (id: string): void => {
    const c = confirm("Do you really want to DELETE this password?");
    if (c) {
      const newPasswordArray = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id: string): void => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setform(passwordToEdit);
      const newPasswordArray = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(newPasswordArray);
      setShowInputPassword(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied to Clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(console.error);
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>Pass
          <span className="text-green-700">Wiz /&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            placeholder="Enter Website URL"
            className="bg-white border border-green-600 w-full rounded-full py-1 p-4"
          />
          <div className="flex gap-3 w-full justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="username"
              className="bg-white border border-green-600 w-full rounded-full py-1 p-4"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
                type={showInputPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="bg-white border border-green-600 w-full rounded-full py-1 p-4"
              />
              <span
                className="absolute right-[10px] top-[4px] cursor-pointer"
                onClick={toggleInputPasswordVisibility}
              >
                <img
                  ref={passRef}
                  width="25"
                  src={showInputPassword ? hideIcon : eyeIcon}
                  alt={showInputPassword ? "Hide password" : "Show password"}
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-3 bg-green-600 w-fit rounded-full px-8 py-2 hover:bg-green-300 border border-y-green-900"
          >
            <img
              src={addIcon}
              alt="Add password"
              width={26}
              className="bg-white rounded-full"
            />
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
          {passwordArray.length === 0 ? (
            <div>No Passwords to Show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="text-white bg-green-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50">
                {passwordArray.map((item, index) => {
                  const isLastRow = index === passwordArray.length - 1;
                  const isFirstRow = index === 0;
                  const isVisible = visiblePasswords[item.id];

                  return (
                    <tr
                      key={item.id}
                      className={isLastRow ? "rounded-b-lg" : ""}
                    >
                      <td
                        className={`py-2 border border-green-200 text-center w-32 relative group
                        ${isLastRow ? "border-b-0" : ""} 
                        ${isFirstRow ? "border-t-0" : ""}`}
                      >
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <button
                          onClick={() => copyToClipboard(item.site)}
                          className="cursor-pointer absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          <img src={copyIcon} width="16" alt="Copy site" />
                        </button>
                      </td>
                      <td
                        className={`py-2 border border-green-200 text-center w-32 relative group
                        ${isLastRow ? "border-b-0" : ""} 
                        ${isFirstRow ? "border-t-0" : ""}`}
                      >
                        {item.username}
                        <button
                          onClick={() => copyToClipboard(item.username)}
                          className="cursor-pointer absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          <img src={copyIcon} width="16" alt="Copy username" />
                        </button>
                      </td>
                      <td
                        className={`py-2 border border-green-200 text-center w-32 relative group
                        ${isLastRow ? "border-b-0 rounded-br-lg" : ""} 
                        ${isFirstRow ? "border-t-0 rounded-tr-lg" : ""}`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {isVisible
                            ? item.password
                            : "•".repeat(item.password.length)}
                          <button
                            onClick={() => togglePasswordVisibility(item.id)}
                            className="cursor-pointer p-1"
                          >
                            <img
                              src={isVisible ? hideIcon : eyeIcon}
                              width="16"
                              alt={
                                isVisible ? "Hide password" : "Show password"
                              }
                            />
                          </button>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.site)}
                          className="cursor-pointer absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          <img src={copyIcon} width="16" alt="Copy site" />
                        </button>
                      </td>
                      <td
                        className={`py-2 border border-green-200 text-center w-32 relative group
                        ${isLastRow ? "border-b-0 rounded-br-lg" : ""} 
                        ${isFirstRow ? "border-t-0 rounded-tr-lg" : ""}`}
                      >
                        <div className="flex justify-center items-center gap-8">
                          <button
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer"
                          >
                            <img src={deleteIcon} alt="Delete" width="20px" />
                          </button>
                          <button
                            onClick={() => editPassword(item.id)}
                            className="cursor-pointer"
                          >
                            <img src={editIcon} alt="Edit" width="20px" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
