$(document).ready(function() {
    const devBaseUrl = 'http://localhost:8080/api/desenvolvedores';

    function initializeDataTable() {
        $('#developer-table').DataTable({
            destroy: true,
            data: [],
            columns: [
                { data: 'nome', title: 'Nome' },
                { data: 'website', title: 'Website' },
                { data: 'nota', title: 'Nota' },
                { 
                    data: 'dataCriacao',
                    title: 'Data de Criação',
                    render: function(data) {
                        // Formata a data no formato desejado (por exemplo, DD/MM/AAAA)
                        const date = new Date(data);
                        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    }
                },
                {
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <button class="edit-developer" data-id="${row.id}">Editar</button>
                            <button class="delete-developer" data-id="${row.id}">Excluir</button>
                        `;
                    }
                }
            ]
        });
    }

    function loadDevelopers() {
        $.get(devBaseUrl, function(developers) {
            const table = $('#developer-table').DataTable();
            table.clear();
            table.rows.add(developers);
            table.draw();
        });
    }

    $('#add-developer-form').on('submit', function(e) {
        e.preventDefault();

        const newDeveloper = {
            nome: $('#dev-nome').val(),
            cnpj: $('#dev-cnpj').val(),
            nota: parseInt($('#dev-nota').val()), // Certifique-se de converter para inteiro se necessário
            dataCriacao: $('#dev-data-criacao').val(),
            presidente: $('#dev-presidente').val(),
            numeroColaboradores: parseInt($('#dev-numero-colaboradores').val()), // Converta para inteiro se necessário
            website: $('#dev-website').val()
        };

        $.ajax({
            url: devBaseUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDeveloper),
            success: function() {
                loadDevelopers();
                $('#add-developer-form')[0].reset();
            },
            error: function(error) {
                alert('Erro ao cadastrar desenvolvedor.');
                console.error("Erro ao adicionar desenvolvedor:", error);
            }
        });
    });

    $(document).on('click', '.edit-developer', function() {
        const developerId = $(this).data('id');

        $.get(`${devBaseUrl}/${developerId}`, function(developer) {
            $('#edit-dev-nome').val(developer.nome);
            $('#edit-dev-cnpj').val(developer.cnpj);
            $('#edit-dev-nota').val(developer.nota);
            $('#edit-dev-data-criacao').val(developer.dataCriacao);
            $('#edit-dev-presidente').val(developer.presidente);
            $('#edit-dev-numero-colaboradores').val(developer.numeroColaboradores);
            $('#edit-dev-website').val(developer.website);
            $('#edit-developer-form').data('id', developerId);
            $('#edit-developer-modal').show();
        }).fail(function() {
            alert('Erro ao buscar detalhes do desenvolvedor.');
        });
    });

    $('#edit-developer-form').on('submit', function(e) {
        e.preventDefault();

        const developerId = $(this).data('id');
        const updatedDeveloper = {
            id: developerId,
            nome: $('#edit-dev-nome').val(),
            cnpj: $('#edit-dev-cnpj').val(),
            nota: parseInt($('#edit-dev-nota').val()), // Certifique-se de converter para inteiro se necessário
            dataCriacao: $('#edit-dev-data-criacao').val(),
            presidente: $('#edit-dev-presidente').val(),
            numeroColaboradores: parseInt($('#edit-dev-numero-colaboradores').val()), // Converta para inteiro se necessário
            website: $('#edit-dev-website').val()
        };

        $.ajax({
            url: `${devBaseUrl}/${developerId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedDeveloper),
            success: function() {
                loadDevelopers();
                $('#edit-developer-modal').hide();
            },
            error: function(error) {
                alert('Erro ao atualizar desenvolvedor.');
                console.error("Erro ao atualizar desenvolvedor:", error);
            }
        });
    });

    $(document).on('click', '.delete-developer', function() {
        const developerId = $(this).data('id');

        if (confirm('Tem certeza que deseja excluir este desenvolvedor?')) {
            $.ajax({
                url: `${devBaseUrl}/${developerId}`,
                type: 'DELETE',
                success: function() {
                    loadDevelopers();
                },
                error: function(error) {
                    alert('Erro ao excluir desenvolvedor.');
                    console.error("Erro ao excluir desenvolvedor:", error);
                }
            });
        }
    });

    $('.modal .close').on('click', function() {
        $(this).closest('.modal').hide();
    });

    initializeDataTable();
    loadDevelopers();
});
