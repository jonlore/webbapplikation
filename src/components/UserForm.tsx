interface User {
  id: number;
  name: string;
  companyName?: string | null;
}

interface Company {
  name: string;
}

interface UserFormProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  companies: Company[];
}


export default function UserForm({users, setUsers , companies} : UserFormProps) {
    function addUser(formData: FormData) {
        const userName = formData.get("userName");
        let optionalCompany = formData.get("optionalCompany");
        if(optionalCompany === null) optionalCompany = "";

        if (typeof userName === "string" && userName.trim() !== "" && typeof optionalCompany === "string") {
            const companyName = optionalCompany !== "" ? optionalCompany : null;

            setUsers([...users, {id: users.length + 1, name: userName.trim(), companyName: companyName}]);
                alert("Ny person skapad");
            } else {
                alert("Ej giltigt namn");
            }
    }

    return (
        <div>
            <form action={addUser}>
                <div className="formContainer">
                    <label htmlFor="userName">Namn: </label>
                    <input type='text' name='userName' id="userName" required />
                </div>

                {companies.length > 0 && (
                    <div className="formContainer">
                    <label htmlFor="optionalCompany">Välj företag: </label>
                    <select id="optionalCompany" name='optionalCompany'>
                        <option value="">Inget företag</option>
                        {companies.map(company => (
                        <option key={company.name} value={company.name}>{company.name}</option>
                        ))}
                    </select>
                    </div>
                )}
                <button type='submit'>Lägg till ny person</button>
            </form>
        </div>
    )
}