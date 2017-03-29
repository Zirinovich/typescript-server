create table t_user_accounts
(
	user_accounts_id serial not null
		constraint t_user_accounts_pkey
			primary key,
	username varchar(8000) not null,
	password varchar(8000) not null,
	full_name varchar(8000),
	role integer default 1 not null
)
;

INSERT INTO t_user_accounts (username, password, full_name) VALUES ('test', 'CY9rzUYh03PK3k6DJie09g==', 'Петров Водкин Закусонович');
INSERT INTO t_user_accounts (username, password, full_name) VALUES ('admin', 'r5HI0MW24N7VLKXqNl8POg==', 'Иванов Иван Иванович');