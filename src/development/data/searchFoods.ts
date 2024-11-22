import axios from 'axios'
export async function searchCustomers(query: string = '') {
    try {
        const {data} = await axios.get('https://665fa52f5425580055b05392.mockapi.io/food', {
            params: { name: query },
        });

        // A resposta do GitHub API está no objeto 'data'
      
        return data || [];
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
}
