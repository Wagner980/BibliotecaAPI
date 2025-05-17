export function validarFuncionario(funcionario) {
  if (!funcionario.nome || funcionario.nome.trim() === "") {
    return "Nome do funcionário é obrigatório";
  }
  return null;
}
