document.querySelector(".icon-close").addEventListener("click",()=>location.href='../main-page-section/main.html')

const userId=localStorage.getItem("user-id")
const profile=JSON.parse(localStorage.getItem("profile"))
const cartdata=JSON.parse(localStorage.getItem("fish-cart-data"))

let profiledata={
    userid:userId,
    name:"",
    mobile:"",
    address:"",
    district:"",
    pincode:"",
    land:""
}

let tpd=``
const teldata=cartdata.map((i)=>{
    const data=`💠name: ${i.name}\n💠qtn: ${i.quantity}\n💠each pair tol: ${i.quantity*i.totalPrice} \n\n`
    tpd+=data
})

console.log(profile);


let totalAmount=0
let productCount=0

cartdata.forEach(i=>{
  totalAmount+=i.totalPrice
  productCount+=i.quantity
})

if(profile){
    MessagePopUp("we use the profile data for delivery purpose.")

  document.querySelector(".login-section").innerHTML=`
  <div class="login-title">
            <h2>make payment on this qr :</h2></div>
            <div class="qr-section" id="qr-section"></div> 
            <div class="details">
                <div class="data"><h3>check your data :</h3></div>
                <div class="data"><p>user id: ${profile.userid}</p></div>
                <div class="data"><p>name: ${profile.name}</p></div>
                <div class="data"><p>phone : ${profile.mobile}</p></div>
                <div class="data"><p>location data : ${profile.district} and ${profile.pincode}</p></div>
                <div class="data"><p>total amount: ${totalAmount}₹</p></div>
            </div>
            <div class="qr-li"><li>check the total amount twice before pay</li></div>
            <div class="qr-li"><li>check the receiver name is : avinash or avinash pro</li></div>
            <div class="qr-li"><li>after payment take screen shot for safty purpose </li></div>
            <div class="qr-li"><li>is there is payment related enquiry contact :<a href="">press here</a></li></div>
        `

document.querySelector(".payment-btn p").textContent="payment done"
document.querySelector(".payment-btn").onclick=()=>{
    MessagePopUp("thank you for choosing us")

const message =`📌 Profile Data:\n${Object.entries(profile).map(([key, value]) => `${key}: ${value}`).join("\n")}🛒 Product Data:${tpd}⏰ Time:${new Date().toLocaleString()}`;

    fetch(`https://api.telegram.org/bot8187478702:AAGfQxAiiuEK4znTDfduPpaP_Ci0NpQe7_4/sendMessage`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        chat_id: 5276675271,
        text: message
        })
    })
    .then(res => res.json())
    .then(data => console.log("Sent:", data))
    .catch(err => console.error("Error:", err));

    setTimeout(()=>{
        location.href="../main-page-section/main.html"
    },4000)
};


const payeeName = "Avinash Store";     

const upiURL = `upi://pay?pa=parttimeguppy-1@okaxis&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`user id: ${userId},number of product : ${productCount}`)}`;
new QRCode(document.getElementById("qr-section"), {
    text: upiURL,
    width: 250,
    height: 250,
  })

}

else{
    document.querySelector(".login-section").innerHTML=`<div class="login-title"><h2>enter your details :</h2></div>
            <label for="name">name: <input type="text" placeholder="name" id="name"></label>
            <label for="mobile">mobile number: <input type="number" placeholder="mobile number" id="mobile"></label>
            <label for="address">address : <textarea style="width: 70%; border-radius: 5px; margin-left: auto; height: 100px;"  placeholder="address" id="address"></textarea></label>
            <label for="district">enter you district : <input type="text" placeholder="district " id="district"></label>
            <label for="pincode">land pin code : <input type="number" placeholder="pin code" id="pincode"></label>
            <label for="note">land marke : <textarea style="width: 70%; border-radius: 5px; margin-left: auto; height: 100px;"  placeholder="whatever you want tell write here " id="note"></textarea></label> `
        document.querySelector(".payment-btn p").textContent="submit"
        document.querySelector(".payment-btn").onclick=()=>{datasubmit()};
}

window.datasubmit=()=>{
    let errorcount=0
    const elementId=["name","mobile","address","district","pincode","note"]
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
      localStorage.setItem("profile",JSON.stringify(profiledata))
       MessagePopUp("data update successfully!")
       setTimeout(()=>{location.reload()},5000)
    }
    else{
        MessagePopUp("Fill the empty box")
    }
}



function MessagePopUp(value){
    const message=document.getElementById("message")
    message.style.display="flex"
        message.querySelector("p").textContent=`${value}`
        setTimeout(()=>{
            message.style.display="none"
        },4000)
}