const TOKEN_CONTRACT = '0x30373ff94858986cecd0616f225bedde3ef89ca4'; // Endereço do seu token principal
const PAIR_CONTRACT = '0x9c3280ba9909cc0365595cf2fe00f4eeb47abce1'; // Endereço do contrato do par
const BASE_TOKEN = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // Outro token no par (exemplo: POL)

async function tvl(api) {
  // Busca o saldo do TOKEN_CONTRACT no PAIR_CONTRACT
  const tokenBalance = await api.call({
    abi: 'erc20:balanceOf',
    target: TOKEN_CONTRACT,
    params: [PAIR_CONTRACT],
  });

  // Busca o saldo do BASE_TOKEN no PAIR_CONTRACT
  const baseTokenBalance = await api.call({
    abi: 'erc20:balanceOf',
    target: BASE_TOKEN,
    params: [PAIR_CONTRACT],
  });

  // Adiciona os saldos ao TVL
  api.add(TOKEN_CONTRACT, tokenBalance);
  api.add(BASE_TOKEN, baseTokenBalance);
}

module.exports = {
  methodology: 'Calculates TVL by summing the token balances in the liquidity pair contract.',
  timetravel: true, // Permite histórico de dados
  misrepresentedTokens: false, // Não há substituições de tokens
  start: 65157769, // Número do bloco onde o contrato foi criado
  polygon: { // Rede Polygon
    tvl,
  },
};
