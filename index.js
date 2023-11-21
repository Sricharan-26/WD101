let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    return JSON.parse(entries);
  } else {
    return [];
  }
};
let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  
  const tableEntries = entries.map((entry) => {
    const nameCelll = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCelll = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCelll = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCelll = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCelll = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${nameCelll}${emailCelll}${passwordCelll}${dobCelll}${acceptTermsCelll}</tr>`;
    return row;
  }).join("\n");

  const tabl = `<table class="table-auto w-full">
                  <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                  </tr>
                  ${tableEntries}
                </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = tabl;
};

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  
  // Calculate age and check if it's between 18 and 55
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };
  userEntries.push(entry);
  
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
