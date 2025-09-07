interface User {
  id: number;
  name: string;
  companyName?: string | null;
}

interface Company {
  name: string;
}

interface UserListFormProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  companies: Company[];
}

export default function UserList({users, setUsers, companies} : UserListFormProps) {
  const usersWithoutCompany = users.filter(user => !user.companyName);

  function addUsersToCompany(formData: FormData) {
    const userIds = formData.getAll("selectedUsers").map(id => Number(id));
    const companyName = formData.get("companyName");

    if (typeof companyName !== "string") return;

    setUsers(savedUsers =>
      savedUsers.map(user =>
        userIds.includes(user.id)
          ? { ...user, companyName }
          : user
      ));
    
    alert("Valda personer har kopplats till företaget")
}

    return (
         <div>
          {usersWithoutCompany.length === 0 && (
            <p>Inga personer utan anställning finns.</p>
          )}

          {usersWithoutCompany.length > 0 && (
            <>
            <p>Personer som inte är kopplade till något företag:</p>
            <form action={addUsersToCompany}>
              <select name="selectedUsers" multiple>
                {usersWithoutCompany.map(user =>
                    <option key={user.id} value={user.id}>{user.name}</option>
                )}
              </select>

             {companies.length > 0 && (
              <>
                <label htmlFor="companyName">Markera personer som ska läggas till hos företaget: </label>
                <select id="companyName" name='companyName'>
                  {companies.map(company => (
                    <option key={company.name} value={company.name}>{company.name}</option>
                  ))}
                </select>
                <button type='submit'>Koppla till företag</button>
              </>
            )} 
             </form>
             </>
          )}
          </div>
    );
}