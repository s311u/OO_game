
    let numberOfItemsInCart = 0;
    let sum = 0;
    for (let i = 0; i < numberOfItemsInCart; i++){
        sum += shoppingCart[i].price;
    }
    
    function addToCart(cat){
        cat_data[cat-1].amount = cat_data[cat-1].amount + 1;
    }

    

    function displayCartItemNumber(){
        
        numberOfItemsInCart = 0;

        for (let i = 0; i < 13; i++ ){
        let amount = cat_data[i].amount;
        numberOfItemsInCart += amount;
        }

        console.log(numberOfItemsInCart);
        let span = document.getElementById("cart_top_bar");
        span.innerHTML = numberOfItemsInCart;
    }
    
    
    function onSiteLoad(){ 
        let store_container = document.getElementById("store_container");
        store_container.innerHTML = "";
        for (let i=0; i < cat_data.length;i++) {
            let newListItem = document.createElement('div');
            newListItem.innerHTML = `
                <a id="image">    
                <div class="store_card">
                    <div class="sansCart">
                        <img class="store_item_img" src=${cat_data[i].img_l}>
                        <img class="store_item_hover_img" src=${cat_data[i].img_2}>
                    
                    <div class="store_item_name"> ${cat_data[i].breed}</div>
                    <div class="store_item_price"> ${cat_data[i].price} €</div></div>
                    <span class="addCartHomeView" onclick="addToCart(${i+1}); displayCartItemNumber()"><button class="btn_buy"><img class="cart_img_card" src="images_shop/other/cart.png">+</button></span>     
                    </div>
                </a>        
                `;
                
            newListItem.children[0].children[0].children[0].onclick = () => individualView(cat_data[i]);
            newListItem.onhover = () => hoverView(cat_data[i]);

            store_container.appendChild(newListItem);
        }
    }

    function individualView(cat){

        if (typeof cat.img_3 == 'undefined'){
                let store_container = document.getElementById("store_container");
                store_container.innerHTML = ` 
                    <div class="container_indi">
                        
                        <div class="indiName"> ${cat.breed}</div>
                        <div class="indiImgCycle"> 
                            <img src=${cat.img_l}>
                        </div>
                        <div class="indiImgCycle">
                            <img src=${cat.img_2}>
                        </div>
                        <br>
                        <span class="addCartIndiView" onclick="addToCart(${cat.id}); displayCartItemNumber()"><button class="btn_buy"><img class="cart_img_card" src="images_shop/other/cart.png">+</button></span>      

                            <a class="prev" onclick="plusImg(-1)">❮</a>
                            <a class="next" onclick="plusImg(1)">❯</a>
                    </div>
                            
                        <br>
                        <div class="colors"> <p>The <strong>${cat.breed}</strong> is available in: \n ${cat.color}</p></div>
                        <div class="indiInfo"> ${cat.info}</div>
                        <br>
                        <button class="btn_back" onclick="onSiteLoad()">Back to all</button>
                `;
            
            showImg(imgIndex);
        }else{ 

            let store_container = document.getElementById("store_container");
            store_container.innerHTML = ` 
                    <div class="container_indi">

                    <div class="indiName"> ${cat.breed}</div>

                    <div class="indiImgCycle"> 
                        <img src=${cat.img_l}>
                    </div>

                    <div class="indiImgCycle">
                        <img src=${cat.img_2}>
                    </div>

                    <div class="indiImgCycle"> 
                        <img src=${cat.img_3}>
                    </div>

                    <div class="indiImgCycle">
                        <img src=${cat.img_4}>
                    </div>

                    <div class="indiImgCycle"> 
                        <img src=${cat.img_5}>
                    </div>
                    <br>
                    <span class="addCartIndiView" onclick="addToCart(${cat.id}); displayCartItemNumber()"><button class="btn_buy"><img class="cart_img_card" src="images_shop/other/cart.png">+</button></span>      
                    
                        <a class="prev" onclick="plusImg(-1)">❮</a>
                        <a class="next" onclick="plusImg(1)">❯</a>
                    </div>
                    <br>
                    <div class="colors"> <p>The <strong>${cat.breed}</strong> is available in: \n ${cat.color}</p></div>
                    <div class="indiInfo"> ${cat.info}</div>
                    <br>
                    <button class="btn_back" onclick="onSiteLoad()">Back to all</button>
            
               `;
               showImg(imgIndex); 
            }
        
            
}

        let imgIndex = 1;
        
        
        function plusImg(n) {
            showImg(imgIndex += n);
        }
        
        function currentImg(n) {
            showImg(imgIndex = n);
        }
    
  
        function showImg(n) {
            let imgs = document.getElementsByClassName("indiImgCycle");
            let dots = document.getElementsByClassName("col");
            if (n > imgs.length) {imgIndex = 1}
            if (n < 1) {imgIndex = imgs.length}
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            imgs[imgIndex-1].style.display = "block";
            dots[imgIndex-1].className += " active";
        }


    function search(){
        let searchCards = document.querySelectorAll(".store_card")
        let input = document.getElementById("search").value //mixed case input
        input = input.toLowerCase(); 
        let resultCards = document.getElementsByClassName("store_card");
       
        for (let i = 0; i < cat_data.length; i++){
            if (!cat_data[i].breed.toLowerCase().includes(input) && !cat_data[i].info.toLowerCase().includes(input)){
                searchCards[i].style.display = "none";
            } else {
                searchCards[i].style.display = "block"
            }
        }
    }
    
    
    
        
    