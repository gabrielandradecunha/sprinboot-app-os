create table if not exists users (
    id serial primary key,
    nome varchar(100) not null,
    email varchar(120) not null unique,
    senha_hash varchar(255) not null,
    data_registro timestamp default current_timestamp,
    ativo boolean default true
);

create table if not exists empresa (
    id serial primary key,
    nome varchar(150) not null,
    cnpj varchar(18) unique,
    id_user int,
    telefone varchar(20),
    email varchar(120),
    endereco varchar(255),
    data_cadastro timestamp default current_timestamp,
    constraint fk_empresa_user foreign key (id_user) references "user"(id) on delete set null
);

create table if not exists cliente (
    id serial primary key,
    nome varchar(120) not null,
    email varchar(120),
    telefone varchar(20),
    endereco varchar(255),
    data_cadastro timestamp default current_timestamp,
    id_empresa int,
    constraint fk_cliente_empresa foreign key (id_empresa) references empresa(id) on delete set null
);

create table if not exists os (
    id serial primary key,
    numero varchar(50) not null,
    nome varchar(120) not null,
    tipo_produto varchar(100),
    defeito text,
    complemento text,
    data_emissao timestamp default current_timestamp,
    data_conclusao timestamp,
    status boolean,
    descricao varchar(255) not null,
    valor numeric(10, 2),
    id_cliente int not null,
    id_empresa int,
    constraint fk_os_cliente foreign key (id_cliente) references cliente(id) on delete cascade,
    constraint fk_os_tecnico foreign key (id_tecnico) references users(id) on delete set null,
    constraint fk_os_empresa foreign key (id_empresa) references empresa(id) on delete set null
);