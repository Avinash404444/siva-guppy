const userid=localStorage.getItem("user-id")


document.querySelector(".icon-close").addEventListener("click",()=>location.href="../main.html")


let profiledata={
    userid:userid,
    name:"",
    mobile:"",
    address:"",
    district:"",
    pincode:"",
    land:""
}

function MessagePopUp(value){
    const message=document.getElementById("message")
    message.style.display="flex"
        message.querySelector("p").textContent=`${value}`
        setTimeout(()=>{
            message.style.display="none"
        },4000)
}

window.submitdata=()=>{
    let errorcount=0
    const elementId=["name","mobile","address","district","pincode","land"]
    elementId.forEach((i)=>{
        const data=document.getElementById(i).value
        if(data.length>5){
            profiledata[i]=data
            console.log(profiledata[i]);
        }else{
            errorcount+=1
            console.log(errorcount);
            alert("🔍Check The "+i)
        }
    }) 
    if(errorcount<=1){
        document.getElementById("conform-btn").style.display="none";
        document.getElementById("login-btn").style.display="block"
       MessagePopUp("check details before press the log-in")
    }
    else{
        MessagePopUp("Fill the empty box")
    }
}

window.MainSit=()=>{
    localStorage.setItem("profile",JSON.stringify(profiledata))
    
    MessagePopUp("log-in process done successfully🎉")

    setTimeout(()=>{
        location.href="../main.html"
    },5000)

}