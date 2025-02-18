create database if not exists hassam;
use hassam;

create table if not exists usuarios
(
    id_usuario int not null auto_increment,
    login_usuario varchar(32),
    senha_usuario varchar(32),
    nome_usuario varchar(64),
    unique (login_usuario),
    primary key(id_usuario)
);

create table if not exists servicos
(
    id_servico int not null auto_increment,
    id_usuario int not null,
    desc_servico varchar(32),
    valor_servico decimal(5, 2),
    status_servico enum("ativo", "inativo"),
    fulltext(desc_servico), -- Não esquecer de resolver esse FULLTEXT em algum momento do projeto
    primary key(id_servico),
    foreign key(id_usuario) references usuarios(id_usuario)
);

--create table if not exists clientes
--(
--    id_cliente int not null auto_increment,
--    nome_cliente varchar(64),
--    status_cliente enum("ativo", "inativo"), 
--    fulltext(nome_cliente), -- Não esquecer de resolver esse FULLTEXT em algum momento do projeto
--    primary key(id_cliente)
--);

--create table if not exists telefones
--(
--    id_telefone int not null auto_increment,
--    id_cliente int not null, 
--    num_telefone varchar(64), 
--    fulltext(num_telefone),
--    primary key(id_telefone), 
--    foreign key(id_cliente) references clientes(id_cliente)
--);

create table if not exists agendamentos
(
    id_agendamento int not null auto_increment, 
    id_usuario int not null, 
    nome_cliente varchar(64),
    telefone_cliente varchar(32),
    data_agendamento date, 
    hora_agendamento time, 
    status_agendamento enum("ativo", "inativo"),
    primary key(id_agendamento),
    foreign key(id_usuario) references usuarios(id_usuario)
);

create table if not exists agendamentosServicos
(
    id_agendamentoServico int not null auto_increment,
    id_servico int not null,
    id_agendamento int not null, 
    qt_servico int,
    unique key unique_index(id_servico, id_agendamento),
    primary key(id_agendamentoServico),
    foreign key(id_servico) references servicos(id_servico),
    foreign key(id_agendamento) references agendamentos(id_agendamento)
);

create table if not exists produtos
(
    id_produto int not null auto_increment, 
    id_usuario int,
    desc_produto varchar(32) not null, 
    valor_produto decimal(5, 2), 
    estoque_produto int not null, 
    primary key(id_produto),
    foreign key(id_usuario) references usuarios(id_usuario)
);

create table if not exists vendas
(
    id_venda int not null auto_increment, 
    id_usuario int,
    data_venda date, 
    hora_venda time, 
    primary key(id_venda), 
    foreign key(id_usuario) references usuarios(id_usuario)
);

create table if not exists vendasProdutos
(
    id_vendasProdutos int not null auto_increment, 
    id_venda int, 
    id_produto int,
    qt_produto int not null, 
    primary key(id_vendasProdutos),
    foreign key(id_venda) references vendas(id_venda),
    foreign key(id_produto) references produtos(id_produto)
);