let submenuContent = document.getElementById("submenu-content");
let cart = document.getElementById("cart-button");
    cart.addEventListener("click", function () {
                if (submenuContent.style.display === "none") {
                    submenuContent.style.display = "block";
                } else {
                    submenuContent.style.display = "none";
             
                }
            });