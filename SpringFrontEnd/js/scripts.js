document.addEventListener("DOMContentLoaded", function() {
    const promotions = [
        { title: "7 days to Die", imgSrc: "images/promo.jpeg", description: "Descrição da Promoção 1" },
        { title: "Sea of Thieves", imgSrc: "images/promo2.png", description: "Descrição da Promoção 2" },
        { title: "RainbowSix Siege", imgSrc: "images/promo3.jpg", description: "Descrição da Promoção 3" },
        { title: "Civilization IV", imgSrc: "images/promo4.jpg", description: "Descrição da Promoção 3" },
        { title: "Valorant", imgSrc: "images/promo5.jpeg", description: "Descrição da Promoção 3" },
        { title: "Barotrauma", imgSrc: "images/promo6.jpeg", description: "Descrição da Promoção 3" },
        { title: "Cult of the Lamb", imgSrc: "images/promo7.jpg", description: "Descrição da Promoção 3" },
        { title: "Assassin's Creed Black Flag", imgSrc: "images/promo8.jpeg", description: "Descrição da Promoção 3" },
    ];

    const popularGames = [
        { title: "Popular 1", imgSrc: "images/popular1.jpeg", description: "Descrição do Jogo Popular 1" },
        { title: "Popular 2", imgSrc: "images/popular2.jpg", description: "Descrição do Jogo Popular 2" },
        { title: "Popular 3", imgSrc: "images/popular3.jpg", description: "Descrição do Jogo Popular 3" }
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

    renderCards(promotions, "promotions-cards");
    renderCards(popularGames, "popular-cards");
    renderCards(topRatedGames, "top-rated-cards");
});
