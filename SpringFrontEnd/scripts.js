$(document).ready(function() {
    function loadDevelopers() {
        $.ajax({
            url: "http://localhost:8080/api/desenvolvedores",
            method: "GET",
            success: function(data) {
                $('#developer-list').empty();
                data.forEach(function(desenvolvedor) {
                    $('#developer-list').append('<li>' + desenvolvedor.nome + '</li>');
                });

                if ($('#game-desenvolvedor').length) {
                    $('#game-desenvolvedor').empty();
                    data.forEach(function(desenvolvedor) {
                        $('#game-desenvolvedor').append('<option value="' + desenvolvedor.id + '">' + desenvolvedor.nome + '</option>');
                    });
                }
            },
            error: function(error) {
                console.error("Erro ao buscar desenvolvedores:", error);
                $('#developer-list').append('<li>Erro ao carregar a lista de desenvolvedores.</li>');
            }
        });
    }

    function loadGames() {
        $.ajax({
            url: "http://localhost:8080/api/jogos",
            method: "GET",
            success: function(data) {
                $('#game-list').empty();
                data.forEach(function(jogo) {
                    $('#game-list').append('<li>' + jogo.nome + '</li>');
                });
            },
            error: function(error) {
                console.error("Erro ao buscar jogos:", error);
                $('#game-list').append('<li>Erro ao carregar a lista de jogos.</li>');
            }
        });
    }

    function addDeveloper(event) {
        event.preventDefault();
        const newDeveloper = {
            nome: $('#dev-nome').val(),
            nota: parseInt($('#dev-nota').val()), // Certifique-se de converter para inteiro se necessário
            dataCriacao: $('#dev-data-criacao').val(),
            presidente: $('#dev-presidente').val(),
            numeroColaboradores: parseInt($('#dev-numero-colaboradores').val()), // Converta para inteiro se necessário
            website: $('#dev-website').val(),
            cnpj: $('#dev-cnpj').val()
        };
    
        $.ajax({
            url: "http://localhost:8080/api/desenvolvedores",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newDeveloper),
            success: function() {
                loadDevelopers();
                $('#add-developer-form')[0].reset();
            },
            error: function(error) {
                console.error("Erro ao adicionar desenvolvedor:", error);
            }
        });
    }

    function addGame(event) {
        event.preventDefault();
        const newGame = {
            nome: $('#game-nome').val(),
            preco: $('#game-preco').val(),
            imagens: $('#game-imagens').val(),
            descricao: $('#game-descricao').val(),
            nota: $('#game-nota').val(),
            classificacao: $('#game-classificacao').val(),
            genero: $('#game-genero').val(),
            dataLancamento: $('#game-data-lancamento').val(),
            desenvolvedor: { id: $('#game-desenvolvedor').val() }
        };

        $.ajax({
            url: "http://localhost:8080/api/jogos",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newGame),
            success: function() {
                loadGames();
                $('#add-game-form')[0].reset();
            },
            error: function(error) {
                console.error("Erro ao adicionar jogo:", error);
            }
        });
    }

    // Carregar desenvolvedores ao iniciar
    loadDevelopers();
    // Carregar jogos ao iniciar
    loadGames();

    // Event listener para cadastro de desenvolvedor
    $('#add-developer-form').submit(addDeveloper);

    // Event listener para cadastro de jogo
    $('#add-game-form').submit(addGame);
});
