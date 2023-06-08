export const environment = {
    production: false,
    apiUrl : "http://localhost:3000/",

    // Credential api

    registerExtension: "credentials/register",
    loginExtension: "creds/login",

    // Users api

    userLoginExtension: "users/login",
    addUser: "users/add",
    getUsers: "users/all",
    getUser: "users/get",

    // Contract api

    addContractExtension: "contract/add",
    getContractExtension: "contract/get",
    getContractsExtension: "contract/all",
    updateContractExtension: "contract/update",

    // Credentials
    Login : "http://localhost:3000/credentials/login",
    Register: "http://localhost:3000/credentials/register",
    CheckEmail : "http://localhost:3000/credentials/checkEmail",
    Unregister : "http://localhost:3000/credentials/unregister",

    // Contrats
    GetAllContrats : "http://localhost:3000/contrats/getAll",
    GetContrat : "http://localhost:3000/contrats/getContrat",
    AddContrat : "http://localhost:3000/contrats/addContrat",
    DeleteContrat : "http://localhost:3000/contrats/deleteContrat",
    ModifyContrat : "http://localhost:3000/contrats/modifyContrat",

    // Task
    GetAllTasks: "http://localhost:3000/task/getAll",
    AddTask: "http://localhost:3000/task/addTask",
    DeleteTask: "http://localhost:3000/task/deleteTask",

    // Email
    SendEmailVerif: "http://localhost:3000/mail/sendEmail",
    EmailIsVerified: "http://localhost:3000/mail/emailVerified",
    
};
