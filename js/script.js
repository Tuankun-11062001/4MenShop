
if(document.readyState === "loadding"){
    console.log("has loaded")
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}



function ready(){
// header sticky
window.addEventListener("scroll",()=>{
    const header = document.querySelector(".header");
    const btnGoToTop = document.querySelector(".btn-gototop");
    if(window.scrollY > 0){
        header.classList.add("sticky")
        btnGoToTop.classList.add("active");
        btnGoToTop.addEventListener("click",goToTop)
    }else{
        header.classList.remove("sticky");
        btnGoToTop.classList.remove("active");
    }
})


function goToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// show and hide btn search

const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector(".search");

btnSearch.addEventListener('click',()=>{
    inputSearch.classList.toggle("active")
})

// show and hide btn search

const btnCart = document.querySelector(".btn-cart");
const cardBox = document.querySelector(".cart__box");

btnCart.addEventListener('click',()=>{
    cardBox.classList.toggle("active")
})

// change image items when hover on it

const item = document.querySelector(".contain__main__item")

item.addEventListener("mouseover",changeImage)
item.addEventListener("mouseout",changeImageOld)

function changeImage(e){
    const item = e.target.parentElement
    let img = item.querySelector(".contain__main__item__photoLarge");
    img.src = "https://4menshop.com/cache/image/300x400/images/thumbs/2022/04/quan-jeans-slimfit-theu-qj043-mau-xanh-16676.JPG"
}
function changeImageOld(e){
    const item = e.target.parentElement
    let img = item.querySelector(".contain__main__item__photoLarge");
    img.src = "https://4menshop.com/cache/image/300x400/images/thumbs/2022/04/quan-jeans-slimfit-theu-qj043-mau-xanh_2_small-16676.JPG"
}

}


