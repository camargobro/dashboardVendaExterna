const configuracoes = {
  sucesso: { icone: 'check_circle', timeout: 3500 },
  erro: { icone: 'error_outline', timeout: 6000 },
  info: { icone: 'info_outline', timeout: 3500 }
}

export function notificar ($q, tipo, message) {
  const variante = configuracoes[tipo] ? tipo : 'info'
  const configuracao = configuracoes[variante]

  $q.notify({
    message,
    color: 'white',
    textColor: 'primary',
    icon: configuracao.icone,
    classes: `pa-notify pa-notify--${variante}`,
    timeout: configuracao.timeout
  })
}
