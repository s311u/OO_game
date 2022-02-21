
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
                        
                        <div class="indiPrice">${cat.price} €</div>
                        <br>
                        <span class="addCartIndiView" onclick="addToCart(${cat.id}); displayCartItemNumber()"><button class="btn_buy"><img class="cart_img_card" src="images_shop/other/cart.png">+</button></span>      

                            <a class="prev" onclick="plusImg(-1)">❮</a>
                            <a class="next" onclick="plusImg(1)">❯</a>
                    </div>
                            
                        <br>
                        <div class="colors"> <p>The <strong>${cat.breed}</strong> is available in: ${cat.color}</p></div>
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
                    
                    <div class="indiPrice">${cat.price} €</div>
                    <br>
                    <span class="addCartIndiView" onclick="addToCart(${cat.id}); displayCartItemNumber()"><button class="btn_buy"><img class="cart_img_card" src="images_shop/other/cart.png">+</button></span>      
                    
                        <a class="prev" onclick="plusImg(-1)">❮</a>
                        <a class="next" onclick="plusImg(1)">❯</a>
                    </div>
                    <br>
                    <div class="colors"> <p>The <strong>${cat.breed}</strong> is available in: ${cat.color}</p></div>
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
        }


    function search(){
        try {
                let store_container = document.getElementById("store_container");
            
            
            /* 
            store_container.innerHTML =""; */
            /* onSiteLoad(); */
            let searchCards = document.querySelectorAll(".store_card")
            let input = document.getElementById("search").value //mixed case input
            input = input.toLowerCase(); 
            let resultCards = document.getElementsByClassName("store_card");
        
            for (let i = 0; i < cat_data.length; i++){
                if (!cat_data[i].breed.toLowerCase().includes(input) && !cat_data[i].info.toLowerCase().includes(input)){
                    searchCards[i].style.display = "none";
                } else {
                    searchCards[i].style.display = "block";
                }
            }

            for (let i = 0; i <store_container.childNodes.length; i++) {
                if (store_container.childNodes[i].innerHTML.includes("Back to")){
                    store_container.removeChild(store_container.childNodes[i])
                }
            }
            
            let button = document.createElement('div');
            button.innerHTML = '<div class="newRow"><button class="btn_back" onclick="onSiteLoad()">Back to all</button></div>'
            store_container.appendChild(button);
        } catch {
            alert("Search function works only in the main view for now. Please do not refresh the page before closing this alert");
        }

    }

    function advancedSearch(){
        alert("Advanced search function has not been implemented yet! Please use the regular search function instead.")
    }


    let whichCats = [];

    function cartUpdate(cat){
        let amountContainer = document.getElementById("cartItemAmountCurrent" + cat);
        amountContainer.innerHTML = cat_data[cat].amount;

        let priceContainer = document.getElementById("cartItemCostTot" + cat);
        priceContainer.innerHTML = `${cat_data[cat].amount * cat_data[cat].price} €`;

        let totalCostContainer = document.getElementById("finalpriceinner");
        let cartTotalCost = 0;
        for (let i = 0; i < whichCats.length; i++) {
            cartTotalCost = cartTotalCost + (cat_data[whichCats[i]].amount * cat_data[whichCats[i]].price)
        }
        totalCostContainer.innerHTML = `The final price of your order is ${cartTotalCost} €.`;

        displayCartItemNumber();
        
    }

    function plusAmount(cat){
        console.log("plus")
        console.log(cat_data[cat].amount)
        cat_data[cat].amount = cat_data[cat].amount + 1;
        console.log(cat_data[cat].amount)
        cartUpdate(cat)
    }

    function minusAmount(cat){
        console.log("minus")
        console.log(cat_data[cat].amount)
        cat_data[cat].amount = cat_data[cat].amount - 1;
        console.log(cat_data[cat].amount)
        if(cat_data[cat].amount < 0){
            cat_data[cat].amount = 0;
        }
        cartUpdate(cat)
    }

    
    function cartView(){
        let store_container = document.getElementById("store_container");
        store_container.innerHTML ="";
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');        
        let tr_first = document.createElement('tr');
        tr_first.innerHTML = `
            
            
            <th></th>
            <th>Breed</th>
            <th>Amount</th>
            <th>Cost of one</th>
            <th>Cost of all</th>
            

        `;

        tbody.appendChild(tr_first);

        
        for (let i = 0; i < cat_data.length; i++) {
            let tr = document.createElement('tr');
            if (cat_data[i].amount > 0){
                console.log("hello"+ i)
                tr.innerHTML = `
                <td class="cartItemImage"><img src="${cat_data[i].img_s}"></td>
                <td class="cartItemBreed" onclick="individualView(${cat_data[i]})">${cat_data[i].breed} </td>
                <td class="cartItemAmount">
                    <span class="cartItemAmountMinus"><button class="btn-minus" onclick="minusAmount(${i})"> - </button></span>
                    <span class="cartItemAmountCurrent" id="cartItemAmountCurrent${i}"> ${cat_data[i].amount}</span>
                    <span class="cartItemAmountPlus"><button class="btn-plus" onclick="plusAmount(${i})"> + </button></span>
                </td> 
                <td class="cartItemCostOne"> ${cat_data[i].price} €</td>
                <td id="cartItemCostTot${i}" class = "cartItemCostTot"> ${cat_data[i].price * cat_data[i].amount} €</td>

                `;
            tbody.appendChild(tr);
            console.log("meow" + i)

            if (!whichCats.includes(i)){
                whichCats.push(i);
            }
            
            }
        }

        let finalPrice = document.createElement('div');
        let cartTotalCost = 0;
        for (let i = 0; i < whichCats.length; i++) {
            cartTotalCost = cartTotalCost + (cat_data[whichCats[i]].amount * cat_data[whichCats[i]].price)
        }
        finalPrice.innerHTML = `
        <div id="finalpriceinner">
        The final price of your order is ${cartTotalCost} €. </div>`;
        

        table.appendChild(tbody);
        store_container.appendChild(table);
        store_container.appendChild(finalPrice)

        
        let button = document.createElement('div');
        button.innerHTML = '<div class="newRow"><button class="btn_back" onclick="onSiteLoad()">Back to all</button></div>'
        store_container.appendChild(button);

        /* let finalRow= document.createElement('div');
        finalRow.innerHTML = '<span class="cartFinalRow">' */
    }
    
    
    
        
    