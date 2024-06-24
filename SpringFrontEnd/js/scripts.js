document.addEventListener("DOMContentLoaded", function() {
    const highlightedGames = [
        { title: "Game 1", imgSrc: "images/game1.jpg", description: "Descrição do Jogo 1" },
        { title: "Game 2", imgSrc: "images/game2.jpg", description: "Descrição do Jogo 2" },
        { title: "Game 3", imgSrc: "images/game3.jpg", description: "Descrição do Jogo 3" }
    ];

    const promotions = [
        { title: "Promoção 1", imgSrc: "images/promo1.jpg", description: "Descrição da Promoção 1" },
        { title: "Promoção 2", imgSrc: "images/promo2.jpg", description: "Descrição da Promoção 2" },
        { title: "Promoção 3", imgSrc: "images/promo3.jpg", description: "Descrição da Promoção 3" }
    ];

    const topRatedGames = [
        { title: "Top Game 1", imgSrc: "images/top1.jpg", description: "Descrição do Top Game 1" },
        { title: "Top Game 2", imgSrc: "images/top2.jpg", description: "Descrição do Top Game 2" },
        { title: "Top Game 3", imgSrc: "images/top3.jpg", description: "Descrição do Top Game 3" }
    ];

    function createCard(game) {
        const card = document.createElement("div");
        card.className = "card";
        
        const img = document.createElement("img");
        img.src = game.imgSrc;
        card.appendChild(img);
        
        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
        
        const title = document.createElement("h2");
        title.textContent = game.title;
        cardContent.appendChild(title);
        
        const description = document.createElement("p");
        description.textContent = game.description;
        cardContent.appendChild(description);
        
        card.appendChild(cardContent);
        return card;
    }

    function renderCards(cards, containerId) {
        const container = document.getElementById(containerId);
        cards.forEach(card => {
            container.appendChild(createCard(card));
        });
    }

    renderCards(highlightedGames, "highlighted-cards");
    renderCards(promotions, "promotions-cards");
    renderCards(topRatedGames, "top-rated-cards");
});
