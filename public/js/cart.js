// Cập nhật số lượng sp trong giỏ hàng

const inputsQuantity = document.querySelectorAll("input[name='quantity']")

if(inputsQuantity.length > 0){
  inputsQuantity.forEach(input =>{
    input.addEventListener("change",()=>{
      const productId = input.getAttribute("product-id");
      const quantity = input.value;



      window.location.href=`/cart/update/${productId}/${quantity}`
    })
  })
}


// End cập nhật số lượng sp trong giỏ hàng