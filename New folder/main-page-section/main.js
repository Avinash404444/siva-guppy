import {fishlist,plant,bettaFishList,cactusPlantList} from "../data-base/data-file.js"

const profile=JSON.parse(localStorage.getItem("profile"))

if(profile){
    document.querySelector(".message-box").style.display="flex"
    document.querySelector(".message-box p").textContent="login done surcesfully"
    document.querySelector(".element-log-in").style.display="none"
    setTimeout(()=>{
        document.querySelector(".message-box").style.display="none"
    },3000)
}else{
    document.querySelector(".message-box p").textContent="wellcome to siv guppy farm"
    document.querySelector(".message-box").style.display="flex"
    setTimeout(()=>{
        document.querySelector(".message-box").style.display="none"
    },4000)
}

let userId = localStorage.getItem("user-id");

if (!userId) {
  userId = crypto.randomUUID().replace(/-/g,"").slice(0,10);
  localStorage.setItem("user-id", userId);
}

const localdata=JSON.parse(localStorage.getItem("fish-cart-data"))

if(localdata){
    localdata.forEach(i=> {
        const type=i["id"][0];
        if(type=="f"){
            const index=fishlist.findIndex(a=>a.id==i.id)
            if(index !==-1){
                fishlist[index]["quantity"]=i["quantity"]
                fishlist[index]["totalPrice"]=i["totalPrice"]
            }else{console.log("fishlist undefind product call");}
        }
        else if(type=="p"){
            const index=plant.findIndex(a=>a.id==i.id)
            if(index !==-1){
                plant[index]["quantity"]=i["quantity"]
                plant[index]["totalPrice"]=i["totalPrice"]
            }else{console.log("plant undefind product call");}
        }
        else if(type=="c"){
            const index=cactusPlantList.findIndex(a=>a.id==i.id)
            if(index !==-1){
                cactusPlantList[index]["quantity"]=i["quantity"]
                cactusPlantList[index]["totalPrice"]=i["totalPrice"]
            }else{console.log("cactus undefind product call");}
        }
         else if(type=="b"){
            const index=bettaFishList.findIndex(a=>a.id==i.id)
            if(index !==-1){
                bettaFishList[index]["quantity"]=i["quantity"]
                bettaFishList[index]["totalPrice"]=i["totalPrice"]
            }else{console.log("betta undefind product call");}
        }
        
    });
}
else{
    console.log("error - ls");
}

/* cart remove section */
document.querySelector(".trash-icon").addEventListener("click",()=>{
    localStorage.removeItem("fish-cart-data");
    location.reload()
})


document.getElementById("cart-icon").addEventListener("click",()=>{location.href="#cart-section"})

let finalProduct=``

let titleName=["guppy fish","betta Fish","aquarium live plants","cactus Plant"]
let toatalList=[fishlist,bettaFishList,plant,cactusPlantList]
for(let j=0;j<toatalList.length;j++){
        let title=`<div class="product-grid-heading"><p>${titleName[j]} section :</p></div>`
        finalProduct+=title
        for(let i=0;i<toatalList[j].length;i++){
        let product=`<div class="product product-items-${toatalList[j][i][`id`]}">
                    <div class="fish-img" style="background-image: url(${toatalList[j][i]["image"]}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                    <div class="fish-title"><p>${toatalList[j][i]["name"]}</p></div>
                    <div class="fish-price"><p><strong>price:</strong>  <span>${toatalList[j][i]["mrpPrice"]}₹</span>${toatalList[j][i]["price"]}₹ only</p></div>
                    <div class="product-quantity"> <div class="p-q-btn minus" onclick="productQuantitySub('${toatalList[j][i]["id"]}')"><p>-</p></div> <input class="input-${toatalList[j][i]["id"]}" type="number" min="1" value="1">  <div onclick="productQuantityAdd('${toatalList[j][i]["id"]}')" class="p-q-btn pluse"><p>+</p></div></div>
                    <div class="add-to-cart-btn" onclick="totalAmount('${toatalList[j][i][`id`]}')"><p>add to cart</p> <div class="cart-icon"></div></div>
                </div>`

        finalProduct+=product
    }
}

addEventListener("DOMContentLoaded",()=>{
    document.querySelector(".product-grid").innerHTML=finalProduct
})


/* quantity add */

window.productQuantityAdd=(value)=>{
    const firstValue=value[0];
    let remaingValue=Number(value.slice(1)-1)
    if(firstValue=="p"){
        plant[remaingValue]["quantity"]++
         console.log(value);
        document.querySelector(`.input-${value}`).value=plant[remaingValue]["quantity"]
    }
    else if(firstValue=="f"){
        fishlist[remaingValue]["quantity"]++;
        console.log(value);
        document.querySelector(`.input-${value}`).value=fishlist[remaingValue]["quantity"]
    }
    else if(firstValue=="c"){
        cactusPlantList[remaingValue]["quantity"]++;
        console.log(value);
        document.querySelector(`.input-${value}`).value=cactusPlantList[remaingValue]["quantity"]
    }
    else if(firstValue=="b"){
        bettaFishList[remaingValue]["quantity"]++;
        console.log(value);
        document.querySelector(`.input-${value}`).value=bettaFishList[remaingValue]["quantity"]
    }
    else{
        console.log("error on add quantity section");
    }
}

/* quantity sub */

window.productQuantitySub=(value)=>{
    const firstValue=value[0];
    let remaingValue=Number(value.slice(1)-1)
        if(firstValue=="p"){
            if(plant[remaingValue]["quantity"]>=1){
                plant[remaingValue]["quantity"]--
                document.querySelector(`.input-${value}`).value=plant[remaingValue]["quantity"]    
            }
            else{
                console.log("we more than one quantity and then only we can remove it.");
            }
        }
        else if(firstValue=="f"){
            if(fishlist[remaingValue]["quantity"]>=1){
                fishlist[remaingValue]["quantity"]--
                document.querySelector(`.input-${value}`).value=fishlist[remaingValue]["quantity"]
            }
            else{
                console.log("we more than one quantity and then only we can remove it.");
            }
        }
         else if(firstValue=="c"){
            if(cactusPlantList[remaingValue]["quantity"]>=1){
                cactusPlantList[remaingValue]["quantity"]--
                document.querySelector(`.input-${value}`).value=cactusPlantList[remaingValue]["quantity"]
            }
            else{
                console.log("we more than one quantity and then only we can remove it.");
            }
        } else if(firstValue=="b"){
            if(bettaFishList[remaingValue]["quantity"]>=1){
                bettaFishList[remaingValue]["quantity"]--
                document.querySelector(`.input-${value}`).value=bettaFishList[remaingValue]["quantity"]
            }
            else{
                console.log("we more than one quantity and then only we can remove it.");
            }
        }
        else{
            console.log("error on sub quantity section");
        }
    }



window.cartProductAdd=(value)=>{
   productQuantityAdd(value)
   totalAmount(value)
   cartcheck()
}
window.cartProductSub=(value)=>{
    productQuantitySub(value)
    totalAmount(value)
    cartcheck()
}

/* totalAmount  */

window.totalAmount=(value)=>{
    const firstValue=value[0];
    let remaingValue=Number(value.slice(1)-1)
    if(firstValue=="p"){
        let product=plant[remaingValue]
        product["totalPrice"]=product["quantity"]*product["price"]
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="f"){
        let product=fishlist[remaingValue]
        product["totalPrice"]=product["quantity"]*product["price"]
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="c"){
        let product=cactusPlantList[remaingValue]
        product["totalPrice"]=product["quantity"]*product["price"]
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="b"){
        let product=bettaFishList[remaingValue]
        product["totalPrice"]=product["quantity"]*product["price"]
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else{
        console.log("error on total amount section");
    }
    document.querySelector(".message-box").style.display="flex"
    document.querySelector(".m-b-message p").textContent="add to cart done!"
    setTimeout(()=>{
        document.querySelector(".message-box").style.display="none"
    },1800)
    cartcheck()
}


/* cart removal section */

window.productRemovercart=(value)=>{
     const firstValue=value[0];
    let remaingValue=Number(value.slice(1)-1)
    if(firstValue=="p"){
        const product=plant[remaingValue]
        product["totalPrice"]=0
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="f"){
        const product=productlist[remaingValue]
        product["totalPrice"]=0
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="c"){
        const product=cactusPlantList[remaingValue]
        product["totalPrice"]=0
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else if(firstValue=="b"){
        const product=bettaFishList[remaingValue]
        product["totalPrice"]=0
        console.log(product);
        document.querySelector(`.input-${value}`).value=product["quantity"]
    }
    else{
        console.log("error on total amount section");
    }
    cartcheck()
}




window.cartcheck=()=>{
    let cartStorage=``
    let cartTotalList=[]

    const filterData=fishlist.filter(a=>a.totalPrice>0)
    const plantFilter=plant.filter(a=>a.totalPrice>0)
    const cactusFilter=cactusPlantList.filter(a=>a.totalPrice>0)
    const bettaFilter=bettaFishList.filter(a=>a.totalPrice>0)

    filterData.map(i=>cartTotalList.push(i))
    plantFilter.map(i=>cartTotalList.push(i))
    cactusFilter.map(i=>cartTotalList.push(i))
    bettaFilter.map(i=>cartTotalList.push(i))

    /* discount section */

    let temptotalAmount =0
    const discountPercentage=10
    
    cartTotalList.forEach((i)=>{temptotalAmount+=i["totalPrice"]})
    const discountedamount=(temptotalAmount * discountPercentage) / 100;
    
    let delivery=temptotalAmount>=1500?0:80
    console.log(delivery);
    const finalTotal=delivery+temptotalAmount-discountedamount

    document.querySelector(".c-a-s-d p").textContent =delivery === 80 ? "₹80" : "Free Delivery";
    document.querySelector(".c-a-s.c-a-s-pd").innerHTML =`<h3>pongal offer (10%) :</h3><p>₹${discountedamount}</p>`;
    document.querySelector(".c-a-s-p p").textContent=`${temptotalAmount}₹`
    document.querySelector(".c-a-s-t-a p").textContent=`${finalTotal}₹`
    

    for(let i=0;i<cartTotalList.length;i++){
        let datafind
        let selection
        let productdefine

        if(cartTotalList[i]["id"][0]=="f"){
            datafind="f"
            productdefine=fishlist
        }else if(cartTotalList[i]["id"][0]=="p"){
            datafind="p"
            productdefine=plant
        }else if(cartTotalList[i]["id"][0]=="c"){
            datafind="c"
            productdefine=cactusPlantList
        }else if(cartTotalList[i]["id"][0]=="b"){
            datafind="b"
            productdefine=bettaFishList
        }
        else{
            console.log("error on cart for loop section.");
        }
        
        const datafindindex=productdefine.findIndex(a=>a.id==cartTotalList[i]["id"])
        selection=productdefine[datafindindex]

        const newData=`
         <div class="selected-product cart-${i}">
                <div class="selected-product-delect"><div class="icon icon-white-x" onclick="productRemovercart('${selection["id"]}')"></div></div>
                <div class="selected-product-name"><p>${selection["name"]}</p></div>
                <div class="select-product-img" style="background-image:url(${selection["image"]})"></div>

                <div class="product-data"><p>num of pair :${selection["quantity"]}</p> <p>each pair :${selection["price"]}₹</p></div>

                <div class="select-product-quanity">
                    <div class="s-p-q-btn minus" onclick="cartProductSub('${selection["id"]}')" ><p>-</p></div> 
                    <input type="number" value="${selection["quantity"]}"> 
                    <div class="s-p-q-btn plus" onclick="cartProductAdd('${selection["id"]}')"><p>+</p></div>
                </div>

                <div class="select-product-totalamount"><p>total :${selection["totalPrice"]}₹</p></div>
            </div>
        `   
        cartStorage+=newData
    } 
    localStorage.setItem("fish-cart-data",JSON.stringify(cartTotalList)) 
    localStorage.setItem("total-amount",JSON.stringify({totalAmount:finalTotal,totalproduct:cartTotalList.length}))
    document.querySelector(".cart-product").innerHTML=cartStorage 
}

cartcheck()





