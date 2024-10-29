document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.querySelector(".product-container");
  const noProductsMessage = document.querySelector(".no-products-message");

  // Função para buscar produtos da API
  function fetchProducts() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((products) => {
        // Se não houver produtos, mostrar a mensagem
        if (products.length === 0) {
          noProductsMessage.style.display = "block";
        } else {
          noProductsMessage.style.display = "none";
          products.forEach((product) => renderProductCard(product));
        }
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }

  // Função para renderizar o card de cada produto
  function renderProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="Imagem do produto ${product.name}" />
      <div class="card-container--info">
        <p>${product.name}</p>
        <div class="card-container--value">
          <p>Preço: R$${product.price}</p>
          <i class="ph ph-trash" alt="ícone de lixeira" title="Excluir Produto" onclick="deleteProduct(${product.id})"></i>
        </div>
      </div>
    `;

    productContainer.appendChild(card);
  }

  // Função para adicionar novo produto
  function addProduct(product) {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((newProduct) => renderProductCard(newProduct))
      .catch((error) => console.error("Erro ao adicionar produto:", error));
  }

  // Função para deletar um produto
  window.deleteProduct = function (id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        productContainer.innerHTML = "";
        fetchProducts(); // Atualiza a lista de produtos após deletar
      })
      .catch((error) => console.error("Erro ao deletar produto:", error));
  };

  // Captura o evento de envio do formulário de adição de produto
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#nome-produto").value;
    const price = document.querySelector("#preco-produto").value;
    const imageUrl = document.querySelector("#imagem-produto").value; // Captura o link da imagem

    const newProduct = {
      name: name,
      price: price,
      image: imageUrl,
    };

    addProduct(newProduct);
  });

  // Inicializa a página buscando os produtos da API
  fetchProducts();
});
