import { useEffect, useState } from 'react'
import './App.css'

import UserForm from './components/UserForm';
import UserList from './components/UserList';
import CompanyForm from './components/CompanyForm';

interface User {
  id: number;
  name: string;
  companyName?: string | null;
}

interface Company {
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    if(savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      return [];
    }
  }); 

  const [companies, setCompanies] = useState<Company[]>(() => {
    const savedCompanies = localStorage.getItem("companies");
    if(savedCompanies) {
      return JSON.parse(savedCompanies);
    } else {
      return [];
    }
  }); 

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users])

  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies])

 const [view, setView] = useState<"userForm" | "companyForm" | "userList">("userForm");


  return (
      <main>
        <h1>Företagshanterare</h1>
        <nav>
          <button 
            className={view === "userForm" ? "active" : ""}
            onClick={() => setView("userForm")}>Ny Person</button>
          <button 
            className={view === "companyForm" ? "active" : ""}
            onClick={() => setView("companyForm")}>Företag</button>
          <button 
            className={view === "userList" ? "active" : ""}
            onClick={() => setView("userList")}>Personer</button>
        </nav>

        {view === "userForm" && ( 
          <UserForm users={users} setUsers={setUsers} companies={companies}/>
        )}
        {view === "companyForm" && (
          <>
            <CompanyForm users={users} setUsers={setUsers} companies={companies} setCompanies={setCompanies} />
          </>
        )}
        {view === "userList" && (
          <UserList users={users} setUsers={setUsers} companies={companies}/>
        )}
      </main>
  )
}

export default App
