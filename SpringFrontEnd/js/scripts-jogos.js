$(document).ready(function() {
    const gameBaseUrl = 'http://localhost:8080/api/jogos';
    const devBaseUrl = 'http://localhost:8080/api/desenvolvedores';
    const editModal = document.getElementById('edit-game-modal');
    const addModal = document.getElementById('add-game-modal');


    $('#game-table').DataTable({
        ajax: {
            url: gameBaseUrl,
            dataSrc: ''
        },
        columns: [
            { data: 'nome', title: 'Nome' },
            { data: 'preco', title: 'Preço' },
            { data: 'nota', title: 'Nota' },
            { 
                data: 'dataLancamento',
                title: 'Data de Lançamento',
                render: function(data) {
                    const date = new Date(data);
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                }
            },
            { 
                data: 'desenvolvedor.nome',
                title: 'Desenvolvedor',
                defaultContent: ''
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `<button onclick="openEditModal(${row.id})">Editar</button>
                            <button onclick="deleteGame(${row.id})">Excluir</button>`;
                }
            }
        ]
    });


    window.openEditModal = function(id) {
        $.get(`${gameBaseUrl}/${id}`, function(game) {
            $('#edit-game-id').val(game.id);
            $('#edit-game-nome').val(game.nome);
            $('#edit-game-preco').val(game.preco);
            $('#edit-game-imagens').val(game.imagens);
            $('#edit-game-descricao').val(game.descricao);
            $('#edit-game-nota').val(game.nota);
            $('#edit-game-classificacao').val(game.classificacao);
            $('#edit-game-genero').val(game.genero);
            $('#edit-game-data-lancamento').val(game.dataLancamento);


            $.get(devBaseUrl, function(developers) {
                const select = $('#edit-game-desenvolvedor');
                select.empty();
                developers.forEach(function(developer) {
                    const option = `<option value="${developer.id}" ${developer.id === game.desenvolvedor.id ? 'selected' : ''}>${developer.nome}</option>`;
                    select.append(option);
                });
            });


            editModal.style.display = 'block';
        });
    };

    $('.close').click(function() {
        editModal.style.display = 'none';
        addModal.style.display = 'none';
    });
    window.onclick = function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
        if (event.target === addModal) {
            addModal.style.display = 'none';
        }
    };

    $('#edit-game-form').submit(function(event) {
        event.preventDefault();
        const game = {
            id: $('#edit-game-id').val(),
            nome: $('#edit-game-nome').val(),
            preco: $('#edit-game-preco').val(),
            imagens: $('#edit-game-imagens').val(),
            descricao: $('#edit-game-descricao').val(),
            nota: $('#edit-game-nota').val(),
            classificacao: $('#edit-game-classificacao').val(),
            genero: $('#edit-game-genero').val(),
            dataLancamento: $('#edit-game-data-lancamento').val(),
            desenvolvedor: {
                id: $('#edit-game-desenvolvedor').val()
            }
        };

        $.ajax({
            type: 'PUT',
            url: `${gameBaseUrl}/${game.id}`,
            contentType: 'application/json',
            data: JSON.stringify(game),
            success: function(response) {
                console.log('Jogo atualizado com sucesso:', response);
                editModal.style.display = 'none';
                $('#game-table').DataTable().ajax.reload();
            },
            error: function(error) {
                console.error('Erro ao atualizar jogo:', error);
            }
        });
    });


    $.get(devBaseUrl, function(developers) {
        const select = $('#game-desenvolvedor');
        select.empty();
        developers.forEach(function(developer) {
            const option = `<option value="${developer.id}">${developer.nome}</option>`;
            select.append(option);
        });
    });


    $('#add-game-form').submit(function(event) {
        event.preventDefault();
        const game = {
            nome: $('#game-nome').val(),
            preco: $('#game-preco').val(),
            imagens: $('#game-imagens').val(),
            descricao: $('#game-descricao').val(),
            nota: $('#game-nota').val(),
            classificacao: $('#game-classificacao').val(),
            genero: $('#game-genero').val(),
            dataLancamento: $('#game-data-lancamento').val(),
            desenvolvedor: {
                id: $('#game-desenvolvedor').val()
            }
        };

        $.ajax({
            type: 'POST',
            url: gameBaseUrl,
            contentType: 'application/json',
            data: JSON.stringify(game),
            success: function(response) {
                console.log('Jogo cadastrado com sucesso:', response);
                $('#game-table').DataTable().ajax.reload();
                $('#add-game-form')[0].reset();
                addModal.style.display = 'none';
            },
            error: function(error) {
                console.error('Erro ao cadastrar jogo:', error);
            }
        });
    });


    window.deleteGame = function(id) {
        if (confirm('Tem certeza que deseja excluir este jogo?')) {
            $.ajax({
                type: 'DELETE',
                url: `${gameBaseUrl}/${id}`,
                success: function(response) {
                    console.log('Jogo excluído com sucesso:', response);
                    $('#game-table').DataTable().ajax.reload(); 
                },
                error: function(error) {
                    console.error('Erro ao excluir jogo:', error);
                }
            });
        }
    };


    $('#add-game-button').click(function() {
        addModal.style.display = 'block';
    });
});
