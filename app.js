const signupForm = document.getElementsByClassName(`signup`)[0]
const nameArea = document.getElementById(`name`)
const emailArea = document.getElementById(`email`)
const passwordArea = document.getElementById(`password`)
const cPasswordArea = document.getElementById(`Cpassword`)
// const submit = document.getElementsByClassName(`submit`)[0]
const error = document.getElementsByClassName(`error`)[0]

let data = []

const checkMatch=(mail)=>{
    if(data.length!=0){
        data = JSON.parse(data)
    }
    return data.find(element => element.email==mail)
}

const validatepwd=(pwd)=>{
   const minLength = 8
   const maxLength =16
   const regularExp = (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#.$%&*]{8,16}$/)
    if(pwd.length<minLength||pwd.length>maxLength){
       return true
    }
    else if(!regularExp.test(pwd)){
        return true
    }
}

const validateMail=(email)=>{
    var validRegex =  /^(?=.*[@])(?=.*[.])[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validRegex.test(email)){
        return true
}
}

let signup=(e)=>{
    e.preventDefault()
    const name = nameArea.value.trim()
    const email = emailArea.value
    const password = passwordArea.value
    const cPassword = cPasswordArea.value
    if(!name || !email || !password || !cPassword){
        error.innerHTML = `<p>Please fill all the fields</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else if(name.indexOf(` `) == -1){
        error.innerHTML = `<p>Please Enter valid name</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else if(checkMatch(email)){
        error.innerHTML = `<p>User is already registered</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else if(password==name||password==email){
        error.innerHTML = `<p>Password should not be Username or email</p>`
        error.style.cssText = `color : red; font-size : 15px; text-align:center;`
    }
    else if(validatepwd(password)){
        error.innerHTML = `<p>Please Enter valid Password</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else if(validateMail(email)){
        error.innerHTML = `<p>Please Enter valid Email</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else if(password!=cPassword){
        error.innerHTML = `<p>Password do not match</p>`
        error.style.cssText = `color:red; text-align:center;`
    }
    else{
        let usersignup = {
            id : data.length+1,
            name : name,
            email : email,
            password : password
        }
        // usersignup = JSON.stringify(usersignup)
        data.push(usersignup)
        data = JSON.stringify(data)
        error.innerHTML = `<p>User Signed Up successfully</p>`
        error.style.cssText = `color:green; text-align:center;`
        localStorage.setItem(`user`, data)
        setTimeout(() => {
            window.location.href = "/login/login.html";
        }, 1000);
        console.log(data)
    }
    nameArea.value = ``
    emailArea.value = ``
    passwordArea.value = ``
    cPasswordArea.value = ``
}

signupForm.addEventListener(`submit`, signup)
