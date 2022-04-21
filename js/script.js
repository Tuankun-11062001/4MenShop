if (document.readyState === "loadding") {
  console.log("has loaded");
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // header sticky
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    const btnGoToTop = document.querySelector(".btn-gototop");
    if (window.scrollY > 0) {
      header.classList.add("sticky");
      btnGoToTop.classList.add("active");
      btnGoToTop.addEventListener("click", goToTop);
    } else {
      header.classList.remove("sticky");
      btnGoToTop.classList.remove("active");
    }
  });

  function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // listen button sort product list

  const buttonControlGrid = document.querySelectorAll("button");
  for (const button of buttonControlGrid) {
    button.addEventListener("click", (e) => {
      let cmd = button.getAttribute("data-type");
      const btnGrid = document.querySelector(".btn-sortGrid");
      const btnList = document.querySelector(".btn-sortList");
      const productList = document.querySelector(".contain__main__lists");
      if (cmd === "list") {
        productList.classList.add("list");
        btnGrid.classList.remove("active");
        btnList.classList.add("active");
      } else {
        productList.classList.remove("list");
        btnList.classList.remove("active");
        btnGrid.classList.add("active");
      }
    });
  }

  // show and hide btn search

  const btnSearch = document.querySelector(".btn-search");
  const inputSearch = document.querySelector(".search");

  btnSearch.addEventListener("click", () => {
    inputSearch.classList.toggle("active");
  });

  // show and hide btn search

  const btnCart = document.querySelector(".btn-cart");
  const cardBox = document.querySelector(".cart__box");

  btnCart.addEventListener("click", () => {
    cardBox.classList.toggle("active");
    // listener event button delete item cart
    const buttonDeleteCarts = document.querySelectorAll(
      ".cart__box__item__trash"
    );
    for (let i = 0; i < buttonDeleteCarts.length; i++) {
      const button = buttonDeleteCarts[i];
      button.addEventListener("click", deleteItemCart);
    }
    // listener event change quarity

    const quarityEls = document.querySelectorAll(".cart__box__item__quarity");
    for (const querity of quarityEls) {
      querity.addEventListener("change", changeQuarity);
    }

    const btnBuy = document.querySelector(".cart__box__buy");
    btnBuy.addEventListener("click", buy);

    updateTotal();
  });

  // delete item cart

  const deleteItemCart = (e) => {
    const item = e.target.parentElement;
    item.remove();
    updateTotal();
  };

  // update total
  function updateTotal() {
    const items = document.querySelectorAll(".cart__box__item");
    const totalEl = document.querySelectorAll(".cart__box__total__number");
    let total = 0;

    for (const item of items) {
      const costEl = item.querySelector(".cart__box__item__cost");
      const quarityEl = item.querySelector(".cart__box__item__quarity");
      const cost = costEl.innerText.replace("VND", "");
      const quarity = quarityEl.value;
      total = total + cost * quarity;
      //   Math.round(total * 100) / 100;
    }
    totalEl[0].innerText = total + " VND";
  }

  // change quarity
  const changeQuarity = (e) => {
    const inputEl = e.target;
    if (isNaN(inputEl.value) || inputEl.value <= 0) {
      inputEl.value = 1;
    }
    updateTotal();
  };

  // listener btn add to cart

  const btnAddToCarts = document.querySelectorAll(".btn-addCart");

  for (const btnAddToCart of btnAddToCarts) {
    btnAddToCart.addEventListener("click", (e) => {
      const item = e.target.parentElement.parentElement;
      const image = item.querySelector(".contain__main__item__photoSmall").src;
      const name = item.querySelector(".contain__main__item__name").innerText;
      const cost = item
        .querySelector(".contain__main__item__cost")
        .innerText.replace("VND", "");

      addToCart(image, name, cost);
      updateTotal();
    });
  }

  const addToCart = (img, name, cost) => {
    const cartList = document.querySelector(".cart__box__list");
    const titleItems = cartList.querySelectorAll(".cart__box__item__name");
    const itemCart = document.createElement("div");
    itemCart.classList.add("cart__box__item");
    for (const titleItem of titleItems) {
      if (titleItem.innerHTML === name) {
        alert("product name already");
        return;
      }
    }

    const content = `
                      <img
                        src="${img}"
                      />
                      <div class="cart__box__item__content">
                        <h3 class="cart__box__item__name">${name}</h3>
                        <p class="cart__box__item__cost">${cost} VND</p>
                        <input
                          type="number"
                          value="1"
                          class="cart__box__item__quarity"
                        />
                      </div>
                      <button class="cart__box__item__trash">Delete</button>
    `;
    itemCart.innerHTML = content;
    cartList.appendChild(itemCart);
    // button quarity
    const quarityEls = document.querySelectorAll(".cart__box__item__quarity");
    for (const querity of quarityEls) {
      querity.addEventListener("change", changeQuarity);
    }
    // btn trash item
    const buttonDeleteCarts = document.querySelectorAll(
      ".cart__box__item__trash"
    );
    for (let i = 0; i < buttonDeleteCarts.length; i++) {
      const button = buttonDeleteCarts[i];
      button.addEventListener("click", deleteItemCart);
    }
  };

  function buy() {
    alert("thank to buy");

    const listCart = document.querySelector(".cart__box__list");
    while (listCart.hasChildNodes()) {
      const items = listCart.querySelectorAll(".cart__box__item");
      const data = items.forEach((item) => {
        const product = {
          name: item.querySelector(".cart__box__item__name").innerText,
          price: item.querySelector(".cart__box__item__cost").innerText,
          quantity: item.querySelector(".cart__box__item__quarity").value,
        };
        return product;
      });
      localStorage.setItem("data", JSON.stringify(data));
      listCart.removeChild(listCart.firstChild);
      updateTotal();
    }
  }
  // change image items when hover on it

  const item = document.querySelector(".contain__main__item");

  item.addEventListener("mouseover", changeImage);
  item.addEventListener("mouseout", changeImageOld);

  function changeImage() {
    const item = document.querySelector(".contain__main__item");
    item.classList.add("change");
  }
  function changeImageOld() {
    const item = document.querySelector(".contain__main__item");
    item.classList.remove("change");
  }
}
