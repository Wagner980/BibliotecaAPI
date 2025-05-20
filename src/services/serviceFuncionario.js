export function validarFuncionario(funcionario) {
  if (!funcionario.email || funcionario.email.trim() === "") {
    return "Email do funcionário é obrigatório";
  }
  if (!funcionario.senha || funcionario.senha.trim() === "") {
    return "Senha do funcionário é obrigatória";
  }
  return null;
}
