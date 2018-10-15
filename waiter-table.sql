create table waiters(
id serial not null primary key,
waiter text not null,
monday boolean not null,
tuesday boolean not null,
wednesday boolean not null,
thursday boolean not null,
friday boolean not null,
saturday boolean not null,
sunday boolean not null
);