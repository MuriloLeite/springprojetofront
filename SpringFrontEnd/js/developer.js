$(document).ready(function() {
    const devBaseUrl = 'http://localhost:8080/api/desenvolvedores';
    const gameBaseUrl = 'http://localhost:8080/api/jogos';
    const devId = new URLSearchParams(window.location.search).get('id');
    const developerInfoContainer = $('#developer-info');

    function showError(message) {
        developerInfoContainer.html(`<div class="error">${message}</div>`);
    }

    function loadDeveloperDetails() {
        $.get(`${devBaseUrl}/${devId}`)
            .done(function(developer) {
                developerInfoContainer.html(`
                    <p><strong>Nome:</strong> ${developer.nome}</p>
                    <p><strong>CNPJ:</strong> ${developer.cnpj}</p>
                    <p><strong>Nota:</strong> ${developer.nota}</p>
                    <p><strong>Data de Criação:</strong> ${new Date(developer.dataCriacao).toLocaleDateString()}</p>
                    <p><strong>Presidente:</strong> ${developer.presidente}</p>
                    <p><strong>Número de Colaboradores:</strong> ${developer.numeroColaboradores}</p>
                    <p><strong>Website:</strong> <a href="${developer.website}" target="_blank">${developer.website}</a></p>
                `);
            })
            .fail(function(xhr) {
                showError(`Erro ao buscar detalhes do desenvolvedor: ${xhr.responseText}`);
            });
    }

    function initializeDataTable() {
        $('#developer-games-table').DataTable({
            ajax: {
                url: `${gameBaseUrl}/desenvolvedor/${devId}`,
                dataSrc: '',
                error: function(xhr) {
                    showError(`Erro ao buscar jogos: ${xhr.responseText}`);
                }
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
                }
            ]
        });
    }

    loadDeveloperDetails();
    initializeDataTable();
});
