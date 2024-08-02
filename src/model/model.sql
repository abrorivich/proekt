create database imtihon;

\c imtihon;

create table companies (
    id serial primary key,
    name varchar(50)
);

create table users(
    id serial primary key,
    login varchar(30),
    password varchar(20),
    fullname varchar(50),
    company_id int,
    role varchar(20),
    foreign key (company_id) references companies(id) on delete cascade
);

create table tasks (
    id serial primary key,
    title varchar(50),
    description varchar (50),
    company_id int,
    created_at timestamp default current_timestamp,
    foreign key (company_id) references companies(id) on delete cascade
);

create table user_tasks (
    id serial primary key,
    user_id int,
    task_id int,
    start_at timestamp default current_timestamp,
    end_at timestamp default current_timestamp,
    status varchar(50),
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (task_id) references tasks(id) on delete cascade
);

insert into companies(name) values ('My abroriv1ch bank');

insert into users(login, password, fullname, company_id, role) values ('Abdurasulov0414', 'Avazjon0414', 'AbdurasulovAvazjon', 1, 'admin' );

select * from companies;

select * from users;

\dt
