const database = {
  usersList: {},
  adminList: {},
  flightList: [
    {
      from: "tel aviv",
      to: "amsterdam",
      price: 40,
      dates: {
        depart: new Date("11.24.2023"),
        returns: new Date("01.12.2023"),
      },
    },
    {
      from: "tel aviv",
      to: "london",
      price: 75,
      dates: {
        depart: new Date("11.28.2023"),
        returns: new Date("12.12.2023"),
      },
    },
    {
      from: "Athens",
      to: "Prague",
      price: 95,
      dates: {
        depart: new Date("11.28.2023"),
        returns: new Date("12.12.2023"),
      },
    },
    {
      from: "Berlin",
      to: "Prague",
      price: 22,
      dates: {
        depart: new Date("11.28.2023"),
        returns: new Date("12.12.2023"),
      },
    },
    {
      from: "London",
      to: "Berlin",
      price: 100,
      dates: {
        depart: new Date("11.28.2023"),
        returns: new Date("12.12.2023"),
      },
    },
  ],
};

const logInContainer = document.getElementById("logInContainer");

const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const isAdminInput = document.querySelector("#admin");

// task 1. 2.2
let isAdmin = false;
let isValid = true;
let userDB = {};

// task 1.1.1 checkbox changes save to variable
isAdminInput.addEventListener("change", () => (isAdmin = isAdminInput.checked));

// error messages
function showError(input, message) {
  const errorDiv = document.getElementById(input.id + "Error");
  errorDiv.textContent = message;
  input.classList.add("error");
}

// task 1.2.1 login button
loginForm.addEventListener("submit", checkValidation);
function checkValidation(e) {
  e.preventDefault();

  // task 1.2.1 check email
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegEx.test(email.value)) {
    showError(email, "Please enter a valid email");
    isValid = false;
  }

  // task 1.2.1 check password
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!passwordRegex.test(password.value)) {
    showError(
      password,
      "Password must be at least 8 characters long, containinglowercase, uppercase letters, numbers, and a specialcharacter."
    );
    isValid = false;
  }

  // task 1.2.3 save data inputs
  const currentObject = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  // task 1.2.3 if all good save the input values to local storage and hide this form
  if (isAdmin && isValid) {
    database.usersList = {};
    database.adminList = currentObject;
    userDB = isAdmin ? database.adminList : database.usersList;
    flightListPage([...database.flightList]);
    logInContainer.classList.add("hideBox");
  } else if (isValid && !isAdmin) {
    database.adminList = {};
    database.usersList = currentObject;
    userDB = isAdmin ? database.adminList : database.usersList;
    flightListPage([...database.flightList]);
    logInContainer.classList.add("hideBox");
  }
}

// task 1.2.3 add listener when updating input
[nameInput, emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
    document.getElementById(input.id + "Error").textContent = "";
  });
});

// task 1.3.1 logout button
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  logInContainer.classList.remove("hideBox");
  flightPage.classList.add("hideBox");

  database.adminList = {};
  database.usersList = {};

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  isAdminInput.checked = false;
});

// DOM Catcher
const flightPage = document.getElementById("flightPage");
const savedName = document.getElementById("savedName");
const flightListContainer = document.getElementById("flightList");
const addFlightBtn = document.getElementById("addNewFlight");
const cartBtn = document.getElementById("cart");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sort");
const cartListContainer = document.getElementById("cartList");

function flightListPage(flightsList) {
  // reset page to be empty
  flightPage.classList.remove("hideBox");
  flightListContainer.innerText = "";

  // task 2 add flight button for admins only
  isAdmin
    ? addFlightBtn.classList.remove("hideBox")
    : addFlightBtn.classList.add("hideBox");

  isAdmin
    ? cartBtn.classList.add("hideBox")
    : cartBtn.classList.remove("hideBox");

  cartBtn.addEventListener("click", showCartListPage);

  savedName.innerText = userDB.name;

  // task 2 sort and search
  searchInput.addEventListener("input", (e) => {
    searchFunction(e.target.value);
  });
  sortSelect.addEventListener("change", (e) => {
    selectFunction(flightsList, e.target.value);
  });

  flightsList.map((flight) => {
    displayFlightCard(flight);
  });
  flightPage.appendChild(flightListContainer);
}

function displayFlightCard(flight) {
  const flightCard = document.createElement("section");
  flightCard.classList.add("flightCard");

  // task 3 flight Data
  const flightFromLabel = document.createElement("label");
  flightFromLabel.innerText = "From: ";
  flightFromLabel.style.fontWeight = "bold";

  const flightFrom = document.createElement("section");
  flightFrom.innerText = flight.from;

  const flightToLabel = document.createElement("label");
  flightToLabel.innerText = "To: ";
  flightToLabel.style.fontWeight = "bold";

  const flightTo = document.createElement("section");
  flightTo.innerText = flight.to;

  const flightPriceLabel = document.createElement("label");
  flightPriceLabel.innerText = "Price: ";
  flightPriceLabel.style.fontWeight = "bold";

  const flightPrice = document.createElement("section");
  flightPrice.innerText = flight.price;

  const flightDepartLabel = document.createElement("label");
  flightDepartLabel.innerText = "Depart: ";
  flightDepartLabel.style.fontWeight = "bold";

  const flightDepart = document.createElement("section");
  const departDate = flight.dates.depart;
  flightDepart.innerText =
    departDate.getFullYear() +
    "/" +
    departDate.getMonth() +
    "/" +
    departDate.getDay();

  const flightReturnLabel = document.createElement("label");
  flightReturnLabel.innerText = "Return: ";
  flightReturnLabel.style.fontWeight = "bold";

  const flightReturn = document.createElement("section");
  const returnsDate = flight.dates.returns;
  flightReturn.innerText =
    returnsDate.getFullYear() +
    "/" +
    returnsDate.getMonth() +
    "/" +
    returnsDate.getDay();

  // task 4.1 add flight to cart for user only
  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add To Cart";
  addToCartBtn.classList.add(isAdmin ? "hideBox" : "addToCart");
  addToCartBtn.addEventListener("click", () => {
    userDB.cart == undefined
      ? (userDB.cart = [flight])
      : userDB.cart.push(flight);
  });

  flightCard.append(
    flightFromLabel,
    flightFrom,
    flightToLabel,
    flightTo,
    flightPriceLabel,
    flightPrice,
    flightDepartLabel,
    flightDepart,
    flightReturnLabel,
    flightReturn,
    addToCartBtn
  );
  flightListContainer.appendChild(flightCard);
}

// task 2 search
function searchFunction(input) {
  flightListPage(
    [...database.flightList].filter((flight) =>
      flight.from.toLowerCase().includes(input.toLowerCase())
    )
  );
}
// task 2 sort by price
function selectFunction(selectedOption) {
  console.log(selectedOption);
  flightListPage(
    [...database.flightList].sort(
      (flight1, flight2) => flight1.price - flight2.price
    )
  );
}

// task 4 open new page of Cart
function showCartListPage() {
  //reset page to be empty
  flightPage.classList.add("hideBox");
  cartListContainer.classList.remove("hideBox");
  cartListContainer.classList.add("cartItemsListPage");
  cartListContainer.innerText = "";

  const cart = document.createElement("h1");
  cart.innerText = "User Name: " + userDB.name;

  // back to flight List page
  const backToFlightList = document.createElement("button");
  backToFlightList.textContent = "Back To Flights List";
  backToFlightList.addEventListener("click", () => {
    flightListPage(database.flightList);
    cartListContainer.classList.add("hideBox");
  });

  // task 4.2 flights list added into cart
  const cartItemsList = document.createElement("section");
  cartItemsList.classList.add("cartItemsList");

  if (userDB.cart == undefined || userDB.cart.length == 0) {
    const emptyCartItems = document.createElement("section");
    emptyCartItems.setAttribute("id", "cartCard");
    emptyCartItems.innerText = "Your Cart is Empty";
    cartListContainer.append(backToFlightList, cart, emptyCartItems);
  } else {
    userDB.cart.map((item) => {
      const cartItems = document.createElement("section");
      cartItems.setAttribute("id", "cartCard");

      const flightFromLabel = document.createElement("label");
      flightFromLabel.innerText = "From: ";
      flightFromLabel.style.fontWeight = "bold";
      flightFromLabel.classList.add("flightFromLabel");

      const flightFrom = document.createElement("section");
      flightFrom.innerText = item.from;
      flightFrom.classList.add("flightFrom");

      const flightToLabel = document.createElement("label");
      flightToLabel.innerText = "To: ";
      flightToLabel.style.fontWeight = "bold";
      flightToLabel.classList.add("flightToLabel");

      const flightTo = document.createElement("section");
      flightTo.innerText = item.to;
      flightTo.classList.add("flightTo");

      const flightPriceLabel = document.createElement("label");
      flightPriceLabel.innerText = "Price: ";
      flightPriceLabel.style.fontWeight = "bold";
      flightPriceLabel.classList.add("flightPriceLabel");

      const flightPrice = document.createElement("section");
      flightPrice.innerText = item.price + "NIS";
      flightPrice.classList.add("flightPrice");

      const flightDepartLabel = document.createElement("label");
      flightDepartLabel.innerText = "Depart: ";
      flightDepartLabel.style.fontWeight = "bold";
      flightDepartLabel.classList.add("flightDepartLabel");

      const flightDepart = document.createElement("section");
      const departDate = item.dates.depart;
      flightDepart.innerText =
        departDate.getFullYear() +
        "/" +
        departDate.getMonth() +
        "/" +
        departDate.getDay();
      flightDepart.classList.add("flightDepart");

      const flightReturnLabel = document.createElement("label");
      flightReturnLabel.innerText = "Return: ";
      flightReturnLabel.style.fontWeight = "bold";
      flightReturnLabel.classList.add("flightReturnLabel");

      const flightReturn = document.createElement("section");
      const returnsDate = item.dates.returns;
      flightReturn.innerText =
        returnsDate.getFullYear() +
        "/" +
        returnsDate.getMonth() +
        "/" +
        returnsDate.getDay();
      flightReturn.classList.add("flightReturn");

      const flightTravelers = document.createElement("input");
      flightTravelers.type = "number";
      flightTravelers.setAttribute("placeholder", "Number Of Travelers");
      flightTravelers.innerText = item.Travelers;
      flightTravelers.classList.add("flightTravelers");

      // 4.2 remove flight from cart list
      const removeFlightFromCartBtn = document.createElement("button");
      removeFlightFromCartBtn.textContent = "Remove From Cart";
      removeFlightFromCartBtn.setAttribute(
        "id",
        `btn${cartItemsList.children.length}`
      );
      removeFlightFromCartBtn.addEventListener("click", (e) => {
        userDB.cart.splice(e.target.id.charAt(3), 1);
        showCartListPage();
      });
      // 4.3 Booking Flight
      const BookFlightBtn = document.createElement("button");
      BookFlightBtn.textContent = "Book Flight";
      BookFlightBtn.setAttribute("id", `book${cartItemsList.children.length}`);
      BookFlightBtn.addEventListener("click", (e) => {
        const numberOfTravelers = Number(flightTravelers.value)
          ? flightTravelers.value
          : 1;
        const TotalPrice = item.price * numberOfTravelers;
        alert(`Total Price is ${TotalPrice}NIS \n flight Successfully Booked`);
        userDB.BookedList == undefined
          ? (userDB.BookedList = [item])
          : userDB.BookedList.push(item);
        userDB.cart.splice(e.target.id.charAt(3), 1);
        showCartListPage();
      });

      cartItems.append(
        flightFromLabel,
        flightFrom,
        flightToLabel,
        flightTo,
        flightPriceLabel,
        flightPrice,
        flightDepartLabel,
        flightDepart,
        flightReturnLabel,
        flightReturn,
        flightTravelers,
        BookFlightBtn,
        removeFlightFromCartBtn
      );
      cartItemsList.append(cartItems);
    });
  }

  cartListContainer.append(backToFlightList, cart, cartItemsList);
}
