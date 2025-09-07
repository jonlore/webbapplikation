import { useState } from "react";

interface User {
  id: number;
  name: string;
  companyName?: string | null;
}

interface Company {
  name: string;
}

interface CompanyFormProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
}

export default function CompanyForm({ users, setUsers, companies, setCompanies }: CompanyFormProps) {
    const [showEmployees, setShowEmployees] = useState("");

    function addCompany(formData: FormData) { 
        const companyName = formData.get("companyName");
        if(typeof companyName === "string" && companyName.trim() !== "") {
            if(companies.some(CheckCompany => CheckCompany.name === companyName.trim())) {
                alert("Förtaget finns redan.");
                return;
            }

            setCompanies([...companies, {name: companyName.trim()}]); 
            alert("Nytt företag skapad");
        } else {
            alert("Ej korrekt företagsnamn"); 
        }
    }

    function getEmployees(companyName: string) : User[] {
        return users.filter((user) => user.companyName === companyName); 
    }

    function removeEmployee(id : number) {
        setUsers(users.map(user =>
        user.id === id ? {...user, companyName: null} : user
        ));
        alert("Borttagen från företaget"); 
    }
    
    return (
        <div>
            <form action={addCompany}>
                <label htmlFor="userName">Företagsnamn: </label>
                <input type='text' name='companyName' required></input>
                <button type='submit'>Lägg till nytt företag</button>
            </form>
            <div id="companyList"> 
                <ul>
                {companies.map(company => (
                    <li key={company.name}>
                    <div className="companyListItem">
                        {company.name}
                        <br />
                        {getEmployees(company.name).length > 0 && (
                        <button 
                        className="toggleEmployees"
                        onClick={() => setShowEmployees(prev => prev === company.name ? "" : company.name)}>
                            {showEmployees === company.name ? "Dölj anställda" : "Visa anställda"}
                        </button>
                        )}
                    </div>

                    {showEmployees === company.name && (
                        <div>
                        {getEmployees(company.name).map((employee) => (
                            <div key={employee.id} className="userListItem">
                            <p>{employee.name}</p>
                            <button className="userRemoveBtn" onClick={() => removeEmployee(employee.id)}>Ta bort från företaget</button>
                            </div>
                        ))}
                        </div>
                    )}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}